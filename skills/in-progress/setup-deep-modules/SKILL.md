---
name: setup-deep-modules
description: Wire dependency-cruiser into a TypeScript repo so each package is a deep module — everything hidden behind its index. User-invoked.
disable-model-invocation: true
---

# Setup Deep Modules

Make every package in this repo a **deep module**: a lot of behaviour behind a small interface. Each package under the packages root exposes exactly one interface — its `index.ts` — and everything else is hidden. This skill installs [dependency-cruiser](https://github.com/sverweij/dependency-cruiser) and the rules that make the index the only way in, then proves the rules bite.

For the vocabulary (deep module, interface, seam, depth), see the [`codebase-design`](../../engineering/codebase-design/SKILL.md) skill — use its language throughout.

## The shape this enforces

```
src/packages/
  <name>/
    index.ts        ← the ONLY public interface. Outsiders import this and nothing else.
    <internals>     ← free to import each other; invisible to the outside world.
    tests/          ← co-located tests + fixtures. Reach the package through index only.
```

Four rules, all `error`:

1. **Index boundary** — code outside a package (app code or another package) may import only `<pkg>/index.ts`, never anything deeper.
2. **Intra-package freedom** — a package's own internals import each other freely.
3. **Tests through the index** — files under `<pkg>/tests/` may import any package's `index.ts` and their own `tests/` fixtures, but never any package's internals (not even their own). Integration tests across packages are fine; deep imports are not.
4. **No cycles** — no dependency cycles.

Layering (which packages may depend on which) is a *different* concern and is left as a commented stub in the config for this repo to fill in.

## Steps

### 1. Detect the environment

- **Package manager** — `pnpm-lock.yaml` → pnpm, `yarn.lock` → yarn, `bun.lockb` → bun, else npm. Use it for every command below (`pnpm`/`yarn`/`npm run`/`bunx`).
- **Packages root** — if `src/` exists use `src/packages`, else `packages`. Confirm the choice with the user if the repo already has a different obvious convention.
- **Existing config** — check for a `.dependency-cruiser.*` file. If one exists, do **not** overwrite it: merge the four rules and the options in, and tell the user what you added.

**Done when:** package manager, packages root, and existing-config status are all known.

### 2. Install dependency-cruiser

Install `dependency-cruiser` as a devDependency with the detected package manager.

**Done when:** `dependency-cruiser` is in `devDependencies`.

### 3. Write the config

Copy [`dependency-cruiser.config.cjs`](./dependency-cruiser.config.cjs) to the repo root as `.dependency-cruiser.cjs`. Set `PACKAGES_ROOT` to the root detected in step 1. If the repo is JavaScript rather than TypeScript, change the index pattern and extensions from `ts`/`tsx` to `js`/`jsx`.

**Done when:** `.dependency-cruiser.cjs` exists with the correct `PACKAGES_ROOT`, and the four forbidden rules are present.

### 4. Wire it into the checks

- Add a `lint:boundaries` script: `depcruise <packages-root>` (or `depcruise src`).
- Fold it into the repo's umbrella check command — the one that already runs typecheck (e.g. a `check` / `ci` / `validate` script). Do **not** touch `tsconfig` or add path aliases.
- If there is no umbrella script, add `lint:boundaries` and tell the user to include it in CI.

**Done when:** `lint:boundaries` exists and runs as part of the same command as typecheck.

### 5. Scaffold the example package

Create a committed `<packages-root>/example/` as a copy-me template:

- `index.ts` — the interface. Export one function that delegates to an internal file (so the package is visibly *deep*, not a pass-through).
- an internal file (e.g. `impl.ts`) — imported by `index.ts`, not exported.
- `tests/example.test.ts` — imports **only** `../index`, and asserts against the public function.

Tell the user this is a starter template to copy or delete.

**Done when:** the example package exists and imports only through its own index.

### 6. Prove the rules bite

This is the completion criterion for the whole skill — a config that doesn't fail on a violation is worthless.

1. Run `lint:boundaries`. It must **pass** on the clean example.
2. Temporarily add a deep import to `tests/example.test.ts` (e.g. `import { thing } from "../impl"`). Run `lint:boundaries` again — it must **fail** with `tests-only-through-index`.
3. Revert the deep import. Run once more — it must **pass**.

**Done when:** you have observed a pass, then a fail on the deep import, then a pass again. If step 2 does not fail, the rules are not wired correctly — fix before finishing.

### 7. Document the convention

Write a short `docs/deep-modules.md` (or append to the repo's contributing/README) covering: the `src/packages/<name>/` layout, "import only through `index.ts`", where tests live, and how to run `lint:boundaries`. Keep it to the copy-me snippet plus the four rules in one paragraph each.

**Done when:** a contributor can read one page and know the layout and the boundary rule.

## Notes

- The config's `$1` back-references (dependency-cruiser's group matching) are what let a package reach its own internals while outsiders can't — don't flatten them into separate per-package rules.
- Packages are **flat**: one tier of immediate children under the root. A package's internals may nest as deep as you like; a package may not contain another package.
- Use `.cjs` (not `.js`) so the config's `module.exports` works even in `"type": "module"` repos.
