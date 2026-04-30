import sys

def patch_catalog():
    file_path = 'docs/ARTICLE_CATALOG.md'
    target_slug = 'direktori-lbh-konsultasi-hukum-gratis'
    
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    new_lines = []
    found = False
    for line in lines:
        if target_slug in line and '| 📋 |' in line:
            new_line = line.replace('| 📋 |', '| 📝 |')
            new_lines.append(new_line)
            found = True
        else:
            new_lines.append(line)
    
    if found:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print("Patch successful.")
    else:
        print("Target not found or already patched.")

if __name__ == "__main__":
    patch_catalog()
