"use strict";
// ===== Master data (124 machines) and settings =====
const UNIT="AR TEX COMPOSITE LTD";
const B={reasons:["Yarn Break", "Needle Problem", "Mechanical Problem", "Electrical Problem", "Maintenance", "Cleaning", "Machine Setting", "Fabric Problem", "Quality Issue", "No Operator", "Power Failure", "Other"],icons:{"Yarn Break": "🧵", "Needle Problem": "📍", "Mechanical Problem": "🔧", "Electrical Problem": "💡", "Maintenance": "🛠️", "Cleaning": "🧹", "Machine Setting": "⚙️", "Fabric Problem": "🧶", "Quality Issue": "🔍", "No Operator": "👤", "Power Failure": "⚡", "Other": "✏️"}};
const MASTER=[[1,1,1,"Fleece"],[2,2,1,"Fleece"],[3,3,1,"Fleece"],[4,4,1,"Fleece"],[5,5,1,"Fleece"],[6,6,1,"Fleece"],[7,7,1,"Fleece"],[8,8,1,"Fleece"],[9,9,1,"Fleece"],[10,10,1,"Fleece"],[11,11,1,"Fleece"],[12,12,1,"Fleece"],[13,13,1,"Fleece"],[14,14,1,"Fleece"],[15,15,1,"Fleece"],[16,16,1,"Fleece"],[17,17,2,"Fleece"],[18,18,2,"Fleece"],[19,19,2,"Fleece"],[20,20,2,"Fleece"],[21,21,2,"Fleece"],[22,22,2,"Fleece"],[23,23,2,"Fleece"],[24,24,2,"Fleece"],[25,25,2,"Fleece"],[26,26,2,"Fleece"],[27,27,2,"Fleece"],[28,28,2,"Fleece"],[29,29,2,"Fleece"],[30,30,3,"Rib/Int"],[31,31,3,"Rib/Int"],[32,32,3,"Rib/Int"],[33,33,3,"Rib/Int"],[34,34,3,"Rib/Int"],[35,35,3,"Rib/Int"],[36,36,3,"Rib/Int"],[37,37,3,"Rib/Int"],[38,38,3,"Rib/Int"],[39,39,3,"Fleece"],[40,40,4,"Rib/Int"],[41,41,4,"Rib/Int"],[42,42,4,"Rib/Int"],[43,43,4,"Rib/Int"],[44,44,4,"Rib/Int"],[45,45,4,"Rib/Int"],[46,46,4,"Rib/Int"],[47,47,4,"Rib/Int"],[48,48,4,"Rib/Int"],[49,49,4,"Rib/Int"],[50,50,5,"S/J"],[51,51,5,"S/J"],[52,52,5,"S/J"],[53,53,5,"S/J"],[54,54,5,"S/J"],[55,55,5,"S/J"],[56,56,5,"S/J"],[57,57,5,"S/J"],[58,58,5,"S/J"],[59,59,5,"S/J"],[60,60,6,"S/J"],[61,61,6,"S/J"],[62,62,6,"S/J"],[63,63,6,"S/J"],[64,64,6,"S/J"],[65,65,6,"S/J"],[66,66,6,"S/J"],[67,67,6,"S/J"],[68,68,6,"S/J"],[69,69,7,"S/J"],[70,70,7,"S/J"],[71,71,7,"S/J"],[72,72,7,"S/J"],[73,73,7,"S/J"],[74,74,7,"S/J"],[75,75,7,"S/J"],[76,76,7,"S/J"],[77,77,7,"S/J"],[78,78,7,"S/J"],[79,79,7,"S/J"],[80,80,7,"S/J"],[81,81,8,"S/J"],[82,82,8,"S/J"],[83,83,8,"S/J"],[84,84,8,"S/J"],[85,85,8,"S/J"],[86,86,8,"S/J"],[87,87,8,"S/J"],[88,88,8,"S/J"],[89,89,8,"S/J"],[90,90,8,"S/J"],[91,91,8,"S/J"],[92,92,8,"S/J"],[93,93,9,"S/J"],[94,94,9,"S/J"],[95,95,9,"S/J"],[96,96,9,"S/J"],[97,97,9,"S/J"],[98,98,9,"S/J"],[99,99,9,"S/J"],[100,100,9,"S/J"],[101,101,9,"S/J"],[102,102,9,"S/J"],[103,103,9,"S/J"],[104,104,9,"S/J"],[105,120,9,"S/J"],[106,121,9,"S/J"],[107,122,9,"S/J"],[108,123,9,"S/J"],[109,124,9,"S/J"],[110,105,10,"Rib/Int"],[111,106,10,"Rib/Int"],[112,107,10,"Rib/Int"],[113,108,10,"Rib/Int"],[114,109,10,"Rib/Int"],[115,110,10,"Rib/Int"],[116,111,10,"Rib/Int"],[117,112,10,"Rib/Int"],[118,113,10,"Rib/Int"],[119,114,10,"Rib/Int"],[120,115,10,"Rib/Int"],[121,116,10,"Rib/Int"],[122,117,10,"S/J"],[123,118,10,"S/J"],[124,119,10,"S/J"]];  // [machine_id, machine_no, channel_no, type]
const M=MASTER.map(([machine_id,machine_no,channel_no,machine_type])=>({machine_id,machine_no,channel_no,machine_type}));
// ---------- data & helpers ----------
const byNo=Object.fromEntries(M.map(m=>[m.machine_no,m])),REASONS=B.reasons,ICON=B.icons,TYPES=[...new Set(M.map(m=>m.machine_type))];
const $=id=>document.getElementById(id),Q=s=>document.querySelectorAll(s);
const pad=n=>String(n).padStart(2,"0"),MON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const dstr=d=>d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate()),today=()=>dstr(new Date());
const fd=s=>{const[y,m,d]=s.split("-");return d+"-"+MON[m-1]+"-"+y};
const f12=t=>{const[h,m]=t.split(":").map(Number);return((h+11)%12+1)+":"+pad(m)+" "+(h<12?"AM":"PM")};
const fm=n=>n>=60?Math.floor(n/60)+"h "+(n%60)+"m":n+"m";
const long=n=>{const h=Math.floor(n/60),m=n%60;return[h?h+(h>1?" Hours":" Hour"):"",m||!h?m+(m===1?" Minute":" Minutes"):""].filter(Boolean).join(" ")};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const rl=r=>r.reason==="Other"&&r.other_reason?"Other: "+r.other_reason:r.reason;
const shiftOf=s=>s>="08:00"&&s<"20:00"?"A":"B";
const nowT=()=>{const d=new Date();return pad(d.getHours())+":"+pad(d.getMinutes())};
const tm=x=>{const[h,m]=x.split(":").map(Number);return h*60+m};
const durMin=(s,e)=>{const d=tm(e)-tm(s);return d<0?d+1440:d};
const clock=ts=>{const s=Math.floor((Date.now()-ts)/1000);return pad(Math.floor(s/3600))+":"+pad(Math.floor(s/60)%60)+":"+pad(s%60)};
const sum=l=>l.reduce((a,x)=>a+x.duration_minutes,0);
const topR=l=>{const c={};l.forEach(x=>c[x.reason]=(c[x.reason]||0)+1);return Object.entries(c).sort((a,b)=>b[1]-a[1])[0]?.[0]||"—"};
const byMachine=L=>{const g={};L.forEach(x=>(g[x.machine_no]=g[x.machine_no]||[]).push(x));return Object.entries(g).sort((a,b)=>sum(b[1])-sum(a[1]))};
function bump(id,v){const e=$(id);if(e.textContent!==String(v)){e.textContent=v;e.classList.remove("bump");void e.offsetWidth;e.classList.add("bump")}}
let tt;function toast(m,undo){const t=$("toast");t.innerHTML=esc(m)+(undo?' <button id="undo">UNDO</button>':"");t.classList.remove("hide");clearTimeout(tt);tt=setTimeout(()=>t.classList.add("hide"),6000);if(undo)$("undo").onclick=()=>{undo();t.classList.add("hide")}}

