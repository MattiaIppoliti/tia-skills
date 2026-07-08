---
"mattpocock-skills": minor
---

Sharpen **`grilling`** on two fronts.

**A confirmation gate.** The agent won't enact the plan until you confirm the shared understanding has been reached — turning the skill's existing "shared understanding" completion criterion into an explicit stop-gate. The `description` also recruits the pretrained **`grill`** leading word ("Grill the user relentlessly") to sharpen invocation, and the docs page is re-synced.

**Facts vs. decisions.** Grilling now splits *facts* (look them up — explore the codebase) from *decisions* (put each one to the human and wait for their answer). The old blanket line — "if a question can be answered by exploring the codebase, explore the codebase instead" — was written for the live-human case, but once another skill runs grilling inside a resolve-the-ticket frame it read as license to answer *decisions* autonomously too. Separating the two keeps a grilling agent from racing ahead and answering its own questions.
