# Profile Input Model Notes — Phase 2.40a

## 1. Current Profile stabilization goal

Phase 2.40a stabilizes Profile as Bastion's clear input center without expanding the full data model. The Dashboard remains output-only, calculations remain engine-owned, and the current storage/routing behavior is preserved.

This phase improves organization, labels, helper text, missing-input clarity, and visual hierarchy so future data-model expansion can be added in small, auditable steps.

## 2. Current input sections

The current Profile structure is organized around these sections:

- Household
- Income
- Expenses
- Assets
- Debts
- Retirement
- Tax Profile
- Special Accounts
- Scenario Assumptions
- Life Events

These sections reuse the existing inputs where available. They do not introduce a dynamic list system, new formulas, new routes, or new engine behavior.

## 3. Future household modeling requirements

Future household modeling should support many family compositions, including single users, couples, dependents, multi-generational households, partner retirement timing, survivor scenarios, and other household structures.

The future model should avoid assuming one fixed household shape. It should also make each person's role, age, retirement age, income relationship, and dependency assumptions explicit.

## 4. Future income modeling requirements

Future income modeling should support multiple income types and frequencies, including wages, self-employment income, bonus income, pension income, Social Security, annuities, rental income, investment income, and other irregular income streams.

Income rows should eventually include owner/person, source, gross/net treatment, start date or age, end date or age, frequency, inflation treatment, tax treatment, and confidence level.

## 5. Future expense modeling requirements

Expenses should not rely on locked inflation or return assumptions. Future expenses should support current spending, retirement spending, healthcare spending, housing costs, discretionary spending, one-time costs, recurring costs, and user-provided uncertainty.

Retirement spending should eventually support unknown, estimated, and derived states instead of forcing every user into one precise value.

## 6. Future asset/debt/equity modeling requirements

Assets should eventually support broad asset classes and distinguish liquid, semi-liquid, and illiquid assets. Examples include cash, taxable brokerage, retirement accounts, home equity, real estate, business value, vehicles, restricted stock, and other property.

Debts should eventually support broad debt types, including mortgage, auto, credit-card, student, personal, business, and other debt. Housing and auto debt should eventually link to asset value/equity so Bastion can show net equity rather than disconnected asset and debt totals.

The future engine should support asset-debt linking without moving calculations into Profile.

## 7. Future tax-profile expansion requirements

Future tax-profile expansion should support state, jurisdiction, and ZIP-based modeling when appropriate. It should also support filing status, dependents, local taxes, retirement-account tax treatment, taxable versus tax-advantaged assets, and rule-version tracking.

Any expanded tax logic should remain calculation-engine owned and should clearly label approximations until rule coverage is validated.

## 8. Future retirement-goal flexibility

Future retirement planning should allow users to mark retirement spend as unknown, estimated, derived from current spend, or explicitly entered. Retirement timing should support phased retirement, different retirement ages by person, and special-account claiming windows.

Bastion should reduce certainty when inputs are incomplete instead of fabricating precision.

## 9. Future confidence/missing-input model

The future engine should support confidence levels for incomplete inputs. Missing, estimated, stale, or placeholder values should reduce confidence and drive clear warnings instead of silently flowing through as if they were certain.

Profile should make incomplete inputs visible and reversible. Dashboard should explain how confidence affects the output, not ask the user to edit inputs there.

## 10. What was intentionally not implemented in 2.40a

Phase 2.40a intentionally did not implement:

- A full dynamic asset, debt, or income list system.
- Full household composition modeling.
- ZIP, jurisdiction, or state-specific tax-engine expansion.
- Housing/auto debt to asset/equity linking.
- New financial formulas, scenario logic, routes, Firebase/auth behavior, deployment configuration, or engine rewrites.
- Dashboard input ownership or any movement of calculations into Profile.
- Owner dashboard redesign or full-app redesign.

These items remain future work for scoped, separately validated phases.