// ---------- state + server API (Flask) ----------
// ---------- state + browser storage (localStorage) ----------
let D=[],TM={},cur=null,flt="all",so={k:"date",dir:-1},editId=null,lR="",dR="",dSig="",stSig="",anSig="";
const KEY="artex_downtime_v1",TKEY="artex_timers_v1";
const load=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}};
const store=()=>{try{localStorage.setItem(KEY,JSON.stringify(D));localStorage.setItem(TKEY,JSON.stringify(TM))}catch(e){toast("Could not save — browser storage is blocked or full")}};
async function sync(force){const sig=(localStorage.getItem(KEY)||"")+"|"+(localStorage.getItem(TKEY)||"");
 if(sig!==stSig||force){stSig=sig;D=load(KEY,[]);TM=load(TKEY,{});render()}loadAnalytics()}
async function putRec(r){const i=D.findIndex(x=>x.downtime_id===r.downtime_id);i>=0?D[i]=r:D.push(r);store();render();stSig=null;return true}
async function delRec(id){D=D.filter(r=>r.downtime_id!==id);store();render();stSig=null}
async function setTm(no,t){t?TM[no]=t:delete TM[no];store();render();stSig=null}
const mkRec=(no,date,s,e,r,o)=>({downtime_id:editId||Date.now()*10+Math.floor(Math.random()*10),machine_id:byNo[no].machine_id,machine_no:no,machine_type:byNo[no].machine_type,downtime_date:date,start_time:s,end_time:e,duration_minutes:durMin(s,e),reason:r,other_reason:r==="Other"?o:"",created_at:new Date().toISOString()});

