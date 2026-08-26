# Building Arnold

Arnold is a personal health-planning agent. It brings together a longer-term plan, current constraints, wearable trends, calendar context, and a daily record of what actually happened. The goal is not another dashboard. It is better decisions about training, food, recovery, and when to seek professional help.

## The core design

Keep three layers separate:

1. **Baseline:** relevant history, stable constraints, preferences, and professional advice. Change this carefully.
2. **Current plan:** the training, diet, recovery, or rehabilitation plan in force now.
3. **Daily record:** what the person actually did, ate, felt, skipped, or changed.

The useful comparison is not today against an ideal person. It is the current plan against what is actually happening, in the context of the baseline.

## Start here

1. Install OpenClaw through its [official documentation](https://github.com/openclaw/openclaw#readme).
2. Create a private workspace and copy the files under `workspace/` into it.
3. Rename `USER.example.md` to `USER.md` and replace the fictional information locally.
4. Create private files for the current plan and daily log. Never commit completed health files to a public repository.
5. Begin with manual entries and a daily review. Add wearables only after the basic comparison is useful.
6. Test with sample data before connecting a real health service.

OpenClaw loads workspace skills from `<workspace>/skills/<skill>/SKILL.md`. Check the current [skills documentation](https://docs.openclaw.ai/skills) before installing or changing a skill.

## What Arnold should do

- compare the plan with what actually happened;
- surface trends and material deviations;
- explain why a change may be worth considering;
- distinguish a data-quality problem from a health signal;
- recommend professional review when a pattern crosses a defined boundary.

## What Arnold should not do

- diagnose a condition;
- replace a doctor, physiotherapist, dietitian, or other qualified professional;
- treat a wearable score as ground truth;
- change a plan silently;
- encourage training through a red flag;
- claim certainty from incomplete data.

## Design decisions

### Plans and evidence are different files

If the plan and the daily record share one mutable document, the agent can quietly rewrite what was supposed to happen. Keep them separate so comparisons remain honest.

### Explain flags

A flag should state the observation, the source, the relevant trend, and the proposed next step. “Recovery is low” is not enough.

### Escalation is part of the product

Define situations in which the agent should stop optimizing and recommend professional help. A persistent symptom, sudden change, or conflict with clinical advice should not become another coaching experiment.

### Add integrations slowly

Wearables create useful context but also noise and privacy risk. Start read-only, store the minimum required data, and keep credentials outside the workspace.

## Repository map

- `workspace/AGENTS.md`: operating and safety rules.
- `workspace/SOUL.md`: the agent's stance and tone.
- `workspace/USER.example.md`: example context to replace locally.
- `workspace/skills/daily-health-review/SKILL.md`: the repeatable review workflow.
- `examples/daily-health-review.md`: an example daily review.
- `SECURITY.md`: privacy and medical-safety checklist.

## License

Available for personal and non-commercial use. See `LICENSE` for details.
