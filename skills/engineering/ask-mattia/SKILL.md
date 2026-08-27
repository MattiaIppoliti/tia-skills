---
name: ask-mattia
description: Ask which skill or flow fits your situation. A router over the skills in this repo.
disable-model-invocation: true
---

# Ask Mattia

You don't remember every skill, so ask.

A **flow** is a path through the skills. Most paths run along one **main flow**, and two **on-ramps** merge onto it. Everything else is standalone, or a vocabulary layer that runs underneath.

## The main flow: idea → ship

The route most work travels. You have an idea and want it built.

1. **`/grill-with-docs`** sharpens the idea by interview. Start here whenever you are **working in a working directory**: it's stateful, retaining what it learns in `CONTEXT.md` and ADRs. (No working directory? Use `/grill-me` instead, covered under Standalone. Both run the same `/grilling` primitive; `grill-with-docs` is the one that leaves a paper trail, which makes it the better of the two whenever a repo is there to leave it in.)
2. **Branch: can you settle every question in conversation?** If a question needs a runnable answer (state, business logic, a UI you have to see), detour through a prototype, bridged by **`/handoff`** in both directions (a prototype lives in its own directory, which is exactly what `/handoff` is for; see Phase boundaries):
   - **`/handoff`** out, then open a fresh session against that file,
   - **`/prototype`** to answer the question with throwaway code,
   - **`/handoff`** back what you learned, and reference it from the original idea thread.
3. **Branch: is this a multi-session build?**
   - **Yes** → **`/to-spec`** (turn the thread into a spec), then **`/to-tickets`** to split it into tracer-bullet tickets, each declaring its **blocking edges**. On a local tracker that's one file per ticket under `.scratch/<feature>/issues/`, worked blockers-first by hand; on a real tracker the edges become native blocking links, so any ticket whose blockers are done can be grabbed: kick off **`/implement`** per ticket, **`/clear`ing context between each one**. Each ticket is self-contained, so the last one's context is disposable.
   - **No** → **`/implement`** right here, in the same context window.

   Either way, **`/implement`** builds each issue by driving **`/tdd`** internally (one red-green slice at a time), then closes out by running **`/code-review`**, a two-axis review (Standards + Spec) of the diff, before committing. Reach for **`/tdd`** on its own when you just want to build a concrete behaviour test-first without a full spec, and **`/code-review`** on its own whenever you want to review a branch or PR against a fixed point.

### Context hygiene

