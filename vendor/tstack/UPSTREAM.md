# Upstream provenance

Source: https://github.com/t3dotgg/tstack
Commit: 11e37a74d0a6868c121cd0910ab2b3bd9873b92a
License: MIT, retained in LICENSE.

The whole repository came over unchanged, all nine skills, because `full-send` calls `sol-loop`, `file-pr` and `babysit-pr`, and those call `leaving-pr-comments`. Only `full-send`, `full-stop` and `council` are promoted, through thin entry points in `skills/engineering/` that resolve this bundle from their own installed location. The other six are reachable only through those three. Update the bundle as a whole, never one skill without the ones it calls.
