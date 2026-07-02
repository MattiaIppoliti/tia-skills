---
name: claude-handoff
description: Hand off the current conversation to a fresh background agent that picks up the work immediately.
argument-hint: "What will the next session be used for?"
disable-model-invocation: true
---

Compose a handoff summarising the current conversation so a fresh agent can continue the work, then launch it as a background agent seeded with that summary — do not save a document.

Launch with `claude --bg "<summary>"`, passing the summary as the prompt. It starts in the current working directory and returns immediately; the user manages it with `claude agents`.

Include a "suggested skills" section in the summary, instructing the agent which skills to invoke.

Do not duplicate content already captured in other artifacts (PRDs, plans, ADRs, issues, commits, diffs). Reference them by path or URL instead.

Redact any sensitive information, such as API keys, passwords, or personally identifiable information — it becomes the agent's prompt.

If the user passed arguments, treat them as a description of what the next session will focus on and tailor the summary accordingly.
