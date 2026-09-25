## What it does

`architect` turns a non-trivial change into a caller-first design: interfaces, ownership, invariants, failure behavior, and a test plan. It requires a sketch before implementation, and treats repeated friction during implementation as evidence to redesign rather than accumulate workarounds.

## When to reach for it

You invoke this by typing `/architect`, and the agent won't reach for it on its own. Reach for it when a change crosses module boundaries or the first coding decision would make later options expensive. For an experiment that answers one narrow design question, use [prototype](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/prototype.md) instead.

## The caller comes first

The intended caller usage comes before types and modules. This prevents an internal implementation detail from becoming the public contract by accident.

## It's working if

- A reader can tell who owns state and what each caller may assume.
- The chosen shape has a concrete rejected alternative and a reason it lost.
- Tests can be named before the implementation bodies are filled in.

## Where it fits

`architect` is a reach-for-it-anytime design step before implementation. It uses [why](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/why.md) when history constrains the design, and [codebase-design](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/codebase-design.md) for module depth. [ask-mattia](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ask-mattia.md) maps the broader flow.
