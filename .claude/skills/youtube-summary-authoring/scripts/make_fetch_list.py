"""字幕を利用者のPCで取得してもらうための、動画ID一覧と yt-dlp の実行手順を作る。
クラウドのコンテナからは YouTube のボット判定（Sign in to confirm you're not a bot / HTTP 429）で大量取得できないため。

usage: python3 -I make_fetch_list.py <work_dir> <out_dir>
  work_dir/skel.json の全動画について、out_dir/yt_ids.txt（1行1URL）と out_dir/字幕の取り方.txt を書く。
"""
import json, os, sys
W, O = sys.argv[1], sys.argv[2]
os.makedirs(O, exist_ok=True)
skel = json.load(open(os.path.join(W, "skel.json"), encoding="utf-8"))
def basis(rid):
    ip = os.path.join(W, "inputs", rid + ".json")
    return json.load(open(ip, encoding="utf-8")).get("source_basis", "") if os.path.exists(ip) else ""
# 字幕トラックのないチャンネル（本編が焼き込み字幕で、概要欄だけが根拠のもの）と、字幕取得済みの動画は外す
urls = [r["url"] for rid, r in skel.items() if r.get("url") and basis(rid) != "概要欄のみ"
        and not os.path.exists(os.path.join(W, "subs", rid + ".txt"))]
open(os.path.join(O, "yt_ids.txt"), "w", encoding="utf-8").write("\n".join(urls) + "\n")
open(os.path.join(O, "字幕の取り方.txt"), "w", encoding="utf-8").write(f"""YouTube 字幕の取得手順（{len(urls)}本）

1. yt-dlp を入れる:  pip install -U yt-dlp
2. yt_ids.txt と同じフォルダで、次の1行を実行する（コマンドは1行ずつ貼り付ける）:
   yt-dlp --skip-download --write-auto-subs --write-subs --sub-langs "ja,ja-orig" --sub-format vtt --sleep-requests 2 --sleep-interval 3 -o "%(id)s" -a yt_ids.txt
3. できた *.vtt をまとめて zip にし、チャットに添付する。
   途中で止まったら同じコマンドをもう一度実行すれば、取得済みの分は飛ばして続きから取る。
""")
print(len(urls), "URLs ->", O)
