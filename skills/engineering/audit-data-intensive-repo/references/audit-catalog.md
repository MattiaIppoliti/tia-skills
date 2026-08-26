# Audit catalog

Use this as an exhaustive routing checklist, not a demand to create a finding in every section. Mark each domain assessed, not applicable, or blocked by missing evidence.

## 1. Requirements and workload

- Are latency objectives percentile-based and measured end to end?
- Are throughput, retained data, growth, burst, skew, and fan-out visible?
- Are SLOs, availability, durability, RPO, RTO, and freshness requirements explicit?
- Do load tests use representative data size, access distribution, concurrency, and cold/warm state?
- Does capacity include failover, maintenance, compaction, backups, replay, rebalancing, and retry storms?
- Are per-tenant or per-key hot spots observable?

Evidence: SLOs, dashboards as code, alerts, load tests, benchmark fixtures, rate limits, capacity docs, incident notes, and configuration. Missing production metrics remain unknown.

## 2. Authority, data model, and lifecycle

- Is one system authoritative for each fact?
- Are derived caches, indexes, views, aggregates, features, and exports identifiable and rebuildable?
- Does the data model match relationship and query shape?
- Are domain invariants enforced at the correct boundary?
- Can records transition only through valid lifecycle states under concurrency?
- Does denormalized data have atomic updates, a changelog, repair, or reconciliation?
- Are deletion, retention, correction, and provenance propagated to derived copies?

Evidence: schemas, models, migrations, repositories/data access layers, event definitions, backfills, reconcilers, retention jobs, and tests.

## 3. Query and storage access paths

- Does every critical query have a bounded access path?
- Are pagination and result limits stable and deterministic?
- Are N+1 calls, unbounded scans, offset pagination at large depth, or broad fan-out present?
- Do composite index order, selectivity, and covering behavior match the query?
- Are analytical scans isolated from transactional latency-sensitive work?
- Are full-text, spatial, vector, graph, or columnar capabilities used only for matching query shapes?
- Are index write amplification, compaction, vacuum, memory, and storage costs considered?

Evidence: query definitions, ORM generation, migrations, explain-plan fixtures, pagination code, timeouts, and profiles. Index presence alone does not prove use.

## 4. Encoding, contracts, and schema evolution

- Can old and new code exchange stored records, API payloads, events, and workflow state during rolling deployment?
- Are field addition, removal, rename, defaults, nullability, numeric range, enum growth, and unknown values handled?
- Are consumer and producer deployment orders reversible?
- Can backfills resume, throttle, validate, and roll back?
- Are dual-read or dual-write periods bounded and reconciled?
- Is unsafe language-native deserialization avoided for untrusted data?
- Do event schemas preserve durable business meaning rather than transient table shape?

Evidence: schemas, serializers, compatibility settings, contract tests, migration scripts, feature flags, workflow versioning, and deployment configuration.

## 5. Transactions and concurrency

- Which writes must be atomic together, and is that boundary real in the configured datastore?
- Can read-modify-write lose updates?
- Can predicate-based decisions suffer write skew or phantoms?
- Are uniqueness and foreign-key-like invariants enforced atomically or reconciled deliberately?
- Are transaction isolation and retry behavior explicit?
- Do transactions contain remote calls, user interaction, large scans, or long computation?
- Are lock order, deadlock handling, optimistic conflict detection, and retry limits safe?
- Are transaction results handled correctly when the client times out after commit?

Evidence: transaction wrappers, SQL, ORM settings, constraints, locks, conditional writes, retry loops, and concurrency tests.

## 6. Retries, idempotency, and external effects

- Does a stable idempotency or message key cross retries and service boundaries?
- Is deduplication recorded atomically with the local effect?
- Are dedupe scope, retention, and replay behavior defined?
- Can retries repeat payment, email, webhook, file write, publish, or other irreversible effects?
- Is a database change plus event publication coordinated through a transaction, outbox, CDC, or repairable protocol?
- Are retries bounded, classified by error, delayed with jitter when needed, and covered by a retry budget?
- Can dead-letter or poison-message handling lose ordering or hide permanent failure?

Evidence: API handlers, job consumers, message metadata, outbox/CDC, dedupe tables, retry policy, DLQ tooling, and tests for duplicates and ambiguous timeout.

## 7. Replication, caching, and consistency

- What objective does each replica or cache serve?
- Which paths can read stale data, and what user guarantee applies?
- Can a user fail to read their own write or move backward between replicas?
- What happens to acknowledged writes during failover?
- Are cache invalidation, TTL, stampede protection, cold start, and source bypass safe?
- Does follower or cache load during recovery overwhelm the source?
- Are conflict detection and resolution correct for multi-writer operation?
- Are replicas spread across genuinely independent failure domains?

