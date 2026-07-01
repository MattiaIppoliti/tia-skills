Quickstart:

```bash
npx skills add mattpocock/skills --skill=git-guardrails-claude-code
```

```bash
npx skills update git-guardrails-claude-code
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/misc/git-guardrails-claude-code)

## What it does

`git-guardrails-claude-code` installs a Claude Code **PreToolUse hook** that blocks destructive git commands — `git push`, `reset --hard`, `clean -f`, `branch -D`, `checkout .` / `restore .` — before they run.

This is a **guardrail**, not a request. The block lives in the harness, not in the agent's instructions — the hook inspects every Bash command and, on a match, exits with code 2 so the command never executes. An agent can forget a "please don't push" note in its prompt; it cannot talk its way past a hook that fires before the tool call lands.

## When to reach for it

Type `/git-guardrails-claude-code`, or the agent reaches for it automatically when a task fits.

Reach for it when you want an agent to work freely in a repo but never perform the handful of git operations that lose work or rewrite shared history. It's a one-time install: run it once per project (or once globally) and the guardrail is standing thereafter. For enforcing quality *at commit time* — Prettier, type-checking, tests via Husky — that's a different mechanism, so use [setup-pre-commit](https://aihero.dev/skills-setup-pre-commit) instead.

## The guardrail

The hook is a small shell script matching each Bash command against a list of dangerous patterns. When one matches, the agent sees a `BLOCKED` message telling it that it does not have authority to run that command, and the command is dropped.

Two knobs at install time: **scope** — this project (`.claude/settings.json`) or all projects (`~/.claude/settings.json`) — and the **pattern list**, which you can extend or trim so the wall sits exactly where you want it. Everything not on the list still runs untouched.

## It's working if

- A blocked command (e.g. `git push`) never executes, and the agent reports it was denied rather than that it failed.
- Ordinary git — `add`, `commit`, `status`, `checkout <branch>` — runs as normal.

## Where it fits

This is a **run-once setup** skill, and a standalone: install the guardrail and forget it. Its closest neighbour is [setup-pre-commit](https://aihero.dev/skills-setup-pre-commit), which also writes hooks into a repo but guards commit *quality* rather than destructive git *actions* — the two stack cleanly. When you're unsure which safety or setup skill fits, [ask-matt](https://aihero.dev/skills-ask-matt) routes you.