// ---------- tabs ----------
const TABS=["floor","log","hist","rep"];
function tab(t){if(!TABS.includes(t))t="floor";Q(".tab").forEach(s=>s.classList.toggle("on",s.id==="t-"+t));Q("#tabs button").forEach(b=>b.classList.toggle("on",b.dataset.t===t));history.replaceState(null,"","#"+t);scrollTo(0,0)}
$("tabs").onclick=e=>{const b=e.target.closest("button");if(b)tab(b.dataset.t)};

// ---------- reason picker (shared) ----------
function rg(box,get,set){box.innerHTML=REASONS.map(r=>`<button type="button" data-r="${r}" class="${get()===r?"on":""}"><span>${ICON[r]}</span>${r}</button>`).join("");
 box.onclick=e=>{const b=e.target.closest("button");if(!b)return;set(b.dataset.r);[...box.children].forEach(c=>c.classList.toggle("on",c===b))}}

// ---------- FLOOR ----------
function renderFloor(){const td=D.filter(x=>x.downtime_date===today()),dn=Object.keys(TM).length,q=$("fq").value.trim();
 bump("kR",M.length-dn);bump("kX",dn);bump("kE",td.length);bump("kT",fm(sum(td)));
 $("fc").innerHTML=[["all","All"],["down","⛔ Down now"],...TYPES.map(t=>[t,t])].map(([v,l])=>`<button class="chip${flt===v?" on":""}" data-f="${v}">${l}</button>`).join("");
 const L=[...M].sort((a,b)=>a.machine_no-b.machine_no).filter(m=>(flt==="all"||(flt==="down"?TM[m.machine_no]:m.machine_type===flt))&&(!q||String(m.machine_no).includes(q)));
 $("grid").innerHTML=L.map((m,i)=>{const t=TM[m.machine_no];return`<button class="mc${t?" dn":""}" data-n="${m.machine_no}" style="animation-delay:${i*6}ms"><b>${pad(m.machine_no)}</b><small>${m.machine_type}</small>${t?`<em data-ts="${t.ts}">${fm(Math.floor((Date.now()-t.ts)/60000))}</em>`:""}</button>`}).join("")||'<p class="hint">No machines match.</p>'}