Keep steps 1–3 in **one unbroken context window** (don't compact or clear until after `/to-tickets`) so the grilling, spec, and tickets all build on the same thinking. Each `/implement` then starts fresh, working from the ticket.

The limit on this is the **[smart zone](https://www.aihero.dev/ai-coding-dictionary/smart-zone)**: the window (~150k tokens on state-of-the-art models) within which the model still reasons sharply. If a session approaches it before `/to-tickets`, don't push on degraded; `/compact` at the nearest phase boundary and carry on (see Phase boundaries).

## On-ramps

A starting situation that generates work, then merges onto the main flow.

- **Bugs and requests piling up** → **`/triage`**. It moves issues through triage roles and produces agent-ready issues, which **`/implement`** later picks up.

  Triage is only for issues **you didn't create**: bug reports, incoming feature requests, anything that arrives raw. Tickets that `/to-tickets` produced are already agent-ready, so **don't triage them**.

- **Something's broken** → **`/diagnosing-bugs`**. For the hard ones: the bug that resists a first glance, the intermittent flake, the regression that crept in between two known-good states. It refuses to theorise until it has a **tight feedback loop** (one command that already goes red on *this* bug), then fixes with a regression test. Its post-mortem hands off to **`/improve-codebase-architecture`** when the real finding is that there's no good seam to lock the bug down.

- **A huge, foggy effort: a greenfield project or a huge feature build, too big for one session** → **`/wayfinder`**, the most cognitively demanding flow here. When the way from here to the destination isn't visible yet, it charts a **shared map** of **decision tickets** on the issue tracker and resolves them one at a time, producing **decisions, not deliverables**, until the fog is pushed back and the way is clear. Where **`/grill-with-docs`** sharpens an idea you can hold in one session, wayfinder is for the idea you can't, and it's slower and denser, so save it for exactly that, never a well-scoped feature.

  When the map clears, **it hands off, it doesn't build**: merge onto the main flow at **`/to-spec`**, which collapses the map's linked decisions into a buildable plan, then `/to-tickets` and `/implement` as usual. Looping the map straight into `/implement` skips that collapse and throws the linked detail away, so go straight to `/implement` only when the effort turned out genuinely small.

## Codebase health

Not feature work, just upkeep.

- **`/improve-codebase-architecture`** runs whenever you have a spare moment to keep the codebase good for agents to operate in. It surfaces **deepening opportunities**; picking one _generates an idea_ you can take into the main flow at `/grill-with-docs`. It's the survey that finds the candidates; **`/codebase-design`** (below) is the bench you design the chosen one on.

## Data-intensive systems

Four model-invoked skills for the part of a system that holds state: what the **record of truth** is, what has to stay true under load, concurrency and failure, and where the first real limit sits. They share one vocabulary layer, and what separates them is only *which question you're asking*.

- **`/data-intensive-foundations`** is that vocabulary layer: record of truth, derived state, invariant, headroom, plus the decision axes for storage, replication, sharding, transactions, consistency and data flows. The other three call it before they choose anything, so reach for it directly only when you want a trade-off compared, technology-neutral, with no design or report wrapped around it. It compares architectures; it never picks a vendor or a product setup.
- **`/design-data-intensive-system`** is for a system that doesn't exist yet, or an architecture change big enough to count as one. Workload and invariants first, then the smallest architecture that meets them, and every component has to earn its place by protecting a named requirement. What it produces is a decision record, so it **hands off, it doesn't build**: take it into the main flow at **`/to-spec`**. Where **`/codebase-design`** designs a *module's* shape, this designs the *system's*.
- **`/scale-data-intensive-system`** is the on-ramp for a system that already exists and is running out of room. It refuses to change topology just because you said the word "scale": it names what grows, reproduces the first constraint, and keeps the red baseline the change has to beat. The other on-ramp, **`/diagnosing-bugs`**, is for something that's *broken*; this is for something that works and won't for much longer.
- **`/audit-data-intensive-repo`** reads a whole repository as a data system and reports ranked, file-backed risks, tagged `truth:`, `atomicity:`, `delivery:`, `freshness:`, `capacity:` or `recovery:`, each with the failure it can cause, the smallest remediation, and how to validate it. Read-only and one-shot, so it sits beside **`/ponytail-audit`** and **`/improve-codebase-architecture`**: those ask what to *delete* and what to *deepen*, this asks what can *lose or corrupt data*.

All four mark every claim `observed`, `supplied`, `inferred` or `unknown`, and list the gaps rather than filling them in. An `unknown:` line is the measurement to go and take, not a hedge.

## Lazy mode

Four vendored skills that all push the same way: less code. **`/ponytail`** is a stance you switch on; the other three are one-shot reports.

- **`/ponytail`** runs *underneath* the building rather than beside it. It climbs a ladder and stops at the first rung that holds: does this need to exist at all, is it already in this codebase, does the stdlib do it, does the platform, can it be one line. Switch it on and it stays on, at `lite` (name the lazier option and let you pick), `full` (the ladder enforced, the default), or `ultra` (challenge the requirement before building it). It shortens the *solution*, never the reading: the ladder runs after the agent has traced the real flow, which is the whole difference between a small diff and a confident wrong fix. Reach for it when `/implement` or `/tdd` is about to build more than the job needs.
- **`/ponytail-review`** reviews a diff for over-engineering only, one line per finding, closing with `net: -N lines possible`. It doesn't replace **`/code-review`** and doesn't overlap it: correctness, security and performance are explicitly out of ponytail's scope, and Standards + Spec are out of this one's. Run both on the same diff.
- **`/ponytail-audit`** is the same hunt over the whole tree instead of a diff, ranked biggest cut first. Where **`/improve-codebase-architecture`** asks what to *deepen* and hands you a design problem to grill, this asks what to *delete* and hands you a list. Check the callers yourself before acting on a `delete:` line: the skill never requires that check, and upstream measured 8 of 31 findings invalid on a real repo.
- **`/ponytail-debt`** is the counterweight to the rest. Every corner `/ponytail` cuts on purpose leaves a `ponytail:` comment naming its ceiling and its upgrade trigger, and this harvests them into one ledger, flagging the ones with no trigger, since those are the ones that rot. It has nothing to report until `/ponytail` has been building, so treat it as the second half of that pair rather than a skill you reach for cold.

All four are model-invoked, and all four are vendored from [ponytail](https://github.com/DietrichGebert/ponytail) rather than written here, so expect a different voice. Upstream's `ponytail-gain` and `ponytail-help` are deliberately absent: they document an install, config, and benchmark surface this repo doesn't ship.

## Vocabulary underneath

Two model-invoked references that run *beneath* the other skills, each the single source of truth for its vocabulary. Reach for them directly when the **words**, not the process, are the problem; or let the skills above pull them in.

- **`/domain-modeling`**: sharpen the project's *domain* language: challenge a fuzzy term, resolve an overloaded word ("account" doing three jobs), record a hard-to-reverse decision as an ADR. It's the active discipline `/grill-with-docs` drives to keep `CONTEXT.md` a clean glossary.
- **`/codebase-design`** is the deep-module vocabulary (module, interface, depth, seam, adapter, leverage, locality) for designing a module's *shape*: a lot of behaviour behind a small interface at a clean seam. `/tdd` and `/improve-codebase-architecture` both speak it.

A third reference works the same way: **`/data-intensive-foundations`** is the single source of truth for data-system vocabulary, and is described with its family under Data-intensive systems.

## Phase boundaries

A **phase** is a chunk of work inside a session: the grilling, the implementation, the QA. At the **boundary** between two of them you have five options, and picking between them is the fuzziest decision in this whole map:

- **Continue**: stay put. Costs nothing, loses nothing.
- **`/clear`**: empty the window, when nothing here matters to what's next.
- **`/handoff`** writes a portable markdown file. Narrow: only for a **new harness**, a **new directory**, a **colleague**, or forking a side task **mid-phase**. What it buys is portability.
- **Subagent**: send a tightly-scoped task to its own window and get a report back.
- **`/compact`** compresses this context and seeds a fresh session with it. The **default**, at the bottom of the tree rather than the first reach.

Read [PHASE-BOUNDARIES.md](PHASE-BOUNDARIES.md) for the ordered tree: the five questions, the reasoning behind each branch, and why the primary-source cost makes **Continue** the one to rule out first. Make the decision **at** a boundary; mid-phase, continue or split the rest into subagents.

## Standalone

Off the main flow entirely.

- **`/grill-me`**: the same relentless interview as `/grill-with-docs`, but **stateless**: it saves nothing locally and builds no `CONTEXT.md`. Reach for it when you are **not working in a working directory** (sharpening a plan, a design, a piece of writing, anything with no repo under it). If you are in a working directory, use `/grill-with-docs` instead: it runs the same interview and leaves a paper trail, so it is strictly the better one.
- **`/grilling`** is the interview primitive itself: rounds, the frontier, facts are the agent's job and decisions are yours. `/grill-me` and `/grill-with-docs` are the two named ways in, and `/triage`, `/wayfinder` and `/improve-codebase-architecture` all run it internally. Reach for it directly only when you want the interview with no wrapper around it.
- **`/resolving-merge-conflicts`** works an in-progress merge or rebase conflict hunk by hunk, resolving by **intent** traced to each side's primary source rather than by picking lines, then finishes the operation. It never runs `--abort`. Standalone and off every flow: reach for it when you are already mid-conflict.
- **`/prototype`** is a small, throwaway program that answers one design question: does this state model feel right, or what should this UI look like. Throwaway is a constraint on how the code is written, not a promise to destroy it: the answer folds into the real code, and the prototype itself is kept as a **primary source** on a `prototype/<name>` branch out of main, pointed at from the implementation issue. It's the detour in step 2 of the main flow, but reach for it any time a design question is hard to settle on paper.
- **`/research`**: delegate reading legwork to a **background agent**: it investigates a question against **primary sources**, then leaves a cited Markdown file in the repo. Keep working while it reads. The file it produces is something to take *into* the main flow at `/grill-with-docs`, since research feeds the thinking rather than replacing it.
- **`/to-questionnaire`** comes in when the thing blocking you isn't in your head or the codebase but in **someone else's**, and it writes them a questionnaire to fill in. It's the inverse of `/grill-me`: instead of interviewing you about the subject, it interviews you about the **send** (who it's going to, what you need back) and aims the questions at the gap. What comes back is material for `/grill-with-docs` or `/to-spec`.
- **`/wizard`** is for the steps only a **human** can take: provisioning infrastructure, setting up credentials or CI secrets, clicking through an unfamiliar third-party dashboard, running a one-off migration or cutover. It generates an interactive bash script that opens each URL, captures each value, and writes it into `.env` and GitHub secrets, so the procedure stops being something you re-explain to an agent every time. Model-invoked, so the agent reaches for it the moment it hits a wall only you can pass. If the agent could just do it itself, it should; this is for where a human is genuinely in the loop.
- **`/wait-what`** is the corrective for a message that didn't land. Use it mid-conversation, inside any other skill, and the agent re-pitches what it just said with the context you were missing, in plain English, using the `CONTEXT.md` vocabulary. It works after the fact; `/grill-with-docs` is the upfront cure, because a shared language agreed early is what stops the jargon arriving at all.
- **`/teach`**: learn a concept over multiple sessions, using the current directory as a stateful workspace.
- **`/hyperframes`** is the door into the whole `skills/video/` stack: making a product launch video, a promo, or a motion graphic in code, output as a Remotion (React) project. It owns its own routing, so ask it rather than picking one of the eighteen skills behind it. Off the engineering flow entirely, and the one part of this repo that is vendored from elsewhere rather than written here: expect a rougher edge, and read the contract-status banner on whichever skill it hands you to.
- **`/writing-for-agents`** is the reference for writing documents agents consume: skills, AGENTS.md, pointed-at docs.
- **`/unslop`** is the other half of that pair, aimed at the *human* reader: it strips the AI tells out of a draft (puffery, AI vocabulary, em dashes, filler, hedging, passive voice, sycophancy) and puts a voice back in. Where `/writing-for-agents` asks whether a line changes an agent's behaviour, `/unslop` asks whether a line sounds like a person wrote it. Model-invoked, so the agent applies it to its own prose; reach for it by hand on a draft that reads like a machine.

## Precondition

**`/setup-tia-skills`**: run before your first engineering flow to configure the issue tracker, triage labels, and doc layout the other skills assume. Custom issue trackers also work.
