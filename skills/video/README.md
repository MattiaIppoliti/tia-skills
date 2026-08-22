# Video

A vendored stack for making product launch videos and motion graphics in code. Not promoted in the plugin: it is large, it is third-party in origin, and it is mid-migration.

**The output framework is Remotion + React.** The stack used to render video from HTML (`data-*` timing attributes on a DOM, animated by one paused GSAP timeline, rendered by a `hyperframes` CLI). The entry point, the composition contract, and the CLI skill have been rewritten for Remotion; the craft and workflow skills have not, and each one carries a banner saying so. Read [hyperframes-core](./hyperframes-core/SKILL.md) before writing any composition code, and `hyperframes-core/references/legacy-html-contract.md` before touching a project that still uses the old contract.

## Entry point

- **[hyperframes](./hyperframes/SKILL.md)**: read first for any video request. Resumes project state, runs the intent interview, routes to one of the four workflows. Rewritten for Remotion.

## Workflows

- **[product-launch-video](./product-launch-video/SKILL.md)**: a product or marketing URL, script, or brief becomes a launch or promo video. Its `scripts/` toolchain still emits the legacy HTML contract.
- **[motion-graphics](./motion-graphics/SKILL.md)**: short unnarrated pieces where motion is the message: kinetic type, stat hits, logo stings, UI animation.
- **[general-video](./general-video/SKILL.md)**: the fallback for anything custom, longer, or multi-scene.
- **[remotion-to-hyperframes](./remotion-to-hyperframes/SKILL.md)**: historical name. Now adopts an outside Remotion project into these conventions, or migrates a legacy HTML project to Remotion.

## Contract and tooling

- **[hyperframes-core](./hyperframes-core/SKILL.md)**: the composition contract. `<Composition>`, `<Sequence>`, layers, props and schemas, media, determinism. Rewritten for Remotion.
- **[hyperframes-cli](./hyperframes-cli/SKILL.md)**: the Remotion CLI loop, render diagnostics, and where each retired `hyperframes` command went. Rewritten for Remotion.
- **[hyperframes-registry](./hyperframes-registry/SKILL.md)**: installing and wiring registry blocks and components.

## Craft

- **[motion-doctrine](./motion-doctrine/SKILL.md)**: gateway for the motion law. Load before composing any animation. Framework-agnostic.
- **[cut-the-curve](./cut-the-curve/SKILL.md)**: the technique catalog: velocity-matched seams, waterfall entries, the nudge curve. Framework-agnostic.
- **[seam-craft](./seam-craft/SKILL.md)**: why a crossfade flashes white on a dark film, and the guard against it. Framework-agnostic.
- **[oversized-cursor](./oversized-cursor/SKILL.md)**: the house-style oversized cursor for UI demos. Framework-agnostic.
- **[hyperframes-animation](./hyperframes-animation/SKILL.md)**: motion rules, scene blueprints, transitions, text effects. Craft applies; the GSAP code examples do not.
- **[hyperframes-keyframes](./hyperframes-keyframes/SKILL.md)**: punch-ins, zooms, reframes, camera moves, masks, paths, 3D. Same caveat.
- **[hyperframes-creative](./hyperframes-creative/SKILL.md)**: design specs, palettes, typography, narration, beat planning.
- **[hyperframes-audio](./hyperframes-audio/SKILL.md)**: mixing placed audio: fades, ducking, effect chains, automation envelopes.

## Media and assets

- **[media-use](./media-use/SKILL.md)**: resolve or generate every asset: BGM, SFX, images, icons, logos, voice, grades, LUTs. Also voiceover, transcription, and background removal.
- **[figma](./figma/SKILL.md)**: import Figma assets, brand tokens, components, and storyboard frames as reconstructed motion.
