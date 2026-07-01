Quickstart:

```bash
npx skills add mattpocock/skills --skill=grilling
```

```bash
npx skills update grilling
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/productivity/grilling)

## What it does

`grilling` is the relentless interview that stress-tests a plan or design before you build it. It walks down the design tree branch by branch, resolving the dependencies between decisions one at a time until you and the agent share the same understanding.

The load-bearing constraint: it asks **one question at a time** and waits for your answer before the next — never a bulk list, which is bewildering. Each question comes with the agent's own recommended answer, and any question the codebase can settle it explores instead of asking you.

## When to reach for it

Type `/grilling`, or the agent reaches for it automatically when a task fits — this is the underlying primitive, not a user-only entry point.

Reach for it when a plan or design still has soft spots and you want them surfaced before code is written. In practice you usually invoke it through one of its two wrappers rather than by name: for a plain grilling session use [grill-me](https://aihero.dev/skills-grill-me); to have the session also write ADRs and a glossary as it goes, use [grill-with-docs](https://aihero.dev/skills-grill-with-docs).

## The design tree

The mental model is a **design tree**: every plan branches into decisions, and decisions depend on each other. `grilling` descends that tree one node at a time, so an early answer can reshape which questions come next. That is why the questions arrive singly and in dependency order — a firehose of parallel questions loses the structure that makes the interview converge on a shared understanding.

## Where it fits

`grilling` is a **primitive** — the interview engine that [grill-me](https://aihero.dev/skills-grill-me) and [grill-with-docs](https://aihero.dev/skills-grill-with-docs) both run. Those two are the user-invoked front doors; `grilling` is the shared technique underneath, and it also opens the main build chain, sharpening context before [to-prd](https://aihero.dev/skills-to-prd) writes the spec. When you're unsure which entry point fits, [ask-matt](https://aihero.dev/skills-ask-matt) routes you.
