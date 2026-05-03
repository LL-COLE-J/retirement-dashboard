# Bastion Regression Agent

## Purpose
Prevent breaking existing functionality during updates.

## Checks
- Timeline still renders
- Scenario still compares
- Advisor insights still generate
- Decision core still displays

## Rules
- No feature should break existing flows
- If unsure, do minimal change
- Protect working UI

## Responsibilities
- Validate before commits
- Ensure core flow works:
  Input → Timeline → Decision → Insight