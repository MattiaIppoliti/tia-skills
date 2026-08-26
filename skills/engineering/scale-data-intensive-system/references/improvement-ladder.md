# Improvement ladder

Choose the earliest rung that addresses the evidenced constraint. Skip a rung when it does not fit the workload; do not promote a rung merely because it is architecturally fashionable.

## 1. Remove accidental work

Look for N+1 queries, unbounded scans, repeated serialization, redundant downstream calls, duplicated computation, oversized payloads, chatty transactions, missing pagination, and retries without a budget.

Evidence: profiles, traces, query logs and plans, rows scanned versus returned, allocation profiles, request fan-out, and per-operation I/O.

Risk: a faster implementation can change ordering, visibility, authorization, or transaction scope. Preserve behavior with representative tests.

## 2. Fix the access path

Candidate changes include a better composite, partial, covering, spatial, full-text, or vector index; query rewrite; partition pruning; bulk access; reduced result sets; or a storage layout suited to the read/write shape.

Evidence: query plan, cardinality and selectivity, index hit rate, scanned bytes, cache behavior, write amplification, compaction, and index size.

Risk: every index adds write, storage, memory, vacuum/compaction, migration, and recovery cost. Name the query served by each index.

## 3. Reshape computation

Batch small operations, precompute repeated results, move large analytical scans away from the transactional path, exploit vectorized or columnar processing, and schedule work to flatten peaks.

Evidence: per-item overhead, queueing, CPU efficiency, I/O size, repeated aggregations, and peak-to-average ratio.

Risk: batching adds waiting and partial-failure boundaries; precomputation adds staleness and repair work.

## 4. Cache, denormalize, or materialize

Use a cache or derived view when a measured read path dominates and freshness can be defined. Prefer an authoritative source plus a replayable or repairable derivation.

Evidence: reuse ratio, hit-rate estimate, source latency and load, recomputation cost, and acceptable staleness.

Specify cache key, ownership, invalidation/update mechanism, TTL, stampede control, negative caching, consistency promise, cold-start behavior, and rebuild or reconciliation.

Risk: stale or split authority, thundering herds, memory pressure, privacy/deletion leakage, and an outage when the cache is bypassed.

## 5. Tune and scale the current node

Right-size CPU, memory, storage, network, connection pools, worker pools, buffers, compaction, and database configuration. Vertical scaling is often the lowest-complexity way to buy headroom.

Evidence: saturation at the constrained resource and an estimate of the new ceiling. Check whether the license, service tier, disk class, or shared host is the real cap.

Risk: larger failure domain, nonlinear cost, longer restart or recovery, and a hard future ceiling.

## 6. Decouple with asynchronous work

Add bounded queues for smoothing bursts or isolating slow work. Add a retained log when independent consumers, ordered history, or replay are needed. Use batch for freshness-tolerant bulk work and streaming for continuous low-latency updates.

Evidence: synchronous critical-path time, burstiness, producer/consumer mismatch, downstream outages, and need for replay or fan-out.

Specify ordering key, queue or log capacity, retention, backpressure, duplicate handling, poison messages, lag objective, state recovery, and user-visible completion semantics.

Risk: delayed visibility, duplicate effects, unbounded backlog, schema drift, opaque partial completion, and more operational state.

## 7. Replicate

Use replicas to improve read capacity, availability, durability, or geographic latency. A replica does not expand single-leader write capacity and is not a backup.

Evidence: reads saturate the primary, availability target exceeds a node's failure domain, or user latency requires local reads.

Specify synchronous/asynchronous acknowledgment, routing, lag, failover, acknowledged-write loss, read-after-write, monotonic reads, stale-read tolerance, and topology correlation.

Risk: stale reads, failover data loss, conflict resolution, operational complexity, and higher cost.

## 8. Shard or isolate cells

Shard when storage or write throughput cannot fit one node, or use cells for tenant and failure isolation. Choose a key that distributes both bytes and requests while keeping critical operations local.

Evidence: measured single-node ceiling, forecast crossing date, key/tenant distribution, query locality, and cross-key operation frequency.

Specify range versus hash behavior, hot-key controls, large tenants, routing, secondary indexes, resharding, rebalancing load, cross-shard transactions, scatter-gather, and per-shard recovery.

Risk: skew, hot partitions, operational tooling, global query cost, cross-shard coordination, and irreversible data placement choices.

## 9. Add a specialized store

Introduce a search engine, analytical warehouse, graph database, vector index, object store, or time-series engine only when a dominant access pattern benefits enough to justify another copy and operational surface.

Evidence: the existing store cannot meet the query shape or cost target after simpler changes, and the new store's advantage is validated with representative data.

Specify authority, propagation, lag, reconciliation, rebuild, schema ownership, deletion, backfill, and failure behavior.

Risk: dual writes, inconsistent views, extra on-call load, data governance sprawl, and vendor/service limits.

## Experiment card

For each proposed improvement, record:

| Field | Content |
|---|---|
| Constraint | Resource or coordination point currently limiting the target |
| Evidence | Trace, metric, query plan, profile, benchmark, incident, or capacity calculation |
| Change | Smallest intervention expected to move the constraint |
| Expected result | Metric and magnitude or range |
| Correctness impact | Invariants, consistency, freshness, duplicate, or recovery effects |
| Test | Representative workload and acceptance threshold |
| Guardrail | Error, saturation, lag, cost, or invariant threshold that aborts rollout |
| Rollback | Steps and data compatibility needed to revert |
| New ceiling | Next expected bottleneck and estimated trigger |

## Capacity notes

Model steady state and exceptional work:

- normal peak plus growth and safety margin;
- failover with one failure domain unavailable;
- maintenance, compaction, backup, replay, rebuild, and resharding;
- cold-cache and restart behavior;
- retry amplification during dependency failure;
- skew by key, tenant, partition, and query class.

Throughput improvement without stable tail latency, bounded queues, and recoverability is not a complete scaling result.
