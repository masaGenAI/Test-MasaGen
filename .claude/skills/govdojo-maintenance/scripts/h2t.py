"""raw/ に保存した HTML・PDF を text/ に文字だけで書き出す。使い方: python3 -I tools/h2t.py <raw_dir> <text_dir>"""
import sys, os, re, html
from html.parser import HTMLParser


class T(HTMLParser):
    SKIP = {"script", "style", "noscript", "svg", "head", "nav", "footer", "form", "iframe"}
    BLOCK = {"p", "div", "br", "li", "h1", "h2", "h3", "h4", "h5", "h6", "tr", "td", "th", "section", "article", "dd", "dt", "blockquote"}

    def __init__(self):
        super().__init__(convert_charrefs=True); self.out = []; self.skip = 0

    def handle_starttag(self, tag, a):
        if tag in self.SKIP: self.skip += 1
        if tag in self.BLOCK: self.out.append("\n")

    def handle_endtag(self, tag):
        if tag in self.SKIP and self.skip: self.skip -= 1
        if tag in self.BLOCK: self.out.append("\n")

    def handle_data(self, d):
        if not self.skip: self.out.append(d)


raw, txt = sys.argv[1], sys.argv[2]
for fn in sorted(os.listdir(raw)):
    p = os.path.join(raw, fn); b = open(p, "rb").read()
    if b[:5] == b"%PDF-":
        try:
            from pypdf import PdfReader
            s = "\n".join((pg.extract_text() or "") for pg in PdfReader(p).pages)
        except Exception as e:
            s = f"[PDF read error: {e}]"
    else:
        m = re.search(rb'charset=["\']?([A-Za-z0-9_\-]+)', b[:3000])
        enc = m.group(1).decode() if m else "utf-8"
        try: h = b.decode(enc, errors="replace")
        except LookupError: h = b.decode("utf-8", errors="replace")
        t = T(); t.feed(h); s = "".join(t.out)
        if len(s.strip()) < 200:  # 壊れた HTML は正規表現で落とす
            g = re.sub(r"(?is)<(script|style|noscript)[^>]*>.*?</\1>", " ", h)
            g = re.sub(r"(?s)<br\s*/?>|</(p|div|li|h[1-6]|tr|td|dd|dt)>", "\n", g)
            s = html.unescape(re.sub(r"(?s)<[^>]+>", " ", g))
    s = re.sub(r"[ \t　\xa0]+", " ", s); s = re.sub(r"\n\s*\n+", "\n", s).strip()
    open(os.path.join(txt, os.path.splitext(fn)[0] + ".txt"), "w", encoding="utf-8").write(s)
    print(fn, len(s))
