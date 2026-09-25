## What it does

`principle-redesign-from-first-principles` asks whether a new requirement deserves a new coherent shape instead of another exception. It imagines the design with the requirement present on day one, then migrates toward that shape deliberately.

## When to reach for it

You invoke this by typing `/principle-redesign-from-first-principles`, and the agent won't reach for it on its own. Reach for it when an incremental patch would leak special-case knowledge across callers or modules.

## A coherent shape

The redesign propagates through code, tests, examples, and documentation. It is not permission for an unbounded rewrite: the implementation still moves in verifiable increments.

## It's working if

- A new reader can understand the requirement without first learning its historical exception.
- Related callers and types follow one rule instead of accumulating exception branches.

## Where it fits

`principle-redesign-from-first-principles` is a reach-for-it-anytime design principle, especially useful with [architect](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/architect.md). For a concrete failure investigation, start with [diagnosing-bugs](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/diagnosing-bugs.md). [ask-mattia](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ask-mattia.md) maps the set.
