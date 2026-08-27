## What it does

`ponytail-review` reviews a diff for one thing only: unnecessary complexity. Every finding is a single line naming a location, what to cut, and what replaces it, and the report closes with `net: -N lines possible`. Nothing to cut gets you `Lean already. Ship.` and it stops.

Correctness, security, and performance are explicitly out of scope. That exclusion is the whole design rather than an oversight: a reviewer asked to weigh a bug against a redundant abstraction will keep finding the bug, and complexity survives every review it shares with something scarier. This skill can only ever say "delete that", so it does.

## When to reach for it

Type `/ponytail-review`, or the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) reaches for it automatically when you ask whether something is over-engineered or what you can delete.

It reads a diff, so the natural moment is the same one you would run any review at: before the commit, on the branch, on the PR. Reach for it on top of a normal review pass rather than in place of one.

| What you want to know | Skill |
| --- | --- |
| What can I delete from this diff | `ponytail-review` |
| Does this diff follow our standards and do what the spec asked | [code-review](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/code-review.md) |
| What can I delete from this whole repo | [ponytail-audit](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ponytail-audit.md) |

## Five tags, one line each

The leading idea is the **tag**: every finding is classified as one of five cuts, and the tag decides what the replacement has to be.

| Tag | The finding | The replacement |
| --- | --- | --- |
| `delete:` | Dead code, unused flexibility, a speculative feature | Nothing |
| `stdlib:` | Something hand-rolled that the standard library ships | Name the function |
| `native:` | A dependency or code doing what the platform already does | Name the feature |
| `yagni:` | An abstraction with one implementation, config nobody sets, a layer with one caller | Inline it |
| `shrink:` | Same logic, fewer lines | Show the shorter form |

The format is what makes it usable. Compare the review this skill refuses to write, "this EmailValidator class might be more complex than necessary, have you considered whether all these validation rules are needed at this stage?", against the one it does: `L12-38: stdlib: 27-line validator class. "@" in email, 1 line, real validation is the confirmation mail.` The second one is actionable in the time it takes to read, and it names the number the first one hid.

It lists and never applies. You get the delete-list, you decide what goes.

## Common questions

**Does this replace `code-review`?**
No, and the two barely overlap. [code-review](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/code-review.md) runs two axes, Standards and Spec, as parallel sub-agents, and treats correctness as its job. `ponytail-review` treats correctness as out of scope and hunts only complexity. A diff can pass one and fail the other badly, so run both on the same diff.

**Will it try to delete my tests?**
Not the ones that matter. The skill carries an explicit carve-out: a single smoke test or `assert`-based self-check is the ponytail minimum, not bloat, and is never flagged. Test suites that mirror every method one-to-one are a different matter, and worth noting that upstream has an open gap here: there is no pass for the machine-shaped test brittleness (fixture-name branches in production code, snapshot-only or mock-only assertions) that tends to arrive alongside over-engineering.

**It missed the over-defensive error handling.**
Known, and it is a real hole rather than a judgement call. The five tags have no home for a broad `except Exception` wrapper or a guard clause chain defending against states that cannot happen, so those findings fall between the cracks. If that is what you are hunting, say so in the prompt rather than expecting the tags to catch it.

**Does running it turn ponytail mode on?**
Not in this repo. Upstream, invoking a review command could latch the session's mode flag; that machinery is not vendored here, so a review is a one-shot report and leaves your mode alone. To switch the stance on for building, invoke [ponytail](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ponytail.md) directly.

## It's working if

- Every finding fits on one line and names its replacement. A paragraph of hedging about whether an abstraction might be premature means the format has slipped.
- The report ends in a number. `net: -N lines possible` is the only score the skill keeps.
- It tells you to ship. A lean diff coming back as `Lean already. Ship.` is the skill working, not the skill failing to find anything.
- The findings are things you can act on without opening the file to work out what was meant.

## Where it fits

A reach-for-it-anytime standalone that sits beside the review step rather than in it: [implement](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/implement.md) closes out by running [code-review](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/code-review.md), and this is the second pass you add when a diff feels bigger than the change deserved. Its neighbours are [code-review](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/code-review.md), which owns the correctness and spec axes this skill refuses, and [ponytail-audit](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ponytail-audit.md), which is the same hunt widened from a diff to the whole tree. Vendored from [ponytail](https://github.com/DietrichGebert/ponytail) rather than written here. When you are unsure which skill or flow fits a task, [ask-mattia](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ask-mattia.md) routes you over the whole set.
