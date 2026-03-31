export interface Env {
  DB: D1Database;
  QSSN_API_KEY: string;
  ADMIN_PASSWORD: string;
  STREAM_HUB: DurableObjectNamespace;
}

export { StreamHub } from "./stream-hub";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const QSSN_URL = "https://qssn-d1-api.gastonsoftwaresolutions234.workers.dev/api/v1/emails/send";
const MINISTRY_NAME = "Massajja Tower of Intercessory Ministry";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

function htmlRes(content: string) {
  return new Response(content, {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  });
}

async function sendEmail(apiKey: string, to: string, subject: string, html: string) {
  const res = await fetch(QSSN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ to, subject, html, from_name: MINISTRY_NAME }),
  });
  return res.ok;
}

function welcomeHtml(name: string) {
  return `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
      <div style="background:linear-gradient(135deg,#c0392b,#e67e22,#f1c40f);padding:40px 32px;text-align:center">
        <h1 style="color:#fff;margin:0;font-size:26px;letter-spacing:1px">${MINISTRY_NAME}</h1>
        <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-style:italic">"God First — Winning Souls, Setting Captives Free"</p>
      </div>
      <div style="padding:36px 32px">
        <h2 style="color:#1a1a1a;font-size:22px">Welcome, ${name}! 🙏</h2>
        <p style="color:#555;line-height:1.7">Thank you for subscribing to our ministry updates. You are now part of a growing community of believers standing in the gap for Uganda and the nations.</p>
        <p style="color:#555;line-height:1.7">You will receive notifications about:</p>
        <ul style="color:#555;line-height:2">
          <li>Upcoming revival services &amp; events</li>
          <li>Prayer alerts &amp; intercessory calls</li>
          <li>Ministry news &amp; community outreach updates</li>
        </ul>
        <p style="color:#555;line-height:1.7">We are glad to have you with us. May God bless you richly.</p>
        <div style="margin-top:32px;padding-top:24px;border-top:1px solid #eee;text-align:center;color:#999;font-size:13px">
          <p>${MINISTRY_NAME} · Massajja, Wakiso District, Kampala, Uganda</p>
        </div>
      </div>
    </div>`;
}