Evidence: client routing, consistency options, cache code, failover configuration, topology, lag metrics, conflict handling, and integration tests. Provider-managed settings absent from the repo are unknown.

## 8. Sharding, tenancy, and locality

- Does the partition key distribute both bytes and requests?
- Can sequential keys, celebrity entities, large tenants, or time buckets create hot partitions?
- Are critical operations single-shard, or do they require scatter-gather or cross-shard transactions?
- Are local/global secondary-index trade-offs understood?
- Can shards split, move, and rebalance without unbounded load or downtime?
- Is routing resilient to stale shard maps?
- Is blast radius isolated by shard, cell, tenant, zone, or region?
- Can global uniqueness or ordering become a coordination bottleneck?

Evidence: keys, router code, shard configuration, tenancy mapping, indexes, resharding tooling, distribution tests, and operational runbooks.

## 9. Distributed failure and coordination

- Are timeouts treated as unknown outcomes rather than proof an operation failed?
- Can a paused process resume with stale ownership?
- Do leases or locks use fencing at the protected resource?
- Are wall clocks used for ordering, uniqueness, expiration, or correctness beyond their guarantees?
- Is consensus-backed coordination used for decisions that require a single current order?
- Is global coordination broader than the invariant requires?
- Can dependency fan-out or retry synchronization create metastable overload?
- Are correlated deployments, configuration, credentials, or dependencies single failure domains?

Evidence: timeout and retry code, lock/lease implementation, timestamps and IDs, leader election, coordination service clients, dependency graph, rollout configuration, and fault tests.

## 10. Queues, logs, batch, and streams

- Is a task queue used for single-consumer work and a retained log for replay/multiple consumers?
- Do partition count and key support required parallelism, order, and distribution?
- Is retention longer than the maximum promised outage or rebuild window?
- Are backlog, oldest-message age, consumer lag, retries, and poison messages observable?
- Are producers backpressured or rate-limited before durable buffers exhaust capacity?
- Do batch jobs use immutable/versioned input and publish output atomically?
- Are event time, processing time, windows, watermarks, and late data explicit?
- Can stateful processors checkpoint, restore, replay, and deduplicate outputs within RTO?
- Are stream joins bounded and their time semantics correct?

Evidence: broker config, producer/consumer code, offsets, schemas, orchestration, DAGs, checkpointing, state stores, window code, and replay tools.

## 11. Recovery, integrity, and observability

- Are backups independent from replicas, immutable where needed, encrypted, retained, and restored in drills?
- Are measured RPO/RTO and rebuild times within requirements?
- Can bad migrations, accidental deletion, corruption, compromised credentials, and regional loss be recovered?
- Are derived datasets reconciled with their source?
- Are invariant violations, replication/consumer lag, queue age, data freshness, transaction aborts, and dedupe conflicts observable?
- Do logs and traces carry operation/message IDs across the dataflow?
- Are runbooks and ownership clear for data repair and replay?
- Do audit trails preserve required integrity and access controls?

Evidence: backup configuration, restore tests, reconciliation jobs, invariant checks, metrics, trace propagation, runbooks, and incident tooling.

## 12. Operability, evolution, and responsibility

- Is the architecture simpler than the requirement demands, or does it contain unjustified stores and coordination?
- Are failure modes, limits, ownership, and operational controls understandable to the team?
- Are migrations, reprocessing, and cutovers observable, throttled, resumable, and reversible?
- Are data collection and retention minimized to explicit purposes?
- Are privacy, consent, access, deletion, bias, appeal, and audit needs represented where data affects people?
- Are cloud/service costs, egress, quotas, and lock-in relevant to recovery or growth?
- Does the design allow safe change without an all-at-once migration?

Evidence: architecture decisions, ownership files, runbooks, privacy and retention config, deletion workflows, policy tests, cost controls, quotas, and migration tooling.

## Cross-cutting audit tests

Apply these scenarios to critical paths where relevant:

1. Two clients update related state concurrently.
2. A request commits but its response is lost, then the client retries.
3. A consumer handles the same message twice or crashes after the effect but before acknowledgment.
4. A replica or cache lags during a user read.
5. One shard, zone, broker partition, or dependency becomes slow rather than fully unavailable.
6. Traffic spikes while retrying and a queue or pool is near capacity.
7. Old and new schema versions overlap during deployment and rollback.
8. A derived index or view is corrupted and must be rebuilt while serving traffic.
9. A backup must restore after accidental deletion or a bad migration.
10. A deletion or correction must reach every derived copy and export.
