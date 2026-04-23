#!/usr/bin/env python3
"""
Scan docs/*.md for pt-PT words that appear unaccented but likely need accents.
Produces frequency-sorted list to feed back into fix_accents.py WORD_MAP.
"""
import os
import re
from collections import Counter

# Import existing WORD_MAP to skip what's already handled
import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from fix_accents import WORD_MAP

# Heuristic suffixes that strongly suggest pt-PT missing accents
SUSPECT_ENDINGS = [
    'cao', 'coes', 'sao', 'soes',           # -ção, -ções, -são, -sões
    'ancia', 'ancias', 'encia', 'encias',    # -ância, -ência
    'avel', 'aveis', 'ivel', 'iveis',        # -ável, -ível
    'ario', 'aria', 'arios', 'arias',        # -ário, -ária
    'orio', 'oria', 'orios', 'orias',        # -ório, -ória
    'etico', 'etica', 'eticos', 'eticas',    # -ético, -ética
    'itico', 'itica', 'iticos', 'iticas',    # -ítico, -ítica
    'atico', 'atica', 'aticos', 'aticas',    # -ático, -ática (but also "automatico")
    'ogico', 'ogica', 'ogicos', 'ogicas',    # -ógico
]

# Explicit suspect words (that don't fit the ending rules)
EXPLICIT_SUSPECTS = {
    'e', 'ate', 'alem', 'ja', 'so', 'nao', 'tambem', 'pos', 'pre', 'so',
    'ai', 'la', 'ca', 'ha', 'e,', 'Voce', 'voce', 'Nivel', 'nivel',
    'niveis', 'Niveis', 'dificil', 'facil', 'util', 'uteis',
    'minimo', 'maximo', 'otimo', 'optimo', 'ultimo', 'ultima', 'proximo', 'proxima',
    'indice', 'indices', 'fisico', 'fisica', 'logico', 'logica',
    'historico', 'historica', 'eletronico', 'eletronica',
    'pratico', 'pratica', 'praticos', 'praticas',
    'publico', 'publica', 'publicos', 'publicas',
    'critico', 'critica', 'criticos', 'criticas',
    'politico', 'politica', 'politicos', 'politicas',
    'tipico', 'tipica', 'tipicos', 'tipicas',
    'multiplo', 'multipla', 'multiplos', 'multiplas',
    'proprio', 'propria', 'proprios', 'proprias',
    'rapido', 'rapida', 'rapidos', 'rapidas',
    'unico', 'unica', 'unicos', 'unicas',
    'valido', 'valida', 'validos', 'validas',
    'solido', 'solida', 'solidos', 'solidas',
    'rigido', 'rigida', 'rigidos', 'rigidas',
    'basico', 'basica', 'basicos', 'basicas',
    'intrinseco', 'intrinseca',
    'generico', 'generica',
    'analitico', 'analitica',
    'sintetico', 'sintetica',
    'sistematico', 'sistematica',
    'automatico', 'automatica',
    'especifico', 'especifica', 'especificos', 'especificas',
    'cientifico', 'cientifica',
    'tecnico', 'tecnica', 'tecnicos', 'tecnicas',
    'estrategico', 'estrategica',
    'tactico', 'tactica',
    'dinamico', 'dinamica',
    'estatico', 'estatica',
    'panico', 'trafico', 'grafico', 'grafica',
    'memoria', 'memorias', 'categoria', 'categorias',
    'historia', 'historias', 'teoria', 'teorias',
    'ia', 'ias', 'ie', 'ies',
    'amen', 'plem', 'vem', 'tem',
    'orcamento', 'procedimento',
    'veem', 'tem', 'vem',
    'avaliacao', 'organizacao', 'operacao', 'recuperacao', 'deteccao',
    'reacao', 'contencao', 'erradicacao', 'propagacao', 'investigacao',
    'priorizacao', 'categorizacao', 'administracao', 'implementacao',
    'notificacao', 'verificacao', 'validacao', 'simulacao', 'automacao',
    'configuracao', 'monitorizacao', 'restauracao', 'comunicacao',
    'decisao', 'reuniao', 'sessao', 'conclusao', 'revisao', 'versao',
    'pressao', 'extensao', 'dimensao', 'previsao', 'suspensao',
    'informacao', 'identificacao', 'classificacao', 'mitigacao',
    'execucao', 'inaceitavel', 'reparacao', 'dependencias',
    'criterio', 'criterios', 'servico', 'servicos', 'negocio', 'negocios',
    'cenario', 'cenarios', 'objetivo', 'objetivos',
}


def is_suspect(word):
    """Return True if word looks like a pt-PT term likely missing accents."""
    low = word.lower()
    if low in WORD_MAP:
        return False
    if word in WORD_MAP:
        return False
    if len(word) < 3:
        return False
    # Has uppercase ASCII letters but no accented chars?
    if any(c in 'àáâãäåèéêëìíîïòóôõöùúûüýÀÁÂÃÄÅÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝçÇ' for c in word):
        return False
    if not any(c.isalpha() for c in word):
        return False
    if word in EXPLICIT_SUSPECTS or low in EXPLICIT_SUSPECTS:
        return True
    for ending in SUSPECT_ENDINGS:
        if low.endswith(ending) and len(low) > len(ending) + 1:
            return True
    return False


def scan_file(path):
    """Return Counter of suspect words in file."""
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.split('\n')
    in_code = False
    words_collected = []
    for line in lines:
        if line.strip().startswith('```'):
            in_code = not in_code
            continue
        if in_code:
            continue
        # Remove inline code and link URLs
        line = re.sub(r'`[^`]+`', ' ', line)
        line = re.sub(r'\]\([^)]*\)', ']', line)
        for tok in re.findall(r"\b[A-Za-zÀ-ÿ]+\b", line):
            if is_suspect(tok):
                words_collected.append(tok)
    return Counter(words_collected)


def main():
    base = os.path.dirname(os.path.abspath(__file__))
    docs = os.path.join(base, 'docs')

    total = Counter()
    per_file = {}
    for root, _, files in os.walk(docs):
        for fn in files:
            if not fn.endswith('.md'):
                continue
            p = os.path.join(root, fn)
            c = scan_file(p)
            if c:
                per_file[p] = c
                total.update(c)

    print('=== TOP 150 suspect words (by frequency) ===')
    for word, count in total.most_common(150):
        print(f'  {count:4d}  {word}')

    print()
    print(f'=== Total unique suspect words: {len(total)} ===')
    print(f'=== Total suspect occurrences: {sum(total.values())} ===')


if __name__ == '__main__':
    main()
