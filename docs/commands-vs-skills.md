# Commands vs skills

Every `SKILL.md` in this repo is one of two kinds. The test for "is it a skill" is: _could the model usefully reach for this autonomously?_ Reuse is the reason to extract a skill, not the test.

- **Command** — _always_ user-invoked. Set `disable-model-invocation: true` in the frontmatter. The `description` is **human-facing**: a one-line summary read by a person browsing slash-commands. Strip trigger lists ("Use when the user says…") from command descriptions. A command may invoke skills, but **never another command**.
- **Skill** — invocable by **model or user**. The `description` is **model-facing** and keeps rich trigger phrasing ("Use when the user wants…, mentions…, asks for…") so auto-invocation fires. Do not set `disable-model-invocation`.

Bucket `README.md`s and the top-level `README.md` group entries into **Commands** and **Skills**.

## Dependencies between them

Dependencies are expressed as **`/skill`-style prose invocation** ("Run the `/grilling` skill"), not deep `../other-skill/FILE.md` cross-references. Shared reference docs live inside the skill that owns them; other skills reach that material by invoking the skill, not by linking across folders.

## Passive vs active domain work

Merely _reading_ `CONTEXT.md` for vocabulary is a one-line prose pointer, not the `domain-modeling` skill. Only the active build/sharpen discipline (challenge terms, edge-case scenarios, write ADRs, update `CONTEXT.md` inline) is `domain-modeling`.
