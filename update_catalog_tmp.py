import sys

def update_catalog(file_path, slug, new_status):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    found = False
    new_lines = []
    for line in lines:
        if f"| {slug} |" in line or f"| {slug} " in line or f" {slug} |" in line:
            # Check for the exact slug in the 5th column (index 4 in split)
            parts = line.split('|')
            if len(parts) > 5 and parts[4].strip() == slug:
                # Update status (8th column, index 7)
                if len(parts) > 8:
                    parts[8] = f" {new_status} "
                    line = '|'.join(parts)
                    found = True
        new_lines.append(line)
    
    if found:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print(f"Updated status for {slug} to {new_status}")
    else:
        print(f"Slug {slug} not found or status not updated")

if __name__ == "__main__":
    update_catalog('docs/ARTICLE_CATALOG.md', 'seo-link-builder', '📝')
