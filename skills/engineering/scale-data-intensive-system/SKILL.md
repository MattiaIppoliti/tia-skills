---
name: scale-data-intensive-system
description: Diagnose and improve an existing application's ability to handle more data, traffic, concurrency, or analytical work. Use for bottleneck analysis, capacity planning, performance and reliability improvements, or a scaling roadmap; not greenfield architecture or a broad repository audit.
---

# Scale a data-intensive system

Find the first real limit. Move it without quietly weakening correctness.

## Baseline

Call the Skill tool with "data-intensive-foundations" before changing storage, replication, sharding, transactions, queues, logs, caches, or derived data.

Read [references/improvement-ladder.md](references/improvement-ladder.md) before choosing the change.

Name what grows: requests, reads, writes, retained data, tenants, key cardinality, event rate, query complexity, distance, or batch and stream volume. Record current, peak, target, growth rate, service objective, and horizon. Use a testable range when production evidence is missing.

Trace one critical read and write. Pair throughput, latency, errors, timeouts, and queueing with resource saturation and workload distribution. Separate `observed`, `hypothesis`, and `unknown`.

## Hunt

Look for queue growth, tail latency, throughput flattening, bad query plans, cache misses, fan-out, hot keys, locks, connection pools, cross-shard work, replica lag, broker backlog, consumer lag, slow batch stages, retries, and recovery work.

Reproduce the first constraint with representative data shape, skew, concurrency, and cold or warm state when safe. Keep the red baseline that the change must beat.

## Output

One line per ranked candidate: `<tag> <first limit>. <evidence>. <smallest change>. <invariant or recovery cost>. <validation and rollback>.`

Use `query:`, `shape:`, `capacity:`, `flow:`, `replica:`, `shard:`, or `recovery:` as the tag. End with `next: <metric> <threshold>`, not a calendar date.

If the user asks for implementation, apply only the smallest validated candidate and preserve rollback. Otherwise, keep the work read-only.

## Boundaries

Scale an existing system with a named workload. Do not choose topology from the word "scale". Route greenfield design to `design-data-intensive-system` and a broad codebase risk review to `audit-data-intensive-repo`.
