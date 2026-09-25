## What it does

`why` investigates the evidence behind a code decision: its original constraint, alternatives, and later changes. It separates direct evidence from inference and says when the record cannot answer the question.

## When to reach for it

Type `/why`, or the agent reaches for it automatically when rationale matters. Use it for code archaeology, a confusing threshold, postmortem follow-up, or before changing behavior that may protect a non-obvious constraint. For mechanics without historical intent, use [teach](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/productivity/teach.md).

## Evidence, not a plausible story

The skill searches the evidence sources available to the [agent](https://www.aihero.dev/ai-coding-dictionary/agent), including source control, tickets, documents, and operational tools. A missing result is reported as a gap, not replaced with a confident explanation.

## It's working if

- Each factual rationale claim has a source a reader can inspect.
- Inferences state their evidence chain and retain uncertainty.
- The response names sources searched, unavailable sources, and contradictions.

## Where it fits

`why` is a reach-for-it-anytime investigative skill. It informs [architect](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/architect.md) and [diagnosing-bugs](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/diagnosing-bugs.md) without replacing either. [ask-mattia](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ask-mattia.md) maps the wider set.
