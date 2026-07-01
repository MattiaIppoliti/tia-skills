# Writing docs pages

Every promoted skill (`engineering/`, `productivity/`, `misc/`) has a human-facing **docs page** at `docs/<skill-name>.md`, published at `https://aihero.dev/skills-<skill-name>`. The page is not the skill and not a copy of `SKILL.md` — it is the explainer a human reads to decide whether to reach for the skill. Skills in `personal/`, `in-progress/`, and `deprecated/` get no page, mirroring the README rule.

Act whenever a promoted skill is added, renamed, or has its behaviour changed: create or re-sync its docs page. A rename moves the file too (`docs/<old>.md` → `docs/<new>.md`), because the published URL tracks the name.

Because these pages are published on `aihero.dev`, **every link is absolute** — never a repo-relative path. A link to another skill points at `https://aihero.dev/skills-<name>`; a link into the repo points at its full `https://github.com/mattpocock/skills/...` URL. A relative link that works in the repo breaks once published.

## Page structure

Fill the template below. The **fixed frame** (install block, source link, `## What it does`) appears on every page. The **adaptable middle** carries only the sections this particular skill earns — delete the ones it doesn't.

<page-template>

```bash
npx skills add mattpocock/skills --skill=<name>
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/<bucket>/<name>)

## What it does

One or two plain-language paragraphs. Lead with the skill's one-sentence job, then state the **load-bearing constraint** — the single fact that makes this skill behave differently from the obvious default (for `to-prd`: it does not interview the user again, it synthesises what is already known). This line is the most valuable on the page; never omit it.

## <Substance heading>

Unpack what the skill produces or how it moves — e.g. a list of the artifact's parts, or a description of the loop it runs. Use as many of these sections as the skill needs; omit if it needs none.

## <Concept highlight>

Name the one idea worth calling out, in the skill's own vocabulary, and say why it matters (`to-prd`'s `## Deep modules` explains what a deep module is and why it helps agentic testing). Omit if there is none.

## How it fits the workflow

```txt
grill-with-docs → to-prd → to-issues → tdd
```

A sentence on where in that chain to reach for the skill. Include only when the skill belongs to a chain.

## Pairs well with

- [<sibling>](https://aihero.dev/skills-<sibling>), because-clause saying what the pairing buys

</page-template>

## Conventions

- Explain the **why**, not the process. The page sells and situates the skill; it never reproduces the `SKILL.md` steps or template dumps — a human choosing a tool does not need the runbook.
- Use the skill's **leading words** (_seam_, _deep module_, _tracer bullet_) so the page and the skill speak one language.

## Done when

- The page exists at `docs/<name>.md`, and no stale page survives a rename.
- The install command and source link name the correct bucket and skill.
- The load-bearing constraint is stated in `## What it does`.
- Every link is absolute, and every one resolves.
