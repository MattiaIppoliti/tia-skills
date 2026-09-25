## What it does

`principle-foundational-thinking` establishes the contract, ownership, invariants, and failure behavior before implementation fills in details. It requires enough foundation to make code unsurprising, not an oversized design document.

## When to reach for it

You invoke this by typing `/principle-foundational-thinking`, and the agent won't reach for it on its own. Reach for it before non-trivial work when the first implementation would silently choose an interface or state owner.

## The foundation

The public contract follows the outcome and the invariants. Bodies may change while implementation teaches more, but a change to the contract stays visible as a design decision.

## It's working if

- Callers, owners of state, and invalid states are named before implementation spreads.
- A reviewer can tell what evidence will validate the design.
- Later code reads as an implementation of a known contract.

## Where it fits

`principle-foundational-thinking` is a reach-for-it-anytime design principle. Use [architect](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/architect.md) when a concrete design artifact is needed, or [codebase-design](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/codebase-design.md) for module depth. [ask-mattia](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ask-mattia.md) provides the map.
