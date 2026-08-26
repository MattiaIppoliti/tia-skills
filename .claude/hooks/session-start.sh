#!/bin/bash
# Links every skill in this repo into the harness skill directories, so that a
# session which cloned this repo fresh still sees them. Claude Code on the web
# starts each session in a new container, so nothing linked by a previous
# session survives. Idempotent: link-skills.sh replaces whatever already sits
# at each destination path.
set -euo pipefail

REPO="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/../.." && pwd)}"

# Skills are the whole point of this repo, so link them in local sessions too,
# not just remote ones. Creating symlinks is fast enough to stay synchronous.
bash "$REPO/scripts/link-skills.sh" >/dev/null

# Only changesets and the version-sync script need node_modules, and a fresh
# container has none. Skipped when it would be a no-op; never fatal, because a
# failed install must not cost the session its skills.
if [ ! -d "$REPO/node_modules" ]; then
  (cd "$REPO" && npm install --no-audit --no-fund >/dev/null 2>&1) || true
fi
