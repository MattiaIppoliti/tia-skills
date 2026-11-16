## What it does

`council` sends your request, usually a code review, to three [subagents](https://www.aihero.dev/ai-coding-dictionary/subagent) running strong models from three different providers, by default the latest Claude Opus, GPT Sol and Gemini Pro at high reasoning effort. The main agent checks each finding against the code as it lands, fixes what holds up, and asks for a fresh round until all three are satisfied.

It refuses to fake the panel. If a provider is unreachable or a member you named is unavailable, it reports that instead of quietly swapping in another model. It also fights scope creep: repeated rounds are a reason to stop adding, not a licence to.

## When to reach for it

Say "council", or type `/council`. The agent reaches for it on that word.

| Your situation | Use |
| --- | --- |
| You want three independent opinions from different model families | `council` |
| You want one GPT Sol reviewer in a loop, as part of shipping a PR | [full-send](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/full-send.md) |
| You want a review against this repo's standards and the originating spec | [code-review](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/code-review.md) |

## Prerequisites

A [harness](https://www.aihero.dev/ai-coding-dictionary/harness) that can start subagents on other providers' models. T3 Code does this natively; plain Claude Code needs another route, such as Codex and Gemini CLIs on the path. To pin the members, name them in your `CLAUDE.md` or `AGENTS.md` rather than editing the skill.

## Rounds and scores

Each full review pass is a **round**, and each delegate scores the change out of 10. When the work ends in a PR, the agent edits the PR description with a "Council review" table of scores per round, and writes `no score` where a delegate gave none rather than inventing one.

## It's working if

- Findings that only one model raised get checked against the code, not accepted on sight.
- Scores climb across rounds while the diff stays about the same size.
- A missing provider shows up as a reported gap, not as a two-model council.

## Where it fits

A reach-for-it-anytime standalone, before filing a PR or on one already open. It complements [code-review](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/code-review.md), which checks standards and spec with one model family. Vendored from [t3dotgg/tstack](https://github.com/t3dotgg/tstack). [ask-mattia](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ask-mattia.md) routes over the whole set.
