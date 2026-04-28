# Agent Skills For Real Engineers

My agent skills that I use every day to do real engineering - not vibe coding.

Developing real applications is hard. Approaches like GSD, BMAD, and Spec-Kit try to help by owning the process. But while doing so, they take away your control and make bugs in the process hard to resolve.

These skills are designed to be small, easy to adapt, and composable. They're based on decades of engineering experience. Hack around with them. Make them your own. Enjoy.

If you want to keep up with changes to these skills, and any new ones I create, you can join ~60,000 other devs on my newsletter:

[Sign Up To The Newsletter](https://www.aihero.dev/s/skills-newsletter)

## Quickstart (30-second setup)

1. Run the skills.sh installer:

```bash
npx skills@latest add mattpocock/skills
```

2. Pick the skills you want, and which coding agents you want to install them on.

3. Bam - you're ready to go.

## Why These Skills Exist

I built these skills as a way to fix common failure modes I see with AI.

### Failure Mode #1: It Didn't Do What I Wanted

The most common failure mode is misalignment. You think the AI knows what you want. Then you see what it's built - and you realize it didn't understand you at all.

The fix for this is a **grilling session** - getting the AI to ask you detailed questions about what you're building.

## Skill Reference

### Engineering

Skills I use daily for code work.

- **[diagnose](./skills/engineering/diagnose/SKILL.md)** — Disciplined diagnosis loop for hard bugs and performance regressions: reproduce → minimise → hypothesise → instrument → fix → regression-test.

  ```
  npx skills@latest add mattpocock/skills/diagnose
  ```

- **[grill-with-docs](./skills/engineering/grill-with-docs/SKILL.md)** — Grilling session that challenges your plan against the existing domain model, sharpens terminology, and updates `CONTEXT.md` and ADRs inline.

  ```
  npx skills@latest add mattpocock/skills/grill-with-docs
  ```

- **[github-triage](./skills/engineering/github-triage/SKILL.md)** — Triage GitHub issues through a label-based state machine.

  ```
  npx skills@latest add mattpocock/skills/github-triage
  ```

- **[improve-codebase-architecture](./skills/engineering/improve-codebase-architecture/SKILL.md)** — Find deepening opportunities in a codebase, informed by the domain language in `CONTEXT.md` and the decisions in `docs/adr/`.

  ```
  npx skills@latest add mattpocock/skills/improve-codebase-architecture
  ```

- **[tdd](./skills/engineering/tdd/SKILL.md)** — Test-driven development with a red-green-refactor loop. Builds features or fixes bugs one vertical slice at a time.

  ```
  npx skills@latest add mattpocock/skills/tdd
  ```

- **[to-issues](./skills/engineering/to-issues/SKILL.md)** — Break any plan, spec, or PRD into independently-grabbable GitHub issues using vertical slices.

  ```
  npx skills@latest add mattpocock/skills/to-issues
  ```

- **[to-prd](./skills/engineering/to-prd/SKILL.md)** — Turn the current conversation context into a PRD and submit it as a GitHub issue. No interview — just synthesizes what you've already discussed.

  ```
  npx skills@latest add mattpocock/skills/to-prd
  ```

- **[zoom-out](./skills/engineering/zoom-out/SKILL.md)** — Tell the agent to zoom out and give broader context or a higher-level perspective on an unfamiliar section of code.

  ```
  npx skills@latest add mattpocock/skills/zoom-out
  ```

### Productivity

General workflow tools, not code-specific.

- **[caveman](./skills/productivity/caveman/SKILL.md)** — Ultra-compressed communication mode. Cuts token usage ~75% by dropping filler while keeping full technical accuracy.

  ```
  npx skills@latest add mattpocock/skills/caveman
  ```

- **[grill-me](./skills/productivity/grill-me/SKILL.md)** — Get relentlessly interviewed about a plan or design until every branch of the decision tree is resolved.

  ```
  npx skills@latest add mattpocock/skills/grill-me
  ```

- **[write-a-skill](./skills/productivity/write-a-skill/SKILL.md)** — Create new skills with proper structure, progressive disclosure, and bundled resources.

  ```
  npx skills@latest add mattpocock/skills/write-a-skill
  ```

### Misc

Tools I keep around but rarely use.

- **[git-guardrails-claude-code](./skills/misc/git-guardrails-claude-code/SKILL.md)** — Set up Claude Code hooks to block dangerous git commands (push, reset --hard, clean, etc.) before they execute.

  ```
  npx skills@latest add mattpocock/skills/git-guardrails-claude-code
  ```

- **[migrate-to-shoehorn](./skills/misc/migrate-to-shoehorn/SKILL.md)** — Migrate test files from `as` type assertions to @total-typescript/shoehorn.

  ```
  npx skills@latest add mattpocock/skills/migrate-to-shoehorn
  ```

- **[scaffold-exercises](./skills/misc/scaffold-exercises/SKILL.md)** — Create exercise directory structures with sections, problems, solutions, and explainers.

  ```
  npx skills@latest add mattpocock/skills/scaffold-exercises
  ```

- **[setup-pre-commit](./skills/misc/setup-pre-commit/SKILL.md)** — Set up Husky pre-commit hooks with lint-staged, Prettier, type checking, and tests.

  ```
  npx skills@latest add mattpocock/skills/setup-pre-commit
  ```
