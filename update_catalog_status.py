#!/usr/bin/env python3
"""
Update ARTICLE_CATALOG.md status based on research files.
Changes 📋 to 📝 when research file exists.
Only modifies the Status column, preserves everything else.
"""
import os
import re

CATALOG = "docs/ARTICLE_CATALOG.md"
RESEARCH_DIR = "research"

def get_research_slugs():
    """Get slugs from research filenames."""
    slugs = set()
    for root, dirs, files in os.walk(RESEARCH_DIR):
        for f in files:
            if f.endswith('-research.md'):
                # Extract slug: "budgeting-darurat-umr-research.md" -> "budgeting-darurat-umr"
                slug = f.replace('-research.md', '')
                slugs.add(slug)
    return slugs

def update_catalog():
    research_slugs = get_research_slugs()
    print(f"Found {len(research_slugs)} research files")
    
    with open(CATALOG, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    updated = 0
    for i, line in enumerate(lines):
        # Match table rows: starts with |, has slug column
        # Format: | # | Cluster | Title | Slug | Category | Gender | Age | Status | Notes |
        if not line.strip().startswith('|'):
            continue
        if '|-' in line or '#:' in line:
            continue
        
        # Split by | and check if we have enough columns
        cells = [c.strip() for c in line.split('|')]
        # cells[0] is empty (before first |)
        # cells[1] = #, cells[2] = Cluster, cells[3] = Title, cells[4] = Slug, ...
        # Status is at index 8 (9-column format) or 7 (8-column format)
        
        # Try 9-column format first (has Cluster)
        if len(cells) >= 9:
            slug = cells[4].strip()
            status = cells[8].strip()
            notes = cells[9].strip() if len(cells) > 9 else ''
            # Status column is index 8
            if slug in research_slugs and status == '📋':
                # Replace 📋 with 📝 in the line
                new_line = line.replace('| 📋 |', '| 📝 |')
                if new_line != line:
                    lines[i] = new_line
                    updated += 1
                    print(f"  Updated: {slug} (📋 -> 📝)")
        elif len(cells) >= 8:
            # 8-column format (no Cluster)
            slug = cells[3].strip()
            status = cells[7].strip()
            if slug in research_slugs and status == '📋':
                new_line = line.replace('| 📋 |', '| 📝 |')
                if new_line != line:
                    lines[i] = new_line
                    updated += 1
                    print(f"  Updated: {slug} (📋 -> 📝)")
    
    with open(CATALOG, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    
    print(f"\nTotal updated: {updated} rows")

if __name__ == '__main__':
    update_catalog()