function updateHtml(title: string, content: string, date: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Georgia,serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 20px">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10)">

      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#c0392b 0%,#e67e22 60%,#f1c40f 100%);padding:40px 32px;text-align:center">
          <p style="margin:0 0 8px;color:rgba(255,255,255,0.8);font-size:12px;letter-spacing:3px;text-transform:uppercase">Ministry Update</p>
          <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:bold;letter-spacing:0.5px">${MINISTRY_NAME}</h1>
          <p style="margin:10px 0 0;color:rgba(255,255,255,0.85);font-style:italic;font-size:14px">"God First — Winning Souls, Setting Captives Free"</p>
        </td>
      </tr>

      <!-- Date badge -->
      <tr>
        <td style="background:#fdf6ec;padding:14px 32px;border-bottom:1px solid #f0e0c8;text-align:center">
          <span style="color:#e67e22;font-size:13px;font-weight:bold;letter-spacing:1px">${date}</span>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:40px 32px">
          <h2 style="margin:0 0 20px;color:#1a1a1a;font-size:26px;line-height:1.3;border-left:4px solid #c0392b;padding-left:16px">${title}</h2>
          <p style="margin:0 0 24px;color:#444444;font-size:16px;line-height:1.8">${content}</p>
          <hr style="border:none;border-top:1px solid #eeeeee;margin:32px 0">

          <!-- CTA Button -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="padding:8px 0 24px">
                <a href="https://towerintercessoryministry.towerintercessoryministry.workers.dev/updates"
                   style="display:inline-block;background:linear-gradient(135deg,#c0392b,#e67e22);color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:50px;font-size:15px;font-weight:bold;letter-spacing:0.5px;box-shadow:0 4px 14px rgba(192,57,43,0.35)">
                  Read Full Update
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Divider -->
      <tr>
        <td style="background:linear-gradient(135deg,#c0392b,#e67e22,#f1c40f);height:4px"></td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#1a1a1a;padding:28px 32px;text-align:center">
          <p style="margin:0 0 6px;color:#ffffff;font-size:14px;font-weight:bold">${MINISTRY_NAME}</p>
          <p style="margin:0 0 6px;color:#aaaaaa;font-size:12px">Massajja, Wakiso District, Kampala, Uganda</p>
          <p style="margin:16px 0 0;color:#666666;font-size:11px">You are receiving this because you subscribed to our ministry updates.</p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function loginPage(error = "") {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Admin Login — ${MINISTRY_NAME}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Georgia,serif;background:linear-gradient(135deg,#c0392b 0%,#e67e22 60%,#f1c40f 100%);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.card{background:#fff;border-radius:20px;padding:48px 40px;max-width:420px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.25);text-align:center}
.logo{width:90px;height:90px;border-radius:50%;object-fit:cover;border:4px solid #f1c40f;box-shadow:0 4px 20px rgba(192,57,43,0.3);margin-bottom:20px}
h1{font-size:20px;color:#1a1a1a;margin-bottom:4px}
.sub{color:#888;font-size:13px;margin-bottom:28px;font-style:italic}
input{width:100%;padding:14px 16px;border:1.5px solid #e0e0e0;border-radius:10px;font-size:15px;margin-bottom:16px;transition:border-color .2s;outline:none}
input:focus{border-color:#c0392b}
button{background:linear-gradient(135deg,#c0392b,#e67e22);color:#fff;border:none;padding:15px;border-radius:10px;font-size:16px;font-weight:bold;cursor:pointer;width:100%;letter-spacing:.5px;transition:opacity .2s}
button:hover{opacity:.9}
.error{background:#fdf0f0;border:1px solid #f5c6cb;color:#c0392b;padding:12px;border-radius:8px;margin-bottom:16px;font-size:13px}
.footer{margin-top:24px;color:#bbb;font-size:11px}
</style>
</head><body>
<div class="card">
  <img src="/logo.jpg" class="logo" alt="Ministry Logo">
  <h1>Admin Portal</h1>
  <p class="sub">${MINISTRY_NAME}</p>
  ${error ? `<div class="error">${error}</div>` : ""}
  <form method="POST">
    <input type="password" name="password" placeholder="Enter admin password" required autofocus>
    <button type="submit">Sign In</button>
  </form>
  <p class="footer">Restricted access — authorized personnel only</p>
</div>
</body></html>`;
}

function adminPage() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Admin Dashboard — ${MINISTRY_NAME}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Georgia,serif;background:#f0f0f0;min-height:100vh;padding:20px}
.wrap{max-width:1100px;margin:0 auto}
.header{background:linear-gradient(135deg,#c0392b 0%,#e67e22 60%,#f1c40f 100%);padding:20px 28px;border-radius:16px;color:#fff;margin-bottom:24px;display:flex;align-items:center;gap:16px;box-shadow:0 4px 20px rgba(192,57,43,0.25)}
.header img{width:56px;height:56px;border-radius:50%;object-fit:cover;border:3px solid rgba(255,255,255,0.6);flex-shrink:0}
.header-text{flex:1}
.header h1{font-size:20px;margin-bottom:2px}
.header p{opacity:.85;font-size:12px}
.logout{background:rgba(255,255,255,0.2);color:#fff;border:1.5px solid rgba(255,255,255,0.5);padding:8px 18px;border-radius:8px;font-size:13px;font-weight:bold;cursor:pointer;text-decoration:none;transition:background .2s;white-space:nowrap}
.logout:hover{background:rgba(255,255,255,0.35)}
.grid{display:grid;grid-template-columns:2fr 1fr;gap:20px}
@media(max-width:700px){.grid{grid-template-columns:1fr}}
.card{background:#fff;border-radius:14px;padding:22px;box-shadow:0 2px 14px rgba(0,0,0,0.07)}
.card h2{font-size:16px;margin-bottom:14px;color:#333;display:flex;align-items:center;gap:8px}
.badge{background:linear-gradient(135deg,#c0392b,#e67e22);color:#fff;font-size:11px;padding:3px 10px;border-radius:20px;font-weight:bold}
.sub{background:#f9f9f9;padding:12px;border-radius:10px;margin-bottom:8px;display:flex;gap:12px;align-items:center;border:1px solid #f0f0f0}
.avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#c0392b,#f1c40f);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:bold;font-size:16px;flex-shrink:0}
.info{flex:1;min-width:0}
.name{font-weight:600;color:#222;font-size:14px}
.meta{font-size:12px;color:#888;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:2px}
label{display:block;font-size:13px;font-weight:600;color:#555;margin-bottom:5px}
input,textarea{width:100%;padding:11px 13px;border:1.5px solid #e0e0e0;border-radius:9px;font-family:inherit;font-size:14px;margin-bottom:14px;outline:none;transition:border-color .2s}
input:focus,textarea:focus{border-color:#c0392b}
textarea{resize:vertical;min-height:110px}
button[type=submit]{background:linear-gradient(135deg,#c0392b,#e67e22);color:#fff;border:none;padding:14px;border-radius:10px;font-size:15px;font-weight:bold;cursor:pointer;width:100%;letter-spacing:.3px;transition:opacity .2s}
button[type=submit]:hover{opacity:.9}
button[type=submit]:disabled{opacity:.6;cursor:not-allowed}
.live-badge{display:inline-flex;align-items:center;gap:6px;background:#c0392b;color:#fff;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:bold}
.live-dot{width:8px;height:8px;border-radius:50%;background:#fff;animation:pulse 1.2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
video{width:100%;border-radius:10px;background:#000;max-height:220px}
.go-live-btn{background:linear-gradient(135deg,#c0392b,#e67e22);color:#fff;border:none;padding:13px;border-radius:10px;font-size:15px;font-weight:bold;cursor:pointer;width:100%;margin-top:8px}
.end-btn{background:#333;color:#fff;border:none;padding:13px;border-radius:10px;font-size:15px;font-weight:bold;cursor:pointer;width:100%;margin-top:8px}
.go-live-btn:disabled,.end-btn:disabled{opacity:.5;cursor:not-allowed}
</style>
</head><body><div class="wrap">

<div class="header">
  <img src="/logo.jpg" alt="Logo">
  <div class="header-text">
    <h1>Admin Dashboard</h1>
    <p>Manage subscribers and post ministry updates</p>
  </div>
  <a href="/logout" class="logout">Sign Out</a>
</div>

<div class="grid">
  <div class="card">
    <h2>Subscribers <span class="badge" id="cnt">0</span></h2>
    <div id="list"><div class="empty">Loading...</div></div>
  </div>
  <div style="display:flex;flex-direction:column;gap:20px">
    <div class="card">
      <h2>Go Live</h2>
      <div id="live-status" style="margin-bottom:12px;font-size:13px;color:#888">Not streaming</div>
      <video id="preview" autoplay muted playsinline style="display:none"></video>
      <label style="display:block;font-size:13px;font-weight:600;color:#555;margin:10px 0 5px">Stream Title</label>
      <input id="live-title" placeholder="e.g. Sunday Worship Service" style="width:100%;padding:11px 13px;border:1.5px solid #e0e0e0;border-radius:9px;font-size:14px;margin-bottom:10px">
      <label style="display:block;font-size:13px;font-weight:600;color:#555;margin-bottom:5px">Description (optional)</label>
      <input id="live-desc" placeholder="e.g. Join us for praise and worship" style="width:100%;padding:11px 13px;border:1.5px solid #e0e0e0;border-radius:9px;font-size:14px;margin-bottom:10px">
      <button class="go-live-btn" id="go-live-btn" onclick="startLive()">Start Live Stream</button>
      <button class="end-btn" id="end-live-btn" onclick="endLive()" style="display:none">End Stream</button>
      <div id="viewer-count" style="margin-top:10px;font-size:13px;color:#888;display:none">
        <span id="vc">0</span> viewers watching
      </div>
      <div id="chat-box" style="display:none;margin-top:14px;background:#f9f9f9;border-radius:10px;padding:10px;max-height:200px;overflow-y:auto;font-size:13px" id="chat-box"></div>
    </div>
    <div class="card">
      <h2>Post Update</h2>
      <form id="form">
        <label>Title</label>
        <input id="title" placeholder="e.g. Easter Revival Week Announced" required>
        <label>Message</label>
        <textarea id="msg" placeholder="Write your update here..." required></textarea>
        <label>Date (optional)</label>
        <input type="date" id="date">
        <div id="res"></div>
        <button type="submit" id="btn">Post Update &amp; Notify All Subscribers</button>
      </form>
    </div>
  </div>
</div>

<div class="card" style="margin-top:20px">
  <h2>Posted Updates <span class="badge" id="ucnt">0</span></h2>
  <div id="ulist"><div style="text-align:center;padding:30px;color:#bbb;font-size:14px">Loading...</div></div>
</div>

</div>
<script>
let subs=[];
let ws=null,pc=null,stream=null,viewers={};
let intentionalClose=false;
const WS='wss://towerintercessoryministry.towerintercessoryministry.workers.dev/stream';

async function startLive(){
  const title=document.getElementById('live-title').value||'Live Service';
  const desc=document.getElementById('live-desc').value||'';
  try{
    stream=await navigator.mediaDevices.getUserMedia({video:true,audio:true});
    const preview=document.getElementById('preview');
    preview.srcObject=stream;preview.style.display='block';
    intentionalClose=false;
    ws=new WebSocket(WS+'?role=broadcaster&title='+encodeURIComponent(title)+'&description='+encodeURIComponent(desc));
    ws.onopen=()=>{
      document.getElementById('live-status').innerHTML='<span class="live-badge"><span class="live-dot"></span>LIVE</span>';
      document.getElementById('go-live-btn').style.display='none';
      document.getElementById('end-live-btn').style.display='block';
      // Notify all subscribers by email
      fetch('/go-live',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title:title,description:desc})});
    };
    ws.onerror=(err)=>{
      console.error('WebSocket error',err);
      if(!intentionalClose){
        document.getElementById('live-status').textContent='Connection error — retrying...';
        setTimeout(()=>startLive(),3000);
      }
    };
    ws.onmessage=async(e)=>{
      const msg=JSON.parse(e.data);
      if(msg.type==='viewer-joined'){
        const vid=msg.viewerId;
        const p=new RTCPeerConnection({iceServers:[{urls:'stun:stun.l.google.com:19302'}]});
        viewers[vid]=p;
        stream.getTracks().forEach(t=>p.addTrack(t,stream));
        p.onicecandidate=(ev)=>{if(ev.candidate)ws.send(JSON.stringify({type:'ice-candidate',candidate:ev.candidate,viewerId:vid}));};
        const offer=await p.createOffer();
        await p.setLocalDescription(offer);
        ws.send(JSON.stringify({type:'offer',sdp:offer,viewerId:vid}));
      }
      if(msg.type==='answer'&&viewers[msg.viewerId]){
        await viewers[msg.viewerId].setRemoteDescription(new RTCSessionDescription(msg.sdp));
      }
      if(msg.type==='ice-candidate'&&viewers[msg.viewerId]){
        try{await viewers[msg.viewerId].addIceCandidate(new RTCIceCandidate(msg.candidate));}catch{}
      }
      if(msg.type==='viewer-left'&&viewers[msg.viewerId]){
        viewers[msg.viewerId].close();delete viewers[msg.viewerId];
      }
      if(msg.type==='viewer-count'){
        document.getElementById('vc').textContent=msg.count;
        document.getElementById('viewer-count').style.display='block';
      }
      if(msg.type==='chat'&&msg.comment){
        addComment(msg.comment);
      }
    };
    ws.onclose=(e)=>{
      if(intentionalClose) return; // admin clicked End Stream — already handled
      // Unexpected close — reset UI and show error
      document.getElementById('live-status').textContent='Disconnected (code '+e.code+')';
      document.getElementById('go-live-btn').style.display='block';
      document.getElementById('end-live-btn').style.display='none';
      document.getElementById('preview').style.display='none';
      document.getElementById('viewer-count').style.display='none';
    };
  }catch(err){alert('Camera access denied or error: '+err.message);}
}

function addComment(c){
  const box=document.getElementById('chat-box');
  box.style.display='block';
  const t=new Date(c.time).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
  box.innerHTML+='<div style="margin-bottom:6px"><span style="font-weight:600;color:#c0392b">'+c.name+'</span> <span style="color:#aaa;font-size:11px">'+t+'</span><br>'+c.text+'</div>';
  box.scrollTop=box.scrollHeight;
}

function endLive(){
  intentionalClose=true;
  if(ws){ws.send(JSON.stringify({type:'end-stream'}));ws.close();}
  if(stream)stream.getTracks().forEach(t=>t.stop());
  Object.values(viewers).forEach(p=>p.close());
  viewers={};stream=null;ws=null;
  document.getElementById('preview').style.display='none';
  document.getElementById('preview').srcObject=null;
  document.getElementById('live-status').textContent='Not streaming';
  document.getElementById('go-live-btn').style.display='block';
  document.getElementById('end-live-btn').style.display='none';
  document.getElementById('viewer-count').style.display='none';
  document.getElementById('chat-box').style.display='none';
  document.getElementById('chat-box').innerHTML='';
}

async function load(){
  const r=await fetch('/subscribers');
  const d=await r.json();
  subs=d.subscribers||[];
  document.getElementById('cnt').textContent=subs.length;
  const el=document.getElementById('list');
  if(!subs.length){el.innerHTML='<div style="text-align:center;padding:40px;color:#bbb">No subscribers yet.</div>';return;}
  el.innerHTML=subs.map(s=>'<div class="sub"><div class="avatar">'+s.full_name[0].toUpperCase()+'</div><div class="info"><div class="name">'+s.full_name+'</div><div class="meta">'+s.email+' &nbsp;·&nbsp; '+s.whatsapp+' &nbsp;·&nbsp; '+s.location+'</div></div></div>').join('');
}

async function loadUpdates(){
  const r=await fetch('/updates');
  const d=await r.json();
  const updates=d.updates||[];
  document.getElementById('ucnt').textContent=updates.length;
  const el=document.getElementById('ulist');
  if(!updates.length){el.innerHTML='<div style="text-align:center;padding:30px;color:#bbb;font-size:14px">No updates posted yet.</div>';return;}
  el.innerHTML=updates.map(u=>\`
    <div id="upd-\${u.id}" style="background:#f9f9f9;border-radius:10px;padding:14px;margin-bottom:10px;border:1px solid #eee">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
        <div style="flex:1;min-width:0">
          <div style="font-weight:600;color:#222;font-size:14px">\${u.title}</div>
          <div style="font-size:12px;color:#aaa;margin-top:2px">\${u.date}</div>
          <div style="font-size:13px;color:#666;margin-top:6px;line-height:1.5">\${u.content}</div>
        </div>
        <div style="display:flex;gap:6px;flex-shrink:0">
          <button onclick="editUpdate(\${u.id},'\${encodeURIComponent(u.title)}','\${encodeURIComponent(u.content)}','\${u.date}')"
            style="background:#e67e22;color:#fff;border:none;padding:6px 12px;border-radius:7px;font-size:12px;font-weight:bold;cursor:pointer">Edit</button>
          <button onclick="deleteUpdate(\${u.id})"
            style="background:#c0392b;color:#fff;border:none;padding:6px 12px;border-radius:7px;font-size:12px;font-weight:bold;cursor:pointer">Delete</button>
        </div>
      </div>
    </div>\`).join('');
}

async function deleteUpdate(id){
  if(!confirm('Delete this update?'))return;
  await fetch('/updates/'+id,{method:'DELETE'});
  loadUpdates();
}

function editUpdate(id,title,content,date){
  const t=decodeURIComponent(title);
  const c=decodeURIComponent(content);
  document.getElementById('upd-'+id).innerHTML=\`
    <div style="display:flex;flex-direction:column;gap:8px">
      <input id="et-\${id}" value="\${t.replace(/"/g,'&quot;')}" style="padding:9px;border:1.5px solid #e0e0e0;border-radius:8px;font-size:14px">
      <textarea id="ec-\${id}" rows="3" style="padding:9px;border:1.5px solid #e0e0e0;border-radius:8px;font-size:14px;resize:vertical">\${c}</textarea>
      <input type="date" id="ed-\${id}" value="\${date}" style="padding:9px;border:1.5px solid #e0e0e0;border-radius:8px;font-size:14px">
      <div style="display:flex;gap:8px">
        <button onclick="saveUpdate(\${id})" style="background:linear-gradient(135deg,#c0392b,#e67e22);color:#fff;border:none;padding:9px 18px;border-radius:8px;font-size:13px;font-weight:bold;cursor:pointer">Save & Notify Subscribers</button>
        <button onclick="loadUpdates()" style="background:#eee;color:#333;border:none;padding:9px 14px;border-radius:8px;font-size:13px;cursor:pointer">Cancel</button>
      </div>
    </div>\`;
}

async function saveUpdate(id){
  const title=document.getElementById('et-'+id).value;
  const content=document.getElementById('ec-'+id).value;
  const date=document.getElementById('ed-'+id).value||new Date().toDateString();
  const r=await fetch('/updates/'+id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({title,content,date})});
  const d=await r.json();
  if(d.success)alert('Updated! Notified '+d.sent+' subscribers.');
  loadUpdates();
}
document.getElementById('form').onsubmit=async(e)=>{
  e.preventDefault();
  const btn=document.getElementById('btn');
  btn.disabled=true;btn.textContent='Posting & notifying '+subs.length+' subscribers...';
  document.getElementById('res').innerHTML='';
  const r=await fetch('/notify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title:document.getElementById('title').value,content:document.getElementById('msg').value,date:document.getElementById('date').value||new Date().toDateString()})});
  const d=await r.json();
  btn.disabled=false;btn.textContent='Post Update & Notify All Subscribers';
  if(d.success){document.getElementById('res').innerHTML='<div class="ok">&#10003; Update posted! Emails sent to '+d.sent+'/'+d.total+' subscribers.'+(d.failed?' ('+d.failed+' failed)':'')+'</div>';document.getElementById('title').value='';document.getElementById('msg').value='';document.getElementById('date').value='';}
};
load();loadUpdates();
</script></body></html>`;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { method, url } = request;
    const { pathname } = new URL(url);
    const cookies = request.headers.get("Cookie") || "";

    if (method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }

    // Logout — clear session cookie
    if (pathname === "/logout") {
      return new Response(null, {
        status: 302,
        headers: {
          "Location": "/admin",
          "Set-Cookie": "admin_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0",
        },
      });
    }

    // Admin login and dashboard
    if (pathname === "/admin") {
      if (method === "POST") {
        const form = await request.formData();
        if (form.get("password") === env.ADMIN_PASSWORD) {
          return new Response(null, {
            status: 302,
            headers: {
              "Location": "/admin",
              "Set-Cookie": "admin_session=true; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400"
            }
          });
        }
        return htmlRes(loginPage("Invalid password. Try again."));
      }
      
      if (!cookies.includes("admin_session=true")) {
        return htmlRes(loginPage());
      }
      
      return htmlRes(adminPage());
    }

    // POST /subscribe
    if (method === "POST" && pathname === "/subscribe") {
      let body: Record<string, string>;
      try {
        body = await request.json();
      } catch {
        return json({ error: "Invalid JSON body" }, 400);
      }

      const { full_name, email, whatsapp, location } = body;

      if (!full_name || !email || !whatsapp || !location) {
        return json({ error: "All fields are required: full_name, email, whatsapp, location" }, 400);
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return json({ error: "Invalid email address" }, 400);
      }

      try {
        await env.DB.prepare(
          `INSERT INTO subscribers (full_name, email, whatsapp, location) VALUES (?, ?, ?, ?)`
        ).bind(full_name.trim(), email.trim().toLowerCase(), whatsapp.trim(), location.trim()).run();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes("UNIQUE constraint failed") || msg.includes("UNIQUE")) {
          return json({ error: "This email is already subscribed." }, 409);
        }
        return json({ error: "Something went wrong. Please try again." }, 500);
      }

      // Send welcome email (non-blocking)
      try {
        await sendEmail(
          env.QSSN_API_KEY,
          email.trim().toLowerCase(),
          `Welcome to ${MINISTRY_NAME}!`,
          welcomeHtml(full_name.trim())
        );
      } catch { /* email failure should not block subscription */ }

      return json({ success: true, message: "Thank you for subscribing! God bless you." }, 201);
    }

    // GET /subscribers — list all (admin)
    if (method === "GET" && pathname === "/subscribers") {
      const { results } = await env.DB.prepare(
        "SELECT id, full_name, email, whatsapp, location, subscribed_at FROM subscribers ORDER BY subscribed_at DESC"
      ).all();
      return json({ subscribers: results });
    }

    // GET /updates — fetch all posted updates for the frontend
    if (method === "GET" && pathname === "/updates") {
      const { results } = await env.DB.prepare(
        "SELECT id, title, content, date, created_at FROM updates ORDER BY created_at DESC"
      ).all();
      return json({ updates: results });
    }

    // POST /notify — save update to DB + broadcast email to all subscribers
    if (method === "POST" && pathname === "/notify") {
      let body: Record<string, string>;
      try {
        body = await request.json();
      } catch {
        return json({ error: "Invalid JSON body" }, 400);
      }

      const { title, content, date } = body;
      if (!title || !content) {
        return json({ error: "title and content are required" }, 400);
      }

      const postDate = date || new Date().toDateString();

      // Save update to DB so it appears on the Updates page
      await env.DB.prepare(
        "INSERT INTO updates (title, content, date) VALUES (?, ?, ?)"
      ).bind(title, content, postDate).run();

      const { results } = await env.DB.prepare(
        "SELECT email, full_name FROM subscribers"
      ).all() as { results: { email: string; full_name: string }[] };

      let sent = 0;
      let failed = 0;
      for (const sub of results) {
        const ok = await sendEmail(
          env.QSSN_API_KEY,
          sub.email,
          title,
          updateHtml(title, content, postDate)
        );
        ok ? sent++ : failed++;
      }

      return json({ success: true, sent, failed, total: results.length });
    }

    // POST /contact — visitor message forwarded to ministry email
    if (method === "POST" && pathname === "/contact") {
      let body: Record<string, string>;
      try { body = await request.json(); } catch { return json({ error: "Invalid JSON" }, 400); }

      const { full_name, email, message } = body;
      if (!full_name || !email || !message) {
        return json({ error: "All fields are required" }, 400);
      }

      const html = `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
          <div style="background:linear-gradient(135deg,#c0392b,#e67e22,#f1c40f);padding:32px;text-align:center">
            <h1 style="color:#fff;margin:0;font-size:22px">${MINISTRY_NAME}</h1>
            <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:13px">New Contact Message from Website</p>
          </div>
          <div style="padding:32px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#888;font-size:13px;width:120px">From</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#222;font-size:14px;font-weight:bold">${full_name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#888;font-size:13px">Email</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#222;font-size:14px"><a href="mailto:${email}" style="color:#c0392b">${email}</a></td></tr>
            </table>
            <div style="margin-top:24px;background:#f9f9f9;border-left:4px solid #c0392b;padding:16px 20px;border-radius:0 8px 8px 0">
              <p style="margin:0;color:#333;font-size:15px;line-height:1.7">${message}</p>
            </div>
            <p style="margin-top:24px;color:#aaa;font-size:12px;text-align:center">Sent via the contact form on the ${MINISTRY_NAME} website</p>
          </div>
        </div>`;

      const ok = await sendEmail(
        env.QSSN_API_KEY,
        "towerintercessoryministry@gmail.com",
        `New Message from ${full_name} - Website Contact Form`,
        html
      );

      if (!ok) return json({ error: "Failed to send message. Please try again." }, 500);
      return json({ success: true, message: "Your message has been sent. We'll get back to you soon. God bless!" }, 200);
    }

    // POST /go-live — notify all subscribers that stream has started
    if (method === "POST" && pathname === "/go-live") {
      let body: Record<string, string>;
      try { body = await request.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
      const { title, description } = body;

      const { results } = await env.DB.prepare(
        "SELECT email, full_name FROM subscribers"
      ).all() as { results: { email: string; full_name: string }[] };

      const liveHtml = (name: string) => `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
          <div style="background:linear-gradient(135deg,#c0392b,#e67e22,#f1c40f);padding:40px 32px;text-align:center">
            <h1 style="color:#fff;margin:0;font-size:26px">${MINISTRY_NAME}</h1>
            <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.2);padding:6px 16px;border-radius:20px;margin-top:12px">
              <span style="width:10px;height:10px;border-radius:50%;background:#fff;display:inline-block"></span>
              <span style="color:#fff;font-weight:bold;font-size:14px;letter-spacing:1px">LIVE NOW</span>
            </div>
          </div>
          <div style="padding:36px 32px;text-align:center">
            <h2 style="color:#1a1a1a;font-size:22px;margin-bottom:8px">We are Live, ${name}!</h2>
            <h3 style="color:#c0392b;font-size:18px;margin-bottom:12px">${title || "Live Service"}</h3>
            ${description ? `<p style="color:#555;line-height:1.7;margin-bottom:24px">${description}</p>` : ""}
            <a href="https://towerintercessoryministry.towerintercessoryministry.workers.dev/live"
               style="display:inline-block;background:linear-gradient(135deg,#c0392b,#e67e22);color:#fff;text-decoration:none;padding:16px 40px;border-radius:50px;font-size:16px;font-weight:bold;box-shadow:0 4px 14px rgba(192,57,43,0.35)">
              Watch Live Now
            </a>
            <div style="margin-top:32px;padding-top:24px;border-top:1px solid #eee;color:#999;font-size:12px">
              <p>${MINISTRY_NAME} · Massajja, Wakiso District, Kampala, Uganda</p>
            </div>
          </div>
        </div>`;

      let sent = 0, failed = 0;
      for (const sub of results) {
        const ok = await sendEmail(
          env.QSSN_API_KEY,
          sub.email,
          `We are LIVE now - ${title || "Live Service"} | ${MINISTRY_NAME}`,
          liveHtml(sub.full_name)
        );
        ok ? sent++ : failed++;
      }

      return json({ success: true, sent, failed, total: results.length });
    }

    // DELETE /updates/:id — delete an update (no subscriber notification)
    const deleteMatch = pathname.match(/^\/updates\/(\d+)$/);
    if (method === "DELETE" && deleteMatch) {
      const id = parseInt(deleteMatch[1]);
      await env.DB.prepare("DELETE FROM updates WHERE id = ?").bind(id).run();
      return json({ success: true });
    }

    // PUT /updates/:id — edit an update and notify subscribers
    const editMatch = pathname.match(/^\/updates\/(\d+)$/);
    if (method === "PUT" && editMatch) {
      const id = parseInt(editMatch[1]);
      let body: Record<string, string>;
      try { body = await request.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
      const { title, content, date } = body;
      if (!title || !content) return json({ error: "title and content required" }, 400);

      await env.DB.prepare("UPDATE updates SET title=?, content=?, date=? WHERE id=?")
        .bind(title, content, date || new Date().toDateString(), id).run();

      // Notify subscribers of the updated post
      const { results } = await env.DB.prepare("SELECT email, full_name FROM subscribers").all() as { results: { email: string; full_name: string }[] };
      let sent = 0, failed = 0;
      for (const sub of results) {
        const ok = await sendEmail(env.QSSN_API_KEY, sub.email, `Updated: ${title}`,
          updateHtml(title, content, date || new Date().toDateString()));
        ok ? sent++ : failed++;
      }
      return json({ success: true, sent, failed });
    }

    // WebSocket signaling for live stream — proxied to Durable Object
    if (pathname === "/stream" || pathname === "/stream/status") {
      const id = env.STREAM_HUB.idFromName("main");
      const hub = env.STREAM_HUB.get(id);
      return hub.fetch(request);
    }

    return json({ error: "Not found" }, 404);
  },
};
