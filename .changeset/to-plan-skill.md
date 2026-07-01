---
"mattpocock-skills": minor
---

Add a new user-invoked **`to-plan`** skill to the `engineering/` bucket — the sequential, HITL sibling of **`to-issues`**. Both slice work into tracer-bullet vertical slices, but where `to-issues` produces independently-grabbable issues for parallel agents, `to-plan` produces one ordered sequence you drive by hand, one phase per fresh context. It publishes to the tracker `/setup-matt-pocock-skills` configured, shaped to it: a single sequential `plan.md` for a local tracker, or a parent issue with ordered sub-issues (native sub-issues where the platform supports them) for a real one. The `to-*` fork in `ask-matt`'s main flow now offers both, and there's a human-facing docs page at `docs/engineering/to-plan.md`.
