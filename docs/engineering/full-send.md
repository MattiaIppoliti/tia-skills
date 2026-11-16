## What it does

`full-send` takes a change from wherever it stands to a merged pull request while you are away. The [agent](https://www.aihero.dev/ai-coding-dictionary/agent) finishes the change, proves it works, has GPT Sol review it in a loop, files the PR, watches CI and review bots, fixes what they find, and merges once every check is green.

It assumes nobody is reading. Saying "full send" is the permission: to merge, to force-push the PR's own branch with `--force-with-lease`, and to use whatever test method proof needs (running the app, a browser, a simulator) even where a project rule says to ask first. It never touches production, deletes data, or force-pushes another branch without asking.

## When to reach for it

Say "full send", or type `/full-send`. The agent reaches for it on that phrase and nothing softer: a plain "ship it" does not grant merge rights.

| Your situation | Use |
| --- | --- |
| You want it merged and you are walking away | `full-send` |
| You want it ready but you press merge yourself | [full-stop](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/full-stop.md) |
| You want a cross-provider review, not a PR | [council](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/council.md) |
| You want a review of a branch against this repo's standards and spec | [code-review](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/code-review.md) |

## Prerequisites

An authenticated GitHub CLI (`gh`) and `python3` for the PR watcher. The GPT Sol review loop needs a [harness](https://www.aihero.dev/ai-coding-dictionary/harness) that can run an OpenAI model, such as T3 Code or a Codex CLI on the path; without one, the agent reports the gap instead of reviewing with something else. Install the whole tia-skills repo or plugin: the workflow reads four helper skills from the bundled `vendor/tstack`.

## Proof before merge

The leading word is **proof**: evidence the agent saw in this session, such as a reproduction that failed and now passes, CI's own checks, or a screenshot of the running app. Green mocked tests do not count for UI changes. The **merge gate** is proof covering every line of the diff, required checks green, every bot finding fixed or dismissed with a reason, no human review requesting changes, and a branch GitHub calls mergeable. When the agent cannot prove a change it asks, through the harness's question tool, because a question buried in a normal message goes unseen.

## Common questions

**Why does it stay busy for so long after filing the PR?**
If the agent ends its turn while checks are pending, the work stops, because nobody will prompt it again. It waits on the PR watcher until something changes.

**Can it merge through branch protection?**
Only as configured. It never uses `--admin` or another bypass. With a merge queue or auto-merge, it stays until GitHub reports the PR merged.

## It's working if

- The PR description carries one line saying how the change was proved.
- The final message lists the PR link, the merge commit, the proof, and every decision it made for you.
- When it stops early, the thread shows a pending question rather than looking finished.

## Where it fits

A reach-for-it-anytime standalone at the end of a change, after [implement](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/implement.md) or any hand-written fix. [full-stop](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/full-stop.md) runs the same workflow without the merge. Vendored from [t3dotgg/tstack](https://github.com/t3dotgg/tstack). [ask-mattia](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ask-mattia.md) routes over the whole set.
