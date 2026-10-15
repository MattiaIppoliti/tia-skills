## What it does

`design-taste-frontend` (upstream calls it tasteskill v2) makes an [agent](https://www.aihero.dev/ai-coding-dictionary/agent) art-direct a public web page instead of producing the average one: centred headline, a small label above it, three icon cards, a soft gradient, a monospace caption. It replaces each of those defaults with a decision taken from the subject itself.

The agent does not invent the look. A script, `scripts/draw.mjs`, deals three of 20 directions from a library distilled from 247 gallery sites (One Page Love and Awwwards Sites of the Day), and the agent picks the one that can carry something only this client has. The script then deals the rest of the sheet: hero and section compositions, a type system of free fonts, a palette, photographs, a motion. After the build, a source lint and a real-browser inspector measure the house rules, and the agent critiques its own screenshots.

## When to reach for it

Type `/design-taste-frontend`, or the agent reaches for it automatically when a task fits: building, redesigning or polishing a landing page, marketing site, portfolio, product page or one-pager, in any stack, and whenever someone says a page looks generic, templated or AI-made.

| Your situation | Reach for it? |
| --- | --- |
| A new landing page or marketing site, from a brief | Yes |
| An existing page that "looks like every other site" | Yes |
| A dashboard, admin panel or app screen | No, the skill says so itself |
| A UI diff that needs accessibility and focus-state checks | No, use [web-design-guidelines](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/web-design-guidelines.md) |
| A gesture or animation that works but feels wrong | No, use [apple-design](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/apple-design.md) |

## Prerequisites

Node 22 or newer and an installed Chrome, Edge or Chromium, which `scripts/inspect.mjs` drives over the DevTools protocol. Nothing gets installed. `scripts/assets.mjs`, which finds open-licence pictures of the subject's world when the project has none, needs network access but no API keys.

The skill writes working files into `.taste-skill/` at the project root, downloaded pictures and their credits into the project's assets, and a draw history into `~/.taste-skill/history.json` so two projects do not get the same direction. Delete that file to reset it.

## The inventory, then the draw

The run starts with an **inventory**: eight to twelve things that belong to this client and no competitor. The name and what it means, the street, the numbers in the brief, the one constraint it lives with, its materials and hours. In upstream's blind tests the winning page was built from an item on that list every time, and the losing pages had a good composition carrying a category idea. The direction is chosen against the inventory, not for being familiar.

The second half is the **gate and the look**. `scripts/lint.mjs` and `scripts/inspect.mjs` fail the page on measurable tells: headlines over two lines, eyebrow labels, monospace, numbered 01/02/03 sections, thin rules, gradients, resting shadows, violet, faded or covered text, empty screens. Passing them is the floor. The agent then scores the screenshots at 1440, 768 and 390 with an Awwwards-weighted rubric, fixes the top three problems and looks again, at most three rounds.

## Common questions

**How long does a page take?**
Upstream's own estimate is 30 to 45 minutes and a few hundred thousand tokens for a full build with the look-and-fix loop, most of it spent finding or drawing pictures when the project has no photographs. It is not a quick polish pass.

**Can I keep my brand's colours and fonts?**
Yes. The agent reads any existing brand in step one, and `draw.mjs --keep palette,type` keeps those parts of the sheet fixed while it deals the rest.

**Why does it forbid things like monospace captions and gradients outright?**
Because they are the tells that make a model-built page read as model-built, and a rule a script can measure is one the agent cannot talk itself out of. The house style is opinionated by design. If your brand needs one of the banned patterns, the inspector reports it as a failure and you decide to keep it.

## It's working if

- You can state the page's idea in one sentence, and the sentence names something about this client, not its category.
- The inspector reports zero FAILs and the agent shows you the screenshots it judged, not only the code.
- Two pages for two different clients do not share a hero composition or a palette.

## Where it fits

A reach-for-it-anytime standalone, off the main flow, and the one design skill in the engineering bucket that builds a whole page. It pairs with [web-design-guidelines](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/web-design-guidelines.md), which checks the finished code against accessibility and platform rules this skill does not cover, and [apple-design](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/apple-design.md), which tunes how interactions feel. It is vendored from [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill), so expect a different voice from the rest of the set. When you are unsure which skill fits a task, [ask-mattia](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ask-mattia.md) routes over the whole set.
