## What it does

`caveman` makes conversational replies shorter while preserving technical details, code, commands, and exact errors. Its defining constraint is that compression applies to replies in the conversation; code, documentation, commits, and messages for other people stay in normal prose.

It offers six levels, from concise full sentences to extreme compression and classical Chinese. When compression could obscure meaning, it returns to full prose for warnings, irreversible actions, ambiguous sequences, and clarification.

## When to reach for it

Type `/caveman` or one of its intensity names, or the skill can activate automatically when a request asks for brief replies or lower token use. Reach for it when you want the answer itself shorter. Use [unslop](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/productivity/unslop.md) when a human-facing draft sounds machine-written; use [wait-what](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/productivity/wait-what.md) when a short answer needs more context.

## The compression boundary

The levels control how aggressively the reply is compressed. Technical terms, code, commands, errors, numbers, and units stay exact. Caveman backs off when shorter phrasing could change the meaning, then resumes after the risky part is clear.

The style stays active through the conversation until you change its level or turn it off. It does not rewrite files or apply the style to prose intended for other people.

## Common questions

**How do I stop it?**

Say `stop caveman` or `normal mode`, or use `/caveman off`. You can also choose another level at any time.

**Does it rewrite code or documents?**

No. It changes conversational replies. Code, comments, docs, commits, and messages for other people stay in normal prose.

**Why did the previous copy disappear?**

The earlier copy was removed because it duplicated an experiment that was not intended for the public set. This version restores the skill with upstream's expanded intensity controls and clearer limits on compression.

## It's working if

- Replies get shorter without losing technical distinctions or exact details.
- Security warnings and ambiguous instructions remain easy to follow.
- You can change intensity or turn the style off without restarting the conversation.
- Prose written for other people keeps its normal voice.

## Where it fits

`caveman` is a standalone response style that can run across a conversation. It pairs with [unslop](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/productivity/unslop.md), which edits prose for a human reader, and [wait-what](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/productivity/wait-what.md), which adds missing context after a message fails to land. [ask-mattia](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ask-mattia.md) routes across the full set.
