# Prompt Audit: `researcher`

## Status
The `researcher` prompts are normalized across the active subagent copies.

## Canonical Behavior
- Use the same research payload across all copies.
- Save research files to `/research/[correct-tier-folder]/[slug]-research.md`.
- Keep catalog mismatch handling non-destructive and log mismatches in `docs/ARTICLE_MISMATCH.md`.
- Treat `Duit.co.id Ecosystem Integration` as optional and topic-driven, not a forced Tier 1-2 requirement.
- Keep the final output contract consistent:
  - complete research document
  - summary
  - key insights
  - writer notes
  - confidence level

## Notes
Keep this file as the reference point for future drift checks if new researcher copies are added or if the output contract changes.
