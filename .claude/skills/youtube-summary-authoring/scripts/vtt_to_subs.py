"""yt-dlp の VTT 字幕を、要約の根拠に使う平文（subs/<id>.txt）にする。

usage: python3 -I vtt_to_subs.py <vtt_dir> <work_dir>
  vtt_dir の <動画ID>.ja.vtt などを読み、work_dir/skel.json の URL と動画IDで突き合わせて work_dir/subs/<id>.txt に書く。
  自動字幕は同じ行が流れながら繰り返されるので、タイムスタンプ・タグを除いたうえで連続する重複を落とす。
"""
import json, os, re, sys, glob
V, W = sys.argv[1], sys.argv[2]
os.makedirs(os.path.join(W, "subs"), exist_ok=True)
skel = json.load(open(os.path.join(W, "skel.json"), encoding="utf-8"))
by_vid = {}
for rid, r in skel.items():
    m = re.search(r"(?:v=|shorts/)([\w-]{11})", r.get("url", ""))
    if m: by_vid[m.group(1)] = rid
done = 0
for f in sorted(glob.glob(os.path.join(V, "*.vtt"))):
    vid = os.path.basename(f).split(".")[0]
    if vid not in by_vid: continue
    out, last = [], ""
    for line in open(f, encoding="utf-8", errors="replace"):
        line = line.strip()
        if not line or line.startswith(("WEBVTT", "Kind:", "Language:", "NOTE")) or "-->" in line or line.isdigit(): continue
        line = re.sub(r"<[^>]+>", "", line).strip()
        if line and line != last: out.append(line); last = line
    text = re.sub(r"\s+", " ", " ".join(out)).strip()
    if text:
        open(os.path.join(W, "subs", by_vid[vid] + ".txt"), "w", encoding="utf-8").write(text); done += 1
print(done, "subtitles ->", os.path.join(W, "subs"))
