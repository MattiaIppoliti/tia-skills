# Productivity

General workflow tools, not code-specific.

## User-invoked

Reachable only when you type them (Claude Code: `disable-model-invocation: true`; Codex: `policy.allow_implicit_invocation: false` in `agents/openai.yaml`).

- **[grill-me](./grill-me/SKILL.md)**: Get relentlessly interviewed about a plan or design until every branch of the design tree is resolved.
- **[handoff](./handoff/SKILL.md)**: Compact the current conversation into a handoff document so another agent can continue the work.
- **[teach](./teach/SKILL.md)**: Explain a system, change, or concept so a person understands what it does and why it has that shape.
- **[technical-writing](./technical-writing/SKILL.md)**: Write or review docs and engineering prose that survive a tired reader's first pass.
- **[to-questionnaire](./to-questionnaire/SKILL.md)**: Turn a decision you can't answer alone into a Markdown questionnaire for the one person who can (filled in async, or together over a meeting).
- **[wait-what](./wait-what/SKILL.md)**: Fire this the moment a message doesn't land. The agent re-pitches it with the context you're missing, in plain English, using your `CONTEXT.md` vocabulary.

## Model-invoked

Model- or user-reachable (rich trigger phrasing so the model can reach for them).

- **[excalidraw-diagram](./excalidraw-diagram/SKILL.md)**: Create editable overall architecture maps, module diagrams and workflows with verified local exports.
- **[caveman](./caveman/SKILL.md)**: Set a concise response style with six intensity levels, while preserving technical detail and switching to full clarity when compression could mislead.
- **[grilling](./grilling/SKILL.md)**: Interview the user relentlessly about a plan, decision, or idea until every branch of the design tree is resolved.
- **[unslop](./unslop/SKILL.md)**: Cut the AI tells out of a draft: puffery, AI vocabulary, em dashes, filler, hedging, passive voice, then put a human voice back in.
- **[writing-for-agents](./writing-for-agents/SKILL.md)**: Writing documents for agents: skills, AGENTS.md/CLAUDE.md, and any doc an agent reaches by a pointer.
