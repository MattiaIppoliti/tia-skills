## What it does

`design-data-intensive-system` turns a workload and a set of invariants into a buildable data-system design. It covers the data model, records of truth, read and write paths, capacity, failure behavior, and the next growth trigger.

It designs the smallest system that meets the stated need. It does not reach for sharding, streaming, another database, or a second region because the request says "scale."

## When to reach for it

Type `/design-data-intensive-system`, or the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) reaches for it when you are designing a new backend or making a major data architecture decision.

Use the skill before implementation, while the expensive choices remain cheap to change.

| Situation | Skill |
| --- | --- |
| A new system or a large data architecture change | `design-data-intensive-system` |
| An existing system is slow or hitting a limit | [scale-data-intensive-system](https://aihero.dev/skills-scale-data-intensive-system) |
| You need file-backed evidence about the current implementation | [audit-data-intensive-repo](https://aihero.dev/skills-audit-data-intensive-repo) |
| You only need to compare a data-system trade-off | [data-intensive-foundations](https://aihero.dev/skills-data-intensive-foundations) |

## The design has to pay its rent

Each component needs a job, an owner for its data, a scaling limit, and a recovery story. If it cannot name those things, it does not belong in the diagram.

The skill works from an invariant outward. "A user gets one seat" tells you more than "we need high consistency." It points to the records that must change together, the conflict that must lose, and the failure cases that need a test.

## Common questions

**Should I choose the database first?**

No. Start with the reads, writes, relationships, retention, latency target, and failure cases. The product choice falls out of that work, or at least gets much smaller.

**What if traffic numbers are rough?**

Use a range, show the arithmetic, and mark the input as an assumption. The skill asks for a design that can be tested and changed, not a made-up forecast.

## It's working if

- The design names the authoritative store and every derived copy.
- Each important invariant has a transaction, coordination, or repair plan behind it.
- The capacity model shows both the next limit and what will trigger the next change.
- A rollout can move forward and back without losing data or leaving two records of truth.

## Where it fits

This is the design step before a build. It calls [data-intensive-foundations](https://aihero.dev/skills-data-intensive-foundations) for the shared rules, then can feed a spec and implementation flow. Use [audit-data-intensive-repo](https://aihero.dev/skills-audit-data-intensive-repo) when the job starts with an existing codebase. [ask-matt](https://aihero.dev/skills-ask-matt) maps the wider flow.
