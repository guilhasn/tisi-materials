#!/usr/bin/env python3
"""
Script para adicionar acentos pt-PT a ficheiros Markdown.
Processa palavra por palavra, preservando code blocks e links.
"""
import re
import os

# Mapeamento de palavras sem acento -> com acento (pt-PT)
# Organizado por padrões para máxima cobertura
WORD_MAP = {
    # Palavras muito comuns
    'nao': 'não',
    'Nao': 'Não',
    'tambem': 'também',
    'Tambem': 'Também',
    'ja': 'já',
    'Ja': 'Já',
    'so': 'só',
    'So': 'Só',
    'ate': 'até',
    'Ate': 'Até',
    'alem': 'além',
    'Alem': 'Além',
    'multiplos': 'múltiplos',
    'Multiplos': 'Múltiplos',
    'multiplas': 'múltiplas',
    'correlacao': 'correlação',
    'Correlacao': 'Correlação',
    'utilizacao': 'utilização',
    'Utilizacao': 'Utilização',
    'execucao': 'execução',
    'Execucao': 'Execução',
    'Historico': 'Histórico',
    'heuristica': 'heurística',
    'Heuristica': 'Heurística',
    'tecnologicas': 'tecnológicas',
    'Tecnologicas': 'Tecnológicas',
    'tecnologicos': 'tecnológicos',
    'Visao': 'Visão',
    'visao': 'visão',
    'conteudo': 'conteúdo',
    'cronologico': 'cronológico',
    'Cronologico': 'Cronológico',
    'cronologica': 'cronológica',
    'legitima': 'legítima',
    'ilegitima': 'ilegítima',
    'criticas': 'críticas',
    'mecanica': 'mecânica',
    'organica': 'orgânica',
    'explicacao': 'explicação',
    'Explicacao': 'Explicação',
    'classificacoes': 'classificações',
    'identificacoes': 'identificações',
    'comunicacoes': 'comunicações',
    'contribuicao': 'contribuição',
    'contribuicoes': 'contribuições',
    'distribuicao': 'distribuição',
    'substituicao': 'substituição',
    'intuicao': 'intuição',
    'localizacao': 'localização',
    'Localizacao': 'Localização',
    'agregacao': 'agregação',
    'priorizacao': 'priorização',
    'integracao': 'integração',
    'limitacao': 'limitação',
    'limitacoes': 'limitações',
    'infecao': 'infeção',
    'obrigacoes': 'obrigações',
    'cooperacao': 'cooperação',
    'capacitacao': 'capacitação',
    'organizacoes': 'organizações',
    'comunicacoes': 'comunicações',
    'informacoes': 'informações',
    'recomendacoes': 'recomendações',
    'implicacoes': 'implicações',
    'Implicacoes': 'Implicações',
    'penalizacoes': 'penalizações',
    'especificacao': 'especificação',
    'especificacoes': 'especificações',
    'regulamentacao': 'regulamentação',
    'implementacao': 'implementação',
    'Implementacao': 'Implementação',
    'recuperacoes': 'recuperações',
    'notificacoes': 'notificações',
    'reclamacoes': 'reclamações',
    'exploracoes': 'explorações',
    'obrigacoes': 'obrigações',
    'regulacoes': 'regulações',
    'transacoes': 'transações',
    'motivacao': 'motivação',
    'prevencao': 'prevenção',
    'Prevencao': 'Prevenção',
    'retencao': 'retenção',
    'atencao': 'atenção',
    'Atencao': 'Atenção',
    'mencao': 'menção',
    'intencao': 'intenção',
    'contencao': 'contenção',
    'manutencao': 'manutenção',
    'abstencao': 'abstenção',
    'detencao': 'detenção',
    'obtencao': 'obtenção',
    'Obtencao': 'Obtenção',
    'prevencao': 'prevenção',
    'pos': 'pós',
    'pre': 'pré',
    'tres': 'três',
    'Tres': 'Três',
    'apos': 'após',
    'Apos': 'Após',
    'alias': 'aliás',
    'atraves': 'através',
    'Atraves': 'Através',
    'varios': 'vários',
    'Varios': 'Vários',
    'varias': 'várias',
    'Varias': 'Várias',
    'unica': 'única',
    'unico': 'único',
    'ultimo': 'último',
    'Ultimo': 'Último',
    'ultima': 'última',
    'Ultima': 'Última',
    'ultimos': 'últimos',
    'ultimas': 'últimas',
    'otimo': 'ótimo',
    'optimo': 'óptimo',
    'obvia': 'óbvia',
    'obvias': 'óbvias',
    'obvio': 'óbvio',

    # Verbo ser/estar
    # 'e' is handled separately with context

    # -ção / -ções
    'informacao': 'informação',
    'Informacao': 'Informação',
    'informacoes': 'informações',
    'operacao': 'operação',
    'Operacao': 'Operação',
    'operacoes': 'operações',
    'recuperacao': 'recuperação',
    'Recuperacao': 'Recuperação',
    'detecao': 'deteção',
    'Detecao': 'Deteção',
    'reacao': 'reação',
    'Reacao': 'Reação',
    'contencao': 'contenção',
    'Contencao': 'Contenção',
    'classificacao': 'classificação',
    'Classificacao': 'Classificação',
    'identificacao': 'identificação',
    'Identificacao': 'Identificação',
    'comunicacao': 'comunicação',
    'Comunicacao': 'Comunicação',
    'organizacao': 'organização',
    'Organizacao': 'Organização',
    'organizacoes': 'organizações',
    'documentacao': 'documentação',
    'Documentacao': 'Documentação',
    'notificacao': 'notificação',
    'Notificacao': 'Notificação',
    'validacao': 'validação',
    'Validacao': 'Validação',
    'justificacao': 'justificação',
    'Justificacao': 'Justificação',
    'avaliacao': 'avaliação',
    'Avaliacao': 'Avaliação',
    'reparacao': 'reparação',
    'Reparacao': 'Reparação',
    'preparacao': 'preparação',
    'situacao': 'situação',
    'Situacao': 'Situação',
    'situacoes': 'situações',
    'configuracao': 'configuração',
    'Configuracao': 'Configuração',
    'configuracoes': 'configurações',
    'producao': 'produção',
    'Producao': 'Produção',
    'protecao': 'proteção',
    'Protecao': 'Proteção',
    'prevencao': 'prevenção',
    'coordenacao': 'coordenação',
    'Coordenacao': 'Coordenação',
    'decisao': 'decisão',
    'Decisao': 'Decisão',
    'decisoes': 'decisões',
    'solucao': 'solução',
    'Solucao': 'Solução',
    'solucoes': 'soluções',
    'funcao': 'função',
    'Funcao': 'Função',
    'funcoes': 'funções',
    'acao': 'ação',
    'Acao': 'Ação',
    'acoes': 'ações',
    'Acoes': 'Ações',
    'seccao': 'secção',
    'Seccao': 'Secção',
    'seccoes': 'secções',
    'educacao': 'educação',
    'relacao': 'relação',
    'regulacao': 'regulação',
    'aplicacao': 'aplicação',
    'Aplicacao': 'Aplicação',
    'aplicacoes': 'aplicações',
    'simulacao': 'simulação',
    'Simulacao': 'Simulação',
    'simulacoes': 'simulações',
    'obrigacao': 'obrigação',
    'obrigacoes': 'obrigações',
    'investigacao': 'investigação',
    'Investigacao': 'Investigação',
    'mitigacao': 'mitigação',
    'Mitigacao': 'Mitigação',
    'monitorizacao': 'monitorização',
    'Monitorizacao': 'Monitorização',
    'autorizacao': 'autorização',
    'Autorizacao': 'Autorização',
    'degradacao': 'degradação',
    'Degradacao': 'Degradação',
    'propagacao': 'propagação',
    'Propagacao': 'Propagação',
    'corrupcao': 'corrupção',
    'alteracao': 'alteração',
    'alteracoes': 'alterações',
    'manutencao': 'manutenção',
    'Manutencao': 'Manutenção',
    'prevencao': 'prevenção',
    'replicacao': 'replicação',
    'transacao': 'transação',
    'transacoes': 'transações',
    'interacao': 'interação',
    'formacao': 'formação',
    'Formacao': 'Formação',
    'manipulacao': 'manipulação',
    'Manipulacao': 'Manipulação',
    'restauracao': 'restauração',
    'interrupcao': 'interrupção',
    'instrucao': 'instrução',
    'instrucoes': 'instruções',
    'destruicao': 'destruição',
    'infraestrutura': 'infraestrutura',  # already correct
    'faturacao': 'faturação',
    'sensibilizacao': 'sensibilização',
    'segmentacao': 'segmentação',
    'Segmentacao': 'Segmentação',
    'verificacao': 'verificação',
    'Verificacao': 'Verificação',
    'preservacao': 'preservação',
    'exfiltracao': 'exfiltração',
    'reconciliacao': 'reconciliação',
    'recalibracao': 'recalibração',
    'compensacao': 'compensação',
    'autenticacao': 'autenticação',
    'Autenticacao': 'Autenticação',
    'ponderacao': 'ponderação',
    'erradicacao': 'erradicação',
    'Erradicacao': 'Erradicação',
    'instalacao': 'instalação',
    'resolucao': 'resolução',
    'conclusao': 'conclusão',
    'atualizacao': 'atualização',
    'orientacao': 'orientação',
    'Orientacao': 'Orientação',
    'orientacoes': 'orientações',
    'Orientacoes': 'Orientações',
    'excecao': 'exceção',
    'excecoes': 'exceções',
    'infecao': 'infeção',
    'sabotagem': 'sabotagem',  # already correct
    'medicao': 'medição',
    'proporcao': 'proporção',
    'dimensao': 'dimensão',
    'Dimensao': 'Dimensão',
    'suspensao': 'suspensão',
    'ligacao': 'ligação',
    'ligacoes': 'ligações',
    'prevencao': 'prevenção',
    'Prevencao': 'Prevenção',
    'recomendacao': 'recomendação',
    'recomendacoes': 'recomendações',

    # -ância / -ência
    'seguranca': 'segurança',
    'Seguranca': 'Segurança',
    'confianca': 'confiança',
    'Confianca': 'Confiança',
    'tolerancia': 'tolerância',
    'importancia': 'importância',
    'Importancia': 'Importância',
    'relevancia': 'relevância',
    'frequencia': 'frequência',
    'Frequencia': 'Frequência',
    'urgencia': 'urgência',
    'Urgencia': 'Urgência',
    'experiencia': 'experiência',
    'Experiencia': 'Experiência',
    'consequencia': 'consequência',
    'consequencias': 'consequências',
    'dependencia': 'dependência',
    'dependencias': 'dependências',
    'independencia': 'independência',
    'ausencia': 'ausência',
    'Ausencia': 'Ausência',
    'evidencia': 'evidência',
    'evidencias': 'evidências',
    'Evidencia': 'Evidência',
    'Evidencias': 'Evidências',
    'vigilancia': 'vigilância',
    'discrepancia': 'discrepância',
    'permanencia': 'permanência',
    'resistencia': 'resistência',
    'ciencia': 'ciência',
    'eficiencia': 'eficiência',
    'ocorrencia': 'ocorrência',
    'ocorrencias': 'ocorrências',
    'referencia': 'referência',
    'Referencia': 'Referência',
    'transparencia': 'transparência',
    'inteligencia': 'inteligência',

    # -ário / -ária / -ério
    'necessario': 'necessário',
    'Necessario': 'Necessário',
    'necessaria': 'necessária',
    'necessarios': 'necessários',
    'necessarias': 'necessárias',
    'cenario': 'cenário',
    'Cenario': 'Cenário',
    'cenarios': 'cenários',
    'comentario': 'comentário',
    'primario': 'primário',
    'primaria': 'primária',
    'secundario': 'secundário',
    'secundaria': 'secundária',
    'voluntario': 'voluntário',
    'extraordinario': 'extraordinário',
    'contrario': 'contrário',
    'Contrario': 'Contrário',
    'criterio': 'critério',
    'Criterio': 'Critério',
    'criterios': 'critérios',
    'misterio': 'mistério',
    'salario': 'salário',
    'adversario': 'adversário',
    'inventario': 'inventário',
    'temporario': 'temporário',
    'temporaria': 'temporária',
    'regulatorio': 'regulatório',
    'regulatoria': 'regulatória',
    'obrigatorio': 'obrigatório',
    'Obrigatorio': 'Obrigatório',
    'obrigatoria': 'obrigatória',
    'Obrigatoria': 'Obrigatória',
    'prioritario': 'prioritário',

    # -ível / -ável
    'possivel': 'possível',
    'Possivel': 'Possível',
    'impossivel': 'impossível',
    'Impossivel': 'Impossível',
    'disponivel': 'disponível',
    'Disponivel': 'Disponível',
    'disponiveis': 'disponíveis',
    'Disponiveis': 'Disponíveis',
    'indisponivel': 'indisponível',
    'toleravel': 'tolerável',
    'Toleravel': 'Tolerável',
    'vulneravel': 'vulnerável',
    'responsavel': 'responsável',
    'Responsavel': 'Responsável',
    'fiavel': 'fiável',
    'comparavel': 'comparável',
    'aceitavel': 'aceitável',
    'Aceitavel': 'Aceitável',
    'provavel': 'provável',
    'Provavel': 'Provável',
    'reversivel': 'reversível',
    'irreversivel': 'irreversível',
    'previsivel': 'previsível',
    'imprevisivel': 'imprevisível',
    'inacessivel': 'inacessível',
    'compativel': 'compatível',
    'instaveis': 'instáveis',
    'adaptavel': 'adaptável',

    # -ático / -ético / -ítico / -ógico / -écnico
    'pratico': 'prático',
    'Pratico': 'Prático',
    'pratica': 'prática',
    'Pratica': 'Prática',
    'praticas': 'práticas',
    'praticos': 'práticos',
    'Praticos': 'Práticos',
    'automatico': 'automático',
    'Automatico': 'Automático',
    'automatica': 'automática',
    'Automatica': 'Automática',
    'automaticos': 'automáticos',
    'automaticas': 'automáticas',
    'sistematico': 'sistemático',
    'problematico': 'problemático',
    'critico': 'crítico',
    'Critico': 'Crítico',
    'critica': 'crítica',
    'Critica': 'Crítica',
    'criticos': 'críticos',
    'criticas': 'críticas',
    'logico': 'lógico',
    'logica': 'lógica',
    'tecnologico': 'tecnológico',
    'Tecnologico': 'Tecnológico',
    'tecnologica': 'tecnológica',
    'Tecnologica': 'Tecnológica',
    'tecnico': 'técnico',
    'Tecnico': 'Técnico',
    'tecnica': 'técnica',
    'Tecnica': 'Técnica',
    'tecnicos': 'técnicos',
    'tecnicas': 'técnicas',
    'eletronico': 'eletrónico',
    'especifico': 'específico',
    'Especifico': 'Específico',
    'especifica': 'específica',
    'especificos': 'específicos',
    'especificas': 'específicas',
    'historico': 'histórico',
    'historicos': 'históricos',
    'periodico': 'periódico',
    'periodicos': 'periódicos',
    'periodicas': 'periódicas',
    'estrategico': 'estratégico',
    'Estrategico': 'Estratégico',
    'estrategica': 'estratégica',
    'Estrategica': 'Estratégica',
    'estrategicos': 'estratégicos',
    'estrategicas': 'estratégicas',
    'hierarquico': 'hierárquico',
    'Hierarquico': 'Hierárquico',
    'hierarquica': 'hierárquica',

    # -ência / -ância (see above)

    # -mento / already correct usually, but some need accent
    # -amento, -imento usually don't need accents

    # -ério / -éria
    'pericia': 'perícia',
    'Pericia': 'Perícia',

    # -óvel
    'imovel': 'imóvel',

    # -óstico
    'diagnostico': 'diagnóstico',

    # Words with ê
    'frequencia': 'frequência',

    # Words with â
    'ambito': 'âmbito',
    'Ambito': 'Âmbito',
    'parametro': 'parâmetro',
    'parametros': 'parâmetros',

    # Specific common words
    'analise': 'análise',
    'Analise': 'Análise',
    'analises': 'análises',
    'indice': 'índice',
    'Indice': 'Índice',
    'indices': 'índices',
    'nivel': 'nível',
    'Nivel': 'Nível',
    'niveis': 'níveis',
    'Niveis': 'Níveis',
    'dificil': 'difícil',
    'facil': 'fácil',
    'rapido': 'rápido',
    'Rapido': 'Rápido',
    'rapida': 'rápida',
    'valido': 'válido',
    'invalido': 'inválido',
    'minimo': 'mínimo',
    'Minimo': 'Mínimo',
    'minima': 'mínima',
    'minimos': 'mínimos',
    'maximo': 'máximo',
    'Maximo': 'Máximo',
    'maxima': 'máxima',
    'medio': 'médio',
    'media': 'média',
    'medias': 'médias',
    'metrica': 'métrica',
    'Metrica': 'Métrica',
    'metricas': 'métricas',
    'Metricas': 'Métricas',
    'codigo': 'código',
    'Codigo': 'Código',
    'credito': 'crédito',
    'periodo': 'período',
    'Periodo': 'Período',
    'periodos': 'períodos',
    'basico': 'básico',
    'basica': 'básica',
    'basicos': 'básicos',
    'basicas': 'básicas',
    'pagina': 'página',
    'paginas': 'páginas',
    'numero': 'número',
    'Numero': 'Número',
    'numeros': 'números',
    'titulo': 'título',
    'conteudo': 'conteúdo',
    'Conteudo': 'Conteúdo',
    'conteudos': 'conteúdos',
    'Conteudos': 'Conteúdos',
    'exercicio': 'exercício',
    'Exercicio': 'Exercício',
    'exercicios': 'exercícios',
    'Exercicios': 'Exercícios',
    'servico': 'serviço',
    'Servico': 'Serviço',
    'servicos': 'serviços',
    'Servicos': 'Serviços',
    'inicio': 'início',
    'Inicio': 'Início',
    'proposito': 'propósito',
    'diagnostico': 'diagnóstico',
    'Diagnostico': 'Diagnóstico',
    'topico': 'tópico',
    'topicos': 'tópicos',
    'simbolo': 'símbolo',
    'orgao': 'órgão',
    'orgaos': 'órgãos',
    'legitimo': 'legítimo',
    'Legitimo': 'Legítimo',
    'ilegitimo': 'ilegítimo',
    'panico': 'pânico',
    'mecanico': 'mecânico',
    'unico': 'único',
    'Unico': 'Único',

    # Verbs and verb forms
    'esta': 'está',
    'Esta': 'Esta',  # Keep "Esta" as is - could be demonstrative
    'estao': 'estão',
    'Estao': 'Estão',
    'sera': 'será',
    'serao': 'serão',
    'tera': 'terá',
    'terao': 'terão',
    'ha': 'há',
    'dao': 'dão',
    'vao': 'vão',
    'sao': 'são',
    'Sao': 'São',
    'estara': 'estará',
    'devera': 'deverá',
    'devem': 'devem',  # already correct
    'poderao': 'poderão',
    'irao': 'irão',
    'ficara': 'ficará',
    'ficarao': 'ficarão',
    'destroi': 'destrói',

    # -ância / -ença
    'diferenca': 'diferença',
    'Diferenca': 'Diferença',
    'diferencas': 'diferenças',
    'presenca': 'presença',
    'ausencia': 'ausência',

    # -ência (handled above)

    # Other common words
    'acessivel': 'acessível',
    'compativel': 'compatível',
    'possivel': 'possível',
    'proximo': 'próximo',
    'Proximo': 'Próximo',
    'proxima': 'próxima',
    'proximos': 'próximos',
    'proprio': 'próprio',
    'Proprio': 'Próprio',
    'propria': 'própria',
    'proprios': 'próprios',
    'proprias': 'próprias',
    'obvio': 'óbvio',
    'obvia': 'óbvia',
    'obvias': 'óbvias',
    'obvios': 'óbvios',
    'otima': 'ótima',
    'reais': 'reais',  # already correct
    'voce': 'você',
    'Voce': 'Você',
    'portugues': 'português',
    'Portugues': 'Português',
    'pais': 'país',
    'paises': 'países',
    'regiao': 'região',
    'orgao': 'órgão',
    'cidadao': 'cidadão',
    'padrao': 'padrão',
    'Padrao': 'Padrão',
    'padroes': 'padrões',
    'Padroes': 'Padrões',
    'alemao': 'alemão',
    'versao': 'versão',
    'Versao': 'Versão',
    'versoes': 'versões',
    'gestao': 'gestão',
    'Gestao': 'Gestão',
    'questao': 'questão',
    'Questao': 'Questão',
    'questoes': 'questões',
    'lesao': 'lesão',
    'pressao': 'pressão',
    'sessao': 'sessão',
    'sessoes': 'sessões',
    'razao': 'razão',
    'Razao': 'Razão',
    'razoes': 'razões',
    'opiniao': 'opinião',

    # -ância/-ança already covered

    # Specific domain words
    'anomalo': 'anómalo',
    'anomala': 'anómala',
    'anomalos': 'anómalos',
    'anomalas': 'anómalas',
    'perimetro': 'perímetro',
    'Perimetro': 'Perímetro',
    'forense': 'forense',  # already correct
    'telefone': 'telefone',  # already correct
    'fidedigno': 'fidedigno',  # already correct
    'hipotese': 'hipótese',
    'hipoteses': 'hipóteses',
    'relatorio': 'relatório',
    'Relatorio': 'Relatório',
    'relatorios': 'relatórios',
    'repositorio': 'repositório',
    'repositorios': 'repositórios',
    'laboratorio': 'laboratório',
    'laboratorios': 'laboratórios',
    'beneficio': 'benefício',
    'beneficios': 'benefícios',
    'sacrificio': 'sacrifício',
    'edificio': 'edifício',
    'eficacia': 'eficácia',
    'farmacia': 'farmácia',
    'incendio': 'incêndio',
    'Incendio': 'Incêndio',
    'incendios': 'incêndios',
    'equilibrio': 'equilíbrio',
    'malicio': 'malício',
    'maliciosa': 'maliciosa',  # already correct
    'prejudicio': 'prejuízo',

    # More words
    'metodo': 'método',
    'Metodo': 'Método',
    'metodos': 'métodos',
    'modulo': 'módulo',
    'Modulo': 'Módulo',
    'modulos': 'módulos',
    'Modulos': 'Módulos',
    'calculo': 'cálculo',
    'Calculo': 'Cálculo',
    'calculos': 'cálculos',
    'vinculo': 'vínculo',
    'curriculo': 'currículo',
    'obstaculo': 'obstáculo',
    'protocolo': 'protocolo',  # already correct
    'veiculo': 'veículo',

    # ó words
    'obito': 'óbito',
    'orgao': 'órgão',

    # Words with cedilla ç
    'licao': 'lição',
    'licoes': 'lições',
    'Licoes': 'Lições',
    'prevencao': 'prevenção',
    'forca': 'força',
    '24h': '24h',  # keep as is

    # Words with tilde
    'mao': 'mão',
    'maos': 'mãos',
    'alemaes': 'alemães',
    'capitaes': 'capitães',
    'cao': 'cão',
    'caes': 'cães',
    'botao': 'botão',
    'botoes': 'botões',

    # Adjectives / adverbs
    'facil': 'fácil',
    'Facil': 'Fácil',
    'dificil': 'difícil',
    'Dificil': 'Difícil',
    'util': 'útil',
    'Util': 'Útil',
    'inutel': 'inútil',
    'fragil': 'frágil',
    'visivel': 'visível',
    'impossivel': 'impossível',
    'improvavel': 'improvável',
    'imediata': 'imediata',  # already correct
    'simultaneo': 'simultâneo',
    'simultaneos': 'simultâneos',
    'espontaneo': 'espontâneo',
    'instantaneo': 'instantâneo',
    'instantanea': 'instantânea',

    # More verb forms
    'tera': 'terá',
    'fara': 'fará',
    'dara': 'dará',
    'podera': 'poderá',
    'devera': 'deverá',
    'ficara': 'ficará',
    'continuara': 'continuará',
    'comecara': 'começará',
    'permitira': 'permitirá',
    'conseguira': 'conseguirá',

    # -mente adverbs (some need base accent)
    # Usually formed from adjective, the adjective accent stays

    # Specific fixes found in audit
    'ecra': 'ecrã',
    'Ecra': 'Ecrã',

    # Words with accent on penultimate
    'academico': 'académico',
    'Academico': 'Académico',
    'academica': 'académica',
    'academicos': 'académicos',
    'academicas': 'académicas',
    'economico': 'económico',
    'economica': 'económica',
    'economicos': 'económicos',
    'politica': 'política',
    'Politica': 'Política',
    'politicas': 'políticas',
    'publico': 'público',
    'Publico': 'Público',
    'publica': 'pública',
    'Publica': 'Pública',

    # Common phrases / other
    'Porque': 'Porque',  # already correct unless it's "Porquê"
    'apolice': 'apólice',
    'apolices': 'apólices',
    'petroleo': 'petróleo',
    'automovel': 'automóvel',
    'automoveis': 'automóveis',
    'automovel': 'automóvel',

    # Words ending in -io/-ia with accent
    'comercio': 'comércio',
    'Comercio': 'Comércio',
    'dominio': 'domínio',
    'dominios': 'domínios',
    'presidencia': 'presidência',
    'gerencia': 'gerência',

    # More -vel words
    'razoavel': 'razoável',
    'consideravel': 'considerável',
    'recomendavel': 'recomendável',

    # Additional common words
    'trafego': 'tráfego',
    'Trafego': 'Tráfego',
    'juridico': 'jurídico',
    'Juridico': 'Jurídico',
    'juridica': 'jurídica',
    'tecnico': 'técnico',
    'clinico': 'clínico',
    'Clinico': 'Clínico',
    'clinica': 'clínica',
    'clinicos': 'clínicos',
    'clinicas': 'clínicas',
    'medico': 'médico',
    'Medico': 'Médico',
    'medicos': 'médicos',
    'medica': 'médica',
    'fisico': 'físico',
    'Fisico': 'Físico',
    'fisica': 'física',
    'Fisica': 'Física',
    'fisicos': 'físicos',
    'fisicas': 'físicas',
    'logistico': 'logístico',
    'logistica': 'logística',
    'Logistica': 'Logística',
    'anonimo': 'anónimo',
    'anonima': 'anónima',
    'continuo': 'contínuo',
    'continua': 'contínua',
    'necessario': 'necessário',
    'necessaria': 'necessária',
    'voluntaria': 'voluntária',
    'eletrico': 'elétrico',
    'eletrica': 'elétrica',
    'mecanico': 'mecânico',
    'organico': 'orgânico',
    'dinamico': 'dinâmico',
    'dinamica': 'dinâmica',
    'estatico': 'estático',
    'estatica': 'estática',

    # Words with accented 'i'
    'intrusao': 'intrusão',
    'Intrusao': 'Intrusão',
    'inclusao': 'inclusão',
    'exclusao': 'exclusão',
    'conclusao': 'conclusão',
    'Conclusao': 'Conclusão',
    'confusao': 'confusão',
    'confusoes': 'confusões',
    'Confusao': 'Confusão',

    # -ério
    'misterio': 'mistério',

    # Words ending in -ância
    'distancia': 'distância',
    'Distancia': 'Distância',
    'substancia': 'substância',
    'circunstancia': 'circunstância',
    'circunstancias': 'circunstâncias',
    'estancia': 'estância',
    'instancia': 'instância',
    'Instancia': 'Instância',

    # -aço / -aça
    'ameaca': 'ameaça',
    'Ameaca': 'Ameaça',
    'ameacas': 'ameaças',
    'espaco': 'espaço',
    'Espaco': 'Espaço',

    # More domain specific
    'criptografia': 'criptografia',  # already correct
    'estrategia': 'estratégia',
    'Estrategia': 'Estratégia',
    'estrategias': 'estratégias',
    'Estrategias': 'Estratégias',
    'emergencia': 'emergência',
    'Emergencia': 'Emergência',
    'emergencias': 'emergências',
    'potencia': 'potência',
    'eficacia': 'eficácia',
    'democracia': 'democracia',  # already correct

    # Verb: começar
    'comeca': 'começa',
    'Comeca': 'Começa',
    'comecam': 'começam',
    'comecou': 'começou',
    'comecar': 'começar',

    # Common words with ç
    'cabeca': 'cabeça',
    'preco': 'preço',
    'precos': 'preços',
    'peca': 'peça',
    'pecas': 'peças',
    'almoco': 'almoço',
    'servico': 'serviço',

    # -ês / -esa
    'mes': 'mês',
    'meses': 'meses',  # already correct
    'ingles': 'inglês',
    'frances': 'francês',
    'holandes': 'holandês',

    # Past participles and -ído
    'destruido': 'destruído',
    'construido': 'construído',
    'distribuido': 'distribuído',
    'substituido': 'substituído',
    'incluido': 'incluído',
    'excluido': 'excluído',
    'prejuizo': 'prejuízo',
    'prejuizos': 'prejuízos',

    # More words
    'obrigatorios': 'obrigatórios',
    'obrigatorias': 'obrigatórias',
    'provisorio': 'provisório',
    'provisoria': 'provisória',

    # Keep English acronyms as-is (they won't match anyway)

    # -tório
    'laboratorio': 'laboratório',
    'territorio': 'território',
    'escritorio': 'escritório',
    'Escritorio': 'Escritório',
    'transitorio': 'transitório',
    'aleatorio': 'aleatório',
    'aleatorios': 'aleatórios',

    # Misc
    'unico': 'único',
    'teorico': 'teórico',
    'Teorico': 'Teórico',
    'teorica': 'teórica',
    'teoricas': 'teóricas',
    'teoricos': 'teóricos',
    'cronico': 'crónico',
    'cronica': 'crónica',
    'simbolico': 'simbólico',
    'simbolica': 'simbólica',
    'anonima': 'anónima',

    # Nouns
    'area': 'área',
    'Area': 'Área',
    'areas': 'áreas',
    'agua': 'água',
    'arvore': 'árvore',
    'saude': 'saúde',
    'Saude': 'Saúde',
    'reuniao': 'reunião',
    'reunioes': 'reuniões',
    'opiniao': 'opinião',
    'camara': 'câmara',

    # Final batch
    'automoveis': 'automóveis',
    'telemovel': 'telemóvel',
    'responsaveis': 'responsáveis',
    'habituais': 'habituais',  # already correct

    # -osa / -oso
    'perigoso': 'perigoso',  # already correct
    'malicioso': 'malicioso',  # already correct

    # ========== BATCH 2: Missing words found in scan ==========

    # -ção words missing
    'descricao': 'descrição',
    'Descricao': 'Descrição',
    'definicao': 'definição',
    'Definicao': 'Definição',
    'definicoes': 'definições',
    'Definicoes': 'Definições',
    'direcao': 'direção',
    'Direcao': 'Direção',
    'automacao': 'automação',
    'Automacao': 'Automação',
    'afirmacao': 'afirmação',
    'Afirmacao': 'Afirmação',
    'confirmacao': 'confirmação',
    'Confirmacao': 'Confirmação',
    'migracao': 'migração',
    'Migracao': 'Migração',
    'aprovacao': 'aprovação',
    'Aprovacao': 'Aprovação',
    'violacao': 'violação',
    'Violacao': 'Violação',
    'precaucao': 'precaução',
    'Precaucao': 'Precaução',
    'evacuacao': 'evacuação',
    'Evacuacao': 'Evacuação',
    'administracao': 'administração',
    'Administracao': 'Administração',
    'calendarizacao': 'calendarização',
    'reintroducao': 'reintrodução',
    'sincronizacao': 'sincronização',
    'ressincronizacao': 'ressincronização',
    'combinacao': 'combinação',

    # -ções words missing
    'afirmacoes': 'afirmações',
    'condicoes': 'condições',
    'avaliacoes': 'avaliações',
    'sincronizacoes': 'sincronizações',
    'inscricoes': 'inscrições',
    'correcoes': 'correções',
    'localizacoes': 'localizações',
    'opcoes': 'opções',
    'posicoes': 'posições',
    'cotacoes': 'cotações',
    'submissoes': 'submissões',
    'sancoes': 'sanções',
    'estacoes': 'estações',
    'verificacoes': 'verificações',

    # -são words missing
    'revisao': 'revisão',
    'Revisao': 'Revisão',
    'progressao': 'progressão',
    'Progressao': 'Progressão',
    'compreensao': 'compreensão',
    'Compreensao': 'Compreensão',
    'confusao': 'confusão',
    'Confusao': 'Confusão',
    'conclusao': 'conclusão',
    'Conclusao': 'Conclusão',
    'extorsao': 'extorsão',
    'Extorsao': 'Extorsão',
    'intrusao': 'intrusão',
    'Intrusao': 'Intrusão',
    'tensao': 'tensão',
    'expressao': 'expressão',
    'impressao': 'impressão',
    'diversao': 'diversão',
    'indecisao': 'indecisão',
    'explosao': 'explosão',
    'discussao': 'discussão',
    'Discussao': 'Discussão',

    # -ário/-ária words missing
    'funcionario': 'funcionário',
    'Funcionario': 'Funcionário',
    'funcionarios': 'funcionários',
    'Funcionarios': 'Funcionários',
    'formulario': 'formulário',
    'Formulario': 'Formulário',
    'formularios': 'formulários',
    'horario': 'horário',
    'Horario': 'Horário',
    'horarios': 'horários',
    'destinatario': 'destinatário',
    'destinatarios': 'destinatários',
    'bancario': 'bancário',
    'bancarios': 'bancários',
    'bancaria': 'bancária',
    'bancarias': 'bancárias',
    'calendario': 'calendário',
    'diario': 'diário',
    'intermediario': 'intermediário',
    'intermediarios': 'intermediários',
    'desnecessario': 'desnecessário',
    'desnecessarios': 'desnecessários',

    # -ância/-ência words missing
    'competencia': 'competência',
    'Competencia': 'Competência',
    'contingencia': 'contingência',
    'recorrencia': 'recorrência',
    'persistencia': 'persistência',
    'existencia': 'existência',
    'sequencia': 'sequência',
    'influencia': 'influência',
    'essencia': 'essência',
    'redundancia': 'redundância',
    'convergencia': 'convergência',
    'resiliencia': 'resiliência',
    'latencia': 'latência',
    'obediencia': 'obediência',
    'consistencia': 'consistência',
    'videoconferencia': 'videoconferência',
    'diligencia': 'diligência',
    'transferencia': 'transferência',
    'transferencias': 'transferências',
    'poupanca': 'poupança',
    'Poupanca': 'Poupança',
    'ciberseguranca': 'cibersegurança',
    'Ciberseguranca': 'Cibersegurança',

    # -ança words
    'permissao': 'permissão',
    'permissoes': 'permissões',
    'Permissoes': 'Permissões',

    # Words with special accents
    'informatica': 'informática',
    'Informatica': 'Informática',
    'informatico': 'informático',
    'Informatico': 'Informático',
    'negocio': 'negócio',
    'negocios': 'negócios',
    'memoria': 'memória',
    'memorias': 'memórias',
    'maquina': 'máquina',
    'maquinas': 'máquinas',
    'estacao': 'estação',
    'Estacao': 'Estação',
    'fabrica': 'fábrica',
    'Fabrica': 'Fábrica',
    'industria': 'indústria',
    'Industria': 'Indústria',
    'cirurgica': 'cirúrgica',
    'policia': 'polícia',
    'Policia': 'Polícia',
    'judiciaria': 'judiciária',
    'Judiciaria': 'Judiciária',
    'sabado': 'sábado',
    'manha': 'manhã',
    'robos': 'robôs',
    'mediatica': 'mediática',
    'consultavel': 'consultável',
    'telefonica': 'telefónica',
    'caracteristica': 'característica',
    'caracteristicas': 'características',
    'volumetrico': 'volumétrico',
    'interbancarias': 'interbancárias',
    'litigio': 'litígio',
    'matricula': 'matrícula',
    'matriculas': 'matrículas',
    'balcao': 'balcão',
    'balcoes': 'balcões',

    # Verb forms missing
    'comecando': 'começando',
    'concluida': 'concluída',
    'reforcada': 'reforçada',
    'reforcadas': 'reforçadas',
    'reforcado': 'reforçado',
    'reforcados': 'reforçados',

    # -vel/-veis plurals missing
    'possiveis': 'possíveis',
    'sensiveis': 'sensíveis',
    'sensivel': 'sensível',
    'acessiveis': 'acessíveis',
    'razoaveis': 'razoáveis',
    'provaveis': 'prováveis',
    'impossiveis': 'impossíveis',
    'utilizaveis': 'utilizáveis',
    'irrecuperaveis': 'irrecuperáveis',
    'insubstituiveis': 'insubstituíveis',
    'indisponiveis': 'indisponíveis',
    'inaceitaveis': 'inaceitáveis',
    'impraticaveis': 'impraticáveis',
    'fiaveis': 'fiáveis',
    'visiveis': 'visíveis',

    # Adjectives missing
    'ficticio': 'fictício',
    'ficticios': 'fictícios',
    'monolitico': 'monolítico',
    'caotica': 'caótica',
    'identica': 'idêntica',
    'etico': 'ético',
    'sistematica': 'sistemática',

    # Compound words
    'boa-fe': 'boa-fé',
    'terca-feira': 'terça-feira',
    'terca': 'terça',
    'materia-prima': 'matéria-prima',

    # ========== BATCH 3: Words found in ASCII diagrams & remaining ==========

    # Missing capitalized forms
    'Proposito': 'Propósito',
    'Demonstracao': 'Demonstração',
    'demonstracao': 'demonstração',
    'Reutilizacao': 'Reutilização',
    'reutilizacao': 'reutilização',
    'Prestacao': 'Prestação',
    'prestacao': 'prestação',

    # Missing words
    'governanca': 'governança',
    'Governanca': 'Governança',
    'armazem': 'armazém',
    'Armazem': 'Armazém',
    'amanha': 'amanhã',
    'desconexao': 'desconexão',
    'conexao': 'conexão',
    'correcao': 'correção',
    'Correcao': 'Correção',
    'licenca': 'licença',
    'Licenca': 'Licença',
    'diagnostica': 'diagnóstica',
    'Diagnostica': 'Diagnóstica',

    # Words found in diagrams
    'Nao': 'Não',
    'Acao': 'Ação',
    'Violacao': 'Violação',
    'Nivel': 'Nível',
    'Solucao': 'Solução',
    'Contencao': 'Contenção',
    'Justificacao': 'Justificação',
    'Recuperacao': 'Recuperação',
    'Classificacao': 'Classificação',
    'Funcao': 'Função',
    'Producao': 'Produção',
    'Preparacao': 'Preparação',
    'Faturacao': 'Faturação',
    'Confusao': 'Confusão',
    'Sessao': 'Sessão',
    'Gestao': 'Gestão',

    # -ístico words
    'caracteristico': 'característico',
    'caracteristica': 'característica',

    # ========== BATCH 4: All remaining words from final scan ==========

    # -ção words still missing
    'acumulacao': 'acumulação',
    'adaptacao': 'adaptação',
    'ativacao': 'ativação',
    'Ativacao': 'Ativação',
    'atribuicao': 'atribuição',
    'Atribuicao': 'Atribuição',
    'centralizacao': 'centralização',
    'concatenacao': 'concatenação',
    'coracao': 'coração',
    'desativacao': 'desativação',
    'desinformacao': 'desinformação',
    'desorganizacao': 'desorganização',
    'designacao': 'designação',
    'Designacao': 'Designação',
    'determinacao': 'determinação',
    'Determinacao': 'Determinação',
    'distincao': 'distinção',
    'divulgacao': 'divulgação',
    'duracao': 'duração',
    'Duracao': 'Duração',
    'eliminacao': 'eliminação',
    'evolucao': 'evolução',
    'Evolucao': 'Evolução',
    'exposicao': 'exposição',
    'Exposicao': 'Exposição',
    'fracao': 'fração',
    'hesitacao': 'hesitação',
    'imposicao': 'imposição',
    'improvisacao': 'improvisação',
    'inacao': 'inação',
    'insatisfacao': 'insatisfação',
    'intencao': 'intenção',
    'Intencao': 'Intenção',
    'interpretacao': 'interpretação',
    'intervencao': 'intervenção',
    'Intervencao': 'Intervenção',
    'invalidacao': 'invalidação',
    'Invalidacao': 'Invalidação',
    'legislacao': 'legislação',
    'mineracao': 'mineração',
    'Mineracao': 'Mineração',
    'mobilizacao': 'mobilização',
    'movimentacao': 'movimentação',
    'navegacao': 'navegação',
    'normalizacao': 'normalização',
    'numeracao': 'numeração',
    'otimizacao': 'otimização',
    'percecao': 'perceção',
    'perturbacao': 'perturbação',
    'precipitacao': 'precipitação',
    'provocacao': 'provocação',
    'qualificacao': 'qualificação',
    'reavaliacao': 'reavaliação',
    'recepcao': 'receção',
    'reconstrucao': 'reconstrução',
    'Reconstrucao': 'Reconstrução',
    'reconstituicao': 'reconstituição',
    'Reconstituicao': 'Reconstituição',
    'reinfecao': 'reinfeção',
    'reputacao': 'reputação',
    'Reputacao': 'Reputação',
    'responsabilizacao': 'responsabilização',
    'restricao': 'restrição',
    'sensacao': 'sensação',
    'separacao': 'separação',
    'simplificacao': 'simplificação',
    'sofisticacao': 'sofisticação',
    'transicao': 'transição',
    'posicao': 'posição',
    'Posicao': 'Posição',
    'comparacao': 'comparação',
    'Comparacao': 'Comparação',
    'compensacao': 'compensação',
    'Compensacao': 'Compensação',
    'adequacao': 'adequação',
    'Adequacao': 'Adequação',
    'atualizacao': 'atualização',
    'Atualizacao': 'Atualização',
    'implicacao': 'implicação',
    'Implicacao': 'Implicação',
    'limitacao': 'limitação',
    'Limitacao': 'Limitação',
    'obrigacao': 'obrigação',
    'Obrigacao': 'Obrigação',
    'regulacao': 'regulação',
    'Regulacao': 'Regulação',
    'relacao': 'relação',
    'Relacao': 'Relação',
    'preservacao': 'preservação',
    'Preservacao': 'Preservação',
    'recalibracao': 'recalibração',
    'Recalibracao': 'Recalibração',
    'reconciliacao': 'reconciliação',
    'Reconciliacao': 'Reconciliação',
    'ressincronizacao': 'ressincronização',
    'Ressincronizacao': 'Ressincronização',
    'rotacao': 'rotação',
    'Rotacao': 'Rotação',
    'alteracao': 'alteração',
    'Alteracao': 'Alteração',
    'ligacao': 'ligação',
    'Ligacao': 'Ligação',

    # -são words
    'admissao': 'admissão',
    'visao': 'visão',
    'Visao': 'Visão',

    # -ções/-sões words still missing
    'hesitacoes': 'hesitações',
    'interpretacoes': 'interpretações',
    'observacoes': 'observações',
    'reparacoes': 'reparações',
    'restricoes': 'restrições',
    'atualizacoes': 'atualizações',
    'eleicoes': 'eleições',
    'geolocalizacoes': 'geolocalizações',

    # Remaining individual words
    'alguem': 'alguém',
    'ninguem': 'ninguém',
    'tipico': 'típico',
    'tipica': 'típica',
    'tipicos': 'típicos',
    'tipicas': 'típicas',
    'ambigua': 'ambígua',
    'ambiguo': 'ambíguo',
    'historica': 'histórica',
    'capitulo': 'capítulo',
    'Capitulo': 'Capítulo',
    'tolerancias': 'tolerâncias',
    'Tolerancia': 'Tolerância',
}

