# Engineering

Skills I use daily for code work.

## User-invoked

Reachable only when you type them (Claude Code: `disable-model-invocation: true`; Codex: `policy.allow_implicit_invocation: false` in `agents/openai.yaml`).

- **[ask-mattia](./ask-mattia/SKILL.md)**: Ask which skill or flow fits your situation. A router over the skills in this repo.
- **[grill-with-docs](./grill-with-docs/SKILL.md)**: Grilling session that also builds your project's domain model, sharpening terminology and updating `CONTEXT.md` and ADRs inline.
- **[triage](./triage/SKILL.md)**: Move issues through a state machine of triage roles.
- **[improve-codebase-architecture](./improve-codebase-architecture/SKILL.md)**: Scan a codebase for deepening opportunities, present them as a visual HTML report, then grill through whichever one you pick.
- **[setup-tia-skills](./setup-tia-skills/SKILL.md)**: Configure this repo for the engineering skills (issue tracker, triage labels, domain doc layout). Run once per repo.
- **[to-spec](./to-spec/SKILL.md)**: Turn the current conversation into a spec and publish it to the issue tracker.
- **[to-tickets](./to-tickets/SKILL.md)**: Break any plan, spec, or conversation into a set of tracer-bullet tickets, each declaring its blocking edges, whether as text in a local file or as native blocking links on a real tracker.
- **[implement](./implement/SKILL.md)**: Build the work described by a spec or set of tickets, driving `/tdd` at pre-agreed seams and closing out with `/code-review` before committing.
- **[wayfinder](./wayfinder/SKILL.md)**: Plan a huge chunk of work (more than one agent session can hold) as a shared map of decision tickets on the issue tracker, resolved one at a time until the way to the destination is clear.

## Model-invoked

Model- or user-reachable (rich trigger phrasing so the model can reach for them).

- **[prototype](./prototype/SKILL.md)**: Build a throwaway prototype to answer a design question: a single shareable HTML file for state/logic, or several toggleable UI variations.

- **[diagnosing-bugs](./diagnosing-bugs/SKILL.md)**: Disciplined diagnosis loop for hard bugs and performance regressions: build a feedback loop that goes red on this bug → minimise → hypothesise → instrument → fix → regression-test.
- **[research](./research/SKILL.md)**: Investigate a question against high-trust primary sources and capture the findings as a cited Markdown file in the repo, run as a background agent.
- **[tdd](./tdd/SKILL.md)**: Test-driven development with a red-green-refactor loop. Builds features or fixes bugs one vertical slice at a time.
- **[domain-modeling](./domain-modeling/SKILL.md)**: Actively build and sharpen a project's domain model by challenging terms, stress-testing with scenarios, and updating `CONTEXT.md` and ADRs inline.
- **[codebase-design](./codebase-design/SKILL.md)**: Shared discipline and vocabulary for designing deep modules: small interfaces, clean seams, testable through the interface.
- **[data-intensive-foundations](./data-intensive-foundations/SKILL.md)**: Shared rules for weighing workload, storage, replication, sharding, transactions, consistency, and data flows.
- **[design-data-intensive-system](./design-data-intensive-system/SKILL.md)**: Design a new data system from its workload, invariants, access patterns, and service objectives.
- **[scale-data-intensive-system](./scale-data-intensive-system/SKILL.md)**: Find the measured limit in an existing data system, then plan or make the smallest safe change.
- **[audit-data-intensive-repo](./audit-data-intensive-repo/SKILL.md)**: Audit a repository's data paths, failure handling, data flow, and operating risks with file-backed findings.
- **[code-review](./code-review/SKILL.md)**: Two-axis review of the diff since a fixed point: **Standards** (does it follow the repo's coding standards, plus a Fowler smell baseline?) and **Spec** (does it faithfully implement the originating issue/spec?), run as parallel sub-agents.
- **[resolving-merge-conflicts](./resolving-merge-conflicts/SKILL.md)**: Work through an in-progress git merge or rebase conflict hunk by hunk, resolving by intent traced to each side's primary source, then finish the operation, never `--abort`.
- **[wizard](./wizard/SKILL.md)**: Generate an interactive bash wizard that walks a human through steps only they can perform: provisioning infrastructure, setting up credentials or CI secrets, walking an unfamiliar third-party dashboard, or running a one-off migration or cutover.
- **[ponytail](./ponytail/SKILL.md)**: Force the laziest solution that actually works, up a ladder that stops at the first rung that holds: does this need to exist, is it already here, does the stdlib do it, does the platform, one line. Runs at `lite`, `full`, or `ultra`.
- **[ponytail-review](./ponytail-review/SKILL.md)**: Review a diff for over-engineering only, one line per finding tagged `delete:`, `stdlib:`, `native:`, `yagni:`, or `shrink:`, ending in `net: -N lines possible`. Correctness is explicitly out of scope, so pair it with `code-review`.
- **[ponytail-audit](./ponytail-audit/SKILL.md)**: The same over-engineering hunt across the whole tree instead of a diff, ranked biggest cut first. Lists findings, applies nothing.
- **[ponytail-debt](./ponytail-debt/SKILL.md)**: Harvest every `ponytail:` shortcut comment into a ledger of what was deferred, each row carrying its ceiling and its upgrade trigger, so "later" can't quietly become "never".
- **[apple-design](./apple-design/SKILL.md)**: Apple's fluid-interface craft translated to the web: springs instead of fixed durations, 1:1 pointer tracking, motion that starts from the live on-screen value so a gesture can grab and reverse it mid-flight, momentum projection, translucent materials, and size-specific tracking and leading.
