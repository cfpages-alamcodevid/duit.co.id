import os
import re

def get_tier1_planned():
    with open('docs/ARTICLE_CATALOG.md', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Match tier 1 rows with status 📝 Planned
    pattern = r'\| (1\.[\d\.]+) \| ([^|]+) \| ([^|]+) \| [^|]+ \| [^|]+ \| [^|]+ \| (📝 Planned) \| ([^|]*)\|'
    matches = re.findall(pattern, content)
    
    return matches

def get_tier1_ready():
    with open('docs/ARTICLE_CATALOG.md', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Match tier 1 rows with status 📝 (exact, no extra text)
    pattern = r'\| (1\.[\d\.]+) \| ([^|]+) \| ([^|]+) \| [^|]+ \| [^|]+ \| [^|]+ \| (📝) \| ([^|]*)\|'
    matches = re.findall(pattern, content)
    
    return matches

def check_research(slug):
    dirs = ['research/tier-1-hustler', 'research/tier-1']
    for d in dirs:
        if os.path.exists(os.path.join(d, f"{slug}-research.md")):
            return True
    return False

if __name__ == "__main__":
    planned = get_tier1_planned()
    print("Entries with 📝 Planned to change to 📝:")
    for m in planned:
        id, title, slug, status, notes = m
        print(f"{id}: {slug}")
    
    ready = get_tier1_ready()
    print("\nEntries with 📝 to check research:")
    for m in ready:
        id, title, slug, status, notes = m
        has_research = check_research(slug)
        if not has_research:
            print(f"{id}: {slug} - MISSING research, change to 📋")
        else:
            print(f"{id}: {slug} - has research")