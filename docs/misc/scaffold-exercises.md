Quickstart:

```bash
npx skills add mattpocock/skills --skill=scaffold-exercises
```

```bash
npx skills update scaffold-exercises
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/misc/scaffold-exercises)

## What it does

`scaffold-exercises` reads a course plan and builds the exercise directory tree it describes — numbered sections, numbered exercises, and their `problem/`, `solution/`, and `explainer/` variant folders, each seeded with a stub `readme.md`.

The scaffold is only done when it **passes `pnpm ai-hero-cli internal lint`**. The linter is the contract — folder shape, numeric prefixes, non-empty readmes, no stray `.gitkeep` or `speaker-notes.md`, no broken links. The skill scaffolds, runs the lint, and iterates until it's green rather than leaving you a tree that merely looks right.

## When to reach for it

Type `/scaffold-exercises`, or the agent reaches for it automatically when a task fits — turning a plan into stubbed exercise directories, or setting up a new course section.

Reach for it when you have a plan (section names, exercise names, which variants each needs) and want the skeleton on disk and lint-clean before you write any real content. It only lays down structure and empty-but-valid readmes; the teaching material comes later.

## Prerequisites

The skill writes into an `exercises/` directory and validates with `pnpm ai-hero-cli internal lint`, so run it inside a course repo that has the AI Hero CLI available. Outside that tooling the lint step — the whole point — can't run.

## Lint-passing is the spec

The naming isn't cosmetic: sections are `XX-section-name/`, exercises are `XX.YY-exercise-name/` in dash-case, and every variant folder carries a non-empty `readme.md`. Those rules exist because the linter enforces them, and the linter is what downstream course tooling relies on. So the mental model is inverted from "make a folder tree" to "make a tree the linter accepts" — default new stubs to `explainer/`, keep readmes real (a single title line counts), and let the lint pass be the definition of done.

Renumbering later follows the same rule: use `git mv` so history survives, then re-run lint.

## It's working if

- `pnpm ai-hero-cli internal lint` passes with the new tree in place.
- Every variant folder has a non-empty `readme.md`; no `.gitkeep` or `speaker-notes.md` slipped in.
- Section and exercise folders carry correct `XX` / `XX.YY` prefixes in dash-case.

## Where it fits

`scaffold-exercises` is a reach-for-it-anytime standalone at the start of building a course section: it produces the empty, lint-clean scaffold you then fill in. It sits next to Matt's course-planning work — once a plan exists, this turns it into directories — but it owns no planning itself. When you're unsure which skill or flow fits, [ask-matt](https://aihero.dev/skills-ask-matt) routes you.
