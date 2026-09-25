## What it does

`teach` explains a system, change, or body of work in plain language: what it is, how it behaves, and why it has that shape. It adapts to the person's question and stops after the useful layer instead of building a persistent course.

## When to reach for it

You invoke this by typing `/teach`, and the agent won't reach for it on its own. Reach for it when you need to understand a subsystem, diff, or design decision before you act. For evidence-backed history and rationale, use [why](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/why.md).

## Build the picture gradually

The explanation begins with the smallest complete definition, then follows the actual flow through the code or behavior. When three or more moving parts matter, small growing diagrams introduce one relationship at a time.

## It's working if

- You can describe the system's job and its main constraint in your own words.
- The explanation uses the actual symbols and behavior instead of a changelog.
- Known facts and inferred rationale remain visibly different.

## Where it fits

`teach` is a reach-for-it-anytime standalone explanation skill. It calls [why](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/why.md) when the rationale matters and complements [wait-what](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/productivity/wait-what.md), which re-explains the current conversation. [ask-mattia](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ask-mattia.md) maps the set.
