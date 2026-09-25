# Architecture synthesis

An overall map should let a reader locate a feature, see the components behind it, and identify the systems it depends on. Draw it before the module diagrams so one recent feature cannot set the scope of the whole document.

## Establish coverage

List the product areas and shared technical modules from the repository or specification. For each, record its responsibility, data ownership, entry point and dependencies in working notes. Check the list against navigation, package boundaries and deployment configuration. Give every major area a place in the map or state why it belongs in a separate view.

Keep product modules and deployment units distinct. Several modules may run in one application process. Draw that process boundary only when it helps the reader; a box around each feature must not imply a microservice.

## Lay out the map

Use a wide canvas for the overview. A useful starting arrangement is data and ingestion on the left, application and agent components in the center, clients and entry points on the right, and storage or external providers below. Change this arrangement to fit the system's dominant relationships.

Place security and observability in horizontal bands when they apply across the system. Name concrete mechanisms, such as identity checks, authorization, audit records or job alerts. An empty band called Security explains little.

Use large dashed areas for domains or boundaries, with native components inside them. Put the area's heading above its components. Use a component stack for replicated or related instances only when that meaning is explicit. Use a database shape for a store, not for any object that happens to contain data.

Include a compact legend for color and line meaning. One useful scheme is gray for deterministic internal components, coral for internal AI components and violet for external model services. Color alone must never carry the distinction. Label optional components and proposed behavior where they appear.

Keep connectors sparse. Label the relationship with words such as reads, streams, imports, executes or calls a model. Route between areas through open corridors. Use containment instead of drawing a line from every child to its parent. Do not draw every API call on the overview.

## Keep it readable

Choose the final display dimensions first. At a 9.6-inch width, a 2400-unit canvas needs roughly 32-unit labels to reach 9 pt. A portrait page may need a simpler overview or a dedicated landscape page. Do not squeeze an architecture poster into a narrow document column.

Use handwriting for short titles if it fits the reference. Prefer plain sans text for longer labels. Keep related components aligned, but allow different shapes and sizes when their responsibilities differ. Leave space between a boundary and its contents.

## Review the explanation

Check these questions against the rendered map and the source evidence.

- Can a reader find every major product area without knowing the newest feature?
- Is it clear which components share a process and which are external?
- Can the reader distinguish original data, derived indexes and persisted conversations?
- Do the labeled arrows have an unambiguous direction and endpoint?
- Are security and monitoring attached to concrete mechanisms?
- Can all labels be read at the final page size?

Inspect the whole map at its intended size, then inspect dense regions at full resolution. If it needs paragraphs inside boxes, move the explanation into the article and shorten the labels. Keep the native scene and the final export together.
