"""Project Nova の原稿（分けて保存した部品）と、作業用の1本の写し ProjectNova.jsx を扱う道具（Python 版）。

しくみと決まりごとは、同じ場所の nova-src.mjs の冒頭を参照。要点だけ：

- git に入れる原稿は nova-app/src/parts/ 以下の .jsx。
- nova-app/src/ProjectNova.jsx は、それをつないだ作業用の写し（git には入れない）。道具はこの1本を読み書きしてよい。
- 読む前と書いたあとに sync_nova() を呼ぶ。部品が新しければ写しを作り直し、写しを直したのなら部品へ書き戻す。

使い方（`python3 -I` でも動くよう、パスは自分で足す）:

    import os, sys
    sys.path.insert(0, os.path.join(<リポジトリのルート>, "nova-app", "scripts"))
    from nova_src import sync_nova, read_nova, write_nova, VIEW

    text = read_nova()                 # そろえてから、1本の原稿を読む
    write_nova(text.replace(a, b))     # 1本の原稿を書いて、部品へ書き戻す
"""
from __future__ import annotations

import shutil
import subprocess
from pathlib import Path

HERE = Path(__file__).resolve().parent
APP_ROOT = HERE.parent
PARTS_DIR = APP_ROOT / "src" / "parts"
VIEW = APP_ROOT / "src" / "ProjectNova.jsx"
_TOOL = HERE / "nova-src.mjs"


def sync_nova(quiet: bool = True, prefer: str | None = None) -> None:
    """写し（ProjectNova.jsx）と部品（src/parts）をそろえる。食い違いを決められないときは例外で止まる。"""
    node = shutil.which("node")
    if not node:
        raise RuntimeError("node が見つかりません（原稿をそろえる nova-src.mjs は Node.js で動きます）")
    cmd = [node, str(_TOOL), "sync"]
    if quiet:
        cmd.append("--quiet")
    if prefer:
        cmd += ["--prefer", prefer]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError((r.stderr or r.stdout).strip() or "nova-src.mjs sync が失敗しました")
    if not quiet and r.stdout.strip():
        print(r.stdout.strip())


def read_nova() -> str:
    """そろえてから、1本の原稿（写し）を読む。改行は変換しない。"""
    sync_nova()
    with open(VIEW, encoding="utf-8", newline="") as f:
        return f.read()


def write_nova(text: str) -> None:
    """1本の原稿を書いて、部品へ書き戻す。印の行（// @@nova-part …）は消さない・書き換えない。"""
    sync_nova()
    with open(VIEW, "w", encoding="utf-8", newline="") as f:
        f.write(text)
    sync_nova()


def locate(line: int) -> str:
    """写しの行番号を「nova-app/src/parts/<部品>:<行>」に直す（見つからなければ空文字）。"""
    node = shutil.which("node")
    if not node:
        return ""
    r = subprocess.run([node, str(_TOOL), "locate", str(line)], capture_output=True, text=True)
    return r.stdout.strip() if r.returncode == 0 else ""
