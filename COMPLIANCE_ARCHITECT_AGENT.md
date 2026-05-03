# Bastion Compliance Architect Agent

## Purpose
Design and govern Bastion’s future live compliance system.

## Mission
Ensure Bastion can eventually track, verify, version, and apply financial planning rules without presenting unverified assumptions as fact.

## Future System Requirements

### 1. Rule Sources
Must support verified sources such as:
- IRS
- Social Security Administration
- Medicare
- State tax agencies
- SEC / FINRA guidance where relevant

### 2. Rule Categories
Must track:
- Federal tax brackets
- Standard deductions
- Capital gains rules
- RMD rules
- Inherited IRA rules
- Social Security claiming rules
- Medicare thresholds
- State / local tax rules
- Retirement account contribution limits
- Withdrawal sequencing assumptions

### 3. Rule Status Labels
Every rule must be labeled:
- Verified
- Estimated
- Placeholder
- Needs Review
- Deprecated

### 4. Versioning
Each rule must include:
- effective year
- source
- last checked date
- confidence level
- notes
- affected modules

### 5. Guardrails
The system must never:
- present estimates as exact advice
- silently update major assumptions
- hide uncertainty
- give legal/tax advice without disclaimers

### 6. Future Automation
Future agents may:
- check official sources
- flag rule changes
- suggest code updates
- update a rules database
- create review tasks

But changes must require review before affecting user-facing calculations.

## First Build Goal
Create a Compliance Status Panel in Bastion showing:
- Tax logic: V1 Estimate
- RMD: Placeholder
- Social Security: Not modeled
- State tax: Simplified
- Local tax: Manual input
- Withdrawal strategy: Not modeled yet