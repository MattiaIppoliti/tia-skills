## What it does

`data-intensive-foundations` gives an [agent](https://www.aihero.dev/ai-coding-dictionary/agent) a compact vocabulary for data systems. It starts with the record of truth, derived state, invariants, and headroom, then compares storage, replication, sharding, transactions, and data flows against those facts.

It does not choose a vendor or draw an architecture by itself. It stops a system design from turning into a list of fashionable infrastructure.

## When to reach for it

Type `/data-intensive-foundations`, or the agent reaches for it when a data-system decision needs a clear trade-off.

Reach for it when the question is about the shape of a data system. Pick a sibling when the job is narrower.

| Question | Skill |
| --- | --- |
| What trade-offs fit this data workload | `data-intensive-foundations` |
| How should we build a new system | [design-data-intensive-system](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/design-data-intensive-system.md) |
| Why does the current system stop coping with load | [scale-data-intensive-system](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/scale-data-intensive-system.md) |
| What is risky in this repository | [audit-data-intensive-repo](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/audit-data-intensive-repo.md) |

## The useful question

The leading question is simple: "What must stay true when this gets bigger or fails?" That gets to the actual choice. A replica might buy read capacity while making a user's own write stale. A shard might fix a storage ceiling while making a once-simple transaction cross the network. A queue might smooth a spike while delaying the result the user sees.

The answer should name the gain, the bill, and the evidence that would settle an open choice.

## Common questions

**Does this tell me to use a distributed system?**

No. It starts with the smallest topology that meets the requirement. A single node remains a good answer until capacity, availability, or geographic latency says otherwise.

**Do I need to read the book first?**

No. The skill gives the working rules. Read the book when you want the full argument, a precise example, or the detail behind a trade-off.

## It's working if

- You can point to the record of truth and name every cache, index, or view derived from it.
- A recommendation states what it buys, what it costs, and how you would test it.
- Unknown production facts remain visible instead of becoming fake numbers.

## Where it fits

This is a reach-for-it-anytime reference layer. [design-data-intensive-system](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/design-data-intensive-system.md), [scale-data-intensive-system](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/scale-data-intensive-system.md), and [audit-data-intensive-repo](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/audit-data-intensive-repo.md) call it before they make a decision. [ask-mattia](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ask-mattia.md) maps the rest of the set.