$("fc").onclick=e=>{const b=e.target.closest("button");if(b){flt=b.dataset.f;renderFloor()}};
$("fq").oninput=renderFloor;
$("grid").onclick=e=>{const b=e.target.closest(".mc");if(b)openM(+b.dataset.n)};
setTimeout(()=>$("grid").classList.remove("first"),2000);

// ---------- machine drawer ----------
function openM(no){cur=no;dR="";drawDrawer();$("drawer").classList.add("open");$("scrim").classList.add("on")}
function closeM(){cur=null;dSig="";$("drawer").classList.remove("open");$("scrim").classList.remove("on")}
$("scrim").onclick=closeM;addEventListener("keydown",e=>{if(e.key==="Escape")closeM()});
const derr=m=>{const e=$("derr");if(e){e.textContent=m;e.classList.toggle("hide",!m)}};
function drawDrawer(){const m=byNo[cur],t=TM[cur];dSig=cur+"|"+!!t;
 const tl=D.filter(x=>x.machine_no===cur&&x.downtime_date===today()).sort((a,b)=>b.start_time.localeCompare(a.start_time)).slice(0,4);
 $("dr").innerHTML=`<div class="dh"><div><h2>Machine ${pad(cur)}</h2><p>${m.machine_type} · Channel ${m.channel_no}</p></div><button class="x" id="dx" aria-label="Close">✕</button></div>`+
 (t?`<div class="live"><small>STOPPED SINCE ${f12(t.start)}</small><b id="bigT">${clock(t.ts)}</b></div>
  <label class="lb">Why did it stop?</label><div class="rg" id="drg"></div><div id="dor" class="hide"><input id="dorv" maxlength="80" placeholder="Type the reason" style="margin-top:8px"></div><div id="derr" class="err hide"></div>
  <button class="btn go" id="dsave">✅ Running again — Save</button><button class="btn ghost" id="dcancel">Discard timer</button>`
  :`<p class="hint">🟢 This machine is running.</p><button class="btn stop" id="dstart">⏹ Machine stopped — start timer</button><button class="btn ghost" id="dman">Add a past downtime instead</button>`)+
 `<h3>Today on this machine</h3>`+(tl.map(x=>`<div class="te"><span>${f12(x.start_time)} · ${ICON[x.reason]} ${esc(rl(x))}</span><b>${fm(x.duration_minutes)}</b></div>`).join("")||'<p class="hint">No downtime today 🎉</p>');
 $("dx").onclick=closeM;
 if(t){rg($("drg"),()=>dR,r=>{dR=r;$("dor").classList.toggle("hide",r!=="Other");derr("")});
  $("dcancel").onclick=async()=>{if(confirm("Discard this timer without saving?")){await setTm(cur,null);toast("Timer discarded")}};
  $("dsave").onclick=async()=>{const o=$("dorv").value.trim();
   if(!dR)return derr("Please choose a reason.");if(dR==="Other"&&!o)return derr("Please type the reason.");
   const e=nowT(),d=durMin(t.start,e);if(d<=0)return derr("Less than 1 minute so far — wait a moment, or discard the timer.");
   editId=null;const no=cur;if(await putRec(mkRec(no,t.date,t.start,e,dR,o))){await setTm(no,null);toast(`✔ Saved · Machine ${pad(no)} · ${long(d)}`);closeM()}}}
 else{$("dstart").onclick=async()=>{await setTm(cur,{no:cur,date:today(),start:nowT(),ts:Date.now()});toast("⏱ Timer started")};
  $("dman").onclick=()=>{const n=cur;closeM();resetLog();$("lm").value=n;tab("log");lPreview()}}}

