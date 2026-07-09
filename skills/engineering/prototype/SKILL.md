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
6. **Let go of it when done.** Fold any validated decision into the real code, then preserve the prototype itself as a **primary source** — committed to a throwaway branch linked from the relevant issue, never merged to main (see _Primary vs secondary source_ below). The main branch keeps only the validated decision.

## When done: primary vs secondary source

A finished prototype leaves two things behind, and they're kept differently.

- **The secondary source is the _answer_** — the verdict plus the question it settled, distilled into durable prose: an issue comment, an ADR, or a commit message. This is what future readers actually consult, and it's the part that matters most. If the user is around, capturing it is a quick conversation; if not, leave a placeholder (a `NOTES.md` next to the prototype) so the verdict can be filled in — by them, or by you if you watched the session — before you move the code.

- **The primary source is the _prototype itself_** — the runnable artifact the answer came from. It's the evidence behind the verdict, so you don't delete it; but with no tests and no maintenance story, it doesn't belong in the main repo either. Once the answer is captured, get the prototype out: commit it to a throwaway branch (e.g. `prototype/<name>`), push it, and link that branch from the relevant issue. Never merge it. The main branch keeps only the validated decision folded into real code; the raw exploration stays on the branch, one click away for anyone who wants to re-run it.

This is distinct from _absorbing_: lifting a validated reducer, state machine, or UI direction into the real module keeps the **decision**, not the prototype. The throwaway branch is what preserves the primary source.
