Quickstart:

```bash
npx skills add mattpocock/skills --skill=setup-pre-commit
```

```bash
npx skills update setup-pre-commit
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/misc/setup-pre-commit)

## What it does

`setup-pre-commit` wires up a Husky pre-commit hook in the current repo: lint-staged runs Prettier over your staged files, then a type check and the test suite run before the commit is allowed through.

It **adapts to the repo instead of imposing a fixed config**. It detects your package manager from the lockfile, only wires up the `typecheck` and `test` steps that already exist as scripts (and tells you which it skipped), and writes a Prettier config only if you don't already have one. You get a working gate tuned to what the repo actually has, not a template you then have to unpick.

## When to reach for it

Type `/setup-pre-commit`, or the agent reaches for it automatically when a task fits.

Reach for it when a repo has no commit-time formatting or checks and you want them added once — "set up Husky", "add pre-commit hooks", "run Prettier on commit". It is about the commit boundary specifically; to stop dangerous git operations (`push`, `reset --hard`, `clean`) from running at all, use [git-guardrails-claude-code](https://aihero.dev/skills-git-guardrails-claude-code) instead.

## The gate

The hook is a **gate**: nothing lands in a commit until it passes. Ordering is deliberate — lint-staged goes first because it is fast and touches only staged files, then the slower whole-repo `typecheck` and `test` run. The final step is a real commit through the new hook, so the gate is smoke-tested the moment it's installed rather than the next time you happen to commit.

## It's working if

- A commit runs Prettier, the type check, and the tests before it completes — and a failing check aborts the commit.
- `.husky/pre-commit`, `.lintstagedrc`, and a Prettier config exist, and `prepare` in package.json is `"husky"`.
- The hook uses your repo's package manager, and only names steps whose scripts exist.

## Where it fits

A **run-once setup** — you install the gate once per repo and it runs on every commit thereafter, no re-invocation. Its natural neighbour is [git-guardrails-claude-code](https://aihero.dev/skills-git-guardrails-claude-code), because the two guard different edges: this one gates what enters a commit, that one blocks destructive git commands from executing. When you're unsure which skill fits, [ask-matt](https://aihero.dev/skills-ask-matt) routes you.
