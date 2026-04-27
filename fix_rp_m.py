#!/usr/bin/env python3
"""
Fix Rp XM shorthand in articles.
Replace 'Rp 1M', 'Rp 2M', etc. with 'Rp 1 juta', 'Rp 2 juta', etc.
"""
import re, os

articles = [
    'artikel/tier-0-survival/catat-utang-rapi.md',
    'artikel/tier-0-survival/gaji-mingguan-aman.md',
    'artikel/tier-0-survival/kelola-thr-hemat.md',
    'artikel/tier-0-survival/prioritaskan-utang.md',
    'artikel/tier-2-scaler/laporan-keuangan-bankable.md'
]

for path in articles:
    if not os.path.exists(path):
        print(f'NOT FOUND: {path}')
        continue
    
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace Rp XM with Rp X juta
    # Handles: Rp 1M, Rp 2M, Rp 15M, etc.
    new_content = re.sub(r'Rp ([0-9]+)M([^a-z]|$)', r'Rp \1 juta\2', content)
    
    if new_content != content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'FIXED: {path}')
    else:
        print(f'No change: {path}')
