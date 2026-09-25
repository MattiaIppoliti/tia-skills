---
name: technical-writing
description: "Write or review technical prose that a tired engineer can understand on the first read. Use for documentation, RFCs, READMEs, pull-request descriptions, and commit messages."
disable-model-invocation: true
---

# Technical writing

Write for the reader's immediate job. Cut words that add no meaning, use the short everyday word unless precision requires another, and keep the real symbol, file, flag, or command name instead of an invented synonym.

## Pick one mode

Choose one mode per document. Split and link when material belongs to another mode.

| Need | Mode | Standard |
| --- | --- | --- |
| Learn by doing | Tutorial | Lead with a concrete result and make each step produce visible progress. |
| Complete a task | How-to | Assume competence; give only the actions and decision forks needed to reach the goal. |
| Look up facts | Reference | Describe facts, options, limits, and errors. Do not instruct or persuade. |
| Understand a decision | Explanation | Answer one bounded why-question with context, constraints, and alternatives. |

## Write sentences that survive one read

- Address the reader as "you" and write instructions as direct commands.
- Put the condition or warning before the action it qualifies.
- Give each sentence one instruction or thought. Split dense sentences.
- Name the actor. Use passive voice only when the actor is unknown or irrelevant.
- Keep `only` and `not` beside the word they modify. Make every pronoun point to one clear noun.
- Use one name for one thing across the document. Break long noun strings into clauses.
- Use numbered lists for sequences and bullets for non-sequential facts. Headings should make a point, not merely name a topic.

## Review

Call the Skill tool with `unslop` before shipping prose. Then check that every symbol, path, command, count, and example matches the commit. A readable document that gives a wrong command is still a failed document.
