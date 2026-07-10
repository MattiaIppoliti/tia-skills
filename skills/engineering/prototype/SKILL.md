---
name: prototype
description: Build a throwaway prototype to answer a design question. Use when the user wants to sanity-check whether a state model or logic feels right, or explore what a UI should look like.
---

# Prototype

A prototype is **throwaway code that answers a question**. The question decides the shape.

## Pick a branch

Identify which question is being answered — from the user's prompt, the surrounding code, or by asking if the user is around:

- **"Does this logic / state model feel right?"** → [LOGIC.md](LOGIC.md). Build a tiny interactive terminal app that pushes the state machine through cases that are hard to reason about on paper.
- **"What should this look like?"** → [UI.md](UI.md). Generate several radically different UI variations on a single route, switchable via a URL search param and a floating bottom bar.

The two branches produce very different artifacts — getting this wrong wastes the whole prototype. If the question is genuinely ambiguous and the user isn't reachable, default to whichever branch better matches the surrounding code (a backend module → logic; a page or component → UI) and state the assumption at the top of the prototype.

## Rules that apply to both

1. **Throwaway from day one, and clearly marked as such.** Locate the prototype code close to where it will actually be used (next to the module or page it's prototyping for) so context is obvious — but name it so a casual reader can see it's a prototype, not production. For throwaway UI routes, obey whatever routing convention the project already uses; don't invent a new top-level structure.
2. **One command to run.** Whatever the project's existing task runner supports — `pnpm <name>`, `python <path>`, `bun <path>`, etc. The user must be able to start it without thinking.
3. **No persistence by default.** State lives in memory. Persistence is the thing the prototype is _checking_, not something it should depend on. If the question explicitly involves a database, hit a scratch DB or a local file with a clear "PROTOTYPE — wipe me" name.
4. **Skip the polish.** No tests, no error handling beyond what makes the prototype _runnable_, no abstractions. The point is to learn something fast and then let it go.
5. **Surface the state.** After every action (logic) or on every variant switch (UI), print or render the full relevant state so the user can see what changed.
6. **Capture it when done.** Fold any validated decision into the real code, then capture the prototype itself as a **primary source** — committed to a throwaway branch, out of main, with a pointer to that branch left on the implementation issue (see _Keep it as a primary source_ below). The main branch keeps only the validated decision.

## When done: keep it as a primary source

Two things come out of a finished prototype.

- **The answer** — the verdict plus the question it settled — is what you capture durably: an issue comment, an ADR, or a commit message. If the user is around, that's a quick conversation; if not, leave a placeholder (a `NOTES.md` next to the prototype) so the verdict can be filled in before you move the code.

- **The prototype itself is a primary source** — the runnable evidence the answer came from. With no tests and no maintenance story it doesn't belong in the main branch, but that's not a reason to delete it. So capture it somewhere out of main: commit it to a throwaway branch (e.g. `prototype/<name>`), push it, and leave a context pointer to that branch on the implementation issue so anyone can find it later. Never merge it in. The main branch keeps only the validated decision folded into real code; the raw exploration stays on the branch, one click away for anyone who wants to re-run it.

This is distinct from _absorbing_: lifting a validated reducer, state machine, or UI direction into the real module keeps the **decision**, not the prototype. The throwaway branch is what keeps the prototype as a primary source.
