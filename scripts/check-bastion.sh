#!/usr/bin/env bash
set -euo pipefail

printf '=== Bastion Linux Check ===\n'

fail() {
  printf 'FAIL: %s\n' "$1" >&2
  exit 1
}

pass() {
  printf 'PASS: %s\n' "$1"
}

warn() {
  printf 'WARN: %s\n' "$1"
}

required_files=(
  AGENTS.md
  SAVE_STATE.md
  ROADMAP.md
  index.html
  APP_SHELL_NORMALIZATION.md
  app/index.html
  app/styles.css
  app/views/dashboard.js
  app/views/reports.js
  app/views/timeline.js
  app/views/scenarios.js
  app/views/advisor.js
  app/views/tax-rmd.js
  app/views/profile.js
  app/views/owner.js
)

printf '\nRequired files:\n'
for file in "${required_files[@]}"; do
  [[ -f "$file" ]] || fail "required file missing: $file"
  printf 'PASS: found %s\n' "$file"
done

printf '\nRepository status:\n'
git status --short --branch

printf '\nWhitespace validation:\n'
git diff --check
pass 'git diff --check'

printf '\nConflict-remnant scan:\n'
lt_run=$(printf '%*s' 7 '' | tr ' ' '<')
eq_run=$(printf '%*s' 7 '' | tr ' ' '=')
gt_run=$(printf '%*s' 7 '' | tr ' ' '>')
conflict_pattern="^(${lt_run}|${eq_run}|${gt_run})([[:space:]]|$)"
if git grep -n -I -E "$conflict_pattern" -- .; then
  fail 'conflict-remnant text found in tracked text files'
fi
pass 'no conflict-remnant text found in tracked text files'

