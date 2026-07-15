# -*- coding: utf-8 -*-
import json, os
# artifacts/ は、このスクリプト（artifacts/_build/build.py）の1つ上のフォルダ
ART=os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SCR=ART  # Artifact用HTMLも各トラッカーのフォルダに出力する

def wrap_standalone(title, core):
    return ('<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="UTF-8">\n'
            '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
            f'<title>{title}</title>\n</head>\n<body style="margin:0">\n{core}\n</body>\n</html>\n')

def wrap_artifact(title, core):
    return f'<title>{title}</title>\n{core}\n'

# Shared JS helpers (export/import) — inserted verbatim inside each IIFE
HELPERS = r'''
function _exportJSON(fname,obj){var blob=new Blob([JSON.stringify(obj,null,2)],{type:"application/json"});var url=URL.createObjectURL(blob);var a=document.createElement("a");a.href=url;a.download=fname;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url);},1000);}
function _importJSON(cb){var inp=document.createElement("input");inp.type="file";inp.accept=".json,application/json";inp.onchange=function(){var f=inp.files&&inp.files[0];if(!f)return;var r=new FileReader();r.onload=function(){try{cb(JSON.parse(r.result));}catch(e){alert("JSONの読み込みに失敗しました: "+e.message);}};r.readAsText(f);};inp.click();}
function _uid(){return "x"+Date.now().toString(36)+Math.floor(Math.random()*1e6).toString(36);}
'''

# Shared toolbar CSS (scoped per app via prefix injection)
def edit_css(p):
    return f'''
{p} .editbar{{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 14px;}}
{p} .ebtn{{border:1px solid var(--border);background:var(--card);border-radius:8px;padding:8px 12px;font-size:.8rem;font-weight:700;cursor:pointer;color:var(--text);font-family:inherit;}}
{p} .ebtn.primary{{background:var(--accent);color:#fff;border-color:var(--accent);}}
{p} .ebtn:hover{{filter:brightness(.97);}}
{p} .form{{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:16px 18px;margin-bottom:16px;display:none;}}
{p} .form.open{{display:block;}}
{p} .form h3{{margin:0 0 12px;font-size:.9rem;}}
{p} .fgrid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;margin-bottom:12px;}}
{p} .field label{{display:block;font-size:.72rem;color:var(--muted);margin-bottom:4px;font-weight:700;}}
{p} .field input,{p} .field select,{p} .field textarea{{width:100%;border:1px solid var(--border);border-radius:8px;padding:8px 10px;font-size:.82rem;font-family:inherit;background:#fff;color:var(--text);}}
{p} .field textarea{{min-height:64px;resize:vertical;}}
{p} .field input:focus,{p} .field select:focus,{p} .field textarea:focus{{outline:2px solid var(--accent);outline-offset:1px;}}
{p} .factions{{display:flex;gap:8px;}}
{p} .rowbtns{{display:inline-flex;gap:6px;}}
{p} .ib{{border:1px solid var(--border);background:var(--card);border-radius:6px;padding:2px 8px;font-size:.72rem;cursor:pointer;color:var(--muted);font-family:inherit;}}
{p} .ib:hover{{color:var(--text);}}
'''

# ============================================================ DAILY TASK TRACKER
daily = json.load(open(f"{ART}/daily-task-tracker/data.json"))
cells = daily["heatmap"]["cells"]
dtasks_groups=[]
for g in daily["groups"]:
    tks=[]
    for t in g["tasks"]:
        tks.append({"id":t["id"],"name":t["name"],"total":t["total"],"done":t["done"],"late":t["late"],
                    "cells":cells[t["id"]]})
    dtasks_groups.append({"name":g["name"],"type":g["type"],"tasks":tks})
daily_model={"day":daily["day"],"dates":daily["heatmap"]["dates"],"groups":dtasks_groups}
daily_js=json.dumps(daily_model,ensure_ascii=False)

