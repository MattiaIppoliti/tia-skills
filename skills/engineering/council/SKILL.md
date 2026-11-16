---
name: council
description: Get review or feedback from three strong models from three different providers (for example Claude Opus, GPT Sol, Gemini Pro), fix what they agree on, and loop until all three are satisfied, with scores in the PR description. Use when the user says "council".
license: MIT
---

# council

Resolve this installed SKILL.md to its real filesystem path first, following symlinks. From its directory, resolve `../../../vendor/tstack` as the tstack bundle root. Read `skills/council/SKILL.md` inside that bundle and follow it. Resolve the user's repository against the working directory. If the bundle is absent, report the missing files and stop.

This entry point needs the tia-skills checkout or the complete plugin, including `vendor/tstack`. Copying this folder alone is not enough.
