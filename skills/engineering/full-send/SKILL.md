---
name: full-send
description: Take a change all the way to a merged PR with nobody watching: prove it, review it with GPT Sol, file the PR, babysit CI and review bots, merge it. Grants merge and force-with-lease permission, so use only when the user explicitly says "full send".
license: MIT
---

# full-send

Resolve this installed SKILL.md to its real filesystem path first, following symlinks. From its directory, resolve `../../../vendor/tstack` as the tstack bundle root. Read `skills/full-send/SKILL.md` inside that bundle and follow its workflow.

When that workflow says to use another tstack skill (`sol-loop`, `file-pr`, `babysit-pr`, `leaving-pr-comments`), read that skill's `SKILL.md` from the bundle's `skills/` directory and follow it. Those skills are not installed on their own. Resolve their scripts, such as `babysit-pr/scripts/pr-wait`, against the bundle too. Resolve the user's repository against the working directory. If the bundle is absent, report the missing files and stop.

This entry point needs the tia-skills checkout or the complete plugin, including `vendor/tstack`. Copying this folder alone is not enough.
