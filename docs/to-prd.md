Install this skill:

```bash
npx skills add mattpocock/skills skill=to-prd -y -g
```

Source: [mattpocock/skills/to-prd](https://github.com/mattpocock/skills/tree/main/to-prd)

## What it does

`to-prd` turns the current conversation context and codebase understanding into a product requirements document.

The important constraint is that it does not interview the user again. It synthesizes what is already known.

## What the PRD includes

The generated PRD includes:

- problem statement
- solution
- extensive numbered user stories
- implementation decisions
- testing decisions
- out-of-scope items
- further notes

The skill also asks the agent to sketch the major modules that need to be built or modified.

## Deep modules

`to-prd` actively looks for deep module opportunities.

A deep module hides meaningful complexity behind a small, stable, testable interface. That matters for agentic development because a good interface gives tests something durable to target.

## How it fits the workflow

```txt
grill-with-docs → to-prd → to-issues → tdd
```

Use `to-prd` after the plan and domain language have been resolved. Then use `to-issues` to break the PRD into tracer-bullet implementation issues.

## Pairs well with

- [grill-with-docs](https://aihero.dev/skills-grill-with-docs), to make sure the context is precise before the PRD is written
- [to-issues](https://aihero.dev/skills-to-issues), to turn the PRD into implementation tickets
- [tdd](https://aihero.dev/skills-tdd), to implement the resulting issues one behavior at a time
