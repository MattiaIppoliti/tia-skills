---
name: architect
description: "Design a non-trivial change before implementation by sketching its callers, types, boundaries, and failure cases. Use for '/architect', 'architect this', or when coding first would lock in the wrong shape."
disable-model-invocation: true
---

# Architect

Design before implementing. Produce a small, testable sketch of the interface and ownership model, then implement against it. If evidence disproves the sketch, discard it rather than patching around it.

1. Ground the change in the affected code, callers, tests, and constraints. Call the Skill tool with `why` when the existing rationale is a constraint. Call the Skill tool with `codebase-design` for a deep-module and boundary review.
2. State the outcome, invariants, ownership of state, and failure behavior.
3. Write the caller's intended usage first. Derive types, signatures, and a module map from that usage. Leave bodies as pseudocode or `not implemented` where this makes the contract clearer.
4. Consider at least two materially different shapes for a non-trivial design. Compare them by public surface, hidden complexity, invalid states, migration cost, and testability. Do not average incompatible designs.
5. Pick one design and record the rejected alternative that was closest, with the reason it lost.
6. Implement against the sketch. Treat a deviation as evidence: either the requirement was missed, the design is wrong, or the code is overreaching.

Repeated deviations of the same kind, escape hatches such as `any` or casts, leaked implementation rules, or widespread special cases mean the architecture is wrong. Re-ground the problem and redesign from first principles. Do not keep adding compensating layers.

## Output

For a small change, write a usage example, type and signature sketch, invariants, and test plan. For a larger change, add the module map, ownership boundaries, migration plan, and short rationale. The design is a contract for implementation, not a report to admire.
