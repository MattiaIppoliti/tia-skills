## What it does

`ponytail-debt` greps the repo for `ponytail:` comments and collects them into one ledger. Each row names the file and line, what was simplified, the **ceiling** the shortcut has, and the **trigger** that should make you revisit it. It closes with a count: `N markers, M with no trigger.`

The ledger only works because of a convention upstream in [ponytail](https://aihero.dev/skills-ponytail): a corner cut on purpose leaves a comment naming its own limit, in the form `# ponytail: global lock, per-account locks if throughput matters`. That is the whole mechanism. This skill invents nothing and infers nothing, it reads what the earlier decision wrote down, which is why it can count and a survey of "technical debt" cannot.

## When to reach for it

Type `/ponytail-debt`, or the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) reaches for it when you ask what was deferred or what shortcuts are outstanding.

Reach for it before a release, when picking up a project you left a while ago, or the moment you catch yourself wondering whether some naive implementation is still naive. It reads and reports only. Ask, and it writes the ledger out to a file such as `PONYTAIL-DEBT.md`.

It has nothing to report in a repo where ponytail has never built anything, so it is the second half of a pair rather than a skill you reach for cold.

## The marker, and the rot risk

The leading word is **trigger**. A ledger row without one is the finding, and the skill tags it `no-trigger`.

That tag is the point of the whole skill. "Global lock here" is a note. "Global lock here, move to per-account locks if throughput matters" is a decision with a condition attached, and a condition can be checked. The first one has no way to ever come due, so it is the row that quietly turns a deferral into the permanent shape of the code. The count at the bottom of the ledger separates the two deliberately: `12 markers, 4 with no trigger` tells you that a third of your deferrals cannot expire.

The scan is a grep over comment prefixes, `(#|//) ?ponytail:`, skipping `node_modules`, build output, and `.git`. Requiring the comment prefix is what keeps prose that merely mentions the convention, this page included, out of your ledger. Add your stack's prefixes if it uses others. Wanting an owner per row is one more flag: `git blame -L<line>,<line>`.

## Common questions

**I ran it and got nothing.**
Then the ledger is empty and that is the honest answer. The markers only exist where [ponytail](https://aihero.dev/skills-ponytail) was active and chose to cut a corner with a real ceiling, and it is told to mark only those, not every simplification. An empty ledger on a repo that has never run ponytail means the skill worked.

**Why not just use TODO comments?**
Nothing stops you, but a `TODO` names a wish and a `ponytail:` marker names a limit and a condition. The ledger is only countable because the convention is structured: pull the ceiling from one half of the comment, the trigger from the other. A wall of `TODO: fix this properly` gives you a number with nothing behind it.

**Should the ledger be committed?**
Ask for the file when you want to hand the list to someone or take it into a planning conversation, and skip it otherwise. The comments in the code are the source of truth, and a committed `PONYTAIL-DEBT.md` is a second copy that goes stale the moment someone fixes a shortcut without regenerating it. Regenerating is one command.

## It's working if

- Every row carries both halves, a ceiling and a trigger, and reads as a decision rather than a regret.
- The `no-trigger` count is a number you can act on: each one is a comment to go back and finish, not a line to delete.
- Rows leave the ledger over time, because a trigger fired and the shortcut got upgraded. A ledger that only grows means the triggers are not being checked.
- Nothing in it surprises you. A row you have no memory of writing is usually the marker doing exactly the job it was left for.

## Where it fits

A reach-for-it-anytime standalone, and the closing half of a loop: [ponytail](https://aihero.dev/skills-ponytail) cuts corners and marks them, this collects the marks. Its other neighbour is [ponytail-audit](https://aihero.dev/skills-ponytail-audit), which asks the opposite question about the same repo, what is here that shouldn't be, where this one asks what was left out on purpose. Vendored from [ponytail](https://github.com/DietrichGebert/ponytail) rather than written here. When you are unsure which skill or flow fits a task, [ask-matt](https://aihero.dev/skills-ask-matt) routes you over the whole set.
