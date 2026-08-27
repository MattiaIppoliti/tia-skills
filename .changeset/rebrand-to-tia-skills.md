---
"tia-skills": minor
---

Rebrand the set to `tia-skills`, owned by Mattia Ippoliti, and teach the router the data-intensive skills.

- **`ask-matt` is now `ask-mattia`**, and **`setup-matt-pocock-skills` is now `setup-tia-skills`**. Both are renames with no alias: the old slash commands stop resolving, and a repo that already ran the old setup skill keeps its config, since only the skill's name changed.
- **The plugin and package are now `tia-skills`**, published from this repo's own marketplace (`/plugin marketplace add MattiaIppoliti/tia-skills`, then `/plugin install tia-skills@mattiaippoliti`). The previous install text claimed a listing in Claude Code's official marketplace and on skills.sh; neither covers this repo, so both are gone rather than renamed. `.agents/install-block.md` carries the one true wording, and `README.md` follows it.
- **Docs pages are read on GitHub**, at `https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/<bucket>/<skill-name>.md`. Every cross-page link moved to that scheme, and `.agents/writing-docs.md` records it. Links to the AI Coding Dictionary stay as they are: those cite an external glossary rather than claim ownership.
- **`ask-mattia` now maps the four data-intensive skills** in a section of their own, because what separates them is only which question is being asked: `data-intensive-foundations` as the vocabulary layer, `design-data-intensive-system` handing its decision record off to `to-spec`, `scale-data-intensive-system` as the on-ramp for a system running out of room, and `audit-data-intensive-repo` as the read-only risk report beside `ponytail-audit`. The docs page gained the matching route, and its stale count of user-invoked skills is now correct at fourteen of thirty-four.
- **Attribution kept where removing it would be wrong**: `LICENSE` names Mattia Ippoliti and retains the upstream copyright for the portions this repo derives from, and `CHANGELOG.md` entries up to 1.2.3 keep their upstream pull request, commit, and author links, under a note saying so.
