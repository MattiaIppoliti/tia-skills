---
"mattpocock-skills": minor
---

Teach the **`to-issues`** skill to handle a **wide refactor** — a single mechanical change (like renaming a column) whose **blast radius** fans across the whole codebase, breaking thousands of call sites at once so no vertical slice can land green. The skill now spots this while exploring and slices it as **expand–contract** — expand the new form beside the old, migrate call sites in batches sized by blast radius, then contract the old form away — keeping CI green batch to batch (or, when it can't, only at a final integrate-and-verify issue). The leading words are seeded across the description, the explore step, and the drafting step.
