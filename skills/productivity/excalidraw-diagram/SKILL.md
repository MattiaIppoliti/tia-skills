---
name: excalidraw-diagram
description: Create or edit native Excalidraw diagrams for overall architecture maps, module diagrams, workflows, and relationships, with editable sources and verified SVG or PNG exports. Use when Excalidraw output or a reusable diagram for a document is requested.
---

# Excalidraw diagrams

Make the relationship visible, and keep the result editable. Deliver a native `.excalidraw` scene; render exports from that scene so the source and the visible artifact agree.

## Write plainly

Use `unslop` for diagram labels, captions, document prose, and changes to this skill. Call the Skill tool with `unslop` when available; otherwise read the installed `unslop/SKILL.md` and apply it. Keep technical names that identify real components. Explain unfamiliar terms in the surrounding prose.

## Choose the visual argument

Identify the reader's question and the distinction the diagram must make: ownership, execution order, authorization, data transformation, or deployment. Use layout to express that distinction. A process can be a sequence; ownership can be a tree; independent work can fan out; a retry can loop back. Consistent shapes are useful when concepts have the same role. Vary them when the meaning changes.

For an overall architecture request, start with a synthesis map. Read [synthesis.md](references/synthesis.md). Show the major functional areas, their contents, shared infrastructure, external dependencies and a few labeled connections. A left-to-right execution sequence answers a different question. Use separate detail diagrams for a turn, ingestion or another process.

When a reference image is supplied, study its visual grammar before drawing. Reuse useful conventions such as cross-cutting bands, nested areas, a legend and restrained color. Populate them with the actual system's components. Do not import a reference's vendors or capabilities into the system being explained.

For an existing system, inspect its implementation or authoritative specification before naming boundaries and arrows. Record source paths or references alongside the working diagram. Distinguish current behavior from a proposed design. A code excerpt or payload earns space only when it resolves the reader's question.

Choose the final display size before laying out the scene. For a document, reserve its actual image width and height. If labels become too small, split the diagram or shorten them before scaling everything down. Aim for at least 9 pt labels at the final printed size.

## Build the scene

Read [authoring.md](references/authoring.md) for the skeleton format, bindings, and palette. Use semantic IDs, native shapes and text, and routed arrows. The renderer supports native scenes and compact skeletons; generators are appropriate for repeated structures.

Group movable components deliberately. Bind a node's label to its container, and bind arrows to the shapes they refer to. Native scene bindings must be reciprocal. Preserve existing IDs, group membership, files, links, and unrelated elements when editing an existing scene.

Use containment for ownership or scope, arrows for a directed relationship, and lines for undirected relationships. Define dashed-line meaning locally when it differs from the solid path. Put annotations outside busy routes. Avoid implying a transaction or ordering guarantee the implementation does not provide.

## Render and inspect

Read [rendering.md](references/rendering.md) on the first render or when dependencies are missing. The local renderer produces `.excalidraw`, `.svg`, `.png`, and a machine-check report. It blocks external network requests during rendering. Its pinned dependencies live in `scripts/package-lock.json`.

Run structural checks and inspect the actual PNG. Check every diagram at its intended display size: readable labels, adequate padding, correct arrow endpoints, unobstructed paths, and correct grouping. Inspect complex sections at full size as needed. A successful JSON parse or renderer exit is not visual approval.

After a correction, render and inspect the affected diagram again. Finish when the visible relationships match the source evidence and no layout defect remains. For a document replacement, render the document too: a good standalone diagram can still break pagination or become unreadable when embedded.

## Deliver

Provide the editable scene and requested document or exports. For several figures, use descriptive filenames and a single archive of the sources. Keep diagnostic JSON and temporary renders out of the final delivery unless requested. State any font substitution or unavailable renderer capability that affects the result.

The design reference and the changes made here are recorded in [provenance.md](references/provenance.md).
