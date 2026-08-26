# Decision axes

Use these axes to compare viable designs. Apply only the axes that affect the request.

## Workload and service objectives

Characterize load with parameters that drive architecture:

- records, bytes, and events ingested per second;
- retained data, growth rate, and retention policy;
- read/write ratio, burstiness, skew, and hot keys or tenants;
- access patterns: point lookup, range scan, join, aggregation, traversal, text search, vector similarity, or full scan;
- fan-out per request and the size and frequency of payloads;
- latency percentiles, throughput target, concurrency, availability, durability, recovery point objective, and recovery time objective;
- expected growth horizon and required safety margin.

Prefer percentiles and distributions over averages. A user-visible request that fans out to many downstream calls is governed by the slow tail, not the average child request.

Distinguish scalability from performance. Performance describes behavior at the current load. Scalability describes the design's options for preserving acceptable behavior as a named load parameter grows.

## Data role

Classify each store or dataset:

- **Operational (OLTP):** many small, low-latency reads and writes, commonly by key or index.
- **Analytical (OLAP):** scans and aggregations across many records, often with columnar layout and compression.
- **System of record:** authoritative facts from which other state can be derived.
- **Derived data:** caches, indexes, views, search documents, aggregates, features, or exports computed from a record of truth.

Keep authority unambiguous. If two stores can both accept changes to the same fact, define conflict resolution and convergence; otherwise designate one as authoritative and propagate changes outward.

## Deployment shape

### Single node versus distributed

A single node avoids network partitions, cross-node coordination, distributed clocks, and partial failure. Prefer it while capacity, availability, and geographic latency requirements allow. Scale vertically or use embedded/local storage when that satisfies the workload.

A distributed design is justified by a concrete need such as:

- the dataset or write rate no longer fits one node;
- service continuity must survive node, zone, or region loss;
- reads must be served near distant users;
- independent failure domains or organizational boundaries are required.

Record which need justifies each distributed component.

### Cloud versus self-hosted

Compare elasticity, managed operations, service limits, data gravity, egress, failure domains, lock-in, observability, compliance, staffing, and predictable versus variable cost. Treat a managed service as outsourced operations, not eliminated operations.

### Shared resources versus shared-nothing

Check whether compute, memory, disk, network, metadata, or a coordination plane remains a shared bottleneck. A nominally distributed design can still have a single scaling or failure choke point.

## Data model and query shape

Choose a model from the dominant relationships and queries:

| Model | Strong fit | Main pressure points |
|---|---|---|
| Relational | constraints, joins, many-to-one and many-to-many relationships, transactional updates | impedance mismatch, horizontal partitioning of join-heavy workloads |
| Document | self-contained aggregates fetched or updated together | cross-document relationships, joins, duplicated data consistency |
| Graph | variable-depth traversal and richly connected data | operational maturity, partitioned traversal, broad analytical scans |
| Event log / event sourcing | immutable history, temporal reasoning, multiple projections | projection lag, schema evolution, correction semantics, event meaning |
| DataFrame / array | analytics, ML, scientific and high-dimensional operations | operational point updates and transactional constraints |

Schema-on-read moves enforcement into every reader; it does not remove schema. State where shape and invariants are enforced.

Normalize when consistency of shared facts dominates. Denormalize or materialize when a measured read path needs it, while specifying the update mechanism, acceptable staleness, repair process, and rebuild source.

## Storage and retrieval

Match the physical access path to queries:

- B-tree-like indexes favor predictable reads, ordered access, and range queries.
- Log-structured storage often favors sustained write throughput but pays compaction and read-amplification costs.
- Column-oriented storage, compression, vectorized execution, and partition pruning favor analytical scans.
- Covering, composite, partial, spatial, full-text, and vector indexes solve different query shapes and add write, storage, and maintenance cost.
- In-memory state lowers access latency but requires an explicit durability and recovery story.

Every proposed index should name the query it serves. Check prefix/order rules, selectivity, cardinality, write amplification, index size, and whether a query still touches many partitions.

## Replication

Choose replication for a stated objective: availability, durability, geographic latency, disconnected operation, or read throughput. It is not a substitute for backups.

Compare:

- synchronous versus asynchronous acknowledgment;
- single-leader, multi-leader, and leaderless write paths;
- failover behavior and the possibility of losing acknowledged writes;
- replica lag and required read-after-write, monotonic-read, or causal-prefix guarantees;
- conflict detection and resolution for concurrent writes;
- topology correlation across racks, zones, regions, accounts, or providers.

State which reads may be stale and how callers that require fresh data get it.

## Sharding

Shard only when one node cannot meet storage or throughput requirements, or when tenant/failure isolation makes it worthwhile. Select keys using both data volume and request distribution.

- Range sharding supports ordered/range access but may create sequential hot spots.
- Hash sharding spreads load more evenly but loses efficient global ordering.
- A compound key can choose a partition first and retain useful ordering within it.
- Local secondary indexes simplify writes but can require scatter-gather reads.
- Global secondary indexes narrow reads but add cross-shard update and consistency work.

Evaluate hot keys, large tenants, resharding, request routing, rebalancing, cross-shard transactions, secondary indexes, and the blast radius of a shard. Scaling fails when a critical operation touches every shard or a single partition receives a disproportionate share of traffic.

## Coordination and consistency

Use strong coordination only for invariants that require a single current decision, such as uniqueness, compare-and-set, leader election, a lock with fencing, or a totally ordered log. Linearizable operations and consensus carry latency and availability costs, especially across regions.

Use weaker or asynchronous coordination where stale data, later reconciliation, or compensation is acceptable. Document the resulting user-visible semantics; "eventual" without a bound or repair path is not a complete design.

## Maintainability, responsibility, and cost

Check operability, simplicity, evolvability, migration rollback, retention and deletion, auditability, access control, and the effect of automated decisions on people. Keep only data whose benefit outweighs its security, compliance, operational, and human risk.
