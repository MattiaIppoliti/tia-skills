---
name: ponytail-debt
description: 'Harvest every `ponytail:` comment in the codebase into a debt ledger, so the deliberate shortcuts and deferrals ponytail leaves behind get tracked instead of rotting into "later means never". Use when the user says "ponytail debt", "what did ponytail defer", "list the shortcuts", "ponytail ledger", or "what did we mark to do later", or invokes /ponytail-debt. One-shot report, changes nothing.'
---

Every deliberate ponytail shortcut is marked with a `ponytail:` comment naming
its ceiling and upgrade path. This collects them into one ledger so a deferral
can't quietly become permanent.

## Scan

Grep the repo for comment markers, skipping `node_modules`, `.git`, and build
output:

`grep -rnE '(#|//) ?ponytail:' .`  (add other comment prefixes if your stack uses them)

Each hit is one ledger row. The comment prefix keeps prose that merely mentions
the convention out of the ledger.

## Output

One row per marker, grouped by file:

`<file>:<line>, <what was simplified>. ceiling: <the limit named>. upgrade: <the trigger to revisit>.`

The convention is `ponytail: <ceiling>, <upgrade path>`, so pull the ceiling
and the trigger straight from the comment. Want an owner per row too? add
`git blame -L<line>,<line>`.

Flag the rot risk: any `ponytail:` comment that names no upgrade path or
trigger gets a `no-trigger` tag, those are the ones that silently rot.

End with `<N> markers, <M> with no trigger.` Nothing found: `No ponytail: debt. Clean ledger.`

## Boundaries

Reads and reports only, changes nothing. To persist it, ask and it writes the
ledger to a file (e.g. `PONYTAIL-DEBT.md`). One-shot. "stop ponytail-debt" or
"normal mode" to revert.

## Provenance

Vendored from [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) (MIT). The scan, the ledger format, and the `no-trigger` tag are upstream's, unchanged; only the frontmatter is flattened to this repo's model-invoked convention (see [`.agents/invocation.md`](../../../.agents/invocation.md)).

The ledger reads `ponytail:` comments, so it only has anything to report in a repo where `ponytail` has been building. On a fresh repo the honest answer is an empty ledger.
