#!/usr/bin/env python3
"""
Find orphan research files:
- If a research file exists but the corresponding article file does NOT exist, DELETE the research file.
Ignores whether the slug is in the catalog or not.
"""
import os

# Find all research files
research_map = {}  # slug -> (full_path, tier)
for root, dirs, files in os.walk('research'):
    for f in files:
        if f.endswith('-research.md'):
            slug = f.replace('-research.md', '')
            research_map[slug] = (os.path.join(root, f), root.split(os.sep)[-1])

print(f'Research files: {len(research_map)}')

# Check if article file exists for each
orphans = []
for slug, (path, tier) in research_map.items():
    # Determine article path
    tier_dir = tier.replace('-research', '').replace('tier', 'tier').replace('scaler', 'scaler').replace('assetbuilder', 'asset-builder').replace('legacy', 'legacy')
    # Map tier folder name
    tier_map = {
        'tier-0-survival': 'tier-0-survival',
        'tier-1-hustler': 'tier-1-hustler',
        'tier-2-scaler': 'tier-2-scaler',
        'tier-3-asset-builder': 'tier-3-asset-builder',
        'tier-4-legacy': 'tier-4-legacy'
    }
    if tier in tier_map:
        tier_dir = tier_map[tier]
    else:
        # Try to extract from path
        parts = root.split(os.sep)
        if 'tier-0-survival' in parts:
            tier_dir = 'tier-0-survival'
        elif 'tier-1-hustler' in parts:
            tier_dir = 'tier-1-hustler'
        elif 'tier-2-scaler' in parts:
            tier_dir = 'tier-2-scaler'
        elif 'tier-3-asset-builder' in parts:
            tier_dir = 'tier-3-asset-builder'
        elif 'tier-4-legacy' in parts:
            tier_dir = 'tier-4-legacy'
    
    article_path = os.path.join('artikel', tier_dir, f'{slug}.md')
    
    if not os.path.exists(article_path):
        orphans.append((slug, path, article_path))

print(f'\nOrphan research files (no article file): {len(orphans)}')
for slug, path, article_path in sorted(orphans):
    print(f'  {slug}')
    print(f'    Research: {path}')
    print(f'    Article MISSING: {article_path}')

# Delete orphan research files
deleted = 0
for slug, path, article_path in orphans:
    try:
        os.remove(path)
        print(f'  DELETED: {path}')
        deleted += 1
    except Exception as e:
        print(f'  ERROR: {e}')

print(f'\nTotal deleted: {deleted}')
