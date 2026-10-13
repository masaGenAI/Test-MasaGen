"""YouTube 要約（out/<id>.json）を、執筆用入力（inputs/<id>.json、字幕があれば subs/<id>.txt）と照らして検査する。

usage: python3 -I check_yt.py <work_dir> [--ids id1,id2,...]
  work_dir/inputs/*.json と work_dir/out/*.json を見る。字幕モードでは work_dir/subs/<id>.txt も根拠に含める。
検査項目:
  - 必須項目と、段（tier）ごとの長さ・要点数（既存の YouTube 要約の実測値から決めた範囲）
  - 根拠にない数値（10以上の数・小数・％）を書いていないか
  - 簡体字（cp932 で表せない漢字）・キリル文字
  - 敬体（です・ます）、水増し表現、概要欄という語の混入、要点見出しの重複
"""
import json, os, re, sys, unicodedata


# 段ごとの範囲。full は字幕全文または厚い概要がある長尺、desc は概要欄・短い要約しかない長尺、short はショート動画。
# full の範囲は既存 YouTube 要約（2,763件）の実測中央値（一言80字・概要340字・要点5〜6個×約220字・示唆180字）を囲む。
TIERS = {
    "full":  dict(one=(55, 115), ov=(240, 500), np=(3, 6), pb=(80, 280), ph=(8, 34), tk=(100, 260)),
    "desc":  dict(one=(45, 115), ov=(110, 360), np=(2, 4), pb=(50, 240), ph=(8, 34), tk=(80, 230)),
    "short": dict(one=(30, 100), ov=(60, 230), np=(1, 3), pb=(40, 200), ph=(6, 30), tk=(60, 190)),
    "subs":  dict(one=(55, 115), ov=(280, 500), np=(3, 6), pb=(100, 280), ph=(10, 34), tk=(120, 260)),
}
CIRCLED = re.compile("[①-⑳❶-➓⓪-⓿㉑-㉟㊱-㊿]")
def norm(s): return unicodedata.normalize("NFKC", CIRCLED.sub(" ", s or ""))
def nums(s):
    out = set(); n = norm(s)
    for m in re.finditer(r"\d[\d,]*(?:\.\d+)?", n):
        t = m.group(0).replace(",", "")
        tail = n[m.end():m.end() + 1]
        try: v = float(t)
        except ValueError: continue
        if "." in t or tail == "%" or v >= 10: out.add(t.rstrip("0").rstrip(".") if "." in t else t)
    return out
def bad_chars(s):
    bad = []
    for ch in s:
        if "Ѐ" <= ch <= "ԯ": bad.append(ch)
        elif "一" <= ch <= "鿿":
            try: ch.encode("cp932")
            except UnicodeEncodeError: bad.append(ch)
    return bad
PAD = ["と考えられる", "とも言える", "と言えるだろう", "ではないだろうか", "なお、", "非常に重要", "言うまでもなく"]
# 「励ます」「示す」のような普通の動詞を拾わないよう、ます の前はかなの連用形に限る
KEIGO = re.compile(r"(です|でした|ました|ません|[しいりきみちにびけせてえめれげぎ]ます)[。」]")

def run(W, only=None):
    """合格した id の一覧と、(id, 理由) の一覧を返す。"""
    errs, ok = [], []
    for f in sorted(os.listdir(os.path.join(W, "out"))):
        if not f.endswith(".json"): continue
        rid = f[:-5]
        if only and rid not in only: continue
        try: o = json.load(open(os.path.join(W, "out", f), encoding="utf-8"))
        except Exception as e: errs.append((rid, f"JSONが壊れている: {e}")); continue
        ip = os.path.join(W, "inputs", rid + ".json")
        if not os.path.exists(ip): errs.append((rid, "入力がない")); continue
        inp = json.load(open(ip, encoding="utf-8"))
        sp = os.path.join(W, "subs", rid + ".txt")
        subs = open(sp, encoding="utf-8").read() if os.path.exists(sp) else ""
        T = TIERS["subs" if subs and inp.get("tier") != "short" else inp.get("tier", "full")]  # ショートは字幕があっても short 段
        pts = o.get("points") or []
        e = []
        L = lambda k: len(o.get(k) or "")
        if not (T["one"][0] <= L("oneLiner") <= T["one"][1]): e.append(f"一言 {L('oneLiner')}字")
        if not (T["ov"][0] <= L("overview") <= T["ov"][1]): e.append(f"概要 {L('overview')}字")
        if not (T["np"][0] <= len(pts) <= T["np"][1]): e.append(f"要点 {len(pts)}個")
        hs = set()
        for p in pts:
            h, b = p.get("h") or "", p.get("b") or ""
            if not (T["ph"][0] <= len(h) <= T["ph"][1]): e.append(f"見出し「{h[:10]}」{len(h)}字")
            if not (T["pb"][0] <= len(b) <= T["pb"][1]): e.append(f"要点「{h[:10]}」本文 {len(b)}字")
            if h in hs: e.append(f"見出しの重複「{h[:10]}」")
            hs.add(h)
        if not (T["tk"][0] <= L("takeaway") <= T["tk"][1]): e.append(f"示唆 {L('takeaway')}字")
        text = " ".join([o.get("oneLiner", ""), o.get("overview", "")] + [p.get("h", "") + " " + p.get("b", "") for p in pts] + [o.get("takeaway", "")])
        allowed = nums(json.dumps(inp, ensure_ascii=False)) | nums(subs)
        extra = sorted(nums(text) - allowed)
        if extra: e.append(f"根拠にない数値 {extra[:8]}")
        src_chars = set(json.dumps(inp, ensure_ascii=False)) | set(subs)
        bc = [ch for ch in bad_chars(text) if ch not in src_chars]  # 入力にある字（人名の「傪」など）は許す
        if bc: e.append(f"簡体字・キリル文字 {''.join(sorted(set(bc)))}")
        if KEIGO.search(re.sub(r"「[^」]*」|『[^』]*』", "", text)):  # 引用（「」『』）の中の敬体は対象外
            e.append("敬体（です・ます）")
        pad = [w for w in PAD if w in text]
        if pad: e.append(f"水増し表現 {pad}")
        meta = [w for w in ("概要欄", "ダイジェスト", "入力には", "入力では") if w in text]
        if meta: e.append(f"根拠の出どころを本文に書いている {meta}")
        if e: errs.append((rid, " / ".join(e)))
        else: ok.append(rid)
    return ok, errs

if __name__ == "__main__":
    W = sys.argv[1]
    only = set(sys.argv[sys.argv.index("--ids") + 1].split(",")) if "--ids" in sys.argv else None
    ok, errs = run(W, only)
    print(f"合格 {len(ok)}件 / 不合格 {len(errs)}件")
    for rid, m in errs[:80]: print("  ", rid, m)
