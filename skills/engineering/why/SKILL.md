---
name: why
description: "Investigate why code has its current shape: decisions, constraints, rejected alternatives, and regressions. Use for design rationale, archaeology, postmortems, or a threshold whose origin is unclear."
---

# Why

Investigate intent, not mechanics. Code can show what it does, but it rarely proves why it exists. Build an evidence-backed account of the constraints and decisions that shaped it.

## Establish the anchor

Start with the relevant paths, symbols, line ranges, recent commits, and linked pull requests or issues. Read enough code to target the investigation, but never cite code shape as proof of its own motivation.

## Collect evidence

Search every available evidence source that could answer the question: source control and pull requests, issues, design documents, chat, observability, error tracking, and product analytics. Search independent sources in parallel when the environment supports it. Record unavailable sources and searches with no result, not only positive evidence.

Prefer primary records such as a pull-request discussion, ticket, incident report, dashboard, or commit that introduced the change. Check whether the timeline supports the proposed explanation.

## Separate knowledge from inference

For each claim, classify it clearly:

- **Direct evidence**: a source explicitly states the rationale.
- **Inference**: evidence supports the explanation, but no source states it directly. Explain the chain and use calibrated language such as "appears" or "likely".
- **Unknown**: the available record cannot support an answer.

Surface contradictions and plausible competing explanations. An honest gap is more useful than a smooth story.

## Reply

Give the code anchor, direct findings with citations, reasoned inferences, competing hypotheses when relevant, and a compact list of sources consulted or unavailable. If the question precedes a change, end with Preserve, Change, Avoid, and Risk constraints derived from the evidence.