# Handle "e" → "é" (verb ser) with context
# We need to be smart about this - "e" meaning "and" stays, "e" meaning "is" becomes "é"
# Patterns where "e" means "is":
E_IS_PATTERNS = [
    # After subject/noun + "e" + adjective/complement
    r'(?<!\w)([Ee]) (um|uma|o|a|os|as|que|por|mais|muito|tao|bastante|extremamente|particularmente|especialmente|igualmente|essencial|essencialmente|importante|critico|critica|necessario|necessaria|possivel|impossivel|provavel|improvavel|fundamental|crucial|vital|obrigatorio|obrigatoria|recomendavel|aconselhavel|normal|comum|frequente|raro|claro|evidente|obvio|obvia|verdade|falso|correto|incorreto|certo|errado|bom|mau|melhor|pior|maior|menor|suficiente|insuficiente|adequado|inadequado|similar|diferente|identico|valido|invalido|real|ficticio|ficticia|direto|indireto|simples|complexo|complexa|facil|dificil|rapido|lento|alto|baixo|grande|pequeno|novo|antigo|moderno|atual|recente|seguinte|anterior|posterior|superior|inferior|interno|externo|local|global|geral|parcial|total|completo|incompleto|final|inicial|central|lateral|vertical|horizontal|positivo|negativo|ativo|inativo|passivo|eficaz|ineficaz|eficiente|ineficiente)',
    # "isto/isso/aquilo e" patterns
    r'(?:isto|isso|aquilo|tudo|nada|algo|alguem|ninguem|cada|qual|resultado|objetivo|problema|sistema|processo|plano|passo|exemplo|caso|incidente|impacto|risco|fator|valor|tempo|momento|motivo|aspeto|ponto|tipo|modo|conceito|principio|papel|desafio|dilema|erro|falha|ataque|ameaca|vulnerabilidade|resposta|solucao|decisao|questao|razao|funcao|tarefa|missao|regra|norma|lei|politica|estrategia|medida|acao|reacao|consequencia|causa|efeito|diferenca|vantagem|desvantagem|beneficio|custo|perda|ganho|dano|prejuizo|reparacao|restauro|backup|log|alerta|sinal|indicador|indicacao|evidencia|prova|documento|registo|relatorio|formulario|template|modelo|padrao|referencia|guia|manual|protocolo|procedimento|metodo|tecnica|ferramenta|recurso|equipamento|servidor|rede|base|dados|ficheiro|tabela|campo|coluna|linha|pagina|site|email|mensagem|chamada|contacto|reuniao|sessao|turno|equipa|membro|lider|coordenador|responsavel|gestor|diretor|auditor|analista|operador|utilizador|cliente|fornecedor|parceiro|terceiro) ([Ee]) ',
    # "que e" pattern (very common: "o que é", "que é")
    r'que ([Ee]) ',
    # "não e" → "não é"
    r'(?:não|nao|Não|Nao) ([Ee]) ',
    # Pattern: "X e Y" where it's clearly "is" not "and"
    # This is hard to detect automatically, so we'll be conservative
]


