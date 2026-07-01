Quickstart:

```bash
npx skills add mattpocock/skills --skill=codebase-design
```

```bash
npx skills update codebase-design
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/engineering/codebase-design)

## What it does

`codebase-design` gives you a shared, precise vocabulary for designing **deep modules** — a lot of behaviour hidden behind a small interface, placed at a clean seam, testable through that interface.

The load-bearing constraint: it is a **language, not a procedure**. It doesn't restructure your code or hand you a refactor plan — it fixes the words (module, interface, depth, seam, adapter, leverage, locality) so that every design conversation and every other skill that touches design speaks the same way. Consistent language is the whole point; "component," "service," "API," and "boundary" are deliberately banned because they blur the distinctions that matter.

## When to reach for it

Type `/codebase-design`, or the agent reaches for it automatically when a task fits.

Reach for it when you're designing or improving a module's interface, hunting for deepening opportunities, deciding where a seam goes, or making code more testable and AI-navigable. Other skills pull it in whenever they need the deep-module vocabulary. If you want to sharpen the project's *domain* terms rather than its module design, use [domain-modeling](https://aihero.dev/skills-domain-modeling) instead; to run a whole architecture pass over an existing codebase, use [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture).

## Deep, not shallow

A module is **deep** when a large amount of behaviour sits behind a small interface, and **shallow** when the interface is nearly as complex as the implementation. Depth is measured as **leverage** — how much a caller (or a test) can exercise per unit of interface they have to learn. Crucially, depth is a property of the *interface*, not the implementation: a deep module can be internally composed of small, swappable parts that just never surface to callers.

Two checks do most of the work. The **deletion test**: imagine deleting the module — if complexity vanishes, it was a pass-through; if it reappears across N callers, it was earning its keep. And **one adapter means a hypothetical seam; two adapters means a real one** — don't cut a seam until something actually varies across it.

## The interface is the test surface

Callers and tests cross the same seam, so a well-placed interface gives tests something durable to aim at while the code underneath moves freely. That's why the vocabulary insists on **seam** (Feathers' term — a place you can change behaviour without editing there) over the overloaded "boundary," and why "interface" here means *every fact a caller must know*: signatures, yes, but also invariants, ordering, error modes, and performance — not just the type-level surface.

## Where it fits

`codebase-design` is a **reach-for-it-anytime standalone** and the shared vocabulary layer under the engineering skills — it's the language that [to-prd](https://aihero.dev/skills-to-prd) uses when it sketches seams and deepening opportunities before writing a spec, and that [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) leans on when it restructures existing code. Its closest neighbour is [domain-modeling](https://aihero.dev/skills-domain-modeling), the parallel vocabulary skill for the problem domain rather than the module structure. When you're unsure which skill or flow fits, [ask-matt](https://aihero.dev/skills-ask-matt) routes you.
