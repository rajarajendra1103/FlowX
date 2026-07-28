#!/usr/bin/env node
"use strict";var u=Object.create;var p=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var h=Object.getOwnPropertyNames;var y=Object.getPrototypeOf,v=Object.prototype.hasOwnProperty;var S=(e,r,o,n)=>{if(r&&typeof r=="object"||typeof r=="function")for(let t of h(r))!v.call(e,t)&&t!==o&&p(e,t,{get:()=>r[t],enumerable:!(n=b(r,t))||n.enumerable});return e};var x=(e,r,o)=>(o=e!=null?u(y(e)):{},S(r||!e||!e.__esModule?p(o,"default",{value:e,enumerable:!0}):o,e));var m=require("commander"),l=x(require("fs")),s=x(require("path")),w=require("child_process"),d=new m.Command;function a(e){console.log(`\x1B[35m[create-flowx-app]\x1B[0m ${e}`)}function k(e){console.error(`\x1B[31m[create-flowx-app ERROR]\x1B[0m ${e}`)}d.name("create-flowx-app").description("Scaffold a beautiful FlowX starter project").argument("[project-directory]","Directory where the project should be scaffolded","my-flowx-app").option("-n, --npm","Install FlowX core package using npm dependencies",!1).action((e,r)=>{let o=s.default.resolve(process.cwd(),e),n=s.default.basename(o);a(`Scaffolding starter application in ${o}...`),l.default.existsSync(o)||l.default.mkdirSync(o,{recursive:!0});let t=s.default.resolve(__dirname,"../../core/dist/index.global.js"),c="flowx.js";if(l.default.existsSync(t)){let f=l.default.readFileSync(t,"utf-8");l.default.writeFileSync(s.default.join(o,"flowx.js"),f,"utf-8"),a("Embedded local flowx.js library bundle")}else c="https://unpkg.com/@flowx/core/dist/index.global.js",a("Warning: Core bundle not found. Defaulting to CDN script source.");let i={name:n,version:"1.0.0",description:"FlowX HTML-First Application",dependencies:r.npm?{"@flowx/core":"^1.0.0"}:{}};l.default.writeFileSync(s.default.join(o,"package.json"),JSON.stringify(i,null,2),"utf-8"),a("Created package.json");let g=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FlowX Application \u26A1</title>
  <link rel="stylesheet" href="style.css">
  <!-- Load FlowX CDN Scripting Library -->
  <script src="${c}"></script>
</head>
<body>
  <header>
    <div class="logo">FlowX Application \u26A1</div>
    <div class="tagline">Server-Rendered HTML-First UI Ecosystem</div>
  </header>

  <main class="container">
    <section class="card">
      <h3 class="card-title">\u26A1 Drop-In CDN Scripting</h3>
      <p class="card-desc">FlowX works directly in HTML templates with zero dev server or build step required.</p>
      
      <button 
        fx-get="https://httpbin.org/delay/1" 
        fx-trigger="click" 
        fx-target="#response-box" 
        fx-swap="innerHTML"
        class="btn btn-primary"
      >
        Fetch HTML Fragment
      </button>

      <div id="response-box" class="results-box" style="margin-top: 16px;">
        Click the button to query mock response...
      </div>
    </section>

    <section class="card">
      <h3 class="card-title">\u{1F4CA} Server-Rendered Data Chart</h3>
      <flowx-bar-chart>
        <script type="application/json">
          {
            "labels": ["Jan", "Feb", "Mar", "Apr"],
            "datasets": [{ "label": "Metrics", "data": [85, 120, 190, 240], "color": "#0066cc" }]
          }
        </script>
      </flowx-bar-chart>
    </section>
  </main>
</body>
</html>
`;if(l.default.writeFileSync(s.default.join(o,"index.html"),g,"utf-8"),a("Created index.html"),l.default.writeFileSync(s.default.join(o,"style.css"),`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

:root {
  --bg: #0b0f17;
  --panel: rgba(22, 30, 49, 0.45);
  --border: rgba(255, 255, 255, 0.08);
  --text: #f0f6fc;
  --text-muted: #8b949e;
  --primary: #58a6ff;
  --font: 'Plus Jakarta Sans', system-ui, sans-serif;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  margin: 0;
  padding: 0;
}

header {
  border-bottom: 1px solid var(--border);
  padding: 1.5rem 2rem;
  background: rgba(11, 15, 23, 0.7);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--primary);
}

.tagline {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.container {
  max-width: 700px;
  margin: 3rem auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.card {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
}

.card-desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin: 0 0 1.5rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: var(--primary);
  color: #0b0f17;
}

.results-box {
  padding: 1rem;
  background: rgba(0,0,0,0.2);
  border-radius: 8px;
  border: 1px solid var(--border);
}
`,"utf-8"),a("Created style.css"),r.npm){a("Running dependency installation (npm install)...");try{(0,w.execSync)("npm install",{cwd:o,stdio:"inherit"}),a("Dependencies successfully installed.")}catch{k("Failed to run npm install automatically.")}}a("\u{1F389} Scaffolding successfully finished!"),a("Open index.html in your browser to view your FlowX application!")});var F=d.command("theme").description("Manage FlowX custom themes");F.command("create [name]").description("Scaffold a custom FlowX CSS theme file with all tokens documented").option("-o, --out <directory>","Output directory",".").action((e="custom-theme",r)=>{let o=e.toLowerCase().replace(/[^a-z0-9-]/g,"-"),n=`theme-${o}.css`,t=s.default.resolve(process.cwd(),r.out),c=s.default.join(t,n);l.default.existsSync(t)||l.default.mkdirSync(t,{recursive:!0});let i=`/* Custom FlowX Theme: ${o} */
:root[data-theme="${o}"] {
  /* Page Backgrounds */
  --flowx-bg-base: #f8fafc;           /* Main page background */
  --flowx-bg-surface: #ffffff;        /* Cards, panels, container background */
  --flowx-bg-surface-raised: #ffffff; /* Modals, popovers, dropdowns */
  --flowx-bg-hover: rgba(0, 0, 0, 0.05); /* Hover state background */
  --flowx-bg-active: rgba(0, 0, 0, 0.1);  /* Active state background */

  /* Brand Colors */
  --flowx-color-primary: #2563eb;       /* Main primary brand color */
  --flowx-color-primary-hover: #1d4ed8; /* Primary hover state */
  --flowx-color-primary-text: #ffffff;  /* Text color on primary background */

  --flowx-color-secondary: #475569;     /* Secondary accent color */
  --flowx-color-secondary-hover: #334155;
  --flowx-color-secondary-text: #ffffff;

  /* Typography & Text Colors */
  --flowx-color-text: #0f172a;        /* Primary body text color */
  --flowx-color-text-muted: #64748b;  /* Muted / secondary text color */
  --flowx-color-text-subtle: #94a3b8; /* Subtle / disabled text color */

  /* Ghost Elements */
  --flowx-color-ghost: transparent;
  --flowx-color-ghost-hover: rgba(0, 0, 0, 0.05);
  --flowx-color-ghost-text: #0f172a;

  /* Status Colors */
  --flowx-color-danger: #ef4444;      /* Destructive actions & errors */
  --flowx-color-danger-hover: #dc2626;
  --flowx-color-danger-text: #ffffff;

  --flowx-color-info: #06b6d4;        /* Informational badges & callouts */
  --flowx-color-success: #10b981;     /* Success badges & confirmation */
  --flowx-color-warning: #f59e0b;     /* Warning badges & alerts */
  --flowx-color-error: #ef4444;       /* Error state */
  --flowx-color-neutral: #94a3b8;     /* Neutral badge background */

  --flowx-color-overlay: rgba(0, 0, 0, 0.5); /* Modal overlay backdrop */

  /* Borders & Dividers */
  --flowx-border-color: #e2e8f0;      /* Default component border color */
  --flowx-border-subtle: #f1f5f9;     /* Subtle divider line color */

  /* Shadows */
  --flowx-shadow-color: rgba(0, 0, 0, 0.08); /* Base shadow tint color */
  --flowx-shadow-sm: 0 1px 2px 0 var(--flowx-shadow-color);
  --flowx-shadow-md: 0 4px 6px -1px var(--flowx-shadow-color), 0 2px 4px -1px var(--flowx-shadow-color);
  --flowx-shadow-lg: 0 10px 15px -3px var(--flowx-shadow-color), 0 4px 6px -2px var(--flowx-shadow-color);

  /* Focus & Radii */
  --flowx-color-focus-ring: 0 0 0 3px rgba(37, 99, 235, 0.4);
  --flowx-radius-sm: 4px;
  --flowx-radius-md: 8px;
  --flowx-radius-lg: 16px;
  --flowx-radius-round: 9999px;

  /* Spacing Scale */
  --flowx-space-1: 4px;
  --flowx-space-2: 8px;
  --flowx-space-3: 12px;
  --flowx-space-4: 16px;
  --flowx-space-5: 20px;
  --flowx-space-6: 24px;
  --flowx-space-7: 32px;
  --flowx-space-8: 40px;

  /* Fonts */
  --flowx-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --flowx-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
`;l.default.writeFileSync(c,i,"utf-8"),a(`Created custom theme template at: ${c}`),a(`Activate in HTML using <html data-theme="${o}"> and linking your CSS!`)});d.parse(process.argv);
//# sourceMappingURL=index.js.map