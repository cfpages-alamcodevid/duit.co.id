#!/usr/bin/env python3
"""
Prepend new changelog entries to CHANGELOG.md without rewriting the file.
New entries go at the TOP, after the header row.
"""
import sys

CHANGELOG = "CHANGELOG.md"

# New entries to prepend (newest first)
new_entries = [
    "| 2026-04-28 00:20 WIB | OpenCode | gpt-5.4-mini | Restore ARTICLE_CATALOG.md from commit 5649d95 (475 lines, complete catalog) and update 14 rows from 📋 → 📝 where research files exist in /research folder. | docs/ARTICLE_CATALOG.md, update_catalog_status.py |",
    "| 2026-04-28 00:15 WIB | OpenCode | gpt-5.4-mini | Add mandatory ARTICLE_CATALOG.md editing rules to researcher.md across all providers: never rewrite the whole file, only edit specific rows when updating status. | .qwen/agents/researcher.md, .gemini/agents/researcher.md, .opencode/agents/researcher.md, .codex/agents/researcher.md, .agents/subagents/researcher.md |",
    "| 2026-04-28 00:08 WIB | OpenCode | gpt-5.4-mini | Brainstorm and catalog 54 tools per tier (Tier 0: 10, Tier 1: 12, Tier 2: 12, Tier 3: 10, Tier 4: 10) with function, features, and implementation priority. | docs/TOOLS_CATALOG.md |",
]

# Rule to add (as a comment or header note)
rule_line = "# RULE: Changelog must only be PREPENDED (new entries at top), never rewritten or overwritten.\n"

with open(CHANGELOG, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find where the table starts (after header rows)
table_start = 0
for i, line in enumerate(lines):
    if line.strip().startswith('| timestamp_wib'):
        table_start = i
        break

# Build new content: header + new entries + original table
new_content = rule_line
new_content += '\n'
new_content += ''.join(lines[:table_start])  # header rows
new_content += '\n'.join(new_entries) + '\n'
new_content += ''.join(lines[table_start:])

with open(CHANGELOG, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Prepended {len(new_entries)} new entries to {CHANGELOG}")
print(f"Total lines: {len(new_content.splitlines())}")
