---
name: design-data-intensive-system
description: Design a new data-intensive application or major data architecture from workload, invariants, access patterns, service objectives, and growth assumptions. Use for system-design proposals and architecture decisions, not performance diagnosis of an existing system or repository audits.
---

# Design a Data-Intensive System

Design against the stated workload and invariants. Keep the user's product constraints. Add a datastore or distributed component only when a requirement pays for it.

## Before you design

Call the Skill tool with "data-intensive-foundations" before choosing data models, storage, replication, sharding, transactions, or data flows. It routes to the reference that fits the decision.

Read [references/design-template.md](references/design-template.md) when writing the final design or ADR.

## Workflow

### 1. Set the workload

Extract the facts already supplied. Label harmless gaps as assumptions. Ask only for missing inputs that can change the design.

Define users and operations, read and write paths, data volume and growth, retention, traffic distribution and peaks, access patterns, latency percentiles, availability, durability, RPO/RTO, geographic needs, privacy or regulatory constraints, team capacity, and cost boundaries.

Build a small capacity model. Show units and assumptions. Include current load, design load, headroom, and the date or threshold at which each limit arrives.

### 2. Set the data rules

Name entities, relationships, lifecycle, ownership, and invariants. Identify the system of record and each derived view. Choose transaction or consistency boundaries from the invariants, never from a database label.

Select data models and indexes from the actual query shapes. State why normalization, denormalization, materialization, search, graph traversal, vector retrieval, or analytical storage is or is not needed.

### 3. Draw the smallest architecture that works

Start with the smallest topology that meets the requirements. Define components by responsibility and data flow, not vendor name. Then map them to the user's products or a short list of real options.

For every component, state:

- authoritative versus derived data;
- read and write path;
- persistence and indexing;
- consistency and ordering;
- scaling unit and likely bottleneck;
- failure behavior, recovery, and observability;
- schema and deployment evolution.

### 4. Add distribution only for a reason

If replication is needed, tie topology and acknowledgment to availability, latency, durability, and read-consistency goals. If sharding is needed, choose a key from measured distribution and query locality. Cover hot partitions, routing, rebalancing, secondary indexes, and cross-shard work.

Keep global coordination on the narrowest path that protects an invariant. State the latency and availability cost of cross-region or cross-shard decisions.

### 5. Walk the failures

Walk critical operations through timeout before commit, timeout after commit, duplicate delivery, concurrent update, stale replica, node or dependency loss, overload, lag, corrupted derived state, bad deployment, and accidental deletion. Include idempotency, backpressure, reconciliation, backups, restore drills, and rebuild time where relevant.

### 6. Keep change reversible

Specify compatibility, rollout order, backfill or replay, validation, cutover, rollback, retention, and deletion propagation. Prefer versioned derived views and parallel rebuilds over in-place irreversible migration.

### 7. Prove the risky parts

Define tests or experiments for the uncertain assumptions: representative load tests, query plans, concurrency tests, fault injection, failover, replay, reconciliation, and restoration. Check current authoritative product documentation for guarantees and limits before making product-specific claims.

## Done when

The design is complete when every material requirement and invariant maps to a component or mechanism, every authoritative and derived dataset has an owner and recovery path, every distributed boundary has explicit failure semantics, capacity assumptions are visible, and the proposal includes a reversible growth path plus validation plan.
