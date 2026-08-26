---
name: design-data-intensive-system
description: Design a new data-intensive application or major data architecture from workload, invariants, access patterns, service objectives, and growth assumptions. Use for system-design proposals and architecture decisions, not performance diagnosis of an existing system or repository audits.
---

# Design a data-intensive system

Turn a workload and its invariants into the smallest architecture that can meet them. A component earns its place by protecting a named requirement.

## Before you design

Call the Skill tool with "data-intensive-foundations" before choosing data models, storage, replication, sharding, transactions, or data flows. It routes to the reference that fits the decision.

Read [references/design-template.md](references/design-template.md) when writing the final design or ADR.

## Process

### 1. Explore

Scope before the diagram. Extract the facts already supplied and ask only about a gap that can change the design.

Find the users and operations, read and write paths, current and target volume, growth, retention, traffic shape, access patterns, latency and availability goals, RPO/RTO, geography, privacy, team capacity, and cost limits. Build a small capacity model with units, assumptions, headroom, and the trigger for the next limit.

Name entities, owners, lifecycle, record of truth, derived state, and invariants. Choose transaction and consistency boundaries from those invariants. Select indexes and data models from actual query shapes.

### 2. Present the design

Write a decision record with a small architecture and dataflow map. For every stateful component, state its authority, read and write path, persistence or index, consistency and ordering, scaling unit, failure and recovery behavior, observability, and schema evolution.

Show the alternatives that nearly won. Tie replication to a read, availability, latency, or durability need. Tie sharding to a measured storage or write ceiling. Keep coordination on the narrow path that protects an invariant.

Walk critical operations through timeout before and after commit, duplicate delivery, concurrent update, stale read, dependency loss, overload, corrupted derived state, bad rollout, and restore. Include the rollout, backfill or replay, validation, cutover, rollback, and deletion path.

### 3. Resolve the expensive choices

For every uncertain premise, give the test that can settle it: representative load, query plan, concurrency test, fault injection, failover, replay, reconciliation, or restore drill.

When two viable designs differ on a user-owned trade-off, show both plainly and ask for the choice before presenting it as settled. Keep the design reversible while evidence is thin.

## Boundaries

Design a new system or a major architecture change. Route a measured problem in an existing system to `scale-data-intensive-system`. Route an evidence-backed repository review to `audit-data-intensive-repo`. Check current product documentation before making product-specific claims.