def should_be_e_accent(text, match_start, match_end):
    """Determine if 'e' at position should be 'é' (verb ser) vs 'e' (and)."""
    before = text[max(0, match_start-50):match_start].lower()
    after = text[match_end:match_end+50].lower()

    # Strong indicators it's "is" (verb ser):
    # After "que" -> "que é"
    if before.rstrip().endswith('que'):
        return True
    # After "não" / "nao"
    if before.rstrip().endswith(('não', 'nao')):
        return True
    # After "isto", "isso", "aquilo", "tudo", "nada"
    for word in ['isto', 'isso', 'aquilo', 'tudo', 'nada', 'algo']:
        if before.rstrip().endswith(word):
            return True

    # Before adjectives/descriptors - likely "is"
    next_word = after.lstrip().split()[0] if after.strip() else ''
    is_adjectives = [
        'um', 'uma', 'o', 'a', 'que', 'por', 'mais', 'muito', 'tao',
        'bastante', 'extremamente', 'particularmente', 'especialmente',
        'essencial', 'importante', 'crítico', 'critico', 'necessário', 'necessario',
        'possível', 'possivel', 'impossível', 'impossivel', 'fundamental',
        'crucial', 'vital', 'obrigatório', 'obrigatorio', 'normal', 'comum',
        'claro', 'evidente', 'óbvio', 'obvio', 'verdade', 'falso', 'correto',
        'preciso', 'recomendável', 'recomendavel', 'suficiente', 'insuficiente',
        'adequado', 'inadequado', 'similar', 'diferente', 'válido', 'invalido',
        'real', 'simples', 'complexo', 'complexa', 'fácil', 'facil',
        'difícil', 'dificil', 'rápido', 'rapido', 'alto', 'baixo',
        'grande', 'pequeno', 'novo', 'atual', 'seguinte', 'feito',
        'feita', 'usado', 'usada', 'utilizado', 'utilizada', 'definido',
        'definida', 'necessária', 'necessaria', 'apenas', 'só', 'so',
        'também', 'tambem', 'sempre', 'ainda', 'aqui', 'onde', 'quando',
        'como', 'porque', 'essencialmente', 'frequentemente', 'geralmente',
        'normalmente', 'tipicamente', 'exatamente', 'precisamente',
        'igualmente', 'determinante', 'independente',
    ]
    if next_word in is_adjectives:
        return True

    # "X e Y" where X and Y are both nouns connected by "and" - keep as "e"
    # This is the default - if we're not sure, keep as "e"
    return False


