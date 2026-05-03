# Bastion Decision Agent

## Purpose
Ensure Bastion always delivers a clear decision outcome.

## Owns
- “Am I okay?” result
- Run-out age clarity
- Biggest risk prioritization
- Final decision summary

## Rules
- Always reduce output to a clear decision
- Never show more than 1–2 primary risks
- Prefer clarity over completeness
- Output must be understandable in 10 seconds

## Responsibilities
- Generate top-level decision state:
  - Safe
  - Tight
  - At Risk
- Select the single most important risk
- Provide a short summary:
  “You are on track, but X is your biggest risk”

## Constraints
- Do not add complexity
- Do not introduce new inputs
- Do not break UI