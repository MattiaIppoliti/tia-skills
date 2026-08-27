## What it does

`audit-data-intensive-repo` reads a repository as a data system. It hunts for risks in records of truth, atomicity, delivery, freshness, capacity, and recovery, then reports them in risk order.

It stays read-only unless you ask for fixes. Every finding needs file-backed evidence, a failure scenario, a consequence, and a way to prove the fix. Missing production settings stay unknown rather than turning into a confident diagnosis.

## When to reach for it

Type `/audit-data-intensive-repo`, or the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) reaches for it when you want an evidence-backed data architecture review of a repository.

Use it when the risk is in how data moves or fails, not only in a changed diff.

| Question | Skill |
| --- | --- |
| Where can this repository lose, duplicate, or misread data | `audit-data-intensive-repo` |
| Does this diff meet its spec and repo rules | [code-review](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/code-review.md) |
| What bottleneck limits a known production path | [scale-data-intensive-system](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/scale-data-intensive-system.md) |
| What can we delete from the whole repository | [ponytail-audit](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ponytail-audit.md) |

## Tags, hunt, output

The skill uses six tags: `truth:`, `atomicity:`, `delivery:`, `freshness:`, `capacity:`, and `recovery:`. It traces a critical write and read, then emits one compact line per finding with its severity, repository evidence, failure scenario, smallest remediation, and validation. It ends with the production metric, configuration, or runbook needed to close each material unknown.

## Evidence first

The audit makes three kinds of claim: observed, inferred, and unknown. That split matters. A migration can prove the existence of an index. It cannot prove that production traffic uses it. A client setting can suggest stale reads. It cannot prove the cloud service has the same setting.

The skill walks a critical read and write through a bad day. The response times out after a commit. The same message arrives twice. A replica lags. A worker pauses, wakes up, and acts on old knowledge. A derived index corrupts and needs a rebuild. The findings should come from those paths, not a generic list of advice.

## Common questions

**Can it audit a managed database when the deployment config is not in the repo?**

It can audit the client code and mark the server-side guarantee unknown. The report should name the setting, metric, or runbook needed to close that gap.

**Will it rewrite the code?**

No. It produces a ranked report. Ask for a fix in a later task if you want changes.

## It's working if

- Each finding links to the code or config that supports it.
- The report explains what happens under a specific timeout, retry, concurrent write, lag, or recovery event.
- The report shows what it could not prove from the repository.
- The first remediation protects correctness and recovery before it adds capacity.

## Where it fits

This is a reach-for-it-anytime repository review. It calls [data-intensive-foundations](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/data-intensive-foundations.md) for the underlying rules, and it can hand a measured bottleneck to [scale-data-intensive-system](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/scale-data-intensive-system.md). For a change-focused review, use [code-review](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/code-review.md). [ask-mattia](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ask-mattia.md) maps the whole set.