daily_core = ('<style>\n'
'#dtt{--bg:#f8fafc;--card:#fff;--border:#e2e8f0;--text:#1e293b;--muted:#64748b;--navy:#1e3a8a;--accent:#2563eb;--cowork:#1d4ed8;--others:#6d28d9;--green:#16a34a;--slate:#94a3b8;--tabbar:#e2e8f0;--grouprow:#f1f5f9;'
'background:var(--bg);color:var(--text);font-family:-apple-system,"Segoe UI","Hiragino Kaku Gothic ProN","Noto Sans JP",Meiryo,sans-serif;line-height:1.5;min-height:100vh;}\n'
'#dtt *{box-sizing:border-box;}\n'
'#dtt .wrap{max-width:1100px;margin:0 auto;padding:24px 18px 60px;}\n'
'#dtt h1{font-size:1.5rem;margin:0 0 4px;}\n'
'#dtt p.lead{color:var(--muted);font-size:.85rem;margin:0 0 16px;}\n'
'#dtt .banner{background:#eff4ff;border:1px solid #c7d7fe;color:#1e40af;border-radius:8px;padding:8px 12px;font-size:.8rem;margin-bottom:16px;}\n'
'#dtt .tabs{display:inline-flex;gap:4px;background:var(--tabbar);padding:4px;border-radius:10px;margin-bottom:16px;flex-wrap:wrap;}\n'
'#dtt .tab{background:none;border:none;padding:8px 18px;font-size:.9rem;cursor:pointer;color:var(--muted);border-radius:8px;font-weight:700;font-family:inherit;}\n'
'#dtt .tab.active{background:var(--card);color:var(--accent);box-shadow:0 1px 3px rgba(15,23,42,.12);}\n'
'#dtt .monthnav{display:flex;align-items:center;gap:12px;margin-bottom:16px;}\n'
'#dtt .monthnav .label{font-weight:700;font-size:1.05rem;}\n'
'#dtt .group-title{font-size:.8rem;margin:20px 0 10px;font-weight:700;display:flex;align-items:center;gap:8px;}\n'
'#dtt .group-title.cowork{color:var(--cowork);}#dtt .group-title.others{color:var(--others);}\n'
'#dtt .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:10px;}\n'
'#dtt .task-card{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:12px 14px;}\n'
'#dtt .task-card .name{font-weight:700;font-size:.92rem;display:flex;justify-content:space-between;gap:8px;align-items:flex-start;}\n'
'#dtt .frac{color:var(--muted);font-weight:600;font-size:.82rem;font-variant-numeric:tabular-nums;}\n'
'#dtt .bar{height:6px;background:var(--border);border-radius:3px;margin:10px 0 8px;overflow:hidden;}\n'
'#dtt .bar>span{display:block;height:100%;background:var(--navy);}\n'
'#dtt .counts{font-size:.75rem;display:flex;gap:10px;font-variant-numeric:tabular-nums;}\n'
'#dtt .c-done{color:#334155;font-weight:700;}#dtt .c-late{color:var(--slate);font-weight:600;}\n'
'#dtt .cardfoot{display:flex;justify-content:space-between;align-items:center;margin-top:8px;}\n'
'#dtt .stamp{display:inline-block;font-size:.72rem;font-weight:700;padding:3px 9px;border-radius:999px;cursor:pointer;border:none;font-family:inherit;}\n'
'#dtt .stamp.on{background:#e0e7ff;color:var(--navy);}#dtt .stamp.off{background:#eef2f6;color:var(--muted);}\n'
'#dtt .legend{display:flex;flex-wrap:wrap;gap:12px;margin:18px 0;font-size:.75rem;color:var(--muted);}\n'
'#dtt .legend span{display:inline-flex;align-items:center;gap:5px;}\n'
'#dtt .dot{width:12px;height:12px;border-radius:3px;display:inline-block;}\n'
'#dtt .dot.done{background:var(--navy);box-shadow:inset 0 0 0 1.5px #fff,inset 0 0 0 2.5px var(--navy);}\n'
'#dtt .dot.late{background:var(--navy);}#dtt .dot.pending{background:var(--slate);}#dtt .dot.none{background:#eef2f6;border:1px solid var(--border);}\n'
'#dtt .hm-wrap{overflow-x:auto;}\n'
'#dtt table.hm{border-collapse:separate;border-spacing:4px;font-size:.7rem;}\n'
'#dtt table.hm th.rowh{text-align:left;padding:4px 8px;white-space:nowrap;position:sticky;left:0;background:var(--bg);z-index:1;font-weight:700;}\n'
'#dtt table.hm th.colh{padding:4px 3px;color:var(--muted);font-weight:700;min-width:26px;font-variant-numeric:tabular-nums;}\n'
'#dtt table.hm td{width:26px;height:26px;cursor:pointer;text-align:center;border-radius:6px;color:#fff;}\n'
'#dtt td.done,#dtt td.late{background:var(--navy);}\n'
'#dtt td.done{box-shadow:inset 0 0 0 2px #fff,inset 0 0 0 3px var(--navy);}\n'
'#dtt td.pending{background:var(--slate);}\n'
'#dtt td.none{background:transparent;color:var(--slate);cursor:default;}\n'
'#dtt td.done::after{content:"済";}#dtt td.late::after{content:"遅";}#dtt td.pending::after{content:"未";}#dtt td.none::after{content:"–";}\n'
'#dtt .grouprow td{background:var(--grouprow);font-weight:700;text-align:left;padding:4px 8px;border-radius:6px;}\n'
'#dtt .grouprow td.cowork{color:var(--cowork);}#dtt .grouprow td.others{color:var(--others);}\n'
'#dtt .check-list{display:flex;flex-direction:column;gap:8px;}\n'
'#dtt .check-row{display:flex;align-items:center;gap:12px;background:var(--card);border:1px solid var(--border);border-radius:8px;padding:10px 14px;}\n'
'#dtt .check-row .cname{font-weight:700;flex:1;}#dtt .check-row .day{color:var(--muted);font-size:.8rem;}\n'
'#dtt .btn{border:1px solid var(--border);background:var(--card);border-radius:6px;padding:6px 12px;font-size:.8rem;cursor:pointer;font-weight:700;font-family:inherit;}\n'
'#dtt .btn.done{background:var(--green);color:#fff;border-color:var(--green);}\n'
'#dtt footer{margin-top:30px;font-size:.75rem;color:var(--muted);}\n'
'#dtt [hidden]{display:none;}\n'
+ edit_css('#dtt') +
'</style>\n'
'<div id="dtt"><div class="wrap">\n'
'<header><h1>デイリータスク トラッカー</h1>\n'
'<p class="lead">ダッシュボードで押印（完了/取消）、カレンダー／ヒートマップで俯瞰。タスクの追加・編集も可能。入力はブラウザ内（localStorage）に保存されます。</p></header>\n'
'<div class="banner">Cowork のアーティファクトを Code 側に移設した<strong>編集可能な単体版</strong>です。元の <strong>Notion 同期・Cowork 連携は無効</strong>で、変更はローカル保存されます（JSONで書き出し／読み込み可）。</div>\n'
'<div class="editbar">\n'
'<button class="ebtn primary" id="dttAdd">＋ タスク追加</button>\n'
'<button class="ebtn" id="dttExport">⬇ JSONエクスポート</button>\n'
'<button class="ebtn" id="dttImport">⬆ JSONインポート</button>\n'
'<button class="ebtn" id="dttReset">↺ 初期データに戻す</button>\n'
'</div>\n'
'<div class="form" id="dttForm"><h3 id="dttFormTitle">タスクを追加</h3>\n'
'<div class="fgrid">\n'
'<div class="field"><label>タスク名</label><input id="fName" placeholder="例: New quiz"></div>\n'
'<div class="field"><label>グループ</label><select id="fGroup"><option value="Cowork task">Cowork task</option><option value="Others">Others</option></select></div>\n'
'<div class="field"><label>合計(分母)</label><input id="fTotal" type="number" min="1" value="31"></div>\n'
'<div class="field"><label>完了数</label><input id="fDone" type="number" min="0" value="0"></div>\n'
'<div class="field"><label>遅延数</label><input id="fLate" type="number" min="0" value="0"></div>\n'
'</div>\n'
'<div class="factions"><button class="ebtn primary" id="fSave">保存</button><button class="ebtn" id="fCancel">キャンセル</button></div></div>\n'
'<div class="tabs">\n'
'<button class="tab active" data-tab="dashboard">ダッシュボード</button>\n'
'<button class="tab" data-tab="calendar">カレンダー</button>\n'
'<button class="tab" data-tab="heatmap">ヒートマップ</button>\n'
'<button class="tab" data-tab="checklist">チェック項目</button>\n'
'</div>\n'
'<div class="monthnav"><span class="label" id="monthLabel"></span><span style="color:var(--muted);font-size:.8rem" id="dayBadge"></span></div>\n'
'<div class="legend"><span><i class="dot done"></i>済 / 完了</span><span><i class="dot late"></i>遅延</span><span><i class="dot pending"></i>未着手 / 未</span><span><i class="dot none"></i>未開始</span></div>\n'
'<section id="dashboard" class="pane"></section>\n'
'<section id="calendar" class="pane" hidden></section>\n'
'<section id="heatmap" class="pane" hidden></section>\n'
'<section id="checklist" class="pane" hidden></section>\n'
'<footer>元データ: Cowork「Daily Task Tracker」PDFより抽出。編集内容はこのブラウザに保存されます。</footer>\n'
'</div></div>\n'
'<script>\n(function(){\n'
+ HELPERS +
'const BASE=__DAILY_DATA__;\n'
'const LS="daily-task-tracker.data.v2";\n'
'function clone(o){return JSON.parse(JSON.stringify(o));}\n'
'function load(){try{var s=JSON.parse(localStorage.getItem(LS));if(s&&s.groups)return s;}catch(e){}return clone(BASE);}\n'
'function save(){try{localStorage.setItem(LS,JSON.stringify(D));}catch(e){}}\n'
'var D=load();\n'
'var DATES=D.dates,TODAY=DATES.length-1;\n'
'var $=function(id){return document.getElementById(id);};\n'
'function allTasks(){return D.groups.flatMap(function(g){return g.tasks.map(function(t){return Object.assign({group:g.name,type:g.type},t);});});}\n'
'function liveDone(t){return t.done+((t.cells[TODAY]==="done")?1:0);}\n'
'function toggleCell(gid,tid,i){var t=findTask(tid);if(!t)return;var cur=t.cells[i];t.cells[i]=(cur==="done")?"pending":"done";save();renderAll();}\n'
'function findTask(tid){for(var gi=0;gi<D.groups.length;gi++){var g=D.groups[gi];for(var ti=0;ti<g.tasks.length;ti++){if(g.tasks[ti].id===tid)return g.tasks[ti];}}return null;}\n'
'function renderDashboard(){$("dashboard").innerHTML=D.groups.map(function(g){return \'<div class="group-title \'+(g.type==="auto"?"cowork":"others")+\'">\'+g.name+(g.type==="auto"?" · 自動生成":" · 手動記録")+\'</div><div class="grid">\'+g.tasks.map(function(t){var done=liveDone(t);var pct=t.total?Math.round(done/t.total*100):0;var on=t.cells[TODAY]==="done";return \'<div class="task-card"><div class="name"><span>\'+esc(t.name)+\'</span><span class="frac">\'+done+"/"+t.total+\'</span></div><div class="bar"><span style="width:\'+pct+\'%"></span></div><div class="counts"><span class="c-done">完了 \'+done+\'</span><span class="c-late">遅延 \'+t.late+\'</span></div><div class="cardfoot"><button class="stamp \'+(on?"on":"off")+\'" data-toggle="\'+t.id+\'">\'+(on?"✓ 今日 完了":"今日 押印する")+\'</button><span class="rowbtns"><button class="ib" data-edit="\'+t.id+\'">✎</button><button class="ib" data-del="\'+t.id+\'">✕</button></span></div></div>\';}).join("")+"</div>";}).join("");\n'
'$("dashboard").querySelectorAll("[data-toggle]").forEach(function(b){b.onclick=function(){toggleCell(null,b.dataset.toggle,TODAY);};});\n'
'$("dashboard").querySelectorAll("[data-edit]").forEach(function(b){b.onclick=function(){openEdit(b.dataset.edit);};});\n'
'$("dashboard").querySelectorAll("[data-del]").forEach(function(b){b.onclick=function(){delTask(b.dataset.del);};});}\n'
'function renderHeatmap(){var head=\'<tr><th class="rowh">タスク \\\\ 日付</th>\'+DATES.map(function(d){return \'<th class="colh">\'+d.slice(5).replace("-","/")+"</th>";}).join("")+"</tr>";var body=D.groups.map(function(g){var cls=g.type==="auto"?"cowork":"others";var grp=\'<tr class="grouprow"><td class="\'+cls+\'">\'+g.name+\'</td><td colspan="\'+DATES.length+\'"></td></tr>\';var rows=g.tasks.map(function(t){return \'<tr><th class="rowh">\'+esc(t.name)+"</th>"+t.cells.map(function(s,i){return \'<td class="\'+s+\'" data-t="\'+t.id+\'" data-i="\'+i+\'"></td>\';}).join("")+"</tr>";}).join("");return grp+rows;}).join("");$("heatmap").innerHTML=\'<div class="hm-wrap"><table class="hm">\'+head+body+"</table></div>";$("heatmap").querySelectorAll("td[data-t]").forEach(function(td){td.onclick=function(){toggleCell(null,td.dataset.t,+td.dataset.i);};});}\n'
'function renderCalendar(){var dows=["日","月","火","水","木","金","土"];var firstDow=new Date(2026,6,1).getDay();var cellsH=dows.map(function(d){return \'<div class="dow">\'+d+"</div>";}).join("");for(var i=0;i<firstDow;i++)cellsH+=\'<div class="cell empty"></div>\';var A=allTasks();for(var day=1;day<=31;day++){var idx=day-1;var pips="";if(idx<DATES.length){var s=A.map(function(t){return t.cells[idx];});var dn=s.filter(function(x){return x==="done";}).length,lt=s.filter(function(x){return x==="late";}).length,pd=s.filter(function(x){return x==="pending";}).length;pips=\'<div class="pips">\'+(dn?\'<span class="pip done"></span>\':"")+(lt?\'<span class="pip late"></span>\':"")+(pd?\'<span class="pip pending"></span>\':"")+"</div>";}cellsH+=\'<div class="cell\'+(day===15?" today":"")+\'"><div class="daynum">\'+day+"</div>"+pips+"</div>";}$("calendar").innerHTML=\'<div class="cal">\'+cellsH+"</div>";}\n'
'function renderChecklist(){var g=D.groups[0];$("checklist").innerHTML=\'<div class="group-title cowork">✅ 今日（Day \'+D.day+\'）解いた問題をタップで完了にする</div><div class="check-list">\'+g.tasks.map(function(t){var on=t.cells[TODAY]==="done";return \'<div class="check-row"><span class="cname">\'+esc(t.name)+\'</span><span class="day">Day \'+D.day+" · "+(on?"完了":"未着手")+\'</span><button class="btn \'+(on?"done":"")+\'" data-check="\'+t.id+\'">\'+(on?"✓ 完了":"✓ 完了にする")+"</button></div>";}).join("")+"</div>";$("checklist").querySelectorAll("[data-check]").forEach(function(b){b.onclick=function(){toggleCell(null,b.dataset.check,TODAY);};});}\n'
'function esc(t){return String(t).replace(/[&<>]/g,function(m){return{"&":"&amp;","<":"&lt;",">":"&gt;"}[m];});}\n'
'function renderAll(){renderDashboard();renderHeatmap();renderCalendar();renderChecklist();}\n'
'// form\n'
'var editing=null;\n'
'function openAdd(){editing=null;$("dttFormTitle").textContent="タスクを追加";$("fName").value="";$("fGroup").value="Cowork task";$("fTotal").value="31";$("fDone").value="0";$("fLate").value="0";$("dttForm").classList.add("open");}\n'
'function openEdit(tid){var t=findTask(tid);if(!t)return;editing=tid;$("dttFormTitle").textContent="タスクを編集";$("fName").value=t.name;var grp=D.groups.find(function(g){return g.tasks.indexOf(t)>=0;});$("fGroup").value=grp.name;$("fTotal").value=t.total;$("fDone").value=t.done;$("fLate").value=t.late;$("dttForm").classList.add("open");}\n'
'function closeForm(){$("dttForm").classList.remove("open");}\n'
'function saveForm(){var name=$("fName").value.trim();if(!name){alert("タスク名を入力してください");return;}var total=Math.max(1,+$("fTotal").value||1),done=Math.max(0,+$("fDone").value||0),late=Math.max(0,+$("fLate").value||0);var gname=$("fGroup").value;if(editing){var t=findTask(editing);t.name=name;t.total=total;t.done=done;t.late=late;var curg=D.groups.find(function(g){return g.tasks.indexOf(t)>=0;});if(curg.name!==gname){curg.tasks=curg.tasks.filter(function(x){return x!==t;});D.groups.find(function(g){return g.name===gname;}).tasks.push(t);}}else{var g=D.groups.find(function(x){return x.name===gname;});g.tasks.push({id:_uid(),name:name,total:total,done:done,late:late,cells:DATES.map(function(){return "pending";})});}save();closeForm();renderAll();}\n'
'function delTask(tid){var t=findTask(tid);if(!t)return;if(!confirm("「"+t.name+"」を削除しますか？"))return;D.groups.forEach(function(g){g.tasks=g.tasks.filter(function(x){return x.id!==tid;});});save();renderAll();}\n'
'document.querySelectorAll("#dtt .tab").forEach(function(tab){tab.onclick=function(){document.querySelectorAll("#dtt .tab").forEach(function(t){t.classList.remove("active");});tab.classList.add("active");document.querySelectorAll("#dtt .pane").forEach(function(p){p.hidden=(p.id!==tab.dataset.tab);});};});\n'
'$("monthLabel").textContent="2026年 7月";$("dayBadge").textContent="Day "+D.day+" · 表示範囲 7/1–7/"+DATES.length;\n'
'$("dttAdd").onclick=openAdd;$("fSave").onclick=saveForm;$("fCancel").onclick=closeForm;\n'
'$("dttExport").onclick=function(){_exportJSON("daily-task-tracker-data.json",D);};\n'
'$("dttImport").onclick=function(){_importJSON(function(obj){if(!obj.groups){alert("形式が不正です");return;}D=obj;DATES=D.dates;TODAY=DATES.length-1;save();renderAll();});};\n'
'$("dttReset").onclick=function(){if(confirm("編集内容を破棄して初期データに戻しますか？")){D=clone(BASE);DATES=D.dates;TODAY=DATES.length-1;save();renderAll();}};\n'
'renderAll();\n'
'})();\n</script>').replace("__DAILY_DATA__", daily_js)

