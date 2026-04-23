"""
MkDocs hook: abre todos os links externos num novo separador.

Procura <a href="http://..."> ou <a href="https://..."> e adiciona
`target="_blank"` e `rel="noopener"` aos que ainda não têm `target`.

Links internos (anchors, relativos) não são modificados. Links que já
tenham `target` definido manualmente também ficam intactos.
"""
import re

_EXTERNAL_LINK_RE = re.compile(
    r'<a\s+(?P<pre>[^>]*?)href=(?P<quote>["\'])(?P<url>https?://[^"\']+)(?P=quote)(?P<post>[^>]*)>',
    re.IGNORECASE,
)


def on_page_content(html, **kwargs):
    """Hook invocado pelo MkDocs após render do Markdown para HTML."""

    def _repl(m):
        pre = m.group("pre")
        post = m.group("post")
        quote = m.group("quote")
        url = m.group("url")
        combined = pre + post
        if "target=" in combined.lower():
            return m.group(0)
        return f'<a {pre}href={quote}{url}{quote}{post} target="_blank" rel="noopener">'

    return _EXTERNAL_LINK_RE.sub(_repl, html)
