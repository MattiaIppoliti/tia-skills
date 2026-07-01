Quickstart:

```bash
npx skills add mattpocock/skills --skill=to-prd
```

```bash
npx skills update to-prd
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/engineering/to-prd)

## What it does

`to-prd` turns the current conversation and your codebase understanding into a product requirements document, then publishes it to your issue tracker.

The load-bearing constraint: it does **not** interview you again. By the time you reach for it, the alignment work is done — `to-prd` synthesises what is already known rather than asking a fresh round of questions.

## When to reach for it

You invoke this by typing `/to-prd` — the agent won't reach for it on its own.

Reach for it once a change has been talked through and the domain language is settled, and you want that shared understanding written down as a spec before any code is written. If you *haven't* aligned yet, grill first — for that, use [grill-with-docs](https://aihero.dev/skills-grill-with-docs). To split the finished PRD into tickets, use [to-issues](https://aihero.dev/skills-to-issues).

## Prerequisites

`to-prd` publishes into your issue tracker, so [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) must have configured the tracker and triage labels for this repo first. It applies the `ready-for-agent` label itself — no separate triage pass needed.

## What the PRD includes

- problem statement
- solution
- extensive numbered user stories
- implementation decisions
- testing decisions
- out-of-scope items
- further notes

## Deep modules

Before writing the PRD, `to-prd` sketches the **seams** at which the feature will be tested and looks for **deep module** opportunities — a lot of functionality hidden behind a small, stable interface. It prefers existing seams to new ones and the highest seam possible, ideally just one across the whole change.

That matters for agentic development: a good interface gives tests something durable to target, so the code underneath can change without the tests moving. If you see the words _seam_ and _deep module_ coming back at you as it works, the skill is doing its job.

## Where it fits

`to-prd` is a step in the main build chain:

```txt
grill-with-docs → to-prd → to-issues → tdd
```

Reach for it after the plan and domain language are resolved, and before you break the work into implementation tickets. Its key neighbours are [grill-with-docs](https://aihero.dev/skills-grill-with-docs), which sharpens the context so the PRD is precise, and [to-issues](https://aihero.dev/skills-to-issues), which turns the PRD into independently-grabbable issues for [tdd](https://aihero.dev/skills-tdd) to implement. When you're unsure which skill or flow fits, [ask-matt](https://aihero.dev/skills-ask-matt) routes you.
