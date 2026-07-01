Quickstart:

```bash
npx skills add mattpocock/skills --skill=to-plan
```

```bash
npx skills update to-plan
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/engineering/to-plan)

## What it does

`to-plan` turns a PRD, spec, or the current conversation into a **sequential** plan — an ordered list of phases you work through one at a time, in a fresh context per phase.

Every phase is a **tracer bullet** — a thin *vertical* slice that cuts through all integration layers end-to-end (schema, API, UI, tests), never a horizontal slice of one layer. A completed slice is demoable or verifiable on its own, and is sized to fit a single fresh context window.

## When to reach for it

You invoke this by typing `/to-plan` — the agent won't reach for it on its own.

Reach for it once you have an agreed plan or a written spec and you want it turned into a sequence of phases you'll build **by hand, one at a time**. Point it at the conversation, or pass a PRD or issue reference and it reads that first. If the change hasn't been written up as a spec yet, produce one first — for that, use [to-prd](https://aihero.dev/skills-to-prd).

## Sequential, not parallel

`to-plan` is the sequential, HITL sibling of [to-issues](https://aihero.dev/skills-to-issues). Both slice work into tracer bullets, but they're for different workflows:

- **`to-issues`** produces *independently-grabbable* issues, so parallel agents can pick them up at once (it applies the ready-for-agent label).
- **`to-plan`** produces one *ordered sequence* you drive yourself, phase by phase, staying in the loop — no ready-for-agent label.

## Publishes to your configured tracker

Like the other skills, `to-plan` publishes through the tracker [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) configured, and it adapts the shape to that tracker:

- **Local files** → a single sequential `plan.md` in the repo root, all phases in order.
- **A real issue tracker (GitHub, Linear)** → a parent issue for the whole plan, with one sub-issue per phase, in order — using the platform's native sub-issue relationship where it has one, otherwise sequential issues each blocked by the previous.

## Vertical slices, not horizontal ones

The whole skill turns on one distinction. A **horizontal** slice ships one layer of the change — all the schema, or all the API — and nothing works until every layer lands. A **vertical** slice, the tracer bullet, ships one narrow path through *every* layer at once, so it can be demoed the moment it's done.

Before slicing, `to-plan` looks for prefactoring — "make the change easy, then make the easy change" — and orders that work first. It then quizzes you on the breakdown (granularity, ordering, what to merge or split) before publishing anything.

## Where it fits

`to-plan` is the sequential branch of the main build chain:

```txt
grill-with-docs → to-prd → to-plan → implement → code-review
```

It sits between [to-prd](https://aihero.dev/skills-to-prd), which hands it a settled spec to slice against, and [implement](https://aihero.dev/skills-implement), which builds each phase, driving [tdd](https://aihero.dev/skills-tdd) internally to write the tests test-first, before its [code-review](https://aihero.dev/skills-code-review) pass. Work one phase per fresh context, clearing between them. When you're unsure which skill or flow fits, [ask-matt](https://aihero.dev/skills-ask-matt) routes you.
