---
name: teach
description: "Explain a system, change, or body of work plainly so a person understands what it is, how it works, and why it has that shape. Use for 'teach me this' or 'help me understand X'."
disable-model-invocation: true
argument-hint: "What should I explain?"
---

# Teach

Explain the work, do not change it. Meet the person's question and background in the conversation rather than turning the explanation into a quiz or a lecture.

1. Decide what they need to leave understanding: the concept, its concrete role here, and the consequence that matters to them.
2. Read enough code, diff, or behavior to orient yourself. Call the Skill tool with `why` for rationale and history when it matters. Use the narrowest investigation that answers the question.
3. Start with the smallest complete definition. Then explain the mechanism as a sequence of what happens, the constraints that shape it, and the important edge cases.
4. Preserve uncertainty from `why`: direct evidence is different from a reasonable inference.
5. Use a short growing diagram when three or more moving parts need to be understood. Add one relationship per diagram instead of showing a crowded final picture.

Use the actual symbols and examples in front of you. Avoid a function-by-function changelog, vague metaphors, framing labels, or a wall of text. Stop after the useful layer and let the person choose whether to go deeper.
