# Local renderer

The scripts require Node.js 18+ and Chromium. Resolve an environment-provided runtime first when available. Install dependencies from the skill's `scripts` directory with `npm ci`, then install the matching browser with `npx playwright install chromium`. Keep these installs scoped to the renderer; no application dependencies need changing.

```bash
node /absolute/path/to/excalidraw-diagram/scripts/render.mjs /absolute/path/diagram.json --out-dir /absolute/path/output --scale 2
```

A native `.excalidraw` file is also accepted. Outputs use the input basename. Use a separate output directory to retain the original during review.

For managed runtimes, `EXCALIDRAW_RUNTIME` can point to a directory containing the installed renderer dependencies. `PLAYWRIGHT_MODULE` may point to an existing Playwright module; `--browser /absolute/path/to/chromium` selects an explicitly available browser. `node render.mjs --help` lists the supported options.

The script bundles the pinned Excalidraw package locally, starts a loopback-only server on an ephemeral port, renders through the official `exportToSvg`, and screenshots that same SVG. It cleans up its browser, server and temporary bundle. Outbound requests are blocked during rendering; assets must be embedded or available locally. Font family 1 loads Virgil from the pinned local package and embeds it in the SVG. Font family 2 uses system sans text. Both work without outbound font requests.

Validation catches invalid geometry, duplicate IDs, missing files, dangling endpoints, broken reciprocal bindings and text outside the exported canvas. It does not establish semantic correctness, detect every overlap, or prove that a moved node will route elegantly. Inspect the PNG and try moving a representative bound node in Excalidraw when edit behavior matters.

Run `node --test scripts/scene.test.mjs` for the structural validator. A real render of a bound diagram remains part of testing a renderer change. If a render fails, inspect the reported error, correct the specific dependency or scene, and rerun that case. Do not replace the diagram with a screenshot of a different drawing engine and call it Excalidraw.