def process_line_safe(line):
    """Process a line preserving inline code and markdown links (URLs stay untouched)."""
    # Strategy: split into protected segments and text segments
    # Protected: inline code `...`, markdown links [text](url), HTML tags

    # First, find all protected regions
    protected = []  # list of (start, end, replacement)

    # Find inline code: `...`
    for m in re.finditer(r'`[^`]+`', line):
        protected.append((m.start(), m.end(), m.group(0)))

    # Find markdown links: [text](url) or [text](url){attrs}
    for m in re.finditer(r'\[([^\]]*)\]\(([^\)]*)\)(\{[^\}]*\})?', line):
        link_text = replace_words(m.group(1))  # Accent the display text
        link_url = m.group(2)  # Keep URL as-is
        attrs = m.group(3) or ''  # Keep attributes as-is
        replacement = f'[{link_text}]({link_url}){attrs}'
        # m.end() already includes the attrs group, no need to add len(attrs)
        protected.append((m.start(), m.end(), replacement))

    # Sort protected regions by start position
    protected.sort(key=lambda x: x[0])

    # Remove overlapping regions (keep the first one)
    filtered = []
    last_end = -1
    for start, end, repl in protected:
        if start >= last_end:
            filtered.append((start, end, repl))
            last_end = end

    # Build result: process unprotected text, keep protected as-is
    result = []
    pos = 0
    for start, end, repl in filtered:
        if pos < start:
            # Unprotected text - apply word replacements
            result.append(replace_words(line[pos:start]))
        result.append(repl)
        pos = end
    # Remaining text after last protected region
    if pos < len(line):
        result.append(replace_words(line[pos:]))

    return ''.join(result)


