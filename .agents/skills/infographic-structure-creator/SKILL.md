---
name: infographic-structure-creator
description: Generate or update AntV Infographic Structure source when the selected workspace contains src/designs/structures. Do not use for astro-koharu's package-consumer integration or for editing node_modules.
---

# Infographic Structure Creator

## Scope guard

The astro-koharu repository consumes the published `@antv/infographic` package and does not own `src/designs/structures`. Do not create that missing source tree or edit `node_modules`. Continue only when the user supplies a compatible AntV Infographic source checkout.

## Overview

Generate complete Structure component code for the infographic framework, following the project's component rules, layout constraints, and registration requirements.

## Workflow

1. Read `references/structure-prompt.md` for the full framework rules, allowed components, and output requirements.
2. Clarify minimal requirements if missing: structure category, layout direction, hierarchy depth, and whether add/remove buttons are needed.
3. Choose Item vs Items, compute layout from `getElementBounds`, and plan decor elements under ItemsGroup.
4. Produce a full TypeScript file: imports, Props extends BaseStructureProps, component implementation, and `registerStructure` with accurate `composites`.
5. Self-check against the constraints in the reference (no unlisted components, no SVG cx/cy/r, correct indexes, empty-state handling).

## Notes

- Prefer scanning `src/designs/structures` for similar existing structures to match local patterns when appropriate.
- Keep output concise; avoid React-only features (keys, hooks).
