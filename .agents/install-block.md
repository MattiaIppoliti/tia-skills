# The canonical install block

One install story, one wording. `README.md`, `.changeset/*`, and every page under `docs/` must say **this** and nothing else. Change it here first, then propagate.

`tia-skills` is **not** listed in any third-party marketplace. It ships from this repo, which is its own single-plugin marketplace via `.claude-plugin/marketplace.json`. So the install story has exactly one route, and it starts by adding the marketplace: there is no shorter form to offer, and claiming otherwise would send users to a `/plugin install` that resolves to somebody else's plugin.

## Claude Code: the plugin

<canonical-block name="claude-code">

```bash
/plugin marketplace add MattiaIppoliti/tia-skills
```

```bash
/plugin install tia-skills@mattiaippoliti
```

Both run from inside a Claude Code session. Adding the marketplace is a one-time step; after that, `/plugin update tia-skills@mattiaippoliti` pulls the latest published version.

</canonical-block>

## Codex, and other agents

The plugin is Claude Code only. Everywhere else, take the skill folders directly: clone the repo once, then link or copy the skills you want into the directory your harness reads (`~/.agents/skills` for Agent Skills-compatible harnesses).

<canonical-block name="other-agents">

```bash
git clone https://github.com/MattiaIppoliti/tia-skills.git
```

```bash
ln -s "$PWD/tia-skills/skills/engineering/<name>" ~/.agents/skills/<name>
```

A symlink means `git pull` in the clone keeps the skill current; copy the folder instead if you'd rather own an editable version that never changes under you. **Whichever you pick, make sure `setup-tia-skills` is one of the skills you take.**

</canonical-block>

Note that **`docs/` pages are not a consumer of this block**: the page renders above the body of the skill, so a page that writes the commands out duplicates the surrounding text. See [writing-docs.md](./writing-docs.md).

## Not the install story

`npx skills@latest add …` (skills.sh) and Claude Code's official marketplace (`anthropics/claude-plugins-official`) are how the upstream set this repo forked from is distributed. This repo is published in neither, so neither is documented here. If it ever is listed, this file changes first and the rest of the repo follows.
