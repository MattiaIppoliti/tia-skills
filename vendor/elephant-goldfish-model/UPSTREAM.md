# Upstream provenance

Source: https://github.com/google/elephant-goldfish-model
Commit: 5ba5afa03f62627639fa4f71b7ac3bd4d8d07e24
License: Apache-2.0, retained in LICENSE.

Bundled skills, reviewer personas, standards, and integration docs retain their upstream directory layout. Local adaptation: Claude plugin-root references include vendor/elephant-goldfish-model because tia-skills is the enclosing plugin. Promoted entry points resolve this bundle from their own installed location. Update the bundle together, never individual skills without their shared resources.
