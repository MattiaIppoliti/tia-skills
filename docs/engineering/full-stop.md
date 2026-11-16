## What it does

`full-stop` does everything [full-send](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/full-send.md) does, proof, GPT Sol review, filing the PR, babysitting CI and bots, and then stops with the PR open and ready for you to merge. It never merges, enables auto-merge, enters a merge queue, or pushes to the default branch. If auto-merge is already on, it turns it off before starting and says so.

## When to reach for it

Say "full stop", or type `/full-stop`. The agent reaches for it on that phrase, including a closing "Full stop." that reads like emphasis, so avoid the phrase as punctuation when you don't want a PR.

| Your situation | Use |
| --- | --- |
| You press merge, the agent does the rest | `full-stop` |
| The agent merges too | [full-send](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/full-send.md) |

## Prerequisites

The same as `full-send`: an authenticated `gh`, `python3`, a harness that can run GPT Sol, and the whole tia-skills install including `vendor/tstack`.

## Three ways it ends

- **Ready to merge**: the merge gate passes and the PR is left open.
- **Waiting for required approval**: only a human approval remains, and the agent checked that this really is the blocker.
- **Blocked**: it says what stops readiness, what it tried, and what it needs from you.

## It's working if

- The handoff names the PR link, final head commit, verdict, proof, reviewer outcome, and remaining risks.
- The PR is still open and unmerged when you look at it.

## Where it fits

A standalone at the end of a change, the cautious twin of [full-send](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/full-send.md). Vendored from [t3dotgg/tstack](https://github.com/t3dotgg/tstack). [ask-mattia](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ask-mattia.md) routes over the whole set.
