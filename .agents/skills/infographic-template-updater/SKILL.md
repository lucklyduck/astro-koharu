---
name: infographic-template-updater
description: Update AntV Infographic source template catalogs when the selected workspace contains src/templates and its gallery app. Do not use for astro-koharu's package-consumer integration or for editing node_modules.
---

# Infographic Template Updater

## Scope guard

The astro-koharu repository consumes the published `@antv/infographic` package and does not own the source or gallery paths below. Do not create those missing paths or edit `node_modules`. Continue only when the user supplies a compatible AntV Infographic source checkout.

## Overview

Update public template lists and gallery mappings when new templates are added in `src/templates`.

## Workflow

1. Collect new template names from the added `src/templates/*.ts` file (object keys).
   - If templates are composed via spreads (e.g. `...listZigzagTemplates`), also confirm the final keys in `src/templates/built-in.ts`.
2. Update template lists:
   - `.agents/skills/infographic-creator/SKILL.md` in the "Available Templates" list.
   - `site/src/components/AIPlayground/Prompt.ts` in the template list.
   - `.agents/skills/infographic-syntax-creator/references/prompt.md` in the template list.
   Keep existing ordering/grouping; add new `list-*` entries near other list templates.
3. Sanity check with `rg -n "<template-name>"` across the above files to confirm presence.

## Notes

- Do not remove or rename existing entries.
- Keep template names exact and lower-case.
- If a template needs example data, update or extend `site/src/components/Gallery/datasets.ts` to match its structure.
