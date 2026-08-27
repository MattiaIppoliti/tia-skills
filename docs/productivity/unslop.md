## What it does

`unslop` is an editing pass that strips the tells that make writing read as machine-generated: puffery, the AI vocabulary set (delve, crucial, tapestry, landscape, underscore), fancy ways to say "is", "not just X but Y", forced rules of three, em dashes, boldface sprayed over every proper noun, chatbot pleasantries, hedging, filler, and passive voice with no actor named.

The constraint that makes it different from a style linter is that removing the patterns is only half of it. A draft with every tell deleted is sterile, and sterile is just as recognisable as slop. So the skill has a second job of equal weight: put a voice back in. Have an opinion instead of listing pros and cons. Vary sentence rhythm. Be specific enough that the sentence could not appear unchanged in someone else's document. The skill closes with a self-audit question, "what makes this obviously AI generated?", and fixes whatever survived the first pass.

## When to reach for it

Type `/unslop`, or the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) reaches for it automatically when a task involves prose a person will read.

Reach for it by hand whenever a draft reads like a machine wrote it, no matter who wrote it: a README, a changelog entry, a PR description, release notes, a blog post, an email. It runs on text that already exists, so the natural moment is on the second pass rather than the blank page.

| Situation | Skill |
| --- | --- |
| A human will read it and it sounds like a robot | `unslop` |
| An [agent](https://www.aihero.dev/ai-coding-dictionary/agent) will read it and it is bloated or ambiguous | [writing-for-agents](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/productivity/writing-for-agents.md) |
| The reader is you, and a message just did not land | [wait-what](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/productivity/wait-what.md) |

## Tells, and the voice underneath

The leading word is **tell**: a surface pattern that leaks the writer's identity. The catalogue runs to 31 of them across seven groups (content, language, style, communication artifacts, filler, jargon, plain speech), and they are worth reading as a list because most of them are invisible until named. "Serves as" reads fine until you notice it is a four-syllable way to write "is".

Two of them do more work than the rest:

- **Say what it does, not how it feels.** "The database stays close at hand" names a feeling. "`.toSQL()` returns the exact string sent to the database" names a mechanism. If a sentence cannot be restated as a concrete instruction, fact, or number, it goes. The sharpest version of this test: if the sentence could appear unchanged in another project's docs, it says nothing about this one.
- **Name the actor.** "Queries are validated" becomes "the compiler validates queries". Passive voice earns its place only when the actor is genuinely unknown or genuinely does not matter.

The em dash rule is absolute and worth calling out, because it is the one people push back on. Em dashes are the single loudest tell, and swapping them for parentheses just trades one tell for another. End the sentence, or use a comma.

## Common questions

**Isn't this the same as `writing-for-agents`?**
No, and the split is the reader. `writing-for-agents` optimises for a reader who has already read everything, so its test is behavioural: delete the line, and did the agent do anything different? `unslop` optimises for a human, so its test is whether the line sounds like a person wrote it. A document can pass one and fail the other. Anything with both audiences, a README or a spec, wants both passes.

**Does it apply to code, or only prose?**
Prose. Code comments and commit messages count as prose and are fair game; identifiers and API design are not what this is for.

**The rules ban words I use legitimately.**
Some of them are ordinary English, and the rule is about frequency and function, not a blocklist. "Landscape" is fine for terrain and a tell when it is abstract. "Harness" is a real word in this repo's own vocabulary and a tell when it is a metaphor for something with a plainer name. Judge each one in place; the skill asks you to reach for the concrete word, not to never use the word.

**Won't stripping the patterns make everything sound the same?**
That is the failure mode the "adding soul" step exists to prevent, and it is the reason the skill treats opinion, rhythm variation, and specificity as part of the job rather than optional polish. A pass that only deletes produces flat, voiceless text that is recognisable as AI-written from a different direction.

## It's working if

- You can read the draft aloud without hitting a sentence that makes you wince.
- Sentence lengths vary. A run of same-length sentences is the rhythm tell.
- Nothing in it would survive being pasted into an unrelated project's docs, because every claim is specific to this one.
- The draft takes a position somewhere, rather than balancing every observation against its opposite.

## Where it fits

This is a reach-for-it-anytime standalone, and the last pass over anything a human will read. Its nearest neighbour is [writing-for-agents](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/productivity/writing-for-agents.md), because the two split the same territory by audience: one governs the documents [models](https://www.aihero.dev/ai-coding-dictionary/model) consume, this one governs the documents people do. It is vendored from [cursor/plugins](https://github.com/cursor/plugins/tree/main/pstack/skills/unslop) rather than written here, so its rules track upstream. When you are unsure which skill or flow fits a task, [ask-mattia](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ask-mattia.md) routes you over the whole set.
