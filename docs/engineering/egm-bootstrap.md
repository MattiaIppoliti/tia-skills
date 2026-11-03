## What it does

Create architectural directory guides for a codebase. The Elephant holds the project context; Goldfish reviewers work from the document and selected source material in fresh contexts.

## When to reach for it

You invoke this by typing `/egm-bootstrap`, and the agent will not reach for it on its own. Reach for it when an existing repository needs component contracts and directory documentation.

## Prerequisites

Install the complete tia-skills repository or plugin, including the shared EGM bundle. Goldfish reviews require a harness that can create fresh reviewer contexts; an unavailable review capability is reported explicitly.

## Common questions

**Can I copy just this skill folder?**

Keep the complete installation: the workflow reads shared reviewer personas, standards, and integration instructions from the bundled EGM files.

**Does an approved design mean the implementation is tested?**

Design review checks the specification. Implementation still needs its own verification.

## It's working if

- Directory guides describe interfaces, invariants, and side effects grounded in source.
- Review steps report missing capabilities instead of claiming an incomplete review passed.

## Where it fits

A standalone design workflow tool. The optional sequence is brainstorm, draft, review, and resolve; bootstrap and drift reporting maintain codebase documentation. Use [code-review](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/code-review.md) for implementation changes. See [ask-mattia](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ask-mattia.md) for the full map.