// ---------- LOG form ----------
const lerr=m=>{$("lerr").textContent=m;$("lerr").classList.toggle("hide",!m)};
const setL=r=>{lR=r;$("lor").classList.toggle("hide",r!=="Other");lerr("")};
function lPreview(){const m=byNo[+$("lm").value],c=$("lchip"),s=$("ls").value,e=$("le").value,p=$("lpv");
 c.className="mchip"+(m?" ok":"");c.textContent=m?`✔ Machine ${pad(m.machine_no)} · ${m.machine_type} · Channel ${m.channel_no}`:$("lm").value?"Machine not found (valid: 1–124)":"";
 if(!s||!e){p.className="pv";p.textContent="Enter the start and end time to see the duration";return}
 const d=durMin(s,e);p.className="pv "+(!d?"":d>=120?"rd":d>=45?"o":"g");
 p.innerHTML=d?`<small>TOTAL DOWNTIME</small><b>${long(d)}</b>${d} minutes${e<s?" · ends next day":""}`:"Start and end time are the same"}
["lm","ls","le"].forEach(i=>$(i).oninput=lPreview);
$("qb").onclick=e=>{const q=e.target.dataset.q;if(!q)return;
 if(q==="s")$("ls").value=nowT();else if(q==="e")$("le").value=nowT();
 else{if(!$("ls").value)return lerr("Set the start time first.");const t=(tm($("ls").value)+ +q)%1440;$("le").value=pad(Math.floor(t/60))+":"+pad(t%60)}
 lerr("");lPreview()};
function resetLog(){editId=null;lR="";["lm","ls","le","lo"].forEach(i=>$(i).value="");$("ld").value=today();$("lor").classList.add("hide");lerr("");
 $("ltitle").textContent="Log a past downtime";$("lsave").textContent="Save downtime";$("lcancel").classList.add("hide");rg($("lrg"),()=>lR,setL);lPreview()}
$("lcancel").onclick=()=>{resetLog();tab("hist")};
$("lsave").onclick=async()=>{const m=byNo[+$("lm").value],d=$("ld").value,s=$("ls").value,e=$("le").value,o=$("lo").value.trim();
 const bad=!m?"Enter a valid machine number (1–124).":!d?"Choose the date.":!s?"Enter the start time.":!e?"Enter the end time.":!lR?"Choose a reason.":lR==="Other"&&!o?"Please type the reason.":durMin(s,e)===0?"Downtime must be longer than 0 minutes.":"";
 if(bad)return lerr(bad);lerr("");const upd=!!editId;
 if(await putRec(mkRec(m.machine_no,d,s,e,lR,o))){toast(`✔ ${upd?"Updated":"Saved"} · Machine ${pad(m.machine_no)} · ${long(durMin(s,e))}`);resetLog();if(upd)tab("hist")}};
window.ed=id=>{const x=D.find(r=>r.downtime_id===id);if(!x)return;tab("log");editId=id;lR=x.reason;
 $("lm").value=x.machine_no;$("ld").value=x.downtime_date;$("ls").value=x.start_time;$("le").value=x.end_time;$("lo").value=x.other_reason;$("lor").classList.toggle("hide",lR!=="Other");
 rg($("lrg"),()=>lR,setL);$("ltitle").textContent="Edit downtime";$("lsave").textContent="Update downtime";$("lcancel").classList.remove("hide");lPreview()};
window.del=id=>{const x=D.find(r=>r.downtime_id===id);delRec(id);toast("Record deleted",()=>putRec(x))};

// ---------- HISTORY ----------
$("hT").innerHTML+=TYPES.map(t=>`<option>${t}</option>`).join("");$("hRs").innerHTML+=REASONS.map(r=>`<option>${r}</option>`).join("");
function histList(){const q=$("hq").value.toLowerCase(),t=$("hT").value,d=$("hD").value,r=$("hRs").value;
 return D.filter(x=>(!t||x.machine_type===t)&&(!d||x.downtime_date===d)&&(!r||x.reason===r)&&(!q||(pad(x.machine_no)+" "+x.machine_no+" "+x.machine_type+" "+rl(x)).toLowerCase().includes(q)))}
