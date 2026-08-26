## What it does

`scale-data-intensive-system` finds the first measured limit in a live or existing data system, then returns a ranked list of the smallest changes that can move it. It looks at request paths, query plans, resource saturation, queueing, data skew, replication lag, and recovery work.

It refuses to prescribe a topology from the word "scale." A cache, replica, queue, or shard only earns its place after the baseline says what is actually full, slow, or blocked.

## When to reach for it

Type `/scale-data-intensive-system`, or the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) reaches for it when an application must handle more requests, data, tenants, events, or analytical work.

Use it for the existing system. Use a sibling when the work starts elsewhere.

| Situation | Skill |
| --- | --- |
| A known system needs more capacity or lower tail latency | `scale-data-intensive-system` |
| The main problem is a bug or a regression | [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs) |
| The system is new and has no implementation to measure | [design-data-intensive-system](https://aihero.dev/skills-design-data-intensive-system) |
| You need a broad codebase risk assessment | [audit-data-intensive-repo](https://aihero.dev/skills-audit-data-intensive-repo) |

## Baseline, hunt, output

The skill names the growing load and traces a critical read and write before it hunts. It separates observed limits from hypotheses and unknowns. Its output gives every candidate a tag, evidence, smallest change, correctness or recovery cost, validation, and rollback. It ends with the metric threshold that triggers later work.

## The baseline is the argument

The baseline keeps the work honest. It pairs throughput and latency with the resource that is filling up, then checks the distribution behind it. A full CPU is different from a hot tenant. Both can produce a slow endpoint, but they need different fixes.

The skill leaves a trigger with every later step. "Shard at some point" is useless. "Split when the largest tenant holds 40% of writes for an hour" can drive an actual decision.

## Common questions

**We do not have production metrics. Can we still use it?**

Yes. Build a representative load test, keep the input range visible, and treat the result as a hypothesis. Do not dress a guess up as a capacity number.

**Does it always start with indexes?**

No. It starts with the measured limit. A query plan may point at an index. A backlog may point at consumer capacity. A hot key may rule both out.

## It's working if

- The plan names the resource or coordination point that blocks the target.
- The before and after runs use the same data shape, concurrency, and request mix.
- Each change has an invariant check, an abort threshold, and a rollback path.
- Later infrastructure has a measurable trigger rather than a calendar date.
- The first line in the report names the first limit, not a favorite technology.

## Where it fits

This is a reach-for-it-anytime maintenance skill. It calls [data-intensive-foundations](https://aihero.dev/skills-data-intensive-foundations) for the trade-offs behind each option. Use [audit-data-intensive-repo](https://aihero.dev/skills-audit-data-intensive-repo) before it when nobody has mapped the system yet. [ask-matt](https://aihero.dev/skills-ask-matt) maps the rest of the engineering skills.
