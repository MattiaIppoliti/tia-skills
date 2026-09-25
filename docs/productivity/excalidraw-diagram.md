## What it does

Creates editable Excalidraw maps of whole systems, module diagrams and workflows. The native scene is the source of both the SVG and PNG exports, so the drawing you edit matches the figure you share.

## When to reach for it

Type `/excalidraw-diagram`, or the agent reaches for it automatically when the task calls for an editable Excalidraw diagram.

- Use it for system boundaries, data flows, ownership and execution paths.
- Pair it with a document task when figures need to remain readable on a printed page.
- For an explanation whose main need is prose and examples, start with [teach](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/productivity/teach.md).

## Prerequisites

The renderer needs Node.js, its pinned dependencies and a Chromium browser. Rendering runs locally after setup and blocks external requests. It supports local Virgil handwriting and system sans text.

## The overall map

A synthesis map shows functional areas, shared infrastructure and external services in one view. Security and monitoring can span the drawing as horizontal bands. A legend explains the colors and connectors. Detail diagrams then explain individual processes without making one feature stand in for the whole application.

The skill applies [unslop](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/productivity/unslop.md) to labels and prose so the map uses concrete names and readable explanations.

## The editable source

Shapes, labels and arrow endpoints remain native Excalidraw elements. The skill checks their bindings, then inspects the rendered result at its intended size. A valid scene can still have a confusing route or unreadable label, which is why structural checks and visual review serve different purposes.

## Common questions

**Can the same diagrams go into a Word document?**

Yes. The PNG export can replace the figure while the `.excalidraw` file remains available for editing. The document must be rendered again to check readability and pagination.

**Can it produce a synthesis map like an architecture poster?**

Yes. It uses bounded areas, shared bands, a legend and selected connections. It follows the reference's visual conventions while taking component names and capabilities from the system being documented.

## It's working if

- You can open the scene in Excalidraw and edit its text and shapes.
- Connected arrows remain attached when you move a bound node.
- The exported figure agrees with the editable scene and is readable where you use it.

## Where it fits

A standalone tool for visual explanation. Pair it with [technical-writing](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/productivity/technical-writing.md) when a diagram supports an engineering document. [ask-mattia](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ask-mattia.md) maps the full set.
