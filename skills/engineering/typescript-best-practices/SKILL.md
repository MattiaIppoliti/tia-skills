---
name: typescript-best-practices
description: "TypeScript design and safety rules. Use when reading or editing .ts or .tsx files, especially when modeling data, parsing boundaries, or resolving type errors."
---

# TypeScript best practices

Make invalid states hard to construct and validate untrusted data where it enters the program. Types should express the program's real guarantees, not hide uncertainty.

| Rule | Practice |
| --- | --- |
| Variants | Use discriminated unions with a literal `kind`; do not use bags of optional fields. |
| Domain values | Brand primitives when values of the same base type must not mix. Validate once at construction. |
| Construction | Express constraints in the type where practical, such as `[T, ...T[]]` for non-empty arrays. |
| External data | Accept `unknown`, parse it at the boundary, and use named domain types inside. |
| Assertions | Avoid `any` and `as`. Narrow with a discriminant, `in`, `typeof`, `instanceof`, or a truthful guard. |
| Exhaustiveness | Put `const exhaustive: never = value` in the default branch of a discriminant switch. |
| Inference | Prefer `satisfies` to `as`; prefer `Pick`, `Omit`, `Parameters`, `ReturnType`, `Awaited`, and `typeof` before a duplicate interface. |
| APIs | Prefer object arguments when parameter order is not obvious. Keep positional arguments only on proven hot paths. |
| Tests and diagnostics | Test real behavior when possible and emit structured diagnostics rather than shipping `console.log`. |

Strengthen a type only when the looser type forces a non-null assertion, cast, or impossible-state branch. A type that makes ordinary code needlessly awkward is not a better model.
