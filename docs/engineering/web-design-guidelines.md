## What it does

`web-design-guidelines` reviews UI files against Vercel's [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines) and reports each violation as one terse `file:line` finding, grouped by file, with a `✓ pass` for files that are clean. The list covers accessibility, focus states, forms, animation, typography, content handling, images, performance, navigation and URL state, touch, safe areas, dark mode, i18n, hydration safety, hover states, and copy, plus a short list of anti-patterns such as `transition: all` and `<div onClick>`.

The skill ships no rules of its own. Every run, the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) fetches the current guideline file from GitHub and applies whatever it says, output format included. That keeps the list current without an update to this repo, and it means a review needs network access and can change between two runs when Vercel edits the file.

## When to reach for it

Type `/web-design-guidelines <file-or-pattern>`, or the agent reaches for it automatically when a task fits. Called with no files, it asks which ones to review.

| Your situation | Reach for it? |
| --- | --- |
| A UI diff is ready and you want the mechanical checks done before a human looks | Yes |
| "Check accessibility" or "audit this page" on existing components | Yes |
| A gesture or animation works but feels wrong | No, use [apple-design](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/apple-design.md) |
| Checking a branch against this repo's own standards and the spec it came from | No, use [code-review](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/code-review.md) |
| No network in the session | No, the rules come from a URL |

## A checklist, not a critique

The findings are short on purpose: the issue and its location, with an explanation only where the fix is not obvious (`transition: all → list properties`, `"..." → "…"`). The result reads like linter output, and that is how to treat it. Every line is checkable in the code, and none of them is a taste call.

That is also where it stops. The rules can say an animation must honour `prefers-reduced-motion` and be interruptible. They cannot say whether the spring is right. A clean report means the UI breaks none of the listed rules, not that it is well designed.

## Common questions

**Why does it hit the network every time?**
The guideline file is the source of truth and changes independently of the skill. Pinning a copy here would go stale the way any vendored checklist does. The cost is that an offline session cannot run it, and two reviews a week apart can use different rules.

**Do the React-flavoured rules apply to a non-React codebase?**
Most of the list is plain HTML, CSS, and ARIA. A handful name React or Next.js APIs (`onChange` with `value`, `suppressHydrationWarning`, `priority` on images) or Tailwind classes (`focus-visible:ring-*`, `min-w-0`). On another stack, read those as the equivalent rule, or drop the finding when the rule does not apply.

**Some findings contradict our style guide, like Title Case on buttons. Which wins?**
Your style guide. The copy rules are Vercel's house style. Leave those findings out, or tell the agent up front which rule groups to skip.

## It's working if

- Findings name a file and a line you can jump to, and each one is a change you can make without asking what it means.
- Human review of a UI diff stops catching missing `aria-label`s, `outline: none`, and unlabelled inputs.
- Files with nothing to report come back as `✓ pass` instead of a paragraph of reassurance.

## Where it fits

A reach-for-it-anytime standalone, off the main flow. It pairs with [apple-design](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/apple-design.md), which covers the feel this rule list cannot judge, and runs before [code-review](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/code-review.md) on a UI diff, because `code-review` checks this repo's standards and the spec rather than web-platform rules. It is vendored from [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills), and the rules live in [vercel-labs/web-interface-guidelines](https://github.com/vercel-labs/web-interface-guidelines). When you are unsure which skill fits a task, [ask-mattia](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ask-mattia.md) routes over the whole set.
