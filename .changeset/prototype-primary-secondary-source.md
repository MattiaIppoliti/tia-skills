---
"mattpocock-skills": minor
---

Reword how the **`prototype`** skill lets go of its artifacts, around a **primary vs secondary source** distinction. The _secondary source_ is the distilled answer (issue/ADR/commit) — still the part that matters most. The _primary source_ is the prototype itself: rather than deleting it, it's now preserved as runnable evidence on a throwaway branch (`prototype/<name>`) linked from the relevant issue, never merged, so the main branch keeps only the validated decision.