def process_file(filepath):
    """Process a single markdown file to add pt-PT accents."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    lines = content.split('\n')
    processed_lines = []
    in_code_block = False
    code_block_lang = ''

    # Box-drawing chars that indicate ASCII diagrams (not real code)
    DIAGRAM_CHARS = set('│║┌┐└┘├┤┬┴┼╔╗╚╝╠╣╦╩╬─━▶►◄▼▲●○■□◆◇')

    for line in lines:
        stripped = line.strip()

        # Check for code block boundaries
        if stripped.startswith('```'):
            if not in_code_block:
                in_code_block = True
                # Extract language hint (e.g., ```python, ```yaml)
                code_block_lang = stripped[3:].strip().lower()
            else:
                in_code_block = False
                code_block_lang = ''
            processed_lines.append(line)
            continue

        if in_code_block:
            # Process unlabelled code blocks (ASCII diagrams/visual text)
            # Real code blocks have a language tag (python, yaml, bash, etc.)
            if code_block_lang == '':
                processed_lines.append(replace_words(line))
            else:
                processed_lines.append(line)
            continue

        # Process line outside code blocks
        processed_lines.append(process_line_safe(line))

    new_content = '\n'.join(processed_lines)

    # Now handle "e" → "é" for verb ser
    new_content = fix_e_accent(new_content)

    if new_content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False


def replace_words(text):
    """Replace words without accents with their accented versions."""
    # Process word by word, preserving non-word characters
    # Use word boundary matching
    result = []
    # Split on word boundaries while keeping delimiters
    tokens = re.split(r'(\b\w+\b)', text)
    for token in tokens:
        if token in WORD_MAP:
            result.append(WORD_MAP[token])
        else:
            result.append(token)
    return ''.join(result)


def fix_e_accent(text):
    """Fix 'e' → 'é' where it's the verb 'ser' (is)."""
    lines = text.split('\n')
    new_lines = []
    in_code = False

    for line in lines:
        if line.strip().startswith('```'):
            in_code = not in_code
            new_lines.append(line)
            continue
        if in_code:
            new_lines.append(line)
            continue

        # Protect links from e->é replacement: temporarily replace them
        link_placeholders = {}
        link_idx = 0
        def save_link(m):
            nonlocal link_idx
            key = f'__LINK{link_idx}__'
            link_placeholders[key] = m.group(0)
            link_idx += 1
            return key
        line = re.sub(r'\[[^\]]*\]\([^\)]*\)(\{[^\}]*\})?', save_link, line)
        line = re.sub(r'`[^`]+`', save_link, line)

        # Common patterns where "e" means "is"
        # Pattern: "não e " → "não é "
        line = re.sub(r'\bnão e\b', 'não é', line)
        line = re.sub(r'\bNão e\b', 'Não é', line)

        # Pattern: "que e " → "que é "
        line = re.sub(r'\bque e\b', 'que é', line)
        line = re.sub(r'\bQue e\b', 'Que é', line)

        # Pattern: "isto/isso/aquilo e"
        line = re.sub(r'\b(isto|isso|aquilo|tudo|nada|algo) e\b', r'\1 é', line)

        # Pattern: "| e " in tables (usually "is")
        # Actually careful - in tables "e" could be "and"

        # Pattern: "X e Y?" where Y is adjective - "o que e importante"
        # This is too risky for automated detection

        # NOTE: Subject-based "e" -> "e" pattern REMOVED
        # It caused false positives (e.g., "gravidade e o impacto")

        # Restore link placeholders
        for key, val in link_placeholders.items():
            line = line.replace(key, val)

        new_lines.append(line)

    return '\n'.join(new_lines)


