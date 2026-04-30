import os

def check_research():
    catalog_path = "docs/ARTICLE_CATALOG.md"
    research_dir = "research"
    
    with open(catalog_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    for line in lines:
        if "sewa-kamera-proyektor" in line:
            print(f"Catalog entry found: {line.strip()}")
            
    slug = "sewa-kamera-proyektor"
    tier = "tier-1-hustler"
    research_file = os.path.join(research_dir, tier, f"{slug}-research.md")
    
    if os.path.exists(research_file):
        print(f"Research file already exists: {research_file}")
    else:
        print(f"Research file MISSING: {research_file}")

if __name__ == "__main__":
    check_research()
