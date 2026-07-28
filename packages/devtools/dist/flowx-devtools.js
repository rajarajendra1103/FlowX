"use strict";var FlowXDevTools=(()=>{var c=Object.defineProperty;var g=Object.getOwnPropertyDescriptor;var u=Object.getOwnPropertyNames;var p=Object.prototype.hasOwnProperty;var m=(e,t)=>{for(var o in t)c(e,o,{get:t[o],enumerable:!0})},x=(e,t,o,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of u(t))!p.call(e,n)&&n!==o&&c(e,n,{get:()=>t[n],enumerable:!(i=g(t,n))||i.enumerable});return e};var b=e=>x(c({},"__esModule",{value:!0}),e);var h={};m(h,{FlowXDevTools:()=>l});var l={logs:[],initialized:!1,minimized:!1,visible:!1,init(){this.initialized||(this.initialized=!0,this.injectStyles(),this.createPanel(),this.bindEvents(),this.bindKeyboardShortcuts(),console.log("%c\u26A1 FlowX DevTools Mounted","color: #58a6ff; font-weight: bold; font-size: 1.1em;"))},injectStyles(){let e=document.createElement("style");e.id="flowx-devtools-styles",e.innerHTML=`
      #flowx-devtools-root {
        position: fixed;
        bottom: 76px;
        right: 20px;
        width: 380px;
        max-height: 500px;
        background: rgba(13, 17, 23, 0.85);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid rgba(240, 246, 252, 0.15);
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        color: #c9d1d9;
        font-family: ui-monospace, SFMono-Regular, SF Pro Mono, Menlo, monospace;
        font-size: 11px;
        z-index: 99999;
        display: none;
        flex-direction: column;
        overflow: hidden;
        transition: opacity 0.2s ease, transform 0.2s ease;
        opacity: 0;
        transform: translateY(10px);
      }
      #flowx-devtools-root.minimized {
        height: 36px;
        overflow: hidden;
      }
      #flowx-devtools-launcher {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: rgba(13, 17, 23, 0.85);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid rgba(240, 246, 252, 0.15);
        color: #58a6ff;
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        z-index: 99998;
        transition: transform 0.2s, background-color 0.2s;
      }
      #flowx-devtools-launcher:hover {
        background: rgba(22, 27, 34, 0.95);
        transform: scale(1.05);
      }
      #flowx-devtools-launcher.active {
        background: #58a6ff;
        color: #0d1117;
      }
      .fx-dt-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
        background: #161b22;
        border-bottom: 1px solid #30363d;
        cursor: pointer;
        user-select: none;
      }
      .fx-dt-title {
        font-weight: bold;
        color: #58a6ff;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .fx-dt-controls button {
        background: transparent;
        border: none;
        color: #8b949e;
        cursor: pointer;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: inherit;
        font-size: 11px;
      }
      .fx-dt-controls button:hover {
        color: #fff;
        background: #21262d;
      }
      .fx-dt-body {
        flex: 1;
        overflow-y: auto;
        padding: 8px;
        max-height: 400px;
      }
      .fx-dt-log-item {
        background: #161b22;
        border: 1px solid #21262d;
        border-radius: 6px;
        padding: 8px;
        margin-bottom: 6px;
        position: relative;
        transition: border-color 0.2s;
        cursor: pointer;
      }
      .fx-dt-log-item:hover {
        border-color: #58a6ff;
      }
      .fx-dt-badge {
        font-size: 9px;
        padding: 2px 5px;
        border-radius: 3px;
        font-weight: bold;
        text-transform: uppercase;
        color: #fff;
      }
      .fx-dt-badge.get { background: #1f6feb; }
      .fx-dt-badge.post { background: #238636; }
      .fx-dt-badge.put { background: #9a6700; }
      .fx-dt-badge.delete { background: #da3637; }
      
      .fx-dt-status {
        position: absolute;
        top: 8px;
        right: 8px;
        font-size: 9px;
        font-weight: bold;
      }
      .fx-dt-status.pending { color: #f0883e; }
      .fx-dt-status.success { color: #3fb950; }
      .fx-dt-status.error { color: #f85149; }

      .fx-dt-meta {
        margin-top: 6px;
        color: #8b949e;
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .fx-dt-empty {
        text-align: center;
        padding: 24px;
        color: #8b949e;
      }
      .fx-element-glow {
        outline: 2px dashed #58a6ff !important;
        outline-offset: 2px;
        transition: outline 0.1s ease-in-out;
      }
    `,document.head.appendChild(e)},createPanel(){let e=document.createElement("div");e.id="flowx-devtools-root",e.innerHTML=`
      <div class="fx-dt-header" id="fx-dt-header-click">
        <div class="fx-dt-title">\u26A1 FlowX Inspector</div>
        <div class="fx-dt-controls">
          <button id="fx-dt-clear">Clear</button>
          <button id="fx-dt-minimize">_</button>
        </div>
      </div>
      <div class="fx-dt-body" id="fx-dt-body">
        <div class="fx-dt-empty">No activity captured yet. Make requests using fx-get/post!</div>
      </div>
    `,document.body.appendChild(e);let t=document.createElement("button");t.id="flowx-devtools-launcher",t.innerHTML="\u26A1",t.title="Toggle FlowX DevTools (Alt+D)",document.body.appendChild(t),t.addEventListener("click",()=>this.togglePanel()),document.getElementById("fx-dt-header-click")?.addEventListener("click",o=>{o.target.id==="fx-dt-clear"||o.target.id==="fx-dt-minimize"||this.toggleMinimize()}),document.getElementById("fx-dt-clear")?.addEventListener("click",()=>{this.logs=[],this.render()}),document.getElementById("fx-dt-minimize")?.addEventListener("click",()=>{this.toggleMinimize()})},togglePanel(){let e=document.getElementById("flowx-devtools-root"),t=document.getElementById("flowx-devtools-launcher");e&&t&&(this.visible=!this.visible,t.classList.toggle("active",this.visible),e.classList.toggle("active",this.visible),this.visible?(e.style.display="flex",e.offsetHeight,e.style.opacity="1",e.style.transform="translateY(0)"):(e.style.opacity="0",e.style.transform="translateY(10px)",setTimeout(()=>{this.visible||(e.style.display="none")},200)))},toggleMinimize(){let e=document.getElementById("flowx-devtools-root"),t=document.getElementById("fx-dt-minimize");e&&t&&(this.minimized=!this.minimized,e.classList.toggle("minimized",this.minimized),t.textContent=this.minimized?"\u25A1":"_")},bindEvents(){let e=new Map;document.addEventListener("flowx:beforeRequest",t=>{let{element:o,target:i,request:n}=t.detail,r=Math.random().toString(36).substring(7);e.set(r,performance.now()),o._flowx_req_id=r;let d=o.id?`#${o.id}`:`${o.tagName.toLowerCase()}${o.className?"."+o.className.trim().split(/\s+/).join("."):""}`,s=i?.id?`#${i.id}`:`${i?.tagName.toLowerCase()||"body"}`,a=o.getAttribute("fx-swap")||o.getAttribute("data-fx-swap")||"innerHTML",f={id:r,method:o.getAttribute("fx-get")?"GET":o.getAttribute("fx-post")?"POST":o.getAttribute("fx-put")?"PUT":"DELETE",url:n||"",triggerSelector:d,targetSelector:s,strategy:a,status:"pending",timestamp:new Date().toLocaleTimeString()};this.logs.unshift(f),this.render()}),document.addEventListener("flowx:afterSwap",t=>{let{element:o,xhr:i}=t.detail,n=o._flowx_req_id;if(!n)return;let r=e.get(n),d=r?Math.round(performance.now()-r):void 0,s=this.logs.find(a=>a.id===n);s&&(s.status="success",s.duration=d,s.statusCode=i?.status),this.render()}),document.addEventListener("flowx:error",t=>{let{element:o,error:i}=t.detail,n=o._flowx_req_id;if(!n)return;let r=e.get(n),d=r?Math.round(performance.now()-r):void 0,s=this.logs.find(a=>a.id===n);s&&(s.status="error",s.duration=d,s.error=i?.message||"Network Error"),this.render()})},bindKeyboardShortcuts(){window.addEventListener("keydown",e=>{e.altKey&&(e.key==="d"||e.key==="D")&&(e.preventDefault(),this.togglePanel())})},render(){let e=document.getElementById("fx-dt-body");if(e){if(this.logs.length===0){e.innerHTML='<div class="fx-dt-empty">No activity captured yet.</div>';return}e.innerHTML=this.logs.map(t=>{let o=t.duration?`${t.duration}ms`:"",i=`<span class="fx-dt-status ${t.status}">${t.status==="success"?"200 OK":t.status==="error"?"ERR":"SENDING"}</span>`;return`
          <div class="fx-dt-log-item" data-id="${t.id}">
            <div>
              <span class="fx-dt-badge ${t.method.toLowerCase()}">${t.method}</span>
              <span style="font-weight: bold; margin-left: 6px;">${t.url}</span>
              ${i}
            </div>
            <div class="fx-dt-meta">
              <span>Time: <strong style="color: #8b949e">${t.timestamp}</strong></span>
              <span>Trigger: <strong style="color: #c9d1d9">${t.triggerSelector}</strong></span>
              <span>Target: <strong style="color: #c9d1d9">${t.targetSelector} (${t.strategy})</strong></span>
              ${o?`<span>Duration: <strong style="color: #58a6ff">${o}</strong></span>`:""}
              ${t.error?`<span style="color: #f85149">Error: ${t.error}</span>`:""}
            </div>
          </div>
        `}).join(""),e.querySelectorAll(".fx-dt-log-item").forEach(t=>{t.addEventListener("mouseenter",()=>{let o=t.getAttribute("data-id"),i=this.logs.find(n=>n.id===o);if(i)try{let n=document.querySelector(i.triggerSelector),r=document.querySelector(i.targetSelector);n?.classList.add("fx-element-glow"),r?.classList.add("fx-element-glow")}catch{}}),t.addEventListener("mouseleave",()=>{let o=t.getAttribute("data-id"),i=this.logs.find(n=>n.id===o);if(i)try{let n=document.querySelector(i.triggerSelector),r=document.querySelector(i.targetSelector);n?.classList.remove("fx-element-glow"),r?.classList.remove("fx-element-glow")}catch{}})})}}};if(typeof window<"u"){let e=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"||window.location.hostname==="",t=window.FLOWX_DEVTOOLS_FORCE;!e&&!t&&console.warn("FlowX Devtools loaded on what looks like a production domain \u2014 remove this script before deploying"),window.FlowX?document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>l.init()):l.init():console.warn("FlowX core not detected \u2014 devtools has nothing to inspect"),window.FlowXDevTools=l}return b(h);})();
//# sourceMappingURL=flowx-devtools.js.map