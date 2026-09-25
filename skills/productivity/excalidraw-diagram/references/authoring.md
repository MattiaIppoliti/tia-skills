# Authoring editable scenes

Use the official Excalidraw converter for defaults and bound text. The renderer accepts a compact JSON skeleton with `elements`, optional `bindings`, `appState`, and `files`; it writes the complete native scene.

```json
{
  "elements": [
    {"id":"input","type":"rectangle","x":20,"y":20,"width":240,"height":120,"roughness":1,"backgroundColor":"#e7f0fa","fillStyle":"solid","label":{"text":"Incoming request","fontSize":26,"fontFamily":2}},
    {"id":"check","type":"rectangle","x":400,"y":20,"width":240,"height":120,"roughness":1,"backgroundColor":"#fff2d9","fillStyle":"solid","label":{"text":"Authorize","fontSize":26,"fontFamily":2}},
    {"id":"request-check","type":"arrow","x":260,"y":80,"points":[[0,0],[140,0]],"endArrowhead":"arrow"}
  ],
  "bindings": [{"arrow":"request-check","start":"input","end":"check"}],
  "appState":{"viewBackgroundColor":"#ffffff","exportScale":1}
}
```

Arrow points are relative to the arrow's `x,y`. Start and end bindings name existing nodes; the renderer adds reciprocal references without changing the planned route. Place endpoints on the correct node boundary. A binding alone does not prove that the visible line touches the right shape.

For native `.excalidraw` input, the renderer preserves the scene instead of reconverting it. A bound label uses `containerId` and the container lists that text in `boundElements`. Bound arrows use `startBinding` / `endBinding`, and the target lists the arrow in `boundElements`. The structural validator checks both directions.

The renderer normalizes generated label IDs, seeds and timestamps for repeatable skeleton generation. Keep semantic IDs stable between edits. Use `groupIds` for multiple native elements that should move together; use a locked, transparent background rectangle only when an exact export footprint is needed.

## Drawing conventions

These are defaults, overridden by the user's reference or document palette.

| Role | Fill | Stroke |
| --- | --- | --- |
| Main process | `#e7f0fa` | `#294d73` |
| Model or agent | `#eee8fa` | `#67489b` |
| Durable data | `#e5f3ee` | `#29745e` |
| Gate or constraint | `#fff2d9` | `#91621d` |
| External dependency | `#f1f3f5` | `#495567` |

Text uses dark `#18364c`, with muted annotations `#496a86`. Encode meaning with labels and geometry as well as color. `roughness: 1` gives a restrained sketch; `0` suits a crisp technical reference. Prefer `fillStyle: "solid"` and stroke width 2 for legible exports.

The bundled offline renderer supports font family 1, Virgil handwriting, and font family 2, Helvetica/system sans. It loads Virgil from the pinned local Excalidraw package before calculating text geometry. Other families fail explicitly. Use handwriting for short architecture headings and sans text for longer component labels. Keep text lines short and allow the converter to size bound text before judging the final layout.

For a 7.1-inch figure laid out at 1800 units wide, 32-unit text becomes about 9.1 pt. A 20-unit annotation would become only 5.7 pt. Use the final document size, not the zoomable canvas, to choose label sizes.
