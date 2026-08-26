---
name: scale-data-intensive-system
description: Diagnose and improve an existing application's ability to handle more data, traffic, concurrency, or analytical work. Use for bottleneck analysis, capacity planning, performance and reliability improvements, or a scaling roadmap; not greenfield architecture or a broad repository audit.
---

# Scale a Data-Intensive System

Turn "handle more" into a named load parameter and a measurable target. Then remove the first real limit without quietly weakening correctness.

If the user asks for analysis or a plan, keep the work read-only. If the user asks for implementation, make the smallest validated change that addresses the evidenced bottleneck and preserve rollback.

## Before you change anything

Call the Skill tool with "data-intensive-foundations" before changing storage, replication, sharding, transactions, queues, logs, caches, or derived data.

Read [references/improvement-ladder.md](references/improvement-ladder.md) before choosing the change.

## Workflow

### 1. Name what grows

Specify what grows: requests, writes, reads, data retained, tenants, key cardinality, event rate, query complexity, geographic distance, or batch/stream volume. Record current, peak, target, growth rate, service objective, and time horizon. If production evidence is unavailable, state a testable range instead of inventing precision.

### 2. Measure the baseline

Trace one critical read and one critical write end to end. Measure or collect:

- throughput, latency distribution, errors, timeouts, and queueing;
- CPU, memory, allocation or garbage collection, disk IOPS and bandwidth, network, connections, locks, and thread or worker pools;
- database query plans, rows examined, index use, cache hit rate, transaction duration, contention, replication lag, and shard skew;
- broker backlog, consumer lag, batch stage duration, shuffle or spill, checkpoint time, and retry volume where present;
- workload distribution by endpoint, tenant, key, query, payload size, and time.

Separate observed bottlenecks from hypotheses and unknowns. A utilization chart without the corresponding request or data distribution is incomplete evidence.

### 3. Find the first limit

Use saturation, queue growth, tail latency, and throughput flattening to find the first constraint. Check fan-out and tail amplification, hot keys, global locks, connection pools, cross-shard work, metadata services, rate limits, and synchronous dependency chains.

Reproduce the limit with a representative workload when safe. Preserve a red baseline that the proposed change must improve.

### 4. Pick the cheapest change that works

Use the improvement ladder as an order of evidence and reversibility, never as a ritual. Fix the query, data model, batching, or resource settings before adding distributed topology when they address the limit. Scale vertically while it stays simpler. Add replicas for a named read or availability need. Add shards for a measured storage or write-throughput ceiling.

For each candidate, state:

- bottleneck hypothesis and supporting evidence;
- expected metric movement and capacity ceiling after the change;
- invariant, consistency, freshness, or recovery cost;
- operational and monetary cost;
- rollout, observation window, abort threshold, and rollback.

### 5. Cover overload and recovery

Define admission control, bounded queues, backpressure, timeouts, retry budgets, jitter, load shedding, and degraded modes appropriate to the workload. Verify that retry or failover traffic cannot create duplicate effects or a recovery storm.

Capacity planning must include rebuild, rebalancing, compaction, backup, failover, and maintenance headroom, not only steady-state serving.

### 6. Test the same workload

Test the changed system at current and target load with realistic skew, data size, concurrency, and cold/warm state. Compare latency percentiles, throughput, errors, saturation, lag, and cost. Run relevant concurrency, fault, failover, replay, and restore tests. Treat a benchmark that bypasses the real critical path as weak evidence.

### 7. Leave triggers for later work

Separate now, next, and later. Define a measurable trigger for each future step, such as sustained p99 breach, storage headroom, hot-partition share, replication lag, queue age, or restore time. Avoid speculative infrastructure without a trigger.

## Done when

The work is complete when the limiting constraint is supported by evidence, the recommendation has an expected measurable effect and correctness analysis, validation compares the same representative workload before and after, rollback is practical, and future scaling steps have explicit triggers.
