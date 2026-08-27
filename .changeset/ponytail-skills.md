---
"tia-skills": minor
---

Add four model-invoked engineering skills vendored from [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) (MIT), all aimed at building and keeping less code:

- `ponytail`: a mode, not a step. Climbs a ladder before writing anything and stops at the first rung that holds (does this need to exist, is it already here, stdlib, native platform, installed dependency, one line), at `lite`, `full`, or `ultra`. Stays on for the rest of the session.
- `ponytail-review`: reviews a diff for over-engineering only, one line per finding tagged `delete:`, `stdlib:`, `native:`, `yagni:`, or `shrink:`, closing with `net: -N lines possible`. Correctness, security, and performance are explicitly out of scope, so it complements `code-review` rather than competing with it.
- `ponytail-audit`: the same hunt across the whole tree, ranked biggest cut first.
- `ponytail-debt`: harvests every `ponytail:` shortcut comment into a ledger, each row carrying its ceiling and its upgrade trigger, and tags the rows with no trigger, since those are the ones that rot.

Upstream's rules are unchanged. Three edits: frontmatter flattened from folded YAML to this repo's model-invoked convention, five sentences in `ponytail` rewritten to drop em-dashes per `CLAUDE.md`, and upstream's pointer to the Caveman skill dropped because this repo does not ship it. Each skill carries a `## Provenance` section.

Only the skill text is vendored, not upstream's Node lifecycle hooks, statusline, or mode flag file. So `ponytail` does not activate itself at session start, it applies from the moment it is invoked, and there is no machine-global flag for concurrent sessions in different repos to overwrite.

Two of upstream's six skills are deliberately absent. `ponytail-help` documents an install flow, config file, and env var this repo does not ship, and `ponytail-gain` prints benchmark medians that upstream's own README has since superseded.

`ponytail-audit`'s known weakness is kept rather than patched, so the vendored copy stays a clean sync: its `## Hunt` says what to look for but never how to confirm a `delete:` claim, and upstream measured 8 of 31 findings invalid on a real repo. The caveat is recorded in the skill's provenance note and in its docs page instead of in the rules.

Registers all four everywhere a promoted skill has to appear: `plugin.json`, the top-level README, the engineering bucket README, a docs page each, and a new **Lazy mode** section in the `ask-mattia` router that states the boundaries against `code-review` (correctness versus complexity) and `improve-codebase-architecture` (what to deepen versus what to delete).
