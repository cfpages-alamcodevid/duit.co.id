
import os
import re

def get_catalog_articles():
    with open('docs/ARTICLE_CATALOG.md', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Updated pattern to handle potential variations in table columns
    # Looking for the slug and the status icon
    # | 0.47 | Budget Defense | Cara Bikin Daftar Belanja Makan Bulanan | daftar-belanja-makan-bulanan | keuangan | unisex | produktif | 📋 | Meal budget |
    pattern = r'\| [\d\.]+ \| [^|]+ \| [^|]+ \| ([^|]+) \| [^|]+ \| [^|]+ \| [^|]+ \| (📋) \|'
    matches = re.findall(pattern, content)
    
    articles = []
    for m in matches:
        articles.append({
            'slug': m[0].strip()
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
    
    existing_files = set()
    for d in research_dirs:
        if os.path.exists(d):
            for f in os.listdir(d):
                if f.endswith('-research.md'):
                    existing_files.add(f)
    
    for art in articles:
        expected_file = f"{art['slug']}-research.md"
        if expected_file not in existing_files:
            missing.append(art['slug'])
            
    return missing

articles = get_catalog_articles()
missing = check_missing_research(articles)

target_slug = 'daftar-belanja-makan-bulanan'
if target_slug in missing:
    print(f"CONFIRMED: Research for '{target_slug}' is missing.")
else:
    print(f"ALREADY EXISTS: Research for '{target_slug}' found.")