function renderHist(){const L=histList(),k=so.k,v=x=>k==="date"?x.downtime_date+x.start_time:k==="no"?x.machine_no:k==="start"?x.start_time:x.duration_minutes;
 L.sort((a,b)=>(v(a)>v(b)?1:v(a)<v(b)?-1:0)*so.dir);$("hsum").textContent=L.length+" records · total "+fm(sum(L));
 $("hb").innerHTML=L.map(x=>`<tr><td>${fd(x.downtime_date)}</td><td><b>${pad(x.machine_no)}</b></td><td>${x.machine_type}</td><td><span class="tag" style="background:${shiftOf(x.start_time)==="A"?"var(--inf)":"#7048e8"}">${shiftOf(x.start_time)}</span></td><td>${f12(x.start_time)}</td><td>${f12(x.end_time)}</td><td><b>${fm(x.duration_minutes)}</b></td><td>${ICON[x.reason]} ${esc(rl(x))}</td><td><button class="sm" onclick="ed(${x.downtime_id})">Edit</button> <button class="sm" onclick="del(${x.downtime_id})">Delete</button></td></tr>`).join("")||'<tr><td colspan="9" class="hint">No records yet.</td></tr>'}
["hq","hT","hD","hRs"].forEach(i=>$(i).oninput=renderHist);
$("hclr").onclick=()=>{["hq","hT","hD","hRs"].forEach(i=>$(i).value="");renderHist()};
Q("th[data-k]").forEach(th=>th.onclick=()=>{so=so.k===th.dataset.k?{k:so.k,dir:-so.dir}:{k:th.dataset.k,dir:1};renderHist()});
function exp(name,rows){const csv="\ufeff"+rows.map(r=>r.map(c=>'"'+String(c).replace(/"/g,'""')+'"').join(",")).join("\r\n");
 const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download=name;document.body.appendChild(a);a.click();a.remove()}
$("ex1").onclick=()=>exp("downtime-history.csv",[["Date","Machine No","Type","Shift","Start","End","Minutes","Reason"],...histList().map(x=>[fd(x.downtime_date),pad(x.machine_no),x.machine_type,shiftOf(x.start_time),x.start_time,x.end_time,x.duration_minutes,rl(x)])]);

// ---------- REPORTS ----------
const inPeriod=x=>{const p=$("rp").value;return p==="a"||(p==="t"?x.downtime_date===today():x.downtime_date>=dstr(new Date(Date.now()-6*864e5)))};
function renderRep(){const td=D.filter(x=>x.downtime_date===today());
 $("sh").innerHTML=["A","B"].map(s=>{const l=td.filter(x=>shiftOf(x.start_time)===s),mc=byMachine(l)[0];
  return`<div class="sc ${s==="B"?"b":""}"><h3>Shift ${s}</h3><div><span>Events</span><b>${l.length}</b></div><div><span>Total downtime</span><b>${fm(sum(l))}</b></div><div><span>Longest</span><b>${l.length?fm(Math.max(...l.map(x=>x.duration_minutes))):"—"}</b></div><div><span>Top reason</span><b>${topR(l)}</b></div><div><span>Most down machine</span><b>${mc?pad(mc[0]):"—"}</b></div></div>`}).join("");
 $("mw").innerHTML=byMachine(D.filter(inPeriod)).map(([n,l])=>`<tr><td><b>${pad(n)}</b></td><td>${byNo[n].machine_type}</td><td>${l.length}</td><td>${fm(sum(l))}</td><td>${esc(topR(l))}</td></tr>`).join("")||'<tr><td colspan="5" class="hint">No downtime in this period.</td></tr>'}
$("rp").onchange=renderRep;
$("ex2").onclick=()=>exp("machine-wise-downtime.csv",[["Machine","Type","Events","Total Minutes","Top Reason"],...byMachine(D.filter(inPeriod)).map(([n,l])=>[pad(n),byNo[n].machine_type,l.length,sum(l),topR(l)])]);
function analytics(){const days=[];for(let i=6;i>=0;i--)days.push(dstr(new Date(Date.now()-i*864e5)));
 const per=Object.fromEntries(days.map(d=>[d,[0,0]])),rs={},mc={};
 D.forEach(x=>{if(x.downtime_date<days[0])return;if(per[x.downtime_date]){per[x.downtime_date][0]+=x.duration_minutes;per[x.downtime_date][1]++}rs[x.reason]=(rs[x.reason]||0)+x.duration_minutes;mc[x.machine_no]=(mc[x.machine_no]||0)+x.duration_minutes});
 const top=(o,n)=>Object.entries(o).sort((p,q)=>q[1]-p[1]).slice(0,n);
 return{days:days.map(d=>({date:d,minutes:per[d][0],events:per[d][1]})),reasons:top(rs,6).map(([k,v])=>({reason:k,icon:ICON[k]||"",minutes:v})),machines:top(mc,5).map(([k,v])=>({machine_no:+k,type:byNo[k].machine_type,minutes:v}))}}
async function loadAnalytics(){const a=analytics(),sig=JSON.stringify(a);if(sig!==anSig){anSig=sig;drawAn(a)}}
const grow=box=>requestAnimationFrame(()=>requestAnimationFrame(()=>{box.querySelectorAll("i[data-w]").forEach(i=>i.style.width=i.dataset.w+"%");box.querySelectorAll("i[data-h]").forEach(i=>i.style.height=i.dataset.h+"%")}));
function hbars(box,rows){const mx=Math.max(1,...rows.map(r=>r.v));box.innerHTML=rows.length?rows.map(r=>`<div class="hb"><span>${esc(r.l)}</span><div class="tk"><i data-w="${(r.v/mx*100).toFixed(1)}"></i></div><b>${fm(r.v)}</b></div>`).join(""):'<p class="hint">No data yet.</p>';grow(box)}
function drawAn(a){hbars($("anRs"),a.reasons.map(r=>({l:r.icon+" "+r.reason,v:r.minutes})));hbars($("anMc"),a.machines.map(m=>({l:"M"+pad(m.machine_no)+" · "+m.type,v:m.minutes})));
 const mx=Math.max(1,...a.days.map(d=>d.minutes));
 $("anDays").innerHTML=a.days.map(d=>`<div class="vb" title="${d.events} events"><b>${d.minutes?fm(d.minutes):""}</b><div class="col"><i data-h="${(d.minutes/mx*100).toFixed(1)}"></i></div><span>${fd(d.date).slice(0,6)}</span></div>`).join("");grow($("anDays"))}

// ---------- backup / restore ----------
$("bk").onclick=()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify({records:D,timers:TM},null,1)],{type:"application/json"}));a.download="downtime-backup-"+today()+".json";document.body.appendChild(a);a.click();a.remove()};
$("rs").onclick=()=>$("rf").click();
$("rf").onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const x=JSON.parse(await f.text());if(!Array.isArray(x.records))throw 0;
 const ids=new Set(D.map(r=>r.downtime_id));let n=0;x.records.forEach(r=>{if(r&&byNo[r.machine_no]&&!ids.has(r.downtime_id)){D.push(r);n++}});store();render();toast("Restored "+n+" new records")}catch(err){toast("Not a valid backup file")}e.target.value=""};

// ---------- render, ticker, theme, start ----------
function render(){renderFloor();renderHist();renderRep();loadAnalytics();if(cur&&dSig!==cur+"|"+!!TM[cur])drawDrawer()}
setInterval(()=>{Q("#grid em[data-ts]").forEach(e=>e.textContent=fm(Math.floor((Date.now()-e.dataset.ts)/60000)));const b=$("bigT");if(b&&cur&&TM[cur])b.textContent=clock(TM[cur].ts);
 $("clk").textContent=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})},1000);
$("theme").onclick=()=>{const t=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=t;try{localStorage.artex_theme=t}catch(e){}};
resetLog();tab(location.hash.slice(1));render();sync(true);setInterval(sync,4000);
