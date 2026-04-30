import re

def update_catalog():
    file_path = 'docs/ARTICLE_CATALOG.md'
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    updated_lines = []
    target_slug = 'direktori-lbh-konsultasi-hukum-gratis'
    found = False
    
    for line in lines:
        if target_slug in line and '| 📋 |' in line:
            new_line = line.replace('| 📋 |', '| 📝 |')
            updated_lines.append(new_line)
            found = True
        else:
            updated_lines.append(line)
    
    if found:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(updated_lines)
        print(f"Successfully updated status for {target_slug}")
    else:
        print(f"Slug {target_slug} with status 📋 not found or already updated.")

if __name__ == "__main__":
    update_catalog()
