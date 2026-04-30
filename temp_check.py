
import os
import re

def get_catalog_articles():
    with open('docs/ARTICLE_CATALOG.md', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Match rows in tables: | # | Title | Slug | ... | Status | ... |
    # We look for rows with status 📋
    pattern = r'\| ([\d\.]+) \| ([^|]+) \| ([^|]+) \| [^|]+ \| [^|]+ \| [^|]+ \| (📋) \|'
    matches = re.findall(pattern, content)
    
    articles = []
    for m in matches:
        articles.append({
            'id': m[0],
            'title': m[1].strip(),
            'slug': m[2].strip()
        })
    return articles

def check_missing_research(articles):
    missing = []
    research_dirs = [
        'research/tier-0-survival',
        'research/tier-1-hustler',
        'research/tier-2-scaler',
        'research/tier-3-asset-builder',
        'research/tier-4-legacy'
    ]
    
    # Collect all existing research files
    existing_files = set()
    for d in research_dirs:
        if os.path.exists(d):
            for f in os.listdir(d):
                if f.endswith('-research.md'):
                    existing_files.add(f)
    
    for art in articles:
        expected_file = f"{art['slug']}-research.md"
        if expected_file not in existing_files:
            missing.append(art)
            
    return missing

if __name__ == "__main__":
    articles_to_research = get_catalog_articles()
    print(f"Total articles marked as 📋: {len(articles_to_research)}")
    
    missing = check_missing_research(articles_to_research)
    print(f"Articles missing research files: {len(missing)}")
    
    for m in missing:
        if "direktori-lbh" in m['slug']:
            print(f"MATCH FOUND: {m['id']} - {m['title']} ({m['slug']})")
