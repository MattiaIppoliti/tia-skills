---
name: principle-redesign-from-first-principles
description: "Apply when a new requirement changes an existing design. Rebuild the shape as if the requirement had been known from the start instead of attaching another exception."
disable-model-invocation: true
---

# Redesign from first principles

When a requirement no longer fits the current shape, do not add a special case just because the existing code is familiar. Reconsider the design as if the new requirement had been present on day one.

1. Read the affected types, callers, tests, documentation, and configuration as one design.
2. State the new requirement and the invariant it changes.
3. Sketch the smallest coherent design you would build from scratch with that invariant.
4. Compare it with an incremental patch. Prefer the redesign when the patch spreads knowledge of the exception across boundaries.
5. Implement in safe increments, then update every surviving reference: types, tests, examples, documentation, and rationale.

The result should look intentional. A new reader should not need to reconstruct the old design in order to understand the new requirement.
