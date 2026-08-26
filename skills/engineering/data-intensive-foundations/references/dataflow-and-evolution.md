# Dataflow and evolution

## Model the dataflow

Draw sources, transformations, durable boundaries, and sinks. Mark systems of record separately from derived state. For each edge, record:

- push, pull, request/response, task queue, retained log, CDC, or batch transfer;
- ordering and delivery semantics;
- schema and compatibility owner;
- retry, deduplication, and backpressure behavior;
- expected and maximum tolerable lag;
- replay position, retention, and rebuild procedure.

Prefer derivations that are deterministic enough to replay. A cache, search index, analytical table, or model feature is safer when it can be rebuilt from immutable or versioned input.

## Encoding and schema evolution

Rolling deployments create periods when old and new code exchange data. Require:

- backward compatibility when new code reads old data;
- forward compatibility when old code reads new data;
- explicit handling for field addition, removal, renaming, defaults, numeric range, nullability, and unknown values;
- migration sequencing across writers, stored data, readers, and rollback;
- contract tests using both current and adjacent schema versions.

Language-native object serialization can couple data to one runtime and introduce unsafe deserialization. Text formats are interoperable but need precise conventions. Schema-driven binary formats can provide compact encoding and explicit compatibility rules. Choose according to longevity, interoperability, performance, and governance.

## Service calls, workflows, and events

Synchronous RPC is useful when the caller needs an immediate result, but it couples availability and latency across the call graph. Bound fan-out, propagate deadlines, and make retry safety explicit.

Durable workflow engines can preserve multi-step progress across process failure. Workflow code and activity interfaces still need deterministic or version-aware evolution.

Event-driven flows decouple producers and consumers in time, but move complexity into ordering, lag, duplicate handling, schema governance, observability, and recovery. Choose them for an actual decoupling, buffering, fan-out, or replay need.

## Task queues versus retained logs

Use a task queue when each item should be handled by one worker and replay of old work is unnecessary. Use a partitioned retained log when consumers need ordered history, independent offsets, replay, or multiple projections.

Log partition count limits parallelism for order-preserving consumers. The partition key defines ordering scope and hot-key risk. Retention must cover the longest outage or rebuild window that the design promises.

## CDC and event sourcing

CDC exposes database changes as a stream and is useful for keeping derived systems synchronized without dual writes. Verify snapshot/bootstrap behavior, ordering, schema changes, deletes, transaction boundaries, and connector recovery.

Event sourcing makes domain events the record of truth. Events must capture durable business meaning, not merely current table mutations. Plan for corrections, privacy-driven deletion or redaction, versioned event interpretation, and projection rebuild time.

Do not make two writable representations authoritative unless conflict resolution is a first-class domain rule.

## Batch and stream processing

Batch processing operates on bounded, usually immutable input. It favors reproducibility, bulk efficiency, and easy reruns. Separate orchestration, storage, and computation concerns. Design jobs so failed partial output is not published as a complete dataset; versioned output plus atomic publication is a useful pattern.

Stream processing operates continuously on unbounded input. Define:

- event time versus processing time;
- windows, watermarks, and late-event policy;
- state size, placement, checkpointing, and restore time;
- replay and output deduplication;
- backpressure and overload behavior;
- stream-stream, stream-table, or table-table join semantics.

Use batch when freshness requirements allow it. Add streaming when continuous updates, lower latency, or event-driven reactions justify its state and operational cost. A hybrid can bootstrap from batch and then apply incremental changes.

## Derived state and integration

Maintain search indexes, caches, aggregates, warehouses, and other views from an authoritative changelog or reproducible transformation. For each view, state:

- freshness objective and observed lag;
- whether reads can tolerate stale or missing entries;
- repair and full rebuild paths;
- cutover strategy for a new projection version;
- integrity checks against the source.

Loose coupling limits fault propagation, but asynchronous correctness needs end-to-end identifiers, invariant checks, and reconciliation. A locally successful write is not proof that the whole dataflow reached a correct state.

## Reversible evolution

Favor migrations that preserve rollback:

1. make readers accept both old and new forms;
2. deploy writers that produce the new form while maintaining compatibility;
3. backfill or rebuild derived data with measured progress and validation;
4. switch reads behind a reversible control;
5. retire the old form only after the rollback window and retention obligations close.

Version outputs and transformations. Rebuild alongside the current view, compare results, then switch atomically where practical.

## Data responsibility

Collect data for an explicit purpose, retain it for a justified period, and propagate deletion or correction into derived state, backups, exports, and training data according to applicable policy and law. Treat privacy, appealability, bias, and auditability as architectural requirements when data affects people.