printf '\nJavaScript module syntax:\n'
shopt -s nullglob
core_files=(app/core/*.js)
view_files=(app/views/*.js)
((${#core_files[@]} > 0)) || fail 'no core JavaScript files found'
((${#view_files[@]} > 0)) || fail 'no view JavaScript files found'
node --check "${core_files[@]}"
pass 'node --check app/core/*.js'
node --check "${view_files[@]}"
pass 'node --check app/views/*.js'

printf '\nInline index.html JavaScript syntax:\n'
tmp_dir=$(mktemp -d)
cleanup() {
  rm -rf "$tmp_dir"
}
trap cleanup EXIT
python3 - "$tmp_dir" <<'PY'
from pathlib import Path
import re
import sys
out_dir = Path(sys.argv[1])
html = Path('index.html').read_text(encoding='utf-8')
count = 0
for match in re.finditer(r'<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>', html, re.IGNORECASE | re.DOTALL):
    count += 1
    (out_dir / f'index-inline-{count}.js').write_text(match.group(1), encoding='utf-8')
if count == 0:
    raise SystemExit('no inline script blocks found in index.html')
print(count)
PY
inline_count=$(find "$tmp_dir" -type f -name 'index-inline-*.js' | wc -l | tr -d ' ')
for inline_file in "$tmp_dir"/index-inline-*.js; do
  node --check "$inline_file"
done
pass "node --check extracted inline index.html scripts ($inline_count files)"

printf '\nSecret-pattern scan:\n'
python3 - <<'PY'
from pathlib import Path
import re
import subprocess
import sys

tracked = subprocess.check_output(['git', 'ls-files'], text=True).splitlines()
fails = []
warns = []

fail_patterns = [
    re.compile(r'sk-(proj-)?[A-Za-z0-9_-]{20,}'),
    re.compile(r'[Bb]earer\s+[A-Za-z0-9._~+/=-]{20,}'),
    re.compile(r'BEGIN\s+[A-Z ]*PRIVATE\s+KEY'),
    re.compile(r'firebase.*(private_key|client_email|service_account)', re.IGNORECASE),
    re.compile(r'(private_key|client_email).*firebase', re.IGNORECASE),
]
assignment_pattern = re.compile(r'(^|[^A-Za-z0-9_])(api[_-]?key|apiKey|secret|token|client_secret|private_key)\s*[:=]\s*(["\'])([^"\']{16,})\3', re.IGNORECASE)

for name in tracked:
    path = Path(name)
    if path.name == '.env' or path.name.startswith('.env.'):
        fails.append(f'{name}: tracked environment file may expose secrets')
        continue
    try:
        data = path.read_bytes()
    except OSError:
        continue
    if b'\0' in data:
        continue
    text = data.decode('utf-8', errors='ignore')
    for line_no, line in enumerate(text.splitlines(), 1):
        if name == 'scripts/check-bastion.sh' and ('re.compile(' in line or 'assignment_pattern =' in line):
            continue
        for pattern in fail_patterns:
            if pattern.search(line):
                fails.append(f'{name}:{line_no}: likely private secret pattern')
                break
        match = assignment_pattern.search(line)
        if match:
            value = match.group(4)
            if 'AIza' in value:
                warns.append(f'{name}:{line_no}: Firebase web API key-like public config')
            else:
                fails.append(f'{name}:{line_no}: generic secret/API-key assignment pattern')

if warns:
    print('WARN: Firebase web API key-like public config found; verify it remains browser-safe and restricted:')
    for item in warns:
        print(item)
if fails:
    for item in fails:
        print(item, file=sys.stderr)
    raise SystemExit(1)
print('PASS: no failing secret exposure patterns found')
PY

printf '\nFirebase hardening posture:\n'
if [[ -f firestore.rules ]] && rg -n 'allow\s+read\s*,\s*write\s*:\s*if\s+true' firestore.rules >/tmp/bastion-open-firestore-rules.txt; then
  warn 'temporary Firestore allow read/write if true rules found; audit required before beta/production'
  cat /tmp/bastion-open-firestore-rules.txt
else
  pass 'no temporary Firestore allow read/write if true rules found'
fi
if git ls-files | rg '(^|/)\.env(\.|$)' >/tmp/bastion-tracked-env-files.txt; then
  fail 'tracked environment file found'
else
  pass 'no tracked .env files found'
fi


printf '\nApp shell normalization:\n'
python3 - <<'PYCHECK'
from pathlib import Path
import re
root = Path('index.html').read_text(encoding='utf-8')
app = Path('app/index.html').read_text(encoding='utf-8')
doc = Path('APP_SHELL_NORMALIZATION.md').read_text(encoding='utf-8')
if 'Canonical app shell path: `index.html` at the repository root.' not in doc:
    raise SystemExit('canonical app shell path missing from APP_SHELL_NORMALIZATION.md')
if 'id="phaseNumber"' not in root or 'function showView(' not in root:
    raise SystemExit('root index.html does not contain the canonical app shell markers')
if 'url=../index.html' not in app:
    raise SystemExit('app/index.html compatibility redirect target missing')
if 'window.location.replace' not in app:
    raise SystemExit('app/index.html JavaScript redirect fallback missing')
if re.search(r'Bastion Save State [0-9]', app):
    raise SystemExit('app/index.html should not contain visible Save State text')
if 'app/core/bastion-engine.js' in app or 'app/views/dashboard.js' in app:
    raise SystemExit('app/index.html appears to duplicate the full app shell')
print('PASS: root index.html is canonical; app/index.html is a compatibility redirect')
PYCHECK
pass 'app shell canonical structure validated'

printf '\nSave State alignment:\n'
ui_save=$(python3 - <<'PY'
from pathlib import Path
import re
m = re.search(r'Bastion Save State ([^<\n]+)', Path('index.html').read_text(encoding='utf-8'))
print(m.group(1).strip() if m else '')
PY
)
doc_save=$(python3 - <<'PY'
from pathlib import Path
import re
m = re.search(r'Bastion Save State ([^\n]+)', Path('SAVE_STATE.md').read_text(encoding='utf-8'))
print(m.group(1).strip() if m else '')
PY
)
[[ -n "$ui_save" ]] || fail 'Save State missing from index.html'
[[ -n "$doc_save" ]] || fail 'Save State missing from SAVE_STATE.md'
[[ "$ui_save" == "$doc_save" ]] || fail "Save State mismatch: UI '$ui_save' vs SAVE_STATE.md '$doc_save'"
pass "Save State aligned: $ui_save"

printf '\nBastion Linux check passed\n'
