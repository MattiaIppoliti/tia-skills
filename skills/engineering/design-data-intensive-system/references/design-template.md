# Design deliverable template

Adapt this structure to the user's requested format. Omit sections that do not affect the design.

## 1. Outcome and scope

- User and business outcome
- In scope and out of scope
- Supplied facts, assumptions, and unknowns
- Decision deadline and growth horizon

## 2. Requirements

### Functional paths

List the critical commands, reads, queries, batch jobs, and event flows.

### Nonfunctional requirements

| Requirement | Target | Evidence/source | Validation |
|---|---:|---|---|
| Throughput |  |  |  |
| Latency | p50 / p95 / p99 |  |  |
| Availability |  |  |  |
| Durability |  |  |  |
| RPO / RTO |  |  |  |
| Consistency |  |  |  |
| Retention / deletion |  |  |  |
| Cost / operability |  |  |  |

## 3. Workload and capacity model

Show calculations with units. Useful estimates include:

- retained bytes = average ingest rate x retention duration x storage overhead;
- replicated bytes = logical retained bytes x replication factor;
- required throughput = peak operation rate x work per operation;
- concurrent work = arrival rate x time in system;
- fan-out work = top-level requests x downstream calls per request;
- recovery or rebuild time = data to process / sustained effective throughput.

Include skew, bursts, compaction, indexes, replicas, backups, growth, and a stated headroom factor where relevant. Use ranges when inputs are uncertain.

## 4. Domain and data model

- Entities, relationships, ownership, and lifecycle
- Invariants and transaction boundaries
- System of record
- Derived datasets and rebuild source
- Primary keys, partition keys, indexes, and principal queries
- Schema and encoding evolution

## 5. Architecture

Use a small dataflow diagram when it clarifies three or more components. Label synchronous calls, queues/logs, stores, batch flows, and trust or region boundaries.

For each component:

| Component | Responsibility | State role | Scaling unit | Guarantee | Failure/recovery |
|---|---|---|---|---|---|
|  |  | authoritative / derived / stateless |  |  |  |

## 6. Critical operation walkthroughs

For each critical write or read:

1. Show the normal path.
2. State the atomic boundary and idempotency key.
3. State which result is returned on success, conflict, timeout, or duplicate.
4. Identify stale-read or ordering possibilities.
5. Name metrics and logs that reveal failure or lag.

## 7. Distribution decisions

- Why a single node is or is not sufficient
- Replication purpose, topology, acknowledgment, lag, and failover semantics
- Sharding trigger, key, hot-spot controls, routing, rebalancing, and cross-shard operations
- Region placement and cross-region coordination
- Shared bottlenecks and correlated failure domains

## 8. Evolution and operations

- Compatibility and rolling deployment
- Migration, backfill, validation, cutover, rollback
- Capacity alerts and saturation signals
- Backups, restore drills, reconciliation, and derived-state rebuild
- Data retention, deletion propagation, access control, and auditability

## 9. Alternatives and decisions

| Option | Requirements met | Advantages | Costs or weaker guarantees | Rejection/selection reason |
|---|---|---|---|---|
|  |  |  |  |  |

Avoid a product feature checklist. Compare only credible options against the same workload and invariants.

## 10. Validation and growth plan

- Experiments that could falsify assumptions
- Load and failure scenarios
- Acceptance thresholds
- Immediate design, next scaling trigger, and later option
- Decisions that remain reversible versus hard to reverse
