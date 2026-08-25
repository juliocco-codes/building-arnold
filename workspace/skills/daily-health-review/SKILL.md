---
name: daily-health-review
description: Compare a current health plan with the daily record and available trends, then surface decisions and safety flags.
---

# Daily health review

## Inputs

- the current plan;
- today's dated record;
- recent records needed to establish a trend;
- relevant wearable data, if available;
- explicit professional instructions and escalation boundaries.

## Workflow

1. Validate dates and identify missing sources.
2. Summarize what the plan called for today.
3. Summarize what actually happened without rewriting either source.
4. Compare the two and identify only material differences.
5. Check whether any difference continues a recent trend.
6. Check explicit safety and escalation rules before suggesting optimization.
7. Recommend the smallest practical next decision.

## Output

### Decision

State what the user should do next, or state that no change is needed.

### Why

Explain the plan-to-reality comparison and the relevant evidence.

### Flag

Include only when attention or professional review is warranted. State the trigger and uncertainty clearly.

## Boundaries

- Do not diagnose.
- Do not infer missing symptoms or measurements.
- Do not treat a single wearable score as conclusive.
- Do not change the current plan without confirmation.
