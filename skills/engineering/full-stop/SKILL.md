---
name: full-stop
description: Same work as full-send (prove, review, file, babysit a PR) but stop when the PR is ready for the user to merge, and never merge it. Use when the user says "full stop", even as a closing "Full stop." that reads like emphasis.
license: MIT
---

# full-stop

Resolve this installed SKILL.md to its real filesystem path first, following symlinks. From its directory, resolve `../../../vendor/tstack` as the tstack bundle root. Read `skills/full-stop/SKILL.md` inside that bundle and follow it. Its link to `full-send` resolves inside the same bundle.

When the workflow says to use another tstack skill (`sol-loop`, `file-pr`, `babysit-pr`, `leaving-pr-comments`), read that skill's `SKILL.md` from the bundle's `skills/` directory and follow it. Those skills are not installed on their own. Resolve their scripts, such as `babysit-pr/scripts/pr-wait`, against the bundle too. Resolve the user's repository against the working directory. If the bundle is absent, report the missing files and stop.

This entry point needs the tia-skills checkout or the complete plugin, including `vendor/tstack`. Copying this folder alone is not enough.
