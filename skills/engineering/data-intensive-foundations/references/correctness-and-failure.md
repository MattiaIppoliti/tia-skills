# Correctness and failure model

## Begin with invariants

Write correctness properties in domain language before selecting mechanisms. Examples include uniqueness, conservation of value, no negative inventory, monotonic state transitions, authorization at the time of effect, and at-most-one externally visible charge.

For each invariant, identify:

- the records, services, partitions, or regions it spans;
- the operation that may violate it;
- the concurrency and failure cases that matter;
- whether prevention, detection plus repair, or compensation is acceptable;
- the strongest evidence that validates the mechanism.

## Distributed failure assumptions

Assume that:

- a request or reply can be lost or delayed, so a timeout leaves the outcome unknown;
- a node can pause, recover, and act on stale knowledge;
- clocks can jump or disagree, while monotonic clocks only measure elapsed time locally;
- retries can duplicate an effect;
- correlated software, configuration, dependency, or operator faults can defeat simple redundancy;
- a slow or partitioned node can be harder to reason about than a clean crash.

Design timeouts as suspicion thresholds, not proof of failure. Bound retries, add jittered backoff where contention or overload can synchronize clients, and use admission control or backpressure so recovery traffic does not amplify an incident.

Use leases or distributed locks with fencing tokens when a paused former owner could resume and write after its lease expired. The resource being protected must reject stale fencing tokens.

## Replication consistency

Asynchronous replicas can serve stale data and may lose recently acknowledged writes during failover. When weaker consistency is acceptable, select the user guarantee deliberately:

- read-after-write for a user's own changes;
- monotonic reads so a client does not move backward in time;
- causal or consistent-prefix reads when dependent events must appear in order;
- convergence rules for concurrent multi-writer updates.

Last-write-wins can silently discard concurrent work and depends on a reliable ordering rule. Use it only when overwriting is valid domain behavior. Where concurrent updates should merge, define a deterministic merge, a CRDT suited to the data type, or a user-visible conflict workflow.

## Transactions and isolation

Atomicity prevents partial application of a transaction. Isolation determines which concurrency anomalies can occur. Durability states what survives acknowledged commit. Treat the configured behavior, not an ACID label, as the guarantee.

Check for:

- dirty reads or writes;
- read skew and nonrepeatable reads;
- phantoms affecting predicate-based decisions;
- lost updates in read-modify-write cycles;
- write skew when concurrent decisions preserve each row but violate a cross-row invariant.

Use the weakest isolation level that demonstrably preserves the invariant. Serializable isolation is the clearest general defense against concurrency anomalies, but may increase aborts, waiting, or coordination. If using weaker isolation, encode the required protection with atomic operations, constraints, explicit locks, compare-and-set, or invariant-specific redesign, then test the actual database configuration.

Keep transactions short. Interactive work, network calls, and user input inside a transaction increase contention and ambiguous outcomes.

## Idempotence and exactly-once effects

Separate delivery semantics from externally visible effects. A broker claiming exactly-once processing does not automatically deduplicate an email, payment, API call, or write to an unrelated store.

For a retryable operation:

1. Carry a stable operation or message identifier end to end.
2. Record that identifier atomically with the local state change or use a datastore-supported conditional write.
3. Return the prior result for a duplicate when callers need response stability.
4. Define retention and scope for deduplication records.
5. Make downstream side effects idempotent, transactional with their record, or compensatable.

When publishing a change from a database, prefer a transactional change record, outbox pattern, or database change capture over an uncoordinated database write followed by a broker publish.

## Consensus and linearizability

Linearizability is appropriate when clients must observe a single, current order of operations. Consensus-backed mechanisms are commonly required for fault-tolerant leader election, uniqueness, locks, leases, compare-and-set, total-order logs, and some atomic commits.

Ask whether the invariant truly requires a global current decision. If it can be scoped by tenant, key, or partition, coordination can often be localized. If stale reads or later repair are acceptable, cache or asynchronously propagate state and reserve linearizable access for the narrow decision path.

Do not build a home-grown consensus or failure detector when a well-tested datastore or coordination service already provides the needed primitive.

## Verification and recovery

Use layered evidence:

- unit and property tests for domain invariants;
- concurrency tests that force conflicting interleavings;
- fault injection for crashes, timeouts, duplicate delivery, partial writes, lag, and failover;
- model-based or randomized tests for distributed state machines when risk warrants it;
- reconciliation that compares derived state with its source of truth;
- backup restoration drills and measured RPO/RTO;
- invariant metrics, lag metrics, dead-letter visibility, and audit trails.

A replica is not a backup. Test recovery from deletion, corruption, operator error, compromised credentials, and bad deployments, not only machine loss.
