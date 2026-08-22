---
name: ponytail-audit
description: 'Whole-repo audit for over-engineering. Like ponytail-review, but scans the entire codebase instead of a diff: a ranked list of what to delete, simplify, or replace with stdlib/native equivalents. Use when the user says "audit this codebase", "audit for over-engineering", "what can I delete from this repo", "find bloat", or invokes /ponytail-audit. One-shot report, does not apply fixes.'
---

ponytail-review, repo-wide. Scan the whole tree instead of a diff. Rank
findings biggest cut first.

## Tags

Same as ponytail-review:

- `delete:` dead code, unused flexibility, speculative feature. Replacement: nothing.
- `stdlib:` hand-rolled thing the standard library ships. Name the function.
- `native:` dependency or code doing what the platform already does. Name the feature.
- `yagni:` abstraction with one implementation, config nobody sets, layer with one caller.
- `shrink:` same logic, fewer lines. Show the shorter form.

## Hunt

Deps the stdlib or platform already ships, single-implementation interfaces,
factories with one product, wrappers that only delegate, files exporting one
thing, dead flags and config, hand-rolled stdlib.

## Output

One line per finding, ranked: `<tag> <what to cut>. <replacement>. [path]`.
End with `net: -<N> lines, -<M> deps possible.` Nothing to cut: `Lean already. Ship.`

## Boundaries

Scope: over-engineering and complexity only. Correctness bugs, security holes,
and performance are explicitly out of scope. Route them to a normal review
pass. Lists findings, applies nothing. One-shot.
"stop ponytail-audit" or "normal mode" to revert.

## Provenance

Vendored from [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) (MIT). The tags, hunt list, and output format are upstream's, unchanged; only the frontmatter is flattened to this repo's model-invoked convention (see [`.agents/invocation.md`](../../../.agents/invocation.md)).

One known weakness, kept rather than patched so this stays a clean vendored copy: `## Hunt` says what to look for but never how to confirm a `delete:` claim, so a symbol used only by tests can be reported as having no callers. Upstream [issue #679](https://github.com/DietrichGebert/ponytail/issues/679) measured 8 of 31 findings invalid on a real repo. Grep the whole tree, tests and fixtures and string references included, before acting on any `delete:` line.
