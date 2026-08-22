## What it does

`ponytail-audit` is [ponytail-review](https://aihero.dev/skills-ponytail-review) pointed at a whole repository instead of a diff. It scans the tree for over-engineering and hands back a ranked list, biggest cut first, using the same five tags: `delete:`, `stdlib:`, `native:`, `yagni:`, `shrink:`. The report ends with `net: -N lines, -M deps possible.`

It lists and applies nothing. That separation is deliberate, and it matters more here than on a diff review, because the findings are phrased as flat assertions ("no callers anywhere") over a tree far larger than anyone will re-check by hand. The list is a set of leads to verify, not a work order.

## When to reach for it

Type `/ponytail-audit`, or the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) reaches for it when you ask what you can delete from a repo or where the bloat is.

Reach for it on a codebase you have inherited, or one that grew past the point where you can hold its shape in your head, or when the dependency list has stopped looking like a set of decisions. It is a one-shot survey, so there is no state to keep and nothing to resume.

| The question | Skill |
| --- | --- |
| What can I delete from this repo | `ponytail-audit` |
| What should I deepen in this repo | [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) |
| What can I delete from this diff | [ponytail-review](https://aihero.dev/skills-ponytail-review) |
| What did we already decide to defer | [ponytail-debt](https://aihero.dev/skills-ponytail-debt) |

## The hunt, and why the list needs checking

The **hunt** is the part that differs from the diff review: a named list of shapes to go looking for across the tree. Dependencies the standard library or platform already ships. Interfaces with one implementation. Factories with one product. Wrappers that only delegate. Files exporting one thing. Dead flags and dead config. Hand-rolled standard library.

The gap sits right next to it. The hunt says what to look for and never says how to *confirm* a `delete:` claim, so nothing directs the auditor to grep the whole tree, tests and fixtures and dynamic string references included, before asserting that a symbol has no callers. Someone ran it on a real 7,000-line Python repo and measured the result: 8 of 31 findings were invalid. One reported symbol as having "zero callers" while roughly 35 assertions across three test files, all present in the scanned tree, were calling it. A symbol used only by tests is still used.

Two habits close most of that gap, and neither takes long:

- **Grep for the symbol yourself before you delete it**, across tests, fixtures, config, and string or dynamic references. This is the check the skill never asks for.
- **Note what commit you scanned.** The report reads as current no matter how stale the checkout is. In the measured run above, a tree roughly 15 commits behind origin reported a directory as unreachable that had 8 importers at real `HEAD`.

## Common questions

**How much of the output can I trust?**
Treat it as leads, not conclusions. The one published measurement puts roughly a quarter of findings wrong on a real repo, and the failures skew toward `delete:`, which is also the most destructive tag to act on. The `stdlib:`, `native:`, and `shrink:` findings are cheaper to verify because the replacement is named and you can read it in place.

**Why wasn't the skill fixed, if the gap is known?**
Because it is vendored. The rules here are upstream's, unchanged, so a `git pull` upstream stays a clean sync rather than a merge against local edits. The caveat lives in the docs and in the skill's own provenance note instead of in the rules. Upstream tracks it as [issue #679](https://github.com/DietrichGebert/ponytail/issues/679).

**Isn't this the same as `improve-codebase-architecture`?**
No, and they pull in opposite directions, which is what makes them useful together. [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) looks for **deepening opportunities**, shallow modules that should hold more behaviour behind a smaller interface, and hands you a design problem to grill through. This one looks for code that should not exist and hands you a list. Run the audit first: deleting a module is strictly cheaper than designing it.

**It didn't flag our test suite or our error handling.**
It has no tag for either. Upstream carries open gaps for over-defensive control flow and broad exception wrappers, and separately for machine-shaped test brittleness such as snapshot-only assertions or tests that mirror every method one-to-one. Neither fits the five tags, so neither gets found.

## It's working if

- The list is ranked, and the top entry is genuinely the biggest cut rather than the first file scanned.
- Every line names its replacement, so you can judge it without opening the file.
- The findings you spot-check hold up. If the first two `delete:` lines you grep turn out to have callers, stop and treat the whole list as unverified.
- It ends in a number that includes dependencies, not just lines. Dropping a dependency is the cut that keeps paying.

## Where it fits

Periodic maintenance, in the same slot as [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) and best run just before it, since there is no point designing a better shape for a module that should be deleted. Its other neighbour is [ponytail-review](https://aihero.dev/skills-ponytail-review), the same hunt narrowed to a diff, which is where you want it once the repo is lean and you are trying to keep it that way. Vendored from [ponytail](https://github.com/DietrichGebert/ponytail) rather than written here. When you are unsure which skill or flow fits a task, [ask-matt](https://aihero.dev/skills-ask-matt) routes you over the whole set.
