## What it does

`audit-data-intensive-repo` reads a repository as a data system. It maps records of truth, derived state, critical reads and writes, retries, transactions, queues, caches, migrations, recovery, and the code that binds them together.

It stays read-only unless you ask for fixes. Every finding needs file-backed evidence, a failure scenario, a consequence, and a way to prove the fix. Missing production settings stay unknown rather than turning into a confident diagnosis.

## When to reach for it

Type `/audit-data-intensive-repo`, or the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) reaches for it when you want an evidence-backed data architecture review of a repository.

Use it when the risk is in how data moves or fails, not only in a changed diff.

| Question | Skill |
| --- | --- |
| Where can this repository lose, duplicate, or misread data | `audit-data-intensive-repo` |
| Does this diff meet its spec and repo rules | [code-review](https://aihero.dev/skills-code-review) |
| What bottleneck limits a known production path | [scale-data-intensive-system](https://aihero.dev/skills-scale-data-intensive-system) |
| What can we delete from the whole repository | [ponytail-audit](https://aihero.dev/skills-ponytail-audit) |

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

This is a reach-for-it-anytime repository review. It calls [data-intensive-foundations](https://aihero.dev/skills-data-intensive-foundations) for the underlying rules, and it can hand a measured bottleneck to [scale-data-intensive-system](https://aihero.dev/skills-scale-data-intensive-system). For a change-focused review, use [code-review](https://aihero.dev/skills-code-review). [ask-matt](https://aihero.dev/skills-ask-matt) maps the whole set.
