#!/usr/bin/env python3
"""
Rebuild CHANGELOG.md from ALL git history.
Collects every entry from every commit, deduplicates by timestamp (newest wins),
then sorts newest-first and prepends today's new entries.
"""
import subprocess, re, os

CHANGELOG = "CHANGELOG.md"

def get_all_entries():
    """Get all unique entries from git history."""
    # Get all commits that touched CHANGELOG.md
    result = subprocess.run(
        ['git', 'log', '--oneline', '--all', '--', 'CHANGELOG.md'],
        capture_output=True, text=True, cwd=r'C:\Users\THINKPAD\duit.co.id'
    )
    commits = [line.split()[0] for line in result.stdout.strip().split('\n') if line.strip()]
    
    all_entries = {}
    
    for commit in commits:
        # Get file content at this commit
        result = subprocess.run(
            ['git', 'show', f'{commit}:CHANGELOG.md'],
            capture_output=True, text=True, cwd=r'C:\Users\THINKPAD\duit.co.id'
        )
        content = result.stdout
        
        # Extract entries (lines matching timestamp pattern)
        for line in content.split('\n'):
            match = re.match(r'\| (202[0-9]-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2} WIB)', line)
            if match:
                ts = match.group(1)
                all_entries[ts] = line.strip()
    
    return all_entries

def get_header():
    """Get the header rows from latest committed version."""
    result = subprocess.run(
        ['git', 'show', '5649d95:CHANGELOG.md'],
        capture_output=True, text=True, cwd=r'C:\Users\THINKPAD\duit.co.id'
    )
    lines = result.stdout.split('\n')
    header = []
    for line in lines:
        if line.strip().startswith('| 2026-'):
            break
        header.append(line)
    return '\n'.join(header)

# New entries to prepend (newest first)
new_entries = [
    "| 2026-04-28 00:25 WIB | OpenCode | gpt-5.4-mini | Full restore: CHANGELOG.md from all git history (57 unique entries), prepend new entries, add rule to all agent files. | CHANGELOG.md, .qwen/agents/*.md, .gemini/agents/*.md, .opencode/agents/*.md, .codex/agents/*.md, .agents/subagents/*.md |",
    "| 2026-04-28 00:20 WIB | OpenCode | gpt-5.4-mini | Restore ARTICLE_CATALOG.md from commit 5649d95 (475 lines, complete catalog) and update 14 rows from 📋 → 📝 where research files exist in /research folder. | docs/ARTICLE_CATALOG.md, update_catalog_status.py |",
    "| 2026-04-28 00:15 WIB | OpenCode | gpt-5.4-mini | Add mandatory ARTICLE_CATALOG.md editing rules to researcher.md across all providers: never rewrite the whole file, only edit specific rows when updating status. | .qwen/agents/researcher.md, .gemini/agents/researcher.md, .opencode/agents/researcher.md, .codex/agents/researcher.md, .agents/subagents/researcher.md |",
    "| 2026-04-28 00:08 WIB | OpenCode | gpt-5.4-mini | Brainstorm and catalog 54 tools per tier (Tier 0: 10, Tier 1: 12, Tier 2: 12, Tier 3: 10, Tier 4: 10) with function, features, and implementation priority. | docs/TOOLS_CATALOG.md |",
]

# Rule line
rule_line = "# RULE: Changelog must only be PREPENDED (new entries at top), never rewritten or overwritten.\n"

# Build file
header = get_header()
entries = get_all_entries()

# Sort entries newest-first
sorted_entries = sorted(entries.items(), key=lambda x: x[0], reverse=True)

with open(CHANGELOG, 'w', encoding='utf-8') as f:
    # Write rule
    f.write(rule_line)
    f.write('\n')
    
    # Write header
    f.write(header)
    f.write('\n')
    
    # Write new entries
    for entry in new_entries:
        f.write(entry + '\n')
    
    # Write historical entries
    for ts, line in sorted_entries:
        f.write(line + '\n')

print(f"Rebuilt CHANGELOG.md with {len(sorted_entries)} historical + {len(new_entries)} new entries")
