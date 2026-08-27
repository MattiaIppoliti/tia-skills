## What it does

`ponytail` makes the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) build the least code that actually works. Before writing anything it climbs a fixed ladder and stops at the first rung that holds: does this need to exist at all, is it already somewhere in this codebase, does the standard library do it, does the platform do it, is an already-installed dependency enough, can it be one line. Only when all six fail does it write the minimum that works.

The ladder shortens the solution and never the reading. It runs *after* the agent has read the code the change touches and traced the real flow, not instead of that. This is the line that separates the skill from "write less code": the smallest change in the wrong place isn't lazy, it's a second bug, and a bug fix goes to the shared function every caller routes through rather than to the one path the ticket happened to name.

## When to reach for it

Type `/ponytail`, or the agent reaches for it automatically when a coding task fits. It behaves unlike most skills here: it is a mode, not a step. Once on it stays on for the rest of the session, until you say "stop ponytail" or "normal mode".

| You want | Level |
| --- | --- |
| The lazier option named in one line, but you decide | `/ponytail lite` |
| The ladder enforced, shortest working diff | `/ponytail` (full, the default) |
| The requirement itself challenged before anything gets built | `/ponytail ultra` |

Reach for it when a task is about to grow a class where a function would do, a config option nobody will set, or a dependency for something the platform ships. It governs code only. For prose that reads like a machine wrote it, the skill you want is [unslop](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/productivity/unslop.md), which is the same instinct aimed at writing.

## The ladder, and the rung that holds

The leading word is **rung**. The ladder is a reflex rather than a research project, and its whole design is that you stop climbing early: if two rungs work, take the higher one and move on. Rung two is the one that pays most often, because re-implementing a helper that already lives a few files over is the most common form of slop.

Laziness has a floor, and the skill names it. Never simplified away: validation at trust boundaries, error handling that prevents data loss, security, accessibility basics, and anything you explicitly asked for. Given two standard-library options of the same size, it takes the one that is correct on edge cases, because lazy means writing less code rather than picking the flimsier algorithm.

Two conventions come with it, and both matter more than they look:

- **A corner cut on purpose gets a comment.** A shortcut with a real ceiling (a global lock, an O(n²) scan, a naive heuristic) leaves a `ponytail:` comment naming that ceiling and the trigger to revisit it: `# ponytail: global lock, per-account locks if throughput matters`. That comment is what [ponytail-debt](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ponytail-debt.md) later harvests.
- **Lazy code without its check is unfinished.** Non-trivial logic leaves behind one runnable check, the smallest thing that fails if the logic breaks: an `assert`-based self-check or one small test file. No frameworks, no fixtures, no per-function suites. Trivial one-liners get nothing, because YAGNI applies to tests too.

## Common questions

**Does the intensity level actually change how much gets built?**
Less than the three names suggest. Someone rendered the instruction text at each level and diffed it: 96 of 99 lines identical across `lite`, `full`, and `ultra`. The only differences are the banner, one row of the intensity table, and one line of the worked cache example. The ladder, the rules, the output format, and the "when NOT to be lazy" list are byte-identical at every level. So the level moves the stance the agent takes in its reply, not the rules it follows, and `lite` in particular still carries the full ladder-enforcement wording rather than being the light touch its name promises. Treat the levels as a hint about tone and state what you actually want in the prompt.

**Doesn't "shortest diff wins" sometimes make the architecture worse?**
Yes, and this is the sharpest criticism of the skill. One reported case was a config loader that needed exactly one contract, `config["KEY"]`, with ordered per-key fallback behind it. Under ponytail the implementation came out with policy leaked into callers and an indirect public contract, because minimum code *in every location* is not the same thing as the fewest concepts a maintainer has to hold. The skill optimises line count for whatever you point it at, and has no rule for containing complexity behind a single contract. When the point of the work is the contract, say so in the prompt.

**Does it switch itself on at the start of every session?**
Not here. Upstream ships Node lifecycle hooks that inject the ruleset at session start and track the current level in a machine-global flag file. Only the skill text is vendored into this repo, so ponytail applies from the moment you or the agent invoke it, and the level is whatever that invocation asked for. That also skips a whole class of upstream bug, most notably two concurrent sessions in different repos overwriting each other's mode.

**Will it skip the tests?**
No. The one-runnable-check rule above is part of the skill, and [ponytail-review](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ponytail-review.md) is explicitly told never to flag a single smoke test or `assert` as bloat. What it does skip is the framework, the fixtures, and the per-function suite you didn't ask for.

**What if I really do want the 120-line version?**
Ask, and it builds it. The skill says not to re-argue once you have insisted.

## It's working if

- Replies end with the code and at most three short lines after it, in the shape "skipped X, add when Y". If the explanation is longer than the code, the skill isn't running.
- Deliberate corner-cuts show up in the diff as `ponytail:` comments carrying a ceiling and an upgrade trigger, which is what makes the debt ledger worth running later.
- New dependencies stop appearing for jobs the standard library or the platform already does.
- The agent still reads before it writes. If diffs get small and *wrong*, the ladder is running instead of the reading, and that is the failure mode this skill can produce.

## Where it fits

A stance rather than a step, so it has no place on the main flow: switch it on and it colours whatever else you are doing, most usefully inside [implement](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/implement.md) and [tdd](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/tdd.md), where the code actually gets written. Its nearest neighbours are the three report skills vendored alongside it: [ponytail-review](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ponytail-review.md) on a diff, [ponytail-audit](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ponytail-audit.md) on a whole repo, and [ponytail-debt](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ponytail-debt.md) on the shortcuts this skill leaves behind, which is the one that closes the loop. All four are vendored from [ponytail](https://github.com/DietrichGebert/ponytail) rather than written here, so their voice is not the rest of this set's. When you are unsure which skill or flow fits a task, [ask-mattia](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ask-mattia.md) routes you over the whole set.
