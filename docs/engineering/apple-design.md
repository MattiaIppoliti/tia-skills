## What it does

`apple-design` is the reference an [agent](https://www.aihero.dev/ai-coding-dictionary/agent) reads before it builds or reviews interface motion: springs instead of fixed durations, 1:1 pointer tracking, velocity handed off from the finger to the animation, momentum projected forward at release, translucent materials, size-specific tracking and leading, and the eight design principles underneath all of it. It comes out of Apple's WWDC design talks, chiefly *Designing Fluid Interfaces* (2018), translated into CSS, Pointer Events and spring libraries like Motion.

One rule does most of the work: every animation starts from the **presentation value**, the element's live on-screen transform, never its logical target. That is what lets a user grab a closing sheet mid-flight and throw it back open without a visible jump, and it is why the skill tells you to drop CSS transitions for anything a finger touches. Most animation advice is about which curve to pick; this is about being interruptible at every frame.

## When to reach for it

Type `/apple-design`, or the agent reaches for it automatically when a task fits.

| Your situation | Reach for it? |
| --- | --- |
| Building a drag, swipe, sheet, drawer, carousel, or anything gesture-driven | Yes, before writing the handler |
| A UI that works correctly but feels dead, laggy, or rubbery in the wrong way | Yes, this is the diagnostic |
| Reviewing someone's animation code | Yes, the Quick Reference table is the checklist |
| Choosing type scale, tracking, leading, or translucent chrome | Yes, sections 12 and 15 |
| Motion for a rendered video rather than live input | No, use [hyperframes](https://github.com/MattiaIppoliti/tia-skills/blob/main/skills/video/hyperframes/SKILL.md) |
| "Does this interaction feel right at all?" | Answer it in code first with [prototype](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/prototype.md) |

## Feel is a chain, and it breaks at the seams

The skill's leading word is **fluid**, and its structure is a chain from finger to rest. Each link has a named failure:

- **Response.** Feedback fires on pointer-down, not on release. Waiting for `click` reads as dead.
- **Direct manipulation.** The element stays glued to the finger and respects the offset from where it was grabbed. Snapping to the centre on grab kills the illusion in one frame.
- **Interruptibility.** Animate from the presentation value, blend velocity through a reversal instead of hard-cutting it, and never lock out input. A hard cut at a reversal is the "brick wall".
- **Velocity handoff.** The animation continues at the finger's exact release velocity, so there is no seam between dragging and animating.
- **Momentum projection.** Snap to the target nearest the *projected* resting point, not the release point. The skill ships Apple's exponential-decay formula and says outright that the physics-textbook `v²/(2·decel)` is not what Apple uses.
- **Rubber-banding.** Resistance rises past a boundary instead of stopping hard.

The concrete defaults are worth committing to memory: damping `1.0` (no overshoot) for most UI, and bounce (damping ~`0.8`) reserved for interactions where the gesture itself carried momentum. Overshoot on a flicked card feels right; the same overshoot on a menu that just faded in is the single most common way a UI ends up feeling cheap.

## Common questions

**Does this mean I can never use a CSS transition?**
No. The ban is scoped to anything gesture-driven, because a `transition` or `@keyframes` animation cannot be grabbed and reversed from its current value. A hover state, a colour change, a press scale, or any state change the user cannot interrupt is still fine in CSS, and section 1's own example is a CSS `:active` transform.

**Do I need Apple's visual style to use it?**
The two halves separate cleanly. Sections 1 to 11 are physics and input handling, and apply to any interface with a pointer or a finger. Sections 12 and 15, the translucent materials and the type discipline, are closer to a look: take the vibrancy and legibility rules, and skip the glass if glass is not your design.

**How does it relate to the video and motion skills in this repo?**
They do not overlap, and mixing them up produces bad advice in both directions. This skill is about *live* motion that has to react to an input arriving right now. The `skills/video/` stack renders a deterministic timeline to frames, where nothing is interruptible by definition and the whole point is that frame 240 looks the same on every render. Rules like "start from the presentation value" have no meaning there.

**Is this Apple's own guidance or someone's reading of it?**
A reading. It distils WWDC talks into web-platform terms, and it is opinionated about the translation: it picks Motion's `bounce` + `duration` API as the closest mapping to Apple's damping + response, and hands you a house default rather than a menu. Treat the damping/response table as its recommendation, not a spec.

## It's working if

- Interactions can be grabbed mid-animation and reversed, and nothing jumps at the moment you grab them.
- Nothing in a new gesture handler waits for the gesture to finish before the UI moves.
- Bounce shows up only after a flick or a throw, and critically damped springs cover everything else.
- Flicks land where the throw was aimed rather than at whichever snap point happened to be nearest when the finger lifted.
- `letter-spacing` stops being one value applied to every size.

## Where it fits

A reach-for-it-anytime standalone, off the main flow, and the only design-craft reference in the engineering bucket. Its nearest neighbour is [prototype](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/prototype.md), because "does this feel right" is exactly the question static design cannot answer and throwaway code can, and the skill says so itself: an interactive demo is worth a million static designs. It is vendored from [emilkowalski/skills](https://github.com/emilkowalski/skills) rather than written here, so expect a different voice from the rest of the set. When you are unsure which skill fits a task, [ask-mattia](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ask-mattia.md) routes over the whole set.
