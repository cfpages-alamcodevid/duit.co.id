import os

def prepend_changelog():
    changelog_path = 'CHANGELOG.md'
    with open(changelog_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # New entry
    new_entry = "| 2026-05-01 10:00 WIB | Researcher | Gemini 2.0 Flash | Created deep research for legal aid directory article including UU 16/2011 summary, YLBHI branch contacts, and pinjol victim guide. | research/tier-0-survival/direktori-lbh-konsultasi-hukum-gratis.md |\n"
    
    # Prepend new entry after separator (which is usually at index 3)
    # Header: index 0 (Rule), 1 (Blank), 2 (Table Header), 3 (Separator)
    # Check if index 3 is the separator
    if '|---' in lines[3]:
        updated_lines = lines[:4] + [new_entry] + lines[4:]
    else:
        # Fallback if structure is different
        updated_lines = lines[:3] + [new_entry] + lines[3:]
    
    with open(changelog_path, 'w', encoding='utf-8') as f:
        f.writelines(updated_lines)

if __name__ == "__main__":
    prepend_changelog()
