# Security and medical safety

Health data is highly sensitive. Keep real plans, measurements, symptoms, clinician notes, wearable exports, daily logs, and credentials out of Git.

Before every commit, search the full diff for names, dates of birth, contact details, health conditions, medication, appointments, local paths, tokens, and provider identifiers. Inspect images and deleted files as well as current files.

Use read-only integrations first and request the minimum scopes available. Store credentials through the private mechanism recommended by the integration, never in a workspace file.

Arnold is a decision-support system, not a medical professional. Its public instructions require uncertainty, visible sources, and escalation when symptoms persist, worsen, appear suddenly, or conflict with professional advice.
