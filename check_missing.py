import os
import re

def get_catalog_slugs():
    with open('docs/ARTICLE_CATALOG.md', 'r') as f:
        content = f.read()
    
    # Match | 0.1 | Title | slug | ... | Status |
    pattern = r'\| \d+\.\d+ \| [^|]+ \| ([^|]+) \| [^|]+ \| [^|]+ \| [^|]+ \| ([^|]+) \|'
    matches = re.findall(pattern, content)
    return matches

def get_research_files():
    research_dir = 'research'
    files = []
    for root, dirs, filenames in os.walk(research_dir):
        for f in filenames:
            if f.endswith('-research.md'):
                files.append(f.replace('-research.md', ''))
    return files

catalog = get_catalog_slugs()
research_files = get_research_files()

print(f"Catalog Slugs: {len(catalog)}")
print(f"Research Files: {len(research_files)}")

for slug, status in catalog:
    slug = slug.strip()
    if slug not in research_files:
        print(f"Missing Research: {slug} (Status: {status})")
