---
name: to-plan
description: Turn a PRD, spec, or the current conversation into a sequential plan of tracer-bullet vertical slices, published to the configured tracker — one ordered file for local, or parent-and-sub-issues for a real tracker.
disable-model-invocation: true
---

# To Plan

Turn a plan, spec, or PRD into a **sequential** plan of vertical slices (tracer bullets) — an ordered list of phases you work through one at a time, in a fresh context per phase.

This is the sequential, HITL sibling of `/to-issues`. Where `to-issues` produces independently-grabbable issues for parallel agents, `to-plan` produces one ordered sequence you drive by hand, top to bottom.

The issue tracker and triage label vocabulary should have been provided to you — run `/setup-matt-pocock-skills` if not.

## Process

### 1. Gather context

Work from whatever is already in the conversation context. If the user passes a reference (a PRD path, an issue number or URL) as an argument, fetch it and read its full body.

### 2. Explore the codebase (optional)

If you have not already explored the codebase, do so to understand the current state of the code. Phase titles and descriptions should use the project's domain glossary vocabulary, and respect ADRs in the area you're touching.

Look for opportunities to prefactor the code to make the implementation easier. "Make the change easy, then make the easy change."

### 3. Draft vertical slices

Break the work into **tracer bullet** phases.

<vertical-slice-rules>

- Each slice cuts a narrow but COMPLETE path through every layer (schema, API, UI, tests) — vertical, NOT a horizontal slice of one layer
- A completed slice is demoable or verifiable on its own
- Each slice is sized to fit in a single fresh context window
- Any prefactoring should be done first

</vertical-slice-rules>

Order the phases in dependency order — each builds on the ones before it.

### 4. Quiz the user

Present the proposed breakdown as a numbered list. For each phase, show:

- **Title**: short descriptive name
- **What it delivers**: the end-to-end behaviour this phase makes work

Ask the user:

- Does the granularity feel right? (too coarse / too fine)
- Is the ordering correct — does each phase build on the ones before it?
- Should any phases be merged or split further?

Iterate until the user approves the breakdown.

### 5. Publish the plan to the configured tracker

Publish the approved phases in order. **How** depends on the tracker `/setup-matt-pocock-skills` configured:

- **Local files** → write one sequential `plan.md` in the repo root, all phases in order, using the file template below.
- **A real issue tracker (GitHub, Linear, …)** → create **one parent issue** for the whole plan, then **one sub-issue per phase, in order**. Use the platform's native sub-issue / child-issue relationship if it supports one; otherwise create sequential issues and set each phase's "Blocked by" to the previous phase. Use the issue template below for the parent and each phase.

These are worked **sequentially by hand**, not handed to parallel agents, so do NOT apply the ready-for-agent triage label.

<plan-file-template>

# Plan: <short name of the work>

A one-line summary of what this plan builds. Reference the source PRD or spec if there is one.

## Phases

Each phase is one tracer bullet — a vertical slice worked in a fresh context, top to bottom.

### 1. <Phase title>

**Delivers:** the end-to-end behaviour this phase makes work, from the user's perspective — not a layer-by-layer implementation list.

- [ ] Acceptance criterion 1
- [ ] Acceptance criterion 2

### 2. <Phase title>

...

</plan-file-template>

<issue-template>

**Parent issue** — title: the plan's short name. Body: the one-line summary, a reference to the source PRD/spec, and the ordered list of phase titles.

**Each phase sub-issue:**

## What to build

The end-to-end behaviour this phase makes work, from the user's perspective — not layer-by-layer implementation.

## Acceptance criteria

- [ ] Criterion 1
- [ ] Criterion 2

## Blocked by

The previous phase (omit for the first phase).

</issue-template>

In either form, avoid specific file paths or code snippets — they go stale fast. Exception: if a prototype produced a snippet that encodes a decision more precisely than prose can (state machine, reducer, schema, type shape), inline it and note briefly that it came from a prototype. Trim to the decision-rich parts — not a working demo, just the important bits.

Work the plan one phase at a time with `/implement`, clearing context between phases.
