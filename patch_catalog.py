import sys

file_path = 'docs/ARTICLE_CATALOG.md'
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
found = False
for line in lines:
    if '| 1.138 | Professional Services | Grant Writer | grant-writer |' in line:
        # Replace the 📋 with 📝
        # The status emoji is usually in the 8th column (index 7 if split by |)
        parts = line.split('|')
        if len(parts) >= 9:
            parts[8] = ' 📝 '
            line = '|'.join(parts)
            found = True
    new_lines.append(line)

if found:
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("Successfully updated Grant Writer status to 📝")
else:
    print("Grant Writer line not found in catalog")
