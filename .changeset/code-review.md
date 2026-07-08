---
"mattpocock-skills": minor
---

Promote and harden **`code-review`**. The in-progress **`review`** skill is renamed to **`code-review`** and moved from `in-progress/` into `engineering/`: it now ships in the plugin, is listed in the top-level and Engineering READMEs (Model-invoked), and has a docs page at `docs/engineering/code-review.md`. The `/implement` skill and docs point at `/code-review`.

It also gains an always-on **Fowler smell baseline** on its Standards axis — a curated ~12 high-signal "Bad Smells in Code" (Mysterious Name, Duplicated Code, Feature Envy, Data Clumps, Primitive Obsession, Repeated Switches, Shotgun Surgery, Divergent Change, Speculative Generality, Message Chains, Middle Man, Refused Bequest) inlined into `SKILL.md` as a fixed baseline alongside whatever the repo documents, not a new third axis. Two binding rules keep it safe: a documented repo standard overrides the baseline, and every smell is reported as a judgement call, never a hard violation.
