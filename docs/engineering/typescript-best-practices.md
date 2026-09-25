## What it does

`typescript-best-practices` gives TypeScript rules for modeling valid data, parsing untrusted input, narrowing safely, and keeping APIs honest. Its defining constraint is constructive modeling: a type should rule out illegal states where that improves ordinary code.

## When to reach for it

Type `/typescript-best-practices`, or the agent reaches for it automatically while editing TypeScript. Reach for it when a cast, `any`, optional-field bag, or boundary parse looks tempting.

## Constructive modeling

Use discriminated unions, branded values, tuple shapes, and exhaustive switches when they represent a genuine invariant. Keep a simpler total type when the stronger one only makes safe code harder to write.

## It's working if

- Invalid combinations no longer reach ordinary application code.
- External data is parsed once at the boundary, not asserted throughout the codebase.
- Adding a variant creates a compiler error at every incomplete switch.

## Where it fits

`typescript-best-practices` is a model-invoked vocabulary layer for TypeScript work. Pair it with [tdd](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/tdd.md) for runtime behavior and [code-review](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/code-review.md) for a diff review. [ask-mattia](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ask-mattia.md) provides the map.
