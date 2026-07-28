"use strict";var T=Object.defineProperty;var I=Object.getOwnPropertyDescriptor;var V=Object.getOwnPropertyNames;var O=Object.prototype.hasOwnProperty;var F=(h,e)=>{for(var s in e)T(h,s,{get:e[s],enumerable:!0})},W=(h,e,s,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of V(e))!O.call(h,o)&&o!==s&&T(h,o,{get:()=>e[o],enumerable:!(t=I(e,o))||t.enumerable});return h};var G=h=>W(T({},"__esModule",{value:!0}),h);var J={};F(J,{FlowXAreaChart:()=>k,FlowXBarChart:()=>v,FlowXBubbleChart:()=>D,FlowXChartBase:()=>c,FlowXDashboardWidget:()=>j,FlowXDonutChart:()=>M,FlowXFinancialChart:()=>S,FlowXGauge:()=>R,FlowXHeatmap:()=>E,FlowXKpiCard:()=>H,FlowXLineChart:()=>w,FlowXPieChart:()=>$,FlowXRadarChart:()=>C,FlowXScatterChart:()=>A,FlowXSparkline:()=>B,FlowXTreemap:()=>L});module.exports=G(J);var c=class extends HTMLElement{chartData={labels:[],datasets:[]};observer=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.readDataPayload(),this.setupLiveUpdateListeners(),this.setupLazyLoad(),this.renderChart()}refreshData(e){this.chartData=e,this.renderChart()}readDataPayload(){let e=this.querySelector('script[type="application/json"]');if(e&&e.textContent)try{this.chartData=JSON.parse(e.textContent.trim());return}catch(t){console.error("FlowX Charts: Failed to parse JSON data island",t)}let s=this.getAttribute("data");if(s)try{this.chartData=JSON.parse(s);return}catch(t){console.error("FlowX Charts: Failed to parse data attribute",t)}}setupLazyLoad(){let e=this.getAttribute("fx-get"),s=this.getAttribute("fx-trigger")==="revealed";e&&s&&typeof IntersectionObserver<"u"&&(this.observer=new IntersectionObserver(t=>{t.forEach(o=>{o.isIntersecting&&(this.fetchChartData(e),this.observer?.disconnect())})}),this.observer.observe(this))}async fetchChartData(e){try{let t=await(await fetch(e)).json();this.refreshData(t)}catch(s){console.error(`FlowX Charts: Failed to fetch data from ${e}`,s)}}setupLiveUpdateListeners(){this.addEventListener("fx:afterSwap",()=>{this.readDataPayload(),this.renderChart()}),document.addEventListener("fx:sse-message",e=>{let s=e.detail;if(s&&(s.target===`#${this.id}`||s.target===this.id||this.hasAttribute("fx-sse-connect"))&&s.data)try{let t=typeof s.data=="string"?JSON.parse(s.data):s.data;this.refreshData(t)}catch{}})}generateAccessibilityAttrs(e,s){let t=`${e}. ${s}`;return this.setAttribute("role","img"),this.setAttribute("aria-label",t),{ariaLabel:t}}};var v=class extends c{renderChart(){if(!this.shadowRoot)return;let e=this.chartData.labels||["A","B","C","D","E"],s=this.chartData.datasets?.[0]||{data:[12,19,3,5,2],color:"#0066cc"},t=s.data||[],o=Math.max(...t,1),r=s.color||"var(--flowx-primary, #0066cc)",a=400,i=200,n=30,d=a-n*2,l=i-n*2,m=Math.max(12,d/t.length-8),f=t.map((g,x)=>{let u=g/o*l,y=n+x*(d/t.length)+4,b=i-n-u;return`
        <rect x="${y}" y="${b}" width="${m}" height="${u}" fill="${r}" rx="3">
          <title>${e[x]||""}: ${g}</title>
        </rect>
        <text x="${y+m/2}" y="${i-10}" fill="#8b949e" font-size="10" text-anchor="middle">${e[x]||""}</text>
      `}).join(""),p=`Bar chart titled ${s.label||"Data"} showing values ${t.join(", ")}`;this.generateAccessibilityAttrs("Bar Chart",p),this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; font-family: system-ui, sans-serif; width: 100%; }
        svg { width: 100%; height: auto; display: block; }
      </style>
      <svg viewBox="0 0 ${a} ${i}">
        <line x1="${n}" y1="${i-n}" x2="${a-n}" y2="${i-n}" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
        ${f}
      </svg>
    `}};customElements.get("flowx-bar-chart")||customElements.define("flowx-bar-chart",v);var w=class extends c{renderChart(){if(!this.shadowRoot)return;let e=this.chartData.labels||["Jan","Feb","Mar","Apr","May"],s=this.chartData.datasets?.[0]||{data:[10,25,18,30,42],color:"#3fb950"},t=s.data||[],o=Math.max(...t,1),r=s.color||"var(--flowx-success, #3fb950)",a=400,i=200,n=30,d=a-n*2,l=i-n*2,m=t.map((x,u)=>{let y=n+u/Math.max(1,t.length-1)*d,b=i-n-x/o*l;return{x:y,y:b,val:x,label:e[u]}}),f=m.map(x=>`${x.x},${x.y}`).join(" "),p=m.map(x=>`
      <circle cx="${x.x}" cy="${x.y}" r="4" fill="${r}">
        <title>${x.label||""}: ${x.val}</title>
      </circle>
    `).join(""),g=`Line chart showing trend values ${t.join(", ")}`;this.generateAccessibilityAttrs("Line Chart",g),this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; font-family: system-ui, sans-serif; width: 100%; }
        svg { width: 100%; height: auto; display: block; }
      </style>
      <svg viewBox="0 0 ${a} ${i}">
        <line x1="${n}" y1="${i-n}" x2="${a-n}" y2="${i-n}" stroke="rgba(255,255,255,0.15)" />
        <polyline points="${f}" fill="none" stroke="${r}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        ${p}
      </svg>
    `}};customElements.get("flowx-line-chart")||customElements.define("flowx-line-chart",w);var k=class extends c{renderChart(){if(!this.shadowRoot)return;let e=this.chartData.datasets?.[0]||{data:[5,15,25,20,35],color:"#58a6ff"},s=e.data||[],t=Math.max(...s,1),o=e.color||"#58a6ff",r=400,a=200,i=30,n=r-i*2,d=a-i*2,l=s.map((f,p)=>{let g=i+p/Math.max(1,s.length-1)*n,x=a-i-f/t*d;return{x:g,y:x}}),m=`
      M ${i},${a-i}
      ${l.map(f=>`L ${f.x},${f.y}`).join(" ")}
      L ${r-i},${a-i} Z
    `;this.generateAccessibilityAttrs("Area Chart",`Area chart with values ${s.join(", ")}`),this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; font-family: system-ui, sans-serif; width: 100%; }
        svg { width: 100%; height: auto; display: block; }
      </style>
      <svg viewBox="0 0 ${r} ${a}">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${o}" stop-opacity="0.4" />
            <stop offset="100%" stop-color="${o}" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        <path d="${m}" fill="url(#areaGrad)" />
        <polyline points="${l.map(f=>`${f.x},${f.y}`).join(" ")}" fill="none" stroke="${o}" stroke-width="2.5" />
      </svg>
    `}};customElements.get("flowx-area-chart")||customElements.define("flowx-area-chart",k);var $=class extends c{renderChart(){if(!this.shadowRoot)return;let e=this.chartData.series||[{name:"Direct",value:40,color:"#0066cc"},{name:"Organic",value:35,color:"#2ea043"},{name:"Referral",value:25,color:"#db6d28"}],s=e.reduce((r,a)=>r+a.value,0)||1,t=0,o=e.map(r=>{let a=r.value/s*360,i=t+a,n=this.getSectorPath(100,100,80,t,i);return t=i,`<path d="${n}" fill="${r.color||"#0066cc"}"><title>${r.name}: ${r.value}</title></path>`}).join("");this.generateAccessibilityAttrs("Pie Chart",`Pie chart showing ${e.map(r=>`${r.name}: ${r.value}`).join(", ")}`),this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; font-family: system-ui, sans-serif; width: 100%; }
        svg { width: 100%; height: auto; max-width: 240px; display: block; margin: 0 auto; }
      </style>
      <svg viewBox="0 0 200 200">
        ${o}
      </svg>
    `}getSectorPath(e,s,t,o,r){let a=f=>(f-90)*(Math.PI/180),i=e+t*Math.cos(a(o)),n=s+t*Math.sin(a(o)),d=e+t*Math.cos(a(r)),l=s+t*Math.sin(a(r)),m=r-o>180?1:0;return`M ${e},${s} L ${i},${n} A ${t},${t} 0 ${m},1 ${d},${l} Z`}};customElements.get("flowx-pie-chart")||customElements.define("flowx-pie-chart",$);var M=class extends ${renderChart(){if(!this.shadowRoot)return;let e=this.chartData.series||[{name:"Mobile",value:60,color:"#1f6feb"},{name:"Desktop",value:40,color:"#3fb950"}],s=e.reduce((r,a)=>r+a.value,0)||1,t=0,o=e.map(r=>{let a=r.value/s*360,i=t+a,n=this.getSectorPath(100,100,80,t,i);return t=i,`<path d="${n}" fill="${r.color||"#1f6feb"}"><title>${r.name}: ${r.value}</title></path>`}).join("");this.generateAccessibilityAttrs("Donut Chart",`Donut chart total ${s}`),this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; font-family: system-ui, sans-serif; width: 100%; }
        svg { width: 100%; height: auto; max-width: 240px; display: block; margin: 0 auto; }
      </style>
      <svg viewBox="0 0 200 200">
        ${o}
        <circle cx="100" cy="100" r="50" fill="#161b22" />
        <text x="100" y="105" fill="#e6edf3" font-size="16" font-weight="bold" text-anchor="middle">${s}</text>
      </svg>
    `}};customElements.get("flowx-donut-chart")||customElements.define("flowx-donut-chart",M);var C=class extends c{renderChart(){if(!this.shadowRoot)return;let e=this.chartData.values||[80,65,90,75,85],s=this.chartData.labels||["Speed","Power","Agility","Stamina","Skill"],t=100,o=e.length,r=120,a=120,i=80,d=e.map((l,m)=>{let f=m/o*(Math.PI*2)-Math.PI/2,p=l/t*i;return{x:r+p*Math.cos(f),y:a+p*Math.sin(f)}}).map(l=>`${l.x},${l.y}`).join(" ");this.generateAccessibilityAttrs("Radar Chart",`Radar chart with scores ${e.join(", ")}`),this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; font-family: system-ui, sans-serif; width: 100%; }
        svg { width: 100%; height: auto; max-width: 260px; display: block; margin: 0 auto; }
      </style>
      <svg viewBox="0 0 240 240">
        <circle cx="${r}" cy="${a}" r="${i}" fill="none" stroke="rgba(255,255,255,0.15)" stroke-dasharray="4,4" />
        <circle cx="${r}" cy="${a}" r="${i*.5}" fill="none" stroke="rgba(255,255,255,0.1)" />
        <polygon points="${d}" fill="rgba(0,102,204,0.35)" stroke="#0066cc" stroke-width="2" />
      </svg>
    `}};customElements.get("flowx-radar-chart")||customElements.define("flowx-radar-chart",C);var A=class extends c{renderChart(){if(!this.shadowRoot)return;let e=this.chartData.points||[{x:10,y:20},{x:25,y:45},{x:40,y:30},{x:55,y:70},{x:70,y:60}],s=400,t=200,o=30,r=e.map(a=>{let i=o+a.x/100*(s-o*2),n=t-o-a.y/100*(t-o*2);return`<circle cx="${i}" cy="${n}" r="5" fill="#58a6ff"><title>(${a.x}, ${a.y})</title></circle>`}).join("");this.generateAccessibilityAttrs("Scatter Chart",`Scatter plot with ${e.length} data points`),this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; font-family: system-ui, sans-serif; width: 100%; }
        svg { width: 100%; height: auto; display: block; }
      </style>
      <svg viewBox="0 0 ${s} ${t}">
        <line x1="${o}" y1="${t-o}" x2="${s-o}" y2="${t-o}" stroke="rgba(255,255,255,0.15)" />
        <line x1="${o}" y1="${o}" x2="${o}" y2="${t-o}" stroke="rgba(255,255,255,0.15)" />
        ${r}
      </svg>
    `}};customElements.get("flowx-scatter-chart")||customElements.define("flowx-scatter-chart",A);var D=class extends c{renderChart(){if(!this.shadowRoot)return;let e=this.chartData.bubbles||[{x:15,y:30,r:12,color:"#0066cc"},{x:35,y:65,r:22,color:"#3fb950"},{x:60,y:40,r:16,color:"#db6d28"},{x:80,y:75,r:28,color:"#a371f7"}],s=400,t=200,o=30,r=e.map(a=>{let i=o+a.x/100*(s-o*2),n=t-o-a.y/100*(t-o*2);return`<circle cx="${i}" cy="${n}" r="${a.r}" fill="${a.color||"#0066cc"}" opacity="0.75"><title>Value: ${a.r}</title></circle>`}).join("");this.generateAccessibilityAttrs("Bubble Chart",`Bubble plot with ${e.length} bubbles`),this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; font-family: system-ui, sans-serif; width: 100%; }
        svg { width: 100%; height: auto; display: block; }
      </style>
      <svg viewBox="0 0 ${s} ${t}">
        <line x1="${o}" y1="${t-o}" x2="${s-o}" y2="${t-o}" stroke="rgba(255,255,255,0.15)" />
        ${r}
      </svg>
    `}};customElements.get("flowx-bubble-chart")||customElements.define("flowx-bubble-chart",D);var E=class extends c{renderChart(){if(!this.shadowRoot)return;let e=this.chartData.matrix||[[1,3,5,2,4],[2,5,8,4,3],[4,7,9,6,2]],s=e.length,t=e[0]?.length||1,o=50,r=30,a=t*o+10,i=s*r+10,n="";for(let d=0;d<s;d++)for(let l=0;l<t;l++){let m=e[d][l],f=m/10;n+=`
          <rect x="${l*o+5}" y="${d*r+5}" width="${o-2}" height="${r-2}" 
            fill="#0066cc" opacity="${Math.max(.1,f)}" rx="3">
            <title>Value: ${m}</title>
          </rect>
        `}this.generateAccessibilityAttrs("Heatmap",`Heatmap grid ${s}x${t}`),this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; font-family: system-ui, sans-serif; width: 100%; }
        svg { width: 100%; height: auto; max-width: 320px; display: block; }
      </style>
      <svg viewBox="0 0 ${a} ${i}">
        ${n}
      </svg>
    `}};customElements.get("flowx-heatmap")||customElements.define("flowx-heatmap",E);var L=class extends c{renderChart(){if(!this.shadowRoot)return;let e=this.chartData.tiles||[{name:"Core",value:45,color:"#0066cc"},{name:"UI",value:30,color:"#3fb950"},{name:"Docs",value:15,color:"#db6d28"},{name:"Utils",value:10,color:"#a371f7"}],s=400,t=200,o=0,r=e.map(a=>{let i=a.value/100*s,n=o;return o+=i,`
        <rect x="${n}" y="0" width="${i-2}" height="${t}" fill="${a.color||"#0066cc"}" rx="4">
          <title>${a.name}: ${a.value}%</title>
        </rect>
        <text x="${n+i/2}" y="${t/2}" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">${a.name}</text>
      `}).join("");this.generateAccessibilityAttrs("Treemap",`Treemap layout with ${e.length} tiles`),this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; font-family: system-ui, sans-serif; width: 100%; }
        svg { width: 100%; height: auto; display: block; }
      </style>
      <svg viewBox="0 0 ${s} ${t}">
        ${r}
      </svg>
    `}};customElements.get("flowx-treemap")||customElements.define("flowx-treemap",L);var R=class extends c{renderChart(){if(!this.shadowRoot)return;let e=this.chartData.value??72,s=this.chartData.zones||[{min:0,max:50,color:"#3fb950"},{min:50,max:80,color:"#d29922"},{min:80,max:100,color:"#f85149"}],t=100,o=100,r=70,a=s.find(f=>e>=f.min&&e<=f.max)||s[s.length-1],i=a?a.color:"#0066cc",d=(e/100*180-180)*(Math.PI/180),l=t+r*Math.cos(d),m=o+r*Math.sin(d);this.generateAccessibilityAttrs("Gauge",`Gauge reading ${e}%`),this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; font-family: system-ui, sans-serif; width: 100%; }
        svg { width: 100%; height: auto; max-width: 200px; display: block; margin: 0 auto; }
      </style>
      <svg viewBox="0 0 200 120">
        <!-- Background Track -->
        <path d="M 30,100 A 70,70 0 0,1 170,100" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="14" stroke-linecap="round" />
        <!-- Arc Value Fill -->
        <line x1="${t}" y1="${o}" x2="${l}" y2="${m}" stroke="${i}" stroke-width="4" stroke-linecap="round" />
        <circle cx="${t}" cy="${o}" r="6" fill="${i}" />
        <text x="${t}" y="${o+16}" fill="#e6edf3" font-size="18" font-weight="bold" text-anchor="middle">${e}%</text>
      </svg>
    `}};customElements.get("flowx-gauge")||customElements.define("flowx-gauge",R);var B=class extends c{renderChart(){if(!this.shadowRoot)return;let e=this.chartData.values||[4,8,5,10,7,12,9,15],s=Math.max(...e,1),t=Math.min(...e,0),o=120,r=30,a=e.map((i,n)=>{let d=n/Math.max(1,e.length-1)*o,l=r-(i-t)/Math.max(1,s-t)*r;return`${d.toFixed(1)},${l.toFixed(1)}`}).join(" ");this.generateAccessibilityAttrs("Sparkline",`Inline sparkline values ${e.join(", ")}`),this.shadowRoot.innerHTML=`
      <style>
        :host { display: inline-block; vertical-align: middle; width: 120px; height: 30px; }
        svg { width: 100%; height: 100%; display: block; }
      </style>
      <svg viewBox="0 0 ${o} ${r}">
        <polyline points="${a}" fill="none" stroke="var(--flowx-primary, #0066cc)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    `}};customElements.get("flowx-sparkline")||customElements.define("flowx-sparkline",B);var S=class extends c{renderChart(){if(!this.shadowRoot)return;let e=this.chartData.candles||[{open:100,high:112,low:95,close:110,volume:450},{open:110,high:115,low:102,close:105,volume:620},{open:105,high:120,low:104,close:118,volume:800},{open:118,high:125,low:115,close:122,volume:510}],s=400,t=200,o=30,r=s-o*2,a=t-o*2,i=Math.max(...e.map(l=>l.high)),n=Math.min(...e.map(l=>l.low)),d=e.map((l,m)=>{let p=l.close>=l.open?"#3fb950":"#f85149",g=o+m*(r/e.length)+20,x=t-o-(l.high-n)/(i-n)*a,u=t-o-(l.low-n)/(i-n)*a,y=t-o-(l.open-n)/(i-n)*a,b=t-o-(l.close-n)/(i-n)*a,P=Math.min(y,b),z=Math.max(3,Math.abs(y-b));return`
        <line x1="${g}" y1="${x}" x2="${g}" y2="${u}" stroke="${p}" stroke-width="1.5" />
        <rect x="${g-6}" y="${P}" width="12" height="${z}" fill="${p}" rx="1">
          <title>Open: ${l.open}, High: ${l.high}, Low: ${l.low}, Close: ${l.close}</title>
        </rect>
      `}).join("");this.generateAccessibilityAttrs("Financial Candlestick Chart",`Financial chart showing ${e.length} candles`),this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; font-family: system-ui, sans-serif; width: 100%; }
        svg { width: 100%; height: auto; display: block; }
      </style>
      <svg viewBox="0 0 ${s} ${t}">
        <line x1="${o}" y1="${t-o}" x2="${s-o}" y2="${t-o}" stroke="rgba(255,255,255,0.15)" />
        ${d}
      </svg>
    `}};customElements.get("flowx-financial-chart")||customElements.define("flowx-financial-chart",S);var j=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){if(!this.shadowRoot)return;let e=this.getAttribute("title")||"Widget",s=this.getAttribute("fx-refresh");this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; font-family: system-ui, sans-serif; }
        .widget-card {
          background: #161b22; border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px; padding: 16px; box-sizing: border-box;
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        }
        .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .title { font-size: 14px; font-weight: 600; color: #e6edf3; }
        .refresh-btn {
          background: transparent; border: none; color: #8b949e;
          cursor: pointer; padding: 4px 6px; border-radius: 4px; font-size: 13px;
        }
        .refresh-btn:hover { color: #fff; background: rgba(255,255,255,0.08); }
      </style>
      <div class="widget-card">
        <div class="header">
          <span class="title">${e}</span>
          ${s?`<button type="button" class="refresh-btn" fx-get="${s}" fx-target="closest flowx-dashboard-widget">\u{1F504}</button>`:""}
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `}};customElements.get("flowx-dashboard-widget")||customElements.define("flowx-dashboard-widget",j);var H=class extends c{renderChart(){if(!this.shadowRoot)return;let e=this.getAttribute("label")||this.chartData.labels?.[0]||"Metric",s=this.chartData.value??12840,t=this.chartData.change??12.5,o=t>=0,r=o?"#3fb950":"#f85149",a=o?"\u2191":"\u2193";this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; font-family: system-ui, sans-serif; }
        .kpi-card {
          background: #161b22; border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px; padding: 16px; box-sizing: border-box;
        }
        .label { font-size: 12px; color: #8b949e; margin-bottom: 6px; }
        .val-row { display: flex; align-items: baseline; justify-content: space-between; }
        .value { font-size: 24px; font-weight: 700; color: #e6edf3; }
        .trend { font-size: 12px; font-weight: 600; color: ${r}; display: flex; align-items: center; gap: 2px; }
      </style>
      <div class="kpi-card">
        <div class="label">${e}</div>
        <div class="val-row">
          <div class="value">${typeof s=="number"?s.toLocaleString():s}</div>
          <div class="trend">${a} ${Math.abs(t)}%</div>
        </div>
      </div>
    `}};customElements.get("flowx-kpi-card")||customElements.define("flowx-kpi-card",H);0&&(module.exports={FlowXAreaChart,FlowXBarChart,FlowXBubbleChart,FlowXChartBase,FlowXDashboardWidget,FlowXDonutChart,FlowXFinancialChart,FlowXGauge,FlowXHeatmap,FlowXKpiCard,FlowXLineChart,FlowXPieChart,FlowXRadarChart,FlowXScatterChart,FlowXSparkline,FlowXTreemap});
//# sourceMappingURL=flowx-charts.js.map