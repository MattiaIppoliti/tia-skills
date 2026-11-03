---
name: egm-drift-report
description: Compare checked-in designs with current source code.
disable-model-invocation: true
license: Apache-2.0
---

# egm-drift-report

Resolve this installed SKILL.md to its real filesystem path first, following symlinks. From its directory, resolve `../../../vendor/elephant-goldfish-model` as the EGM bundle root. Read `skills/egm-drift-report/SKILL.md` inside that bundle and follow its workflow. Resolve the upstream plugin root, reviewer personas, resources, and integration docs against that bundle, and skill-local references against the bundled skill directory. Resolve user artifacts against the user's working directory. If the bundle is absent, report the missing installation files and stop.

This entry point requires the tia-skills checkout or complete tia-skills plugin, including vendor/elephant-goldfish-model. Copying this folder alone is insufficient. Keep upstream fresh-context reviewer requirements and human design approval gates intact.
