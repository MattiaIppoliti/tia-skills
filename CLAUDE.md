Skills are organized into bucket folders under `skills/`:

- `engineering/`: daily code work
- `productivity/`: daily non-code workflow tools
- `misc/`: kept around but rarely used, not promoted
- `video/`: a vendored third-party stack for making videos in code, mid-migration to Remotion, not promoted
- `in-progress/`: beta: public on purpose, feedback wanted, not shipped in the plugin
- `deprecated/`: no longer used

Every skill in `engineering/` or `productivity/` (the **promoted** buckets) must have a reference in the top-level `README.md` and an entry in `.claude-plugin/plugin.json`'s `skills` array (the Claude Code plugin ships exactly the promoted set). Skills in `misc/`, `video/`, `in-progress/`, and `deprecated/` must not appear in either.

Install commands are copied verbatim from [.agents/install-block.md](./.agents/install-block.md). `.claude-plugin/marketplace.json` makes the repo its own single-plugin marketplace, which is the only route the plugin ships by, so it is load-bearing rather than a fallback. Run `claude plugin validate . --strict` after touching either manifest. Why a Claude plugin but not (yet) a Codex one lives in [.agents/adr/0002-ship-as-a-claude-code-plugin.md](./.agents/adr/0002-ship-as-a-claude-code-plugin.md).

Each skill entry in the top-level `README.md` must link the skill name to its `SKILL.md`.

Each bucket folder has a `README.md` that lists every skill in the bucket with a one-line description, with the skill name linked to its `SKILL.md`. The promoted buckets' `README.md`s and the top-level `README.md` group entries into **User-invoked** and **Model-invoked**; non-promoted bucket `README.md`s (`misc/`, `video/`, `in-progress/`) use a flat list. `video/`'s groups its flat list under headings, because 18 undifferentiated entries are unreadable.

Skills in `engineering/` and `productivity/` also have a human-facing docs page at `docs/<bucket>/<skill-name>.md` (the docs tree mirrors those two bucket folders under `skills/`). The page's URL is `https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/<bucket>/<skill-name>.md`, so the docs path is part of the address. When you add, rename, or change the behaviour of a skill in `engineering/` or `productivity/`, create or re-sync its docs page following [.agents/writing-docs.md](./.agents/writing-docs.md). A finished page carries four sections: **What it does**, **When to reach for it**, **Common questions**, and **It's working if**. `writing-docs.md` holds the template, the section order, and where to hunt for the questions. Skills in the non-promoted buckets (`misc/`, `video/`, `in-progress/`, `deprecated/`) get **no** docs page.

The `video/` bucket is not this repo's own work: it is a vendored video stack whose skills came from elsewhere, kept here so a `git pull` updates them on every machine. Two things follow. First, its entry point, composition contract, and CLI skill (`hyperframes`, `hyperframes-core`, `hyperframes-cli`) were rewritten to target **Remotion + React**; the craft and workflow skills still describe the retired HTML + `data-*` + GSAP-timeline contract, and each carries a `⚠ Contract status` banner at the top saying which half of it still applies. Do not remove a banner without actually porting the skill. Second, `ask-mattia` routes to the bucket's entry point only, never to its internal skills: `/hyperframes` owns that routing itself, and duplicating its route table would give the repo two maps that disagree.

Every `SKILL.md` is either user-invoked (`disable-model-invocation: true` plus `policy.allow_implicit_invocation: false` in `agents/openai.yaml`, reachable only by the human) or model-invoked (model- or user-reachable). See [.agents/invocation.md](./.agents/invocation.md).

[`ask-mattia`](./skills/engineering/ask-mattia/SKILL.md) is the router that maps every user-reachable skill and how they relate. The same trigger that re-syncs a docs page applies to it: whenever you add, rename, remove, or change how a user-reachable skill fits the flows, re-read `ask-mattia`'s `SKILL.md` and update it so the map stays accurate: a new skill it never mentions, or a stale one it still routes to, is a router that lies.

To (re)link every skill into the local harness skill directories (`~/.claude/skills`, `~/.agents/skills`), run `scripts/link-skills.sh`. Each entry is a symlink into this repo, so a `git pull` keeps installed skills current; re-run the script after adding, removing, or renaming a skill.

No em-dashes anywhere in this repo's prose (`SKILL.md` files, docs, `README.md`, `CHANGELOG.md`, ADRs, changesets, code comments). Where a sentence reaches for one, rewrite it instead with a comma, colon, period, parentheses, or a conjunction, whichever the sentence actually wants; never do a blind character substitution.

The one carve-out is `skills/video/`, which arrived vendored with about 6,300 em-dashes across 418 files. They are not sanctioned, just untouched: rewriting them by hand is a job of its own, and the blind character substitution that would make it quick is exactly what the rule forbids. Anything newly written or rewritten in that bucket follows the rule like the rest of the repo.