open(f"{ART}/daily-task-tracker/index.html","w").write(wrap_standalone("デイリータスク トラッカー", daily_core))
open(f"{ART}/daily-task-tracker/artifact.html","w").write(wrap_artifact("デイリータスク トラッカー", daily_core))
print("DAILY built.")

# ============================================================ ANYTHING MEMO
amt = json.load(open(f"{ART}/anything-memo-tracker/data.json"))
# assign ids to base memos
for i,m in enumerate(amt["memos"]):
    m.setdefault("id","m"+str(i+1))
amt_js = json.dumps({"genres":amt["genres"],"memos":amt["memos"]}, ensure_ascii=False)

amt_core = ('<style>\n'
'#amt{--bg:#f8fafc;--card:#fff;--border:#e6e9ef;--text:#1e2330;--muted:#6b7280;--accent:#2f6bff;--chip:#1f2430;'
'background:var(--bg);color:var(--text);font-family:-apple-system,"Segoe UI","Hiragino Kaku Gothic ProN","Noto Sans JP",Meiryo,sans-serif;line-height:1.55;min-height:100vh;}\n'
'#amt *{box-sizing:border-box;}\n'
'#amt .wrap{max-width:900px;margin:0 auto;padding:22px 16px 60px;}\n'
'#amt .hero{background:linear-gradient(120deg,#ebefff,#f1eafe);border:1px solid #e6e3fb;border-radius:14px;padding:20px 22px;margin-bottom:16px;}\n'
'#amt .hero h1{margin:0 0 6px;font-size:1.4rem;}#amt .hero p{margin:0;color:#5b6072;font-size:.85rem;}\n'
'#amt .banner{background:#eff4ff;border:1px solid #c7d7fe;color:#1e40af;border-radius:8px;padding:8px 12px;font-size:.78rem;margin-bottom:14px;}\n'
'#amt .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px;}\n'
'#amt .stat{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:12px 14px;}\n'
'#amt .stat .n{font-size:1.5rem;font-weight:800;}#amt .stat .l{font-size:.72rem;color:var(--muted);}\n'
'#amt .panel{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:16px 18px;margin-bottom:16px;}\n'
'#amt .panel h2{margin:0 0 12px;font-size:.9rem;}\n'
'#amt .grow{display:grid;grid-template-columns:150px 1fr 30px;align-items:center;gap:10px;margin:7px 0;font-size:.8rem;}\n'
'#amt .grow .track{height:12px;background:#eef1f6;border-radius:6px;overflow:hidden;}\n'
'#amt .grow .track>span{display:block;height:100%;border-radius:6px;}\n'
'#amt .grow .cnt{text-align:right;color:var(--muted);font-weight:700;font-variant-numeric:tabular-nums;}\n'
'#amt .toolbar{display:flex;gap:8px;align-items:center;margin-bottom:12px;flex-wrap:wrap;}\n'
'#amt .search{flex:1;min-width:220px;border:1px solid var(--border);border-radius:9px;padding:9px 12px;font-size:.85rem;background:var(--card);font-family:inherit;}\n'
'#amt .search:focus{outline:2px solid var(--accent);outline-offset:1px;}\n'
'#amt .sort{border:1px solid var(--border);background:var(--card);border-radius:9px;padding:9px 12px;font-size:.8rem;color:var(--muted);cursor:pointer;font-family:inherit;}\n'
'#amt .chips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;}\n'
'#amt .chip{border:1px solid var(--border);background:var(--card);border-radius:999px;padding:6px 13px;font-size:.78rem;cursor:pointer;color:var(--muted);font-weight:600;font-family:inherit;}\n'
'#amt .chip.active{background:var(--chip);color:#fff;border-color:var(--chip);}\n'
'#amt .memos{display:flex;flex-direction:column;gap:12px;}\n'
'#amt .memo{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:15px 18px;}\n'
'#amt .memo .top{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;}\n'
'#amt .memo .t{color:var(--accent);font-weight:800;font-size:.98rem;margin-bottom:6px;}\n'
'#amt .memo .note{font-size:.83rem;color:#3a4051;margin-bottom:10px;}\n'
'#amt .memo .meta{display:flex;align-items:center;gap:10px;font-size:.74rem;color:var(--muted);}\n'
'#amt .badge{border-radius:999px;padding:3px 10px;font-weight:700;font-size:.72rem;}\n'
'#amt .empty{color:var(--muted);font-size:.85rem;padding:20px;text-align:center;}\n'
'#amt footer{margin-top:26px;font-size:.74rem;color:var(--muted);}\n'
+ edit_css('#amt') +
'</style>\n'
'<div id="amt"><div class="wrap">\n'
'<div class="hero"><h1>🗂️ Anything Memo トラッカー</h1><p>キーワードから作った「調べ済みノート」を追跡。メモの追加・編集ができ、データはブラウザ内に保存されます。</p></div>\n'
'<div class="banner">Cowork のアーティファクトを Code 側に移設した<strong>編集可能な単体版</strong>です。追加・編集・削除はローカル保存され、JSONで書き出し／読み込みできます。</div>\n'
'<div class="editbar"><button class="ebtn primary" id="amtAdd">＋ メモ追加</button><button class="ebtn" id="amtExport">⬇ JSONエクスポート</button><button class="ebtn" id="amtImport">⬆ JSONインポート</button><button class="ebtn" id="amtReset">↺ 初期データに戻す</button></div>\n'
'<div class="form" id="amtForm"><h3 id="amtFormTitle">メモを追加</h3>\n'
'<div class="fgrid">\n'
'<div class="field" style="grid-column:1/-1"><label>トピック</label><input id="aTopic" placeholder="例: RAG（検索拡張生成）"></div>\n'
'<div class="field"><label>ジャンル</label><select id="aGenre"></select></div>\n'
'<div class="field"><label>日付</label><input id="aDate" type="date"></div>\n'
'<div class="field" style="grid-column:1/-1"><label>メモ</label><textarea id="aNote" placeholder="要点を1〜2文で"></textarea></div>\n'
'</div>\n'
'<div class="factions"><button class="ebtn primary" id="aSave">保存</button><button class="ebtn" id="aCancel">キャンセル</button></div></div>\n'
'<div class="stats" id="amtStats"></div>\n'
'<div class="panel"><h2>ジャンル別の件数</h2><div id="amtGenreBars"></div></div>\n'
'<div class="toolbar"><input class="search" id="amtSearch" placeholder="🔍 トピック・メモ・ジャンルを検索"><button class="sort" id="amtSort">並び替え：日付順 ↓</button></div>\n'
'<div class="chips" id="amtChips"></div>\n'
'<div class="memos" id="amtList"></div>\n'
'<footer>元データ: Cowork「Anything Memo Tracker」PDFより抽出。編集内容はこのブラウザに保存されます。</footer>\n'
'</div></div>\n'
'<script>\n(function(){\n'
+ HELPERS +
'const BASE=__AMT_DATA__;\n'
'const LS="anything-memo-tracker.data.v2";\n'
'function clone(o){return JSON.parse(JSON.stringify(o));}\n'
'function load(){try{var s=JSON.parse(localStorage.getItem(LS));if(s&&s.memos)return s;}catch(e){}return clone(BASE);}\n'
'function save(){try{localStorage.setItem(LS,JSON.stringify(D));}catch(e){}}\n'
'var D=load();var G=Object.fromEntries(D.genres.map(function(g){return [g.key,g];}));\n'
'var activeGenre="all",q="",sortDesc=true,editing=null;\n'
'var $=function(id){return document.getElementById(id);};\n'
'function esc(t){return String(t).replace(/[&<>]/g,function(m){return{"&":"&amp;","<":"&lt;",">":"&gt;"}[m];});}\n'
'function counts(){var c={};D.genres.forEach(function(g){c[g.key]=0;});D.memos.forEach(function(m){if(c[m.genre]!=null)c[m.genre]++;});return c;}\n'
'function renderStats(){var withNote=D.memos.filter(function(m){return m.note&&m.note.trim();}).length;$("amtStats").innerHTML=[["メモ総数",D.memos.length],["ジャンル数",D.genres.length],["詳細あり",withNote]].map(function(x){return \'<div class="stat"><div class="n">\'+x[1]+\'</div><div class="l">\'+x[0]+"</div></div>";}).join("");}\n'
'function renderBars(){var c=counts();var max=Math.max(1,...Object.values(c));$("amtGenreBars").innerHTML=D.genres.map(function(g){return \'<div class="grow"><span>\'+g.emoji+" "+g.name+\'</span><span class="track"><span style="width:\'+(c[g.key]/max*100)+"%;background:"+g.text+\'"></span></span><span class="cnt">\'+c[g.key]+"</span></div>";}).join("");}\n'
'function renderChips(){var c=counts();var chips=[\'<button class="chip \'+(activeGenre==="all"?"active":"")+\'" data-g="all">すべて</button>\'].concat(D.genres.map(function(g){return \'<button class="chip \'+(activeGenre===g.key?"active":"")+\'" data-g="\'+g.key+\'">\'+g.emoji+" "+g.name+" ("+c[g.key]+")</button>";}));$("amtChips").innerHTML=chips.join("");$("amtChips").querySelectorAll(".chip").forEach(function(x){x.onclick=function(){activeGenre=x.dataset.g;renderChips();renderList();};});}\n'
'function renderList(){var items=D.memos.slice();if(activeGenre!=="all")items=items.filter(function(m){return m.genre===activeGenre;});if(q){var s=q.toLowerCase();items=items.filter(function(m){return (m.topic+m.note+(G[m.genre]?G[m.genre].name:"")).toLowerCase().indexOf(s)>=0;});}items.sort(function(a,b){return sortDesc?String(b.date).localeCompare(a.date):String(a.date).localeCompare(b.date);});if(!items.length){$("amtList").innerHTML=\'<div class="empty">該当するメモがありません。</div>\';return;}$("amtList").innerHTML=items.map(function(m){var g=G[m.genre]||{fill:"#eee",text:"#333",emoji:"",name:m.genre};return \'<div class="memo"><div class="top"><div class="t">\'+esc(m.topic)+\' ›</div><span class="rowbtns"><button class="ib" data-edit="\'+m.id+\'">✎</button><button class="ib" data-del="\'+m.id+\'">✕</button></span></div><div class="note">\'+esc(m.note)+\'</div><div class="meta"><span class="badge" style="background:\'+g.fill+";color:"+g.text+\'">\'+g.emoji+" "+g.name+\'</span><span>📅 \'+esc(m.date)+"</span></div></div>";}).join("");$("amtList").querySelectorAll("[data-edit]").forEach(function(b){b.onclick=function(){openEdit(b.dataset.edit);};});$("amtList").querySelectorAll("[data-del]").forEach(function(b){b.onclick=function(){delMemo(b.dataset.del);};});}\n'
'function fillGenreSelect(){$("aGenre").innerHTML=D.genres.map(function(g){return \'<option value="\'+g.key+\'">\'+g.emoji+" "+g.name+"</option>";}).join("");}\n'
'function openAdd(){editing=null;$("amtFormTitle").textContent="メモを追加";$("aTopic").value="";$("aGenre").value=D.genres[0].key;$("aDate").value="2026-07-15";$("aNote").value="";$("amtForm").classList.add("open");}\n'
'function openEdit(id){var m=D.memos.find(function(x){return x.id===id;});if(!m)return;editing=id;$("amtFormTitle").textContent="メモを編集";$("aTopic").value=m.topic;$("aGenre").value=m.genre;$("aDate").value=m.date;$("aNote").value=m.note;$("amtForm").classList.add("open");}\n'
'function closeForm(){$("amtForm").classList.remove("open");}\n'
'function saveForm(){var topic=$("aTopic").value.trim();if(!topic){alert("トピックを入力してください");return;}var rec={topic:topic,genre:$("aGenre").value,date:$("aDate").value||"",note:$("aNote").value.trim()};if(editing){var m=D.memos.find(function(x){return x.id===editing;});Object.assign(m,rec);}else{rec.id=_uid();D.memos.unshift(rec);}save();closeForm();renderAll();}\n'
'function delMemo(id){var m=D.memos.find(function(x){return x.id===id;});if(!m)return;if(!confirm("「"+m.topic+"」を削除しますか？"))return;D.memos=D.memos.filter(function(x){return x.id!==id;});save();renderAll();}\n'
'function renderAll(){G=Object.fromEntries(D.genres.map(function(g){return [g.key,g];}));renderStats();renderBars();renderChips();renderList();}\n'
'$("amtSearch").oninput=function(e){q=e.target.value;renderList();};\n'
'$("amtSort").onclick=function(){sortDesc=!sortDesc;$("amtSort").textContent="並び替え：日付順 "+(sortDesc?"↓":"↑");renderList();};\n'
'$("amtAdd").onclick=openAdd;$("aSave").onclick=saveForm;$("aCancel").onclick=closeForm;\n'
'$("amtExport").onclick=function(){_exportJSON("anything-memo-tracker-data.json",D);};\n'
'$("amtImport").onclick=function(){_importJSON(function(obj){if(!obj.memos){alert("形式が不正です");return;}D=obj;save();renderAll();});};\n'
'$("amtReset").onclick=function(){if(confirm("編集内容を破棄して初期データに戻しますか？")){D=clone(BASE);save();renderAll();}};\n'
'fillGenreSelect();renderAll();\n'
'})();\n</script>').replace("__AMT_DATA__", amt_js)

