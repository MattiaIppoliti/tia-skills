---
name: principle-fix-root-causes
description: "Apply when fixing a bug, regression, or recurring operational problem. Find the condition that produces the failure and remove it instead of adding a local suppression."
disable-model-invocation: true
---

# Fix root causes

Treat every visible failure as evidence, not as the problem itself. Trace the failure to the earliest controllable condition that makes it possible.

1. Reproduce the failure or establish a concrete evidence trail.
2. Trace backward through data, control flow, ownership, and assumptions until the first false or missing condition appears.
3. State the root cause as a falsifiable sentence.
4. Change the design or invariant that permits it. Do not add a retry, catch, flag, or guard that merely hides it unless containment is explicitly the goal.
5. Add a regression check at the level where the cause is prevented.

If a symptom fix is needed for immediate safety, ship it as containment and record the root-cause work separately. Do not let containment become the explanation for leaving the cause in place.
