#!/usr/bin/env python3
"""
Fix ALL Rp XM shorthand in articles, including decimal numbers.
Replace 'Rp 1.5M', 'Rp 2.5M', etc. with 'Rp 1,5 juta', 'Rp 2,5 juta', etc.
Indonesian decimal uses COMMA, not dot.
"""
import re, os

# Find all articles
articles = []
for root, dirs, files in os.walk('artikel'):
    for f in files:
        if f.endswith('.md') and f != '_index.md':
            articles.append(os.path.join(root, f))

print(f'Checking {len(articles)} articles...')

fixed = 0
for path in articles:
    with open(path, 'r', encoding='utf-8') as fp:
        content = fp.read()
    
    # Replace Rp X.YM with Rp X,Y juta (decimal, Indonesian format)
    new_content = re.sub(r'Rp ([0-9]+)\.([0-9]+)M([^a-z]|$)', r'Rp \1,\2 juta\3', content)
    
    # Replace Rp XM with Rp X juta (whole number)
    new_content = re.sub(r'Rp ([0-9]+)M([^a-z]|$)', r'Rp \1 juta\2', new_content)
    
    if new_content != content:
        with open(path, 'w', encoding='utf-8') as fp:
            fp.write(new_content)
        print(f'FIXED: {path}')
        fixed += 1

print(f'\nTotal fixed: {fixed}')
