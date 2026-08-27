---
"tia-skills": minor
---

Add `unslop`, a model-invoked productivity skill that strips AI tells out of prose a human will read (puffery, AI vocabulary, em dashes, filler, hedging, passive voice, sycophancy) and puts a voice back in.

Vendored from [cursor/plugins](https://github.com/cursor/plugins/tree/main/pstack/skills/unslop). The 31 rules are upstream's, unchanged; only the frontmatter is rewritten, from upstream's human-facing "Must always apply" to the model-facing trigger phrasing this repo's model-invoked skills use. A `## Provenance` section records where it came from.

It pairs with `writing-for-agents`, which splits the same territory by audience: `writing-for-agents` governs documents an agent reads and tests each line behaviourally, `unslop` governs documents a person reads and tests whether the line sounds like a person wrote it. `ask-mattia` now states that boundary under Standalone.
