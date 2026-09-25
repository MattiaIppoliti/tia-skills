# Design reference

Reference: [coleam00/excalidraw-diagram-skill](https://github.com/coleam00/excalidraw-diagram-skill), inspected at commit `8646fcc9f74f38539c6cdb4c969723336a96ddcd` on 10 September 2026.

This skill is an independently written implementation informed by that reference's emphasis on meaningful visual structure and render-based review. It does not vendor the upstream source or scripts; no license file was present in the inspected tree.

Changes include a shorter entrypoint with conditional references, native editable output, a pinned local renderer instead of a floating CDN import, offline rendering, reciprocal-binding validation, stable generated IDs, SVG plus PNG export, and explicit final-size document review. Repeated structures may be generated programmatically. Concrete code snippets and varied shape patterns are used when they help the explanation, rather than being mandatory for every technical figure.

Official API references used for implementation:

- [Element skeleton conversion](https://github.com/excalidraw/excalidraw/blob/master/dev-docs/docs/@excalidraw/excalidraw/api/excalidraw-element-skeleton.mdx)
- [Export utilities](https://github.com/excalidraw/excalidraw/blob/master/dev-docs/docs/@excalidraw/excalidraw/api/utils/export.mdx)

## Synthesis maps

The September 2026 revision adds overall architecture maps based on a user-supplied visual reference. It adopts cross-cutting bands, bounded domains, component groups and a legend. It does not copy the reference's organizations, logos or system claims. The skill now applies `unslop` to labels and prose and supports local Virgil handwriting for short headings.