open(f"{ART}/anything-memo-tracker/index.html","w").write(wrap_standalone("Anything Memo トラッカー", amt_core))
open(f"{ART}/anything-memo-tracker/artifact.html","w").write(wrap_artifact("Anything Memo トラッカー", amt_core))
print("AMT built.")

# ============================================================ LEARNING TRACKER
lt = json.load(open(f"{ART}/learning-tracker/data.json"))
for r in lt["rows"]:
    r["id"]=r["cat"]+"#"+str(r["no"])
lt_js = json.dumps({"progress":lt["progress"],"categoryMeta":lt["categoryMeta"],"rows":lt["rows"]}, ensure_ascii=False)

lt_core = ('<style>\n'
'#lt{--bg:#f8fafc;--card:#fff;--border:#e5e9f0;--text:#1e2330;--muted:#6b7280;--accent:#2563eb;--link:#3d74eb;--rowalt:#f6f8fc;'
'background:var(--bg);color:var(--text);font-family:-apple-system,"Segoe UI","Hiragino Kaku Gothic ProN","Noto Sans JP",Meiryo,sans-serif;line-height:1.5;min-height:100vh;}\n'
'#lt *{box-sizing:border-box;}\n'
'#lt .wrap{max-width:1080px;margin:0 auto;padding:22px 16px 60px;}\n'
'#lt .hero{background:#eef1fb;border:1px solid #dde3f5;border-radius:14px;padding:18px 22px;margin-bottom:14px;}\n'
'#lt .hero h1{margin:0 0 5px;font-size:1.35rem;}#lt .hero p{margin:0;color:#5b6072;font-size:.82rem;}\n'
'#lt .banner{background:#eff4ff;border:1px solid #c7d7fe;color:#1e40af;border-radius:8px;padding:8px 12px;font-size:.78rem;margin-bottom:14px;}\n'
'#lt .tabs{display:inline-flex;gap:4px;background:#e7ecf5;padding:4px;border-radius:10px;margin-bottom:16px;flex-wrap:wrap;}\n'
'#lt .tab{border:none;background:none;padding:8px 14px;border-radius:8px;font-size:.83rem;font-weight:700;color:var(--muted);cursor:pointer;font-family:inherit;}\n'
'#lt .tab.active{background:var(--accent);color:#fff;}\n'
'#lt .summary{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;}\n'
'#lt .card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:16px 18px;}\n'
'#lt .card h2{margin:0 0 12px;font-size:.85rem;}\n'
'#lt .donut{display:flex;align-items:center;gap:18px;}#lt .ring{flex:none;}\n'
'#lt .leg{font-size:.78rem;display:flex;flex-direction:column;gap:5px;}\n'
'#lt .leg .row{display:flex;align-items:center;gap:7px;}#lt .leg .sw{width:10px;height:10px;border-radius:3px;flex:none;}\n'
'#lt .leg .v{color:var(--muted);font-variant-numeric:tabular-nums;}\n'
'#lt .toolbar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;}\n'
'#lt .search{flex:1;min-width:220px;border:1px solid var(--border);border-radius:9px;padding:9px 12px;font-size:.85rem;background:var(--card);font-family:inherit;}\n'
'#lt .search:focus{outline:2px solid var(--accent);outline-offset:1px;}\n'
'#lt select{border:1px solid var(--border);background:var(--card);border-radius:9px;padding:9px 10px;font-size:.8rem;color:var(--text);font-family:inherit;cursor:pointer;}\n'
'#lt .count{font-size:.78rem;color:var(--muted);margin-bottom:8px;}\n'
'#lt .tblwrap{overflow-x:auto;border:1px solid var(--border);border-radius:12px;}\n'
'#lt table{border-collapse:collapse;width:100%;font-size:.8rem;}\n'
'#lt th{background:#f2f5fb;text-align:left;padding:9px 12px;color:#3a4051;font-weight:700;white-space:nowrap;position:sticky;top:0;}\n'
'#lt td{padding:8px 12px;border-top:1px solid #eef1f6;vertical-align:middle;}\n'
'#lt tr:nth-child(even) td{background:var(--rowalt);}\n'
'#lt .no{color:var(--muted);font-variant-numeric:tabular-nums;width:44px;}\n'
'#lt .kubun{background:var(--accent);color:#fff;border-radius:6px;padding:2px 9px;font-size:.72rem;font-weight:700;white-space:nowrap;}\n'
'#lt .prov{background:#eef2f6;color:#64748b;border-radius:6px;padding:2px 8px;font-size:.72rem;white-space:nowrap;}\n'
'#lt .name{color:var(--link);font-weight:600;}\n'
'#lt .bunrui{background:#ebeff5;color:#475569;border-radius:6px;padding:2px 8px;font-size:.72rem;white-space:nowrap;}\n'
'#lt .dash{color:#cbd2dc;}\n'
'#lt .actcol{white-space:nowrap;}\n'
'#lt footer{margin-top:24px;font-size:.74rem;color:var(--muted);}\n'
+ edit_css('#lt') +
'</style>\n'
'<div id="lt"><div class="wrap">\n'
'<div class="hero"><h1>📘 学習ロードマップ トラッカー</h1><p>資格・Tools・講座・書籍・Udemy を横断する学習ロードマップ。項目の追加・編集ができます。</p></div>\n'
'<div class="banner">Cowork のアーティファクトを Code 側に移設した<strong>編集可能な単体版</strong>です。追加・編集・削除はローカル保存され、JSONで書き出し／読み込みできます。個別の完了状況はPDFから復元できないため進捗は集計値、長い名称は末尾が「…」に省略されている場合があります。</div>\n'
'<div class="editbar"><button class="ebtn primary" id="ltAdd">＋ 項目追加</button><button class="ebtn" id="ltExport">⬇ JSONエクスポート</button><button class="ebtn" id="ltImport">⬆ JSONインポート</button><button class="ebtn" id="ltReset">↺ 初期データに戻す</button></div>\n'
'<div class="form" id="ltForm"><h3 id="ltFormTitle">項目を追加</h3>\n'
'<div class="fgrid">\n'
'<div class="field"><label>区分</label><select id="lCat"></select></div>\n'
'<div class="field"><label>提供</label><input id="lProv" placeholder="例: MS / AWS（任意）"></div>\n'
'<div class="field" style="grid-column:1/-1"><label>名称</label><input id="lName" placeholder="例: AZ-104"></div>\n'
'<div class="field" style="grid-column:1/-1"><label>分類</label><input id="lBunrui" placeholder="例: Cloud / AI（任意）"></div>\n'
'</div>\n'
'<div class="factions"><button class="ebtn primary" id="lSave">保存</button><button class="ebtn" id="lCancel">キャンセル</button></div></div>\n'
'<div class="tabs" id="ltTabs"></div>\n'
'<div class="summary">\n'
'<div class="card"><h2>全体の進捗 <span style="font-weight:400;color:#6b7280;font-size:.72rem">（取り込み時点の集計）</span></h2><div class="donut"><div class="ring" id="ltRingProg"></div><div class="leg" id="ltLegProg"></div></div></div>\n'
'<div class="card"><h2>カテゴリ別の比率</h2><div class="donut"><div class="ring" id="ltRingRatio"></div><div class="leg" id="ltLegRatio"></div></div></div>\n'
'</div>\n'
'<div class="toolbar"><input class="search" id="ltSearch" placeholder="🔍 名称・提供・分類を検索"><select id="ltProvider"></select><select id="ltBunrui"></select></div>\n'
'<div class="count" id="ltCount"></div>\n'
'<div class="tblwrap"><table><thead><tr><th>No</th><th>区分</th><th>提供</th><th>名称</th><th>分類</th><th></th></tr></thead><tbody id="ltBody"></tbody></table></div>\n'
'<footer>元データ: Cowork「Learning Tracker」PDFより抽出・全564件。編集内容はこのブラウザに保存されます。</footer>\n'
'</div></div>\n'
'<script>\n(function(){\n'
+ HELPERS +
'const BASE=__LT_DATA__;\n'
'const LS="learning-tracker.data.v2";\n'
'function clone(o){return JSON.parse(JSON.stringify(o));}\n'
'function load(){try{var s=JSON.parse(localStorage.getItem(LS));if(s&&s.rows)return s;}catch(e){}return clone(BASE);}\n'
'function save(){try{localStorage.setItem(LS,JSON.stringify(D));}catch(e){}}\n'
'var D=load();var CM=Object.fromEntries(D.categoryMeta.map(function(c){return [c.key,c];}));\n'
'var activeCat="all",q="",prov="all",bunrui="all",editing=null;\n'
'var $=function(id){return document.getElementById(id);};\n'
'function esc(t){return String(t).replace(/[&<>]/g,function(m){return{"&":"&amp;","<":"&lt;",">":"&gt;"}[m];});}\n'
'function catTotals(){var t={};D.categoryMeta.forEach(function(c){t[c.key]=0;});D.rows.forEach(function(r){if(t[r.cat]!=null)t[r.cat]++;});return t;}\n'
'function donut(segs,size,center){var r=size/2,sw=size*0.18,rr=r-sw/2,C=2*Math.PI*rr,off=0,total=segs.reduce(function(a,s){return a+s.v;},0)||1;var circles=segs.map(function(s){var len=s.v/total*C;var el=\'<circle cx="\'+r+\'" cy="\'+r+\'" r="\'+rr+\'" fill="none" stroke="\'+s.c+\'" stroke-width="\'+sw+\'" stroke-dasharray="\'+len+" "+(C-len)+\'" stroke-dashoffset="\'+(-off)+\'"/>\';off+=len;return el;}).join("");return \'<svg width="\'+size+\'" height="\'+size+\'" viewBox="0 0 \'+size+" "+size+\'" style="transform:rotate(-90deg)"><circle cx="\'+r+\'" cy="\'+r+\'" r="\'+rr+\'" fill="none" stroke="#eef1f6" stroke-width="\'+sw+\'"/>\'+circles+\'<text x="\'+r+\'" y="\'+r+\'" transform="rotate(90 \'+r+" "+r+\')" text-anchor="middle" dominant-baseline="central" style="font-weight:800;font-size:\'+(size*0.16)+\'px;fill:#1e2330">\'+center[0]+\'</text><text x="\'+r+\'" y="\'+(r+size*0.15)+\'" transform="rotate(90 \'+r+" "+r+\')" text-anchor="middle" dominant-baseline="central" style="font-size:\'+(size*0.08)+\'px;fill:#6b7280">\'+center[1]+"</text></svg>";}\n'
'function renderSummary(){var p=D.progress;$("ltRingProg").innerHTML=donut([{v:p.overall.done,c:"#0891b2"},{v:p.overall.total-p.overall.done,c:"#e2e8f0"}],120,[p.overall.pct+"%","完了率"]);$("ltLegProg").innerHTML=p.byCategory.map(function(c){return \'<div class="row"><span class="sw" style="background:\'+CM[c.cat].color+\'"></span>\'+CM[c.cat].emoji+" "+c.cat+\' <span class="v">\'+c.done+"/"+c.total+"</span></div>";}).join("");var tot=catTotals();var ratio=D.categoryMeta.map(function(c){return {v:tot[c.key],c:c.color,cat:c.key};});var sum=Object.values(tot).reduce(function(a,b){return a+b;},0);$("ltRingRatio").innerHTML=donut(ratio,120,[sum,"件"]);$("ltLegRatio").innerHTML=ratio.slice().sort(function(a,b){return b.v-a.v;}).map(function(c){return \'<div class="row"><span class="sw" style="background:\'+c.c+\'"></span>\'+CM[c.cat].emoji+" "+c.cat+\' <span class="v">\'+c.v+"</span></div>";}).join("");}\n'
'function renderTabs(){var tabs=[["all","📋 全一覧"]].concat(D.categoryMeta.map(function(c){return [c.key,c.emoji+" "+c.key];}));$("ltTabs").innerHTML=tabs.map(function(x){return \'<button class="tab \'+(activeCat===x[0]?"active":"")+\'" data-c="\'+x[0]+\'">\'+x[1]+"</button>";}).join("");$("ltTabs").querySelectorAll(".tab").forEach(function(t){t.onclick=function(){activeCat=t.dataset.c;renderTabs();renderTable();};});}\n'
'function fillSelects(){var provs=[...new Set(D.rows.map(function(r){return r.provider;}).filter(Boolean))].sort();$("ltProvider").innerHTML=\'<option value="all">提供：すべて</option>\'+provs.map(function(p){return \'<option value="\'+esc(p)+\'">\'+esc(p)+"</option>";}).join("");var bs=[...new Set(D.rows.map(function(r){return r.bunrui;}).filter(Boolean))].sort();$("ltBunrui").innerHTML=\'<option value="all">分類：すべて</option>\'+bs.map(function(b){return \'<option value="\'+esc(b)+\'">\'+esc(b)+"</option>";}).join("");}\n'
'function fillCatSelect(){$("lCat").innerHTML=D.categoryMeta.map(function(c){return \'<option value="\'+c.key+\'">\'+c.emoji+" "+c.key+"</option>";}).join("");}\n'
'function renderTable(){var rows=D.rows;if(activeCat!=="all")rows=rows.filter(function(r){return r.cat===activeCat;});if(prov!=="all")rows=rows.filter(function(r){return r.provider===prov;});if(bunrui!=="all")rows=rows.filter(function(r){return r.bunrui===bunrui;});if(q){var s=q.toLowerCase();rows=rows.filter(function(r){return (r.name+r.provider+r.bunrui+r.cat).toLowerCase().indexOf(s)>=0;});}$("ltCount").textContent=rows.length+" 件表示 / 全 "+D.rows.length+" 件";$("ltBody").innerHTML=rows.map(function(r){return \'<tr><td class="no">\'+r.no+\'</td><td><span class="kubun">\'+r.cat+\'</span></td><td>\'+(r.provider?\'<span class="prov">\'+esc(r.provider)+"</span>":\'<span class="dash">—</span>\')+\'</td><td><span class="name">\'+esc(r.name)+\'</span></td><td>\'+(r.bunrui?\'<span class="bunrui">\'+esc(r.bunrui)+"</span>":\'<span class="dash">—</span>\')+\'</td><td class="actcol"><span class="rowbtns"><button class="ib" data-edit="\'+esc(r.id)+\'">✎</button><button class="ib" data-del="\'+esc(r.id)+\'">✕</button></span></td></tr>\';}).join("")||\'<tr><td colspan="6" style="text-align:center;color:#6b7280;padding:20px">該当する項目がありません。</td></tr>\';$("ltBody").querySelectorAll("[data-edit]").forEach(function(b){b.onclick=function(){openEdit(b.dataset.edit);};});$("ltBody").querySelectorAll("[data-del]").forEach(function(b){b.onclick=function(){delRow(b.dataset.del);};});}\n'
'function nextNo(cat){var mx=0;D.rows.forEach(function(r){if(r.cat===cat&&r.no>mx)mx=r.no;});return mx+1;}\n'
'function openAdd(){editing=null;$("ltFormTitle").textContent="項目を追加";$("lCat").value=D.categoryMeta[0].key;$("lProv").value="";$("lName").value="";$("lBunrui").value="";$("ltForm").classList.add("open");}\n'
'function openEdit(id){var r=D.rows.find(function(x){return x.id===id;});if(!r)return;editing=id;$("ltFormTitle").textContent="項目を編集";$("lCat").value=r.cat;$("lProv").value=r.provider;$("lName").value=r.name;$("lBunrui").value=r.bunrui;$("ltForm").classList.add("open");}\n'
'function closeForm(){$("ltForm").classList.remove("open");}\n'
'function saveForm(){var name=$("lName").value.trim();if(!name){alert("名称を入力してください");return;}var cat=$("lCat").value,provider=$("lProv").value.trim(),bunruiV=$("lBunrui").value.trim();if(editing){var r=D.rows.find(function(x){return x.id===editing;});if(r.cat!==cat)r.no=nextNo(cat);r.cat=cat;r.provider=provider;r.name=name;r.bunrui=bunruiV;}else{D.rows.push({id:_uid(),no:nextNo(cat),cat:cat,provider:provider,name:name,bunrui:bunruiV});}save();closeForm();renderAll();}\n'
'function delRow(id){var r=D.rows.find(function(x){return x.id===id;});if(!r)return;if(!confirm("「"+r.name+"」を削除しますか？"))return;D.rows=D.rows.filter(function(x){return x.id!==id;});save();renderAll();}\n'
'function renderAll(){CM=Object.fromEntries(D.categoryMeta.map(function(c){return [c.key,c];}));renderSummary();renderTabs();fillSelects();renderTable();}\n'
'$("ltSearch").oninput=function(e){q=e.target.value;renderTable();};\n'
'$("ltProvider").onchange=function(e){prov=e.target.value;renderTable();};\n'
'$("ltBunrui").onchange=function(e){bunrui=e.target.value;renderTable();};\n'
'$("ltAdd").onclick=openAdd;$("lSave").onclick=saveForm;$("lCancel").onclick=closeForm;\n'
'$("ltExport").onclick=function(){_exportJSON("learning-tracker-data.json",D);};\n'
'$("ltImport").onclick=function(){_importJSON(function(obj){if(!obj.rows){alert("形式が不正です");return;}D=obj;prov="all";bunrui="all";save();renderAll();});};\n'
'$("ltReset").onclick=function(){if(confirm("編集内容を破棄して初期データに戻しますか？")){D=clone(BASE);prov="all";bunrui="all";save();renderAll();}};\n'
'fillCatSelect();renderAll();\n'
'})();\n</script>').replace("__LT_DATA__", lt_js)

open(f"{ART}/learning-tracker/index.html","w").write(wrap_standalone("学習ロードマップ トラッカー", lt_core))
open(f"{ART}/learning-tracker/artifact.html","w").write(wrap_artifact("学習ロードマップ トラッカー", lt_core))
print("LT built.")
for f in ["daily-task-tracker","anything-memo-tracker","learning-tracker"]:
    print(os.path.getsize(f"{ART}/{f}/index.html"), f)
