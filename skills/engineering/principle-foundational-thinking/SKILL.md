---
name: principle-foundational-thinking
description: "Apply before non-trivial implementation when code would otherwise commit to an untested shape. Establish the contracts, invariants, and boundaries before filling in details."
disable-model-invocation: true
---

# Foundational thinking

Build the foundations that make later code unsurprising: the domain terms, ownership boundaries, public contract, invariants, and failure behavior. Do this before optimising bodies or accumulating implementation detail.

1. Name the outcome and the constraints that cannot change.
2. Identify who owns each piece of state and each decision.
3. Write the smallest public interface that callers need.
4. Specify invalid states, failure behavior, and the evidence that will show the design works.
5. Implement against that contract. Revise the contract openly if evidence disproves it.

The goal is not a large design document. It is a stable enough shape that the implementation can be read as filling in a decision already made.
