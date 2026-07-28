import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const program = new Command();

function log(msg: string) {
  console.log(`\x1b[35m[create-flowx-app]\x1b[0m ${msg}`);
}

function error(msg: string) {
  console.error(`\x1b[31m[create-flowx-app ERROR]\x1b[0m ${msg}`);
}

program
  .name('create-flowx-app')
  .description('Scaffold a beautiful FlowX starter project')
  .argument(
    '[project-directory]',
    'Directory where the project should be scaffolded',
    'my-flowx-app',
  )
  .option('-n, --npm', 'Install FlowX core package using npm dependencies', false)
  .action((projectDir, options) => {
    const targetPath = path.resolve(process.cwd(), projectDir);
    const projectName = path.basename(targetPath);

    log(`Scaffolding starter application in ${targetPath}...`);

    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true });
    }

    // 1. Resolve and copy FlowX Core library file locally into the project directory
    // This allows the scaffolded project to run fully offline without NPM publishing
    const coreDistPath = path.resolve(__dirname, '../../core/dist/index.global.js');
    let flowxScriptSource = 'flowx.js';

    if (fs.existsSync(coreDistPath)) {
      const coreCode = fs.readFileSync(coreDistPath, 'utf-8');
      fs.writeFileSync(path.join(targetPath, 'flowx.js'), coreCode, 'utf-8');
      log('Embedded local flowx.js library bundle');
    } else {
      // Fallback to unpkg CDN if core bundle is not compiled or not found in monorepo
      flowxScriptSource = 'https://unpkg.com/@flowx/core/dist/index.global.js';
      log('Warning: Core bundle not found. Defaulting to CDN script source.');
    }

    // 2. Create package.json
    const packageJson = {
      name: projectName,
      version: '1.0.0',
      description: 'FlowX HTML-First Application',
      dependencies: options.npm ? { '@flowx/core': '^1.0.0' } : {},
    };

    fs.writeFileSync(
      path.join(targetPath, 'package.json'),
      JSON.stringify(packageJson, null, 2),
      'utf-8',
    );
    log('Created package.json');

    // 3. Create index.html
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FlowX Application ⚡</title>
  <link rel="stylesheet" href="style.css">
  <!-- Load FlowX CDN Scripting Library -->
  <script src="${flowxScriptSource}"></script>
</head>
<body>
  <header>
    <div class="logo">FlowX Application ⚡</div>
    <div class="tagline">Server-Rendered HTML-First UI Ecosystem</div>
  </header>

  <main class="container">
    <section class="card">
      <h3 class="card-title">⚡ Drop-In CDN Scripting</h3>
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
      <h3 class="card-title">📊 Server-Rendered Data Chart</h3>
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
`;

    fs.writeFileSync(path.join(targetPath, 'index.html'), indexHtml, 'utf-8');
    log('Created index.html');

    // 4. Create style.css
    const styleCss = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

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
`;

    fs.writeFileSync(path.join(targetPath, 'style.css'), styleCss, 'utf-8');
    log('Created style.css');

    // 5. Resolve dependencies installation if --npm is checked
    if (options.npm) {
      log('Running dependency installation (npm install)...');
      try {
        execSync('npm install', { cwd: targetPath, stdio: 'inherit' });
        log('Dependencies successfully installed.');
      } catch (err) {
        error('Failed to run npm install automatically.');
      }
    }

    log(`🎉 Scaffolding successfully finished!`);
    log(`Open index.html in your browser to view your FlowX application!`);
  });

// Theme subcommand
const theme = program.command('theme').description('Manage FlowX custom themes');

theme
  .command('create [name]')
  .description('Scaffold a custom FlowX CSS theme file with all tokens documented')
  .option('-o, --out <directory>', 'Output directory', '.')
  .action((name = 'custom-theme', options) => {
    const themeName = name.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const filename = `theme-${themeName}.css`;
    const targetDir = path.resolve(process.cwd(), options.out);
    const targetPath = path.join(targetDir, filename);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const templateContent = `/* Custom FlowX Theme: ${themeName} */
:root[data-theme="${themeName}"] {
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
`;

    fs.writeFileSync(targetPath, templateContent, 'utf-8');
    log(`Created custom theme template at: ${targetPath}`);
    log(`Activate in HTML using <html data-theme="${themeName}"> and linking your CSS!`);
  });

program.parse(process.argv);
