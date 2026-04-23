#!/usr/bin/env python3
"""Round 2: find any word that appears both with and without accents in the docs."""
import re, os, unicodedata
from collections import Counter
from fix_accents import WORD_MAP

pattern = re.compile(r'[A-Za-z][a-z]{2,}')
all_words = Counter()
for root, _, files in os.walk('docs'):
    for fn in files:
        if not fn.endswith('.md'):
            continue
        with open(os.path.join(root, fn), encoding='utf-8') as f:
            content = f.read()
        content = re.sub(r'`[^`]+`', '', content)
        content = re.sub(r'\]\([^)]*\)', ']', content)
        for w in pattern.findall(content):
            all_words[w] += 1

def sa(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')

groups = {}
for w, c in all_words.items():
    key = sa(w).lower()
    groups.setdefault(key, []).append((w, c))

suspect = []
for key, variants in groups.items():
    ac = [v for v in variants if sa(v[0]) != v[0]]
    un = [v for v in variants if sa(v[0]) == v[0]]
    if ac and un:
        for uw, uc in un:
            if uw in WORD_MAP:
                continue
            if uw.lower() in ('tem', 'vem', 'valida', 'secretaria'):
                continue
            suspect.append((uc, uw, [a[0] for a in ac]))

suspect.sort(reverse=True)
for cnt, w, tgts in suspect[:100]:
    print(f'{cnt:4d}  {w:30s} -> {tgts}')

print(f'\nTotal: {len(suspect)} variants.')