def main():
    base = os.path.dirname(os.path.abspath(__file__))
    docs = os.path.join(base, 'docs')

    files_to_process = [
        os.path.join(docs, 'index.md'),
        os.path.join(docs, 'drp', 'index.md'),
        os.path.join(docs, 'bcp', 'index.md'),
        os.path.join(docs, 'bia', 'metricas.md'),
        os.path.join(docs, 'bia', 'casos-praticos.md'),
        os.path.join(docs, 'bia', 'exercicios.md'),
        os.path.join(docs, 'bia', 'calculadora.md'),
        os.path.join(docs, 'irp', 'index.md'),
        os.path.join(docs, 'irp', 'planeamento.md'),
        os.path.join(docs, 'irp', 'detecao.md'),
        os.path.join(docs, 'irp', 'reacao.md'),
        os.path.join(docs, 'irp', 'recuperacao.md'),
        os.path.join(docs, 'irp', 'casos-praticos.md'),
    ]

    # Also process mkdocs.yml (just the nav labels)
    mkdocs_yml = os.path.join(base, 'mkdocs.yml')

    for filepath in files_to_process:
        if os.path.exists(filepath):
            changed = process_file(filepath)
            rel_path = os.path.relpath(filepath, base)
            if changed:
                print(f'[OK] {rel_path}: acentos adicionados')
            else:
                print(f'[--] {rel_path}: sem alteracoes necessarias')
        else:
            print(f'[ERR] {filepath}: ficheiro nao encontrado')

    # Process mkdocs.yml nav labels
    if os.path.exists(mkdocs_yml):
        with open(mkdocs_yml, 'r', encoding='utf-8') as f:
            yml_content = f.read()

        original_yml = yml_content
        # Only change display labels (before the colon in nav entries)
        yml_content = yml_content.replace('site_name: TISI - Tratamento de Incidentes de Seguranca Informatica',
                                          'site_name: TISI - Tratamento de Incidentes de Segurança Informática')
        yml_content = yml_content.replace('site_description: Materiais praticos de apoio a UC TISI - MCIF - IPLeiria',
                                          'site_description: Materiais práticos de apoio à UC TISI - MCIF - IPLeiria')
        yml_content = yml_content.replace('- Inicio:', '- Início:')
        yml_content = yml_content.replace('- Metricas BIA:', '- Métricas BIA:')
        yml_content = yml_content.replace('- Casos Praticos:', '- Casos Práticos:')
        yml_content = yml_content.replace('- Exercicios:', '- Exercícios:')
        yml_content = yml_content.replace('- Detecao:', '- Deteção:')
        yml_content = yml_content.replace('- Reacao:', '- Reação:')
        yml_content = yml_content.replace('- Recuperacao:', '- Recuperação:')

        if yml_content != original_yml:
            with open(mkdocs_yml, 'w', encoding='utf-8') as f:
                f.write(yml_content)
            print(f'[OK] mkdocs.yml: labels atualizados')
        else:
            print(f'[--] mkdocs.yml: sem alteracoes')


if __name__ == '__main__':
    main()
