---
name: setup-matt-pocock-skills
description: Sets up an `## Agent skills` block in AGENTS.md/CLAUDE.md and `docs/agents/` so the engineering skills know this repo's backlog backend (GitHub or local markdown), triage label vocabulary, and domain doc layout. Run before first use of `to-issues`, `to-prd`, `triage`, `diagnose`, `tdd`, `improve-codebase-architecture`, or `zoom-out` — or if those skills appear to be missing context about the backlog, triage labels, or domain docs.
disable-model-invocation: true
---

# Setup Matt Pocock's Skills

Scaffold the per-repo configuration that the engineering skills assume:

- **Backlog** — where issues/tickets live (GitHub by default; local markdown is also supported out of the box)
- **Triage labels** — the strings used for the five canonical triage roles
- **Domain docs** — where `CONTEXT.md` and ADRs live, and the consumer rules for reading them

This is a prompt-driven skill, not a deterministic script. Explore, present what you found, confirm with the user, then write.

## Process

### 1. Explore

Look at the current repo to understand its starting state. Read whatever exists; don't assume:

- `git remote -v` and `.git/config` — is this a GitHub repo? Which one?
- `AGENTS.md` and `CLAUDE.md` at the repo root — does either exist? Is there already an `## Agent skills` section in either?
- `CONTEXT.md` and `CONTEXT-MAP.md` at the repo root
- `docs/adr/` and any `src/*/docs/adr/` directories
- `docs/agents/` — does this skill's prior output already exist?
- `.scratch/` — sign that a local-markdown backlog convention is already in use

### 2. Present findings and ask

Summarise what's present and what's missing. Then walk the user through three decisions:

**Backlog backend.** Default posture: these skills were designed for GitHub. If a `git remote` points at GitHub, propose that. Otherwise (or if the user prefers), offer:

- **Local markdown** — issues live as files under `.scratch/<feature>/` in this repo
- **Other** (Jira, Linear, etc.) — ask the user to describe the workflow in one paragraph; the skill will record it as freeform prose

**Triage label vocabulary.** Five canonical roles need to be mapped to whatever string the user wants to use in their backlog:

- `needs-triage` — maintainer needs to evaluate
- `needs-info` — waiting on reporter
- `ready-for-agent` — fully specified, AFK-ready
- `ready-for-human` — needs human implementation
- `wontfix` — will not be actioned

Default: each role's string equals its name. Let the user override any of them.

**Domain docs.** Confirm the layout — single-context (`CONTEXT.md` + `docs/adr/` at root) or multi-context (`CONTEXT-MAP.md` at root, `CONTEXT.md` per context). Most repos are single-context.

### 3. Confirm and edit

Show the user a draft of:

- The `## Agent skills` block to add to AGENTS.md (or CLAUDE.md if AGENTS.md is absent and CLAUDE.md is present)
- The contents of `docs/agents/backlog.md`, `docs/agents/triage-labels.md`, `docs/agents/domain.md`

Let them edit before writing.

### 4. Write

**Prefer AGENTS.md over CLAUDE.md.** It's a cross-tool standard. If neither exists, create AGENTS.md.

If an `## Agent skills` block already exists in the chosen file, update its contents in-place rather than appending a duplicate. Don't overwrite user edits to the surrounding sections.

The block:

```markdown
## Agent skills

### Backlog

[one-line summary of where the backlog lives]. See `docs/agents/backlog.md`.

### Triage labels

[one-line summary of the label vocabulary]. See `docs/agents/triage-labels.md`.

### Domain docs

[one-line summary of layout — "single-context" or "multi-context"]. See `docs/agents/domain.md`.
```

Then write the three docs files using the seed templates in this skill folder as a starting point:

- [backlog-github.md](./backlog-github.md) — GitHub backlog
- [backlog-local.md](./backlog-local.md) — local-markdown backlog
- [triage-labels.md](./triage-labels.md) — label mapping
- [domain.md](./domain.md) — domain doc consumer rules + layout

For "other" backlog backends, write `docs/agents/backlog.md` from scratch using the user's description.

### 5. Done

Tell the user the setup is complete and which engineering skills will now read from these files. Mention they can edit `docs/agents/*.md` directly later — re-running this skill is only necessary if they want to switch backlog backends or restart from scratch.
