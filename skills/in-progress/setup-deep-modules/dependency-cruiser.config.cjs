// @ts-check
// Deep-module enforcement for dependency-cruiser.
//
// Each package under the packages root is a DEEP MODULE: a lot of behaviour
// behind a small interface (its `index.ts`). The rules below make the index the
// only way in — internals stay hidden, and tests exercise the package through
// the same interface everyone else does.
//
// The only thing you should ever need to edit here is PACKAGES_ROOT.

/** Where packages live. One immediate child dir per package (flat, no nesting). */
const PACKAGES_ROOT = "src/packages";

// --- derived patterns (no need to edit) -------------------------------------
const R = PACKAGES_ROOT;
/** Any file that lives inside some package's internals or subfolders. */
const INSIDE_A_PACKAGE = `^${R}/[^/]+/.+`;
/** A package's public interface — the only legal way in. */
const ANY_INDEX = `^${R}/[^/]+/index\\.(ts|tsx)$`;

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "index-boundary-from-app",
      comment:
        "App/root code may reach a package only through its index — never a deep import.",
      severity: "error",
      from: { pathNot: `^${R}/` }, // importer is NOT inside any package
      to: { path: INSIDE_A_PACKAGE, pathNot: ANY_INDEX },
    },
    {
      name: "index-boundary-across-packages",
      comment:
        "A package's internals may import each other freely, but may reach OTHER packages only through their index.",
      severity: "error",
      // importer is inside a package ($1), but is not a test file
      from: { path: `^${R}/([^/]+)/`, pathNot: `^${R}/[^/]+/tests/` },
      to: {
        path: INSIDE_A_PACKAGE,
        pathNot: [
          `^${R}/$1/`, // same package → intra-package freedom
          ANY_INDEX, // any package's index → allowed
        ],
      },
    },
    {
      name: "tests-only-through-index",
      comment:
        "A package's tests exercise it through the index like everyone else: they may import any package's index and their own tests/ fixtures, but never any package's internals — not even their own.",
      severity: "error",
      from: { path: `^${R}/([^/]+)/tests/` }, // a test file, in package $1
      to: {
        path: INSIDE_A_PACKAGE,
        pathNot: [
          `^${R}/$1/tests/`, // own tests/ fixtures → allowed
          ANY_INDEX, // any package's index → allowed (integration tests are fine)
        ],
      },
    },
    {
      name: "tests-folder-is-private",
      comment:
        "A package's tests/ folder is reachable only from tests — nothing else may import fixtures.",
      severity: "error",
      from: { pathNot: `^${R}/[^/]+/tests/` }, // importer is not itself a test
      to: { path: `^${R}/[^/]+/tests/` },
    },
    {
      name: "no-circular",
      comment: "No dependency cycles. Scope to `^${R}/` if you want to allow cycles outside packages.",
      severity: "error",
      from: {},
      to: { circular: true },
    },

    // --- Layering (optional, off by default) ----------------------------------
    // Interface-hiding controls HOW you import (through the index). Layering
    // controls WHICH packages may depend on which. Add your own rules here, e.g.:
    //
    // {
    //   name: "ui-may-not-depend-on-billing",
    //   severity: "error",
    //   from: { path: `^${R}/ui/` },
    //   to:   { path: `^${R}/billing/` },
    // },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    tsConfig: { fileName: "tsconfig.json" },
    enhancedResolveOptions: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
  },
};
