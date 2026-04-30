import os

def check_missing():
    catalog_path = 'docs/ARTICLE_CATALOG.md'
    if not os.path.exists(catalog_path):
        print("Catalog not found")
        return

    with open(catalog_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    missing_research = []
    for line in lines:
        if '|' in line and 'Tier' not in line and '---' not in line:
            parts = line.split('|')
            if len(parts) >= 6:
                status = parts[4].strip()
                slug = parts[2].strip()
                tier = parts[1].strip()
                if '📋' in status or status == '':
                    missing_research.append((tier, slug))

    print(f"Articles needing research: {len(missing_research)}")
    for tier, slug in missing_research[:10]:
        print(f"Tier {tier}: {slug}")

if __name__ == "__main__":
    check_missing()
