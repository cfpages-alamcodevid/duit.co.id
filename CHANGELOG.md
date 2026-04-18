# CHANGELOG

This file is shared across all agents/providers collaborating in this repository.

## Rules
- Append a new line for every file/content change.
- Use WIB timestamp to minute precision: YYYY-MM-DD HH:mm WIB.
- Keep entries short and explicit so any agent can continue from context.

## Entry Format
| timestamp_wib | agent | provider | summary | files |

## Entries
| timestamp_wib | agent | provider | summary | files |
| 2026-04-19 05:58 WIB | codex | openai | Standardized single root prompt (keep AGENTS.md), created shared CHANGELOG.md, and added changelog protocol to all system prompt files. | AGENT.md (removed), AGENTS.md, .codex/AGENTS.md, QWEN.md, .qwen/agents/*.md, .gemini/agents/*.md, .agents/subagents/*.md, CHANGELOG.md |
| 2026-04-19 06:00 WIB | codex | openai | Applied changelog protocol to previously ACL-blocked prompt files using elevated permissions. | .codex/AGENTS.md, .agents/subagents/*.md, CHANGELOG.md |
| 2026-04-19 06:09 WIB | codex | openai | Split article data pipeline: search-index now excerpt-only, full markdown moved to /public/article-content/{slug}.json; updated loaders and docs to prevent white-screen regression. | vite-content-plugin.ts, src/utils/content.ts, src/pages/ArticlePage.tsx, public/search-index.json, public/article-content/panduan-lunas-pinjol.json, docs/CMS.md, docs/BUGS.md, CHANGELOG.md |
| 2026-04-19 06:23 WIB | codex | openai | Added publish-date governance for bulk content: unique date enforcement in build, new docs/PUBLICATION_SCHEDULE.json, and updated article-writer subagents across providers to backdate and avoid same-day collisions. | vite-content-plugin.ts, docs/PUBLICATION_SCHEDULE.json, docs/CMS.md, docs/ARTICLE_CATALOG.md, docs/BUGS.md, .qwen/agents/article-writer.md, .gemini/agents/article-writer.md, .agents/subagents/article-writer.md, QWEN.md, AGENTS.md, .codex/AGENTS.md, CHANGELOG.md |
| 2026-04-19 06:41 WIB | codex | openai | Added publication auto-scheduler CLI for bulk articles with dry-run/apply modes, unique-date collision avoidance, frontmatter + schedule JSON sync, npm script wiring, and usage docs across CMS/catalog/writer agents. | scripts/schedule-publication.mjs, package.json, docs/CMS.md, docs/ARTICLE_CATALOG.md, .qwen/agents/article-writer.md, .gemini/agents/article-writer.md, .agents/subagents/article-writer.md, CHANGELOG.md |
