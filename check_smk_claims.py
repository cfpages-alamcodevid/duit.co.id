import os, re

files_to_check = [
    'artikel/tier-1-hustler/animasi-iklan-pendek-smk.md',
    'artikel/tier-1-hustler/maintenance-komputer-umkm-smk.md',
    'artikel/tier-1-hustler/landing-page-rpl-smk.md',
    'artikel/tier-1-hustler/pos-kasir-sederhana-rpl-smk.md',
    'artikel/tier-1-hustler/operator-homestay-smk.md',
    'artikel/tier-1-hustler/mua-wisuda-smk.md',
    'artikel/tier-1-hustler/desain-spanduk-menu-smk.md',
    'artikel/tier-1-hustler/qc-produk-rumahan-smk.md',
    'artikel/tier-1-hustler/service-laptop-sekolah-kantor-smk.md',
    'artikel/tier-1-hustler/meal-prep-smk.md',
]

pattern = re.compile(r'(?i)saya[^.]{0,40}lulusan[^.]{0,40}SMK')

for filepath in files_to_check:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        lines = content.split('\n')
    
    for i, line in enumerate(lines):
        if pattern.search(line):
            is_template = False
            stripped = line.strip()
            if stripped.startswith('>') or stripped.startswith('`') or '"' in stripped:
                is_template = True
            if re.search(r'(?i)(Andi|Sari|Budi|Dedi|Dwi|Mawar|Rina|nama(?:nda)?)', line):
                is_template = True
            for j in range(max(0,i-2), min(len(lines),i+3)):
                if re.search(r'(?i)(template|script|contoh|wa script|whatsapp|pitch|format|kata-kata)', lines[j]):
                    is_template = True
            
            status = 'TEMPLATE' if is_template else 'FALSE-CLAIM'
            print(f'{os.path.basename(filepath)} line {i+1}: {status}')
            print(f'  {line.strip()[:80]}')
            print()
