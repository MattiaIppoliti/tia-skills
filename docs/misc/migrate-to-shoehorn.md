Quickstart:

```bash
npx skills add mattpocock/skills --skill=migrate-to-shoehorn
```

```bash
npx skills update migrate-to-shoehorn
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/misc/migrate-to-shoehorn)

## What it does

`migrate-to-shoehorn` sweeps a test suite for `as` type assertions and replaces them with `@total-typescript/shoehorn` helpers, so a test can pass just the properties it cares about while TypeScript stays happy.

This is **test code only**. Shoehorn exists to fake partial data behind a type-safe front; it must never touch production code, where a real value is always required.

## When to reach for it

Type `/migrate-to-shoehorn`, or the agent reaches for it automatically when a task fits — it triggers when you mention shoehorn, want to strip `as` out of tests, or need to hand a function partial test data.

Reach for it when a test is forced to fabricate a whole object — every header, every cookie, twenty more fields — just to satisfy one property the assertion actually reads, or when `as unknown as Type` is smuggling deliberately-wrong data past the compiler for an error case.

## The partial idea

The word to think with is **partial**. A test rarely needs a complete object; it needs the one or two fields under test. `as` forces you to either build the whole thing or lie to the compiler. Shoehorn lets you supply the *partial* and infers the rest:

- `fromPartial()` — pass the fields that matter, still type-checked against the real shape.
- `fromAny()` — pass intentionally wrong data for error paths, keeping autocomplete.
- `fromExact()` — force a full object when you want no gaps.

The migration is mechanical: `as Type` becomes `fromPartial()`, `as unknown as Type` becomes `fromAny()`, imports get added, and a type check confirms the swap held.

## It's working if

- Test files no longer carry `as Type` or `as unknown as Type` on faked data.
- Each migrated call passes only the properties the test reads, wrapped in `fromPartial` or `fromAny`.
- The type check still passes, and no shoehorn import leaks into production source.

## Where it fits

This is a reach-for-it-anytime standalone — a one-shot cleanup you run over a test file or suite whenever `as` has crept in. It sits naturally alongside [tdd](https://aihero.dev/skills-tdd), which is where those test files get written in the first place and where partial test data pays off most. When you're unsure which skill fits, [ask-matt](https://aihero.dev/skills-ask-matt) routes you.
