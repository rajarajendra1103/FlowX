export const componentsConfig: Record<string, any> = {
  btn: {
    tag: 'flowx-button',
    attrs: {
      variant: {
        type: 'select',
        options: ['primary', 'secondary', 'ghost', 'danger'],
        value: 'primary',
      },
      size: { type: 'select', options: ['sm', 'md', 'lg'], value: 'md' },
      disabled: { type: 'boolean', value: false },
      loading: { type: 'boolean', value: false },
    },
    slot: 'Click Me',
  },
  'icon-btn': {
    tag: 'flowx-icon-button',
    attrs: {
      ariaLabel: { type: 'text', value: 'Search' },
      icon: { type: 'text', value: '🔍' },
    },
    slot: '',
  },
  link: {
    tag: 'flowx-link',
    attrs: {
      href: { type: 'text', value: 'https://example.com' },
      external: { type: 'boolean', value: true },
    },
    slot: 'External Documentation',
  },
  badge: {
    tag: 'flowx-badge',
    attrs: {
      variant: {
        type: 'select',
        options: ['info', 'success', 'warning', 'error', 'neutral'],
        value: 'success',
      },
    },
    slot: 'Active Status',
  },
  avatar: {
    tag: 'flowx-avatar',
    attrs: {
      src: { type: 'text', value: '' },
      name: { type: 'text', value: 'Alex Morgan' },
      size: { type: 'select', options: ['sm', 'md', 'lg'], value: 'md' },
    },
    slot: '',
  },
  card: {
    tag: 'flowx-card',
    attrs: {},
    slot: `
      <div slot="header">Card Title</div>
      <p style="margin: 0; color: #8b949e">This is a card body with slot structure.</p>
      <div slot="footer"><button style="background:#0066cc;color:#fff;border:none;padding:4px 8px;border-radius:4px">Action</button></div>
    `,
  },
  divider: {
    tag: 'flowx-divider',
    attrs: {
      orientation: { type: 'select', options: ['horizontal', 'vertical'], value: 'horizontal' },
    },
    slot: '',
  },
  chip: {
    tag: 'flowx-chip',
    attrs: {
      dismissible: { type: 'boolean', value: true },
    },
    slot: 'React 18',
  },
  alert: {
    tag: 'flowx-alert',
    attrs: {
      variant: { type: 'select', options: ['info', 'success', 'warning', 'error'], value: 'info' },
      dismissible: { type: 'boolean', value: true },
    },
    slot: 'This is an informative system banner.',
  },
  toast: {
    tag: 'flowx-toast',
    attrs: {},
    slot: 'Notification Message',
  },
  progress: {
    tag: 'flowx-progress',
    attrs: {
      value: { type: 'number', min: 0, max: 100, value: 65 },
    },
    slot: '',
  },
  spinner: {
    tag: 'flowx-spinner',
    attrs: {
      size: { type: 'select', options: ['sm', 'md', 'lg'], value: 'md' },
    },
    slot: '',
  },
  skeleton: {
    tag: 'flowx-skeleton',
    attrs: {
      variant: {
        type: 'select',
        options: ['text', 'circular', 'rectangular'],
        value: 'rectangular',
      },
      width: { type: 'text', value: '200px' },
      height: { type: 'text', value: '100px' },
    },
    slot: '',
  },
  tooltip: {
    tag: 'flowx-tooltip',
    attrs: {
      content: { type: 'text', value: 'Helpful tooltip hint text' },
      placement: { type: 'select', options: ['top', 'bottom', 'left', 'right'], value: 'top' },
    },
    slot: '<button style="background:#161b22;color:#e6edf3;border:1px solid rgba(255,255,255,0.15);padding:6px 12px;border-radius:4px">Hover Me</button>',
  },
  popover: {
    tag: 'flowx-popover',
    attrs: {
      placement: { type: 'select', options: ['top', 'bottom', 'left', 'right'], value: 'bottom' },
    },
    slot: `
      <button slot="trigger" style="background:#161b22;color:#e6edf3;border:1px solid rgba(255,255,255,0.15);padding:6px 12px;border-radius:4px">Open Popover</button>
      <div slot="content" style="padding:12px;color:#e6edf3;background:#161b22;border:1px solid rgba(255,255,255,0.15);border-radius:6px">
        <h4 style="margin:0 0 4px">Popover Header</h4>
        <p style="margin:0;font-size:12px;color:#8b949e">Detailed popup overlay content.</p>
      </div>
    `,
  },
  dropdown: {
    tag: 'flowx-dropdown',
    attrs: {},
    slot: `
      <button slot="trigger" style="background:#161b22;color:#e6edf3;border:1px solid rgba(255,255,255,0.15);padding:6px 12px;border-radius:4px">Dropdown Options ▾</button>
      <flowx-dropdown-item value="opt1">Option 1</flowx-dropdown-item>
      <flowx-dropdown-item value="opt2">Option 2</flowx-dropdown-item>
      <flowx-dropdown-item value="opt3" disabled>Option 3 (Disabled)</flowx-dropdown-item>
    `,
  },
  accordion: {
    tag: 'flowx-accordion',
    attrs: {},
    slot: `
      <flowx-accordion-item title="Section 1: General Settings" open>
        <p style="margin:0;color:#8b949e;font-size:13px">Configure application preferences and defaults.</p>
      </flowx-accordion-item>
      <flowx-accordion-item title="Section 2: Security & Privacy">
        <p style="margin:0;color:#8b949e;font-size:13px">Manage multi-factor authentication and passwords.</p>
      </flowx-accordion-item>
    `,
  },
  tabs: {
    tag: 'flowx-tabs',
    attrs: {},
    slot: `
      <flowx-tab-item label="Overview" active>Overview dashboard content panel.</flowx-tab-item>
      <flowx-tab-item label="Analytics">Analytics graphs and metrics data panel.</flowx-tab-item>
      <flowx-tab-item label="Settings">User settings configuration panel.</flowx-tab-item>
    `,
  },
  breadcrumb: {
    tag: 'flowx-breadcrumb',
    attrs: {},
    slot: `
      <flowx-breadcrumb-item href="/">Home</flowx-breadcrumb-item>
      <flowx-breadcrumb-item href="/docs">Docs</flowx-breadcrumb-item>
      <flowx-breadcrumb-item current>Playground</flowx-breadcrumb-item>
    `,
  },
  pagination: {
    tag: 'flowx-pagination',
    attrs: {
      total: { type: 'number', value: 50 },
      page: { type: 'number', value: 1 },
      perPage: { type: 'number', value: 10 },
    },
    slot: '',
  },
  stepper: {
    tag: 'flowx-stepper',
    attrs: {
      activeStep: { type: 'number', value: 1 },
    },
    slot: `
      <flowx-step label="Account Details"></flowx-step>
      <flowx-step label="Personal Info"></flowx-step>
      <flowx-step label="Confirmation"></flowx-step>
    `,
  },
  timeline: {
    tag: 'flowx-timeline',
    attrs: {},
    slot: `
      <flowx-timeline-item title="v1.0 Release" date="2026-07-26" icon="🚀">
        <p style="margin:0;color:#8b949e;font-size:13px">Official release of FlowX Core Custom Elements.</p>
      </flowx-timeline-item>
      <flowx-timeline-item title="Beta Launch" date="2026-06-15" icon="⚡">
        <p style="margin:0;color:#8b949e;font-size:13px">Public beta testing phase across modern browsers.</p>
      </flowx-timeline-item>
    `,
  },
  input: {
    tag: 'flowx-input',
    attrs: {
      label: { type: 'text', value: 'Email Address' },
      placeholder: { type: 'text', value: 'user@example.com' },
      required: { type: 'boolean', value: true },
    },
    slot: '',
  },
  textarea: {
    tag: 'flowx-textarea',
    attrs: {
      label: { type: 'text', value: 'Feedback' },
      rows: { type: 'number', value: 3 },
    },
    slot: '',
  },
  checkbox: {
    tag: 'flowx-checkbox',
    attrs: {
      label: { type: 'text', value: 'Accept Terms & Conditions' },
      checked: { type: 'boolean', value: true },
    },
    slot: '',
  },
  switch: {
    tag: 'flowx-switch',
    attrs: {
      label: { type: 'text', value: 'Enable Email Notifications' },
      checked: { type: 'boolean', value: true },
    },
    slot: '',
  },
  radio: {
    tag: 'flowx-radio-group',
    attrs: {
      name: { type: 'text', value: 'plan' },
      value: { type: 'text', value: 'pro' },
    },
    slot: `
      <flowx-radio value="free" label="Free Plan ($0/mo)"></flowx-radio>
      <flowx-radio value="pro" label="Pro Plan ($19/mo)"></flowx-radio>
      <flowx-radio value="enterprise" label="Enterprise Plan"></flowx-radio>
    `,
  },
  select: {
    tag: 'flowx-select',
    attrs: {
      label: { type: 'text', value: 'Select Country' },
    },
    slot: `
      <option value="us">United States</option>
      <option value="ca">Canada</option>
      <option value="uk">United Kingdom</option>
    `,
  },
  slider: {
    tag: 'flowx-slider',
    attrs: {
      min: { type: 'number', value: 0 },
      max: { type: 'number', value: 100 },
      value: { type: 'number', value: 75 },
    },
    slot: '',
  },
  rating: {
    tag: 'flowx-rating',
    attrs: {
      value: { type: 'number', value: 4 },
      max: { type: 'number', value: 5 },
    },
    slot: '',
  },
  otp: {
    tag: 'flowx-otp-input',
    attrs: {
      length: { type: 'number', value: 6 },
    },
    slot: '',
  },
  autocomplete: {
    tag: 'flowx-autocomplete',
    attrs: {
      placeholder: { type: 'text', value: 'Search frameworks…' },
    },
    slot: `
      <option value="Astro">Astro</option>
      <option value="Next.js">Next.js</option>
      <option value="Nuxt">Nuxt</option>
      <option value="SvelteKit">SvelteKit</option>
    `,
  },
  'date-picker': {
    tag: 'input',
    attrs: {
      type: { type: 'text', value: 'date' },
    },
    slot: '',
  },
  'time-picker': {
    tag: 'input',
    attrs: {
      type: { type: 'text', value: 'time' },
    },
    slot: '',
  },
  'datetime-picker': {
    tag: 'input',
    attrs: {
      type: { type: 'text', value: 'datetime-local' },
    },
    slot: '',
  },
  'color-picker': {
    tag: 'input',
    attrs: {
      type: { type: 'text', value: 'color' },
      value: { type: 'text', value: '#0066cc' },
    },
    slot: '',
  },
  'file-upload': {
    tag: 'input',
    attrs: {
      type: { type: 'text', value: 'file' },
    },
    slot: '',
  },
  'image-upload': {
    tag: 'input',
    attrs: {
      type: { type: 'text', value: 'file' },
      accept: { type: 'text', value: 'image/*' },
    },
    slot: '',
  },
  'signature-pad': {
    tag: 'flowx-signature-pad',
    attrs: {},
    slot: '',
  },
  'fx-data-table': {
    tag: 'flowx-data-table',
    attrs: {},
    slot: `
      <table>
        <thead>
          <tr>
            <th fx-sort="name">Name</th>
            <th fx-sort="role">Role</th>
            <th fx-sort="status">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Alex Morgan</td><td>Lead Engineer</td><td><span style="color:#2ea043">Active</span></td></tr>
          <tr><td>Sarah Chen</td><td>Product Designer</td><td><span style="color:#2ea043">Active</span></td></tr>
          <tr><td>David Kim</td><td>DevOps Architect</td><td><span style="color:#db6d28">Offline</span></td></tr>
        </tbody>
      </table>
    `,
  },
  'fx-data-grid': {
    tag: 'flowx-data-grid',
    attrs: {},
    slot: `
      <table>
        <thead>
          <tr>
            <th fx-sort="id">ID</th>
            <th fx-sort="title">Project Title</th>
            <th fx-sort="budget">Budget</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>#101</td><td>Alpha Release</td><td>$45,000</td></tr>
          <tr><td>#102</td><td>Cloud Migration</td><td>$120,000</td></tr>
        </tbody>
      </table>
    `,
  },
  'fx-search': {
    tag: 'flowx-search',
    attrs: {
      placeholder: { type: 'text', value: 'Debounced search…' },
    },
    slot: '',
  },
  'fx-export': {
    tag: 'flowx-export',
    attrs: {
      filename: { type: 'text', value: 'export_data.csv' },
    },
    slot: 'Export Data',
  },
  'fx-print': {
    tag: 'flowx-print-button',
    attrs: {},
    slot: 'Print Document',
  },
  'fx-modal': {
    tag: 'flowx-modal',
    attrs: {
      title: { type: 'text', value: 'Native Modal Dialog' },
    },
    slot: `
      <p style="margin:0;color:#c9d1d9">This modal is built on top of the native HTML <code>&lt;dialog&gt;</code> element.</p>
      <div slot="footer"><button fx-dialog-close style="background:#0066cc;color:#fff;border:none;padding:6px 12px;border-radius:4px;cursor:pointer">Close Dialog</button></div>
    `,
  },
  'fx-sheet': {
    tag: 'flowx-sheet',
    attrs: {
      position: { type: 'select', options: ['right', 'left'], value: 'right' },
      title: { type: 'text', value: 'Slide-over Drawer' },
    },
    slot: `
      <p style="margin:0;color:#c9d1d9">Side drawer sheet sliding in from screen edge.</p>
    `,
  },
  'fx-bottom-sheet': {
    tag: 'flowx-bottom-sheet',
    attrs: {
      title: { type: 'text', value: 'Mobile Bottom Sheet' },
    },
    slot: `
      <p style="margin:0;color:#c9d1d9">Bottom drawer sheet sliding up from bottom viewport.</p>
    `,
  },
  'fx-confirm': {
    tag: 'flowx-confirm-dialog',
    attrs: {
      title: { type: 'text', value: 'Confirm Action' },
      message: { type: 'text', value: 'Are you sure you want to proceed with this action?' },
    },
    slot: '',
  },
  'fx-lightbox': {
    tag: 'flowx-lightbox',
    attrs: {},
    slot: `
      <img src="https://picsum.photos/300/200" data-lightbox-src="https://picsum.photos/800/600" alt="Sample Lightbox Image" style="border-radius:8px;cursor:pointer;max-width:100%" />
    `,
  },
  'fx-navbar': {
    tag: 'flowx-navbar',
    attrs: {
      breakpoint: { type: 'text', value: '768px' },
    },
    slot: `
      <strong slot="logo" style="color:#e6edf3;font-size:16px;display:flex;align-items:center;gap:6px">⚡ FlowX App</strong>
      <span slot="nav-items" style="color:#8b949e;cursor:pointer;font-size:14px">Dashboard</span>
      <span slot="nav-items" style="color:#8b949e;cursor:pointer;font-size:14px">Projects</span>
      <span slot="nav-items" style="color:#8b949e;cursor:pointer;font-size:14px">Settings</span>
      <flowx-button slot="actions" variant="primary" size="sm">New Project</flowx-button>
    `,
  },
  'fx-sidebar': {
    tag: 'flowx-sidebar',
    attrs: {
      persist: { type: 'select', options: ['cookie', 'localStorage'], value: 'cookie' },
    },
    slot: `
      <strong slot="brand" style="color:#e6edf3">FlowX Dashboard</strong>
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:12px;">
        <a href="#" style="color:#e6edf3;text-decoration:none;padding:6px 10px;border-radius:4px;background:rgba(255,255,255,0.06)">🏠 Home</a>
        <a href="#" style="color:#8b949e;text-decoration:none;padding:6px 10px">📊 Analytics</a>
        <a href="#" style="color:#8b949e;text-decoration:none;padding:6px 10px">⚙️ Settings</a>
      </div>
    `,
  },
  'fx-dock': {
    tag: 'flowx-dock',
    attrs: {},
    slot: `
      <button style="background:none;border:none;font-size:24px;cursor:pointer;">🚀</button>
      <button style="background:none;border:none;font-size:24px;cursor:pointer;">📂</button>
      <button style="background:none;border:none;font-size:24px;cursor:pointer;">💬</button>
      <button style="background:none;border:none;font-size:24px;cursor:pointer;">⚙️</button>
    `,
  },
  'fx-bottom-nav': {
    tag: 'flowx-bottom-navigation',
    attrs: {},
    slot: `
      <a href="#" current style="color:#8b949e;text-decoration:none;font-size:12px">🏠 Home</a>
      <a href="#" style="color:#8b949e;text-decoration:none;font-size:12px">🔍 Search</a>
      <a href="#" style="color:#8b949e;text-decoration:none;font-size:12px">👤 Profile</a>
    `,
  },
  'fx-menu': {
    tag: 'flowx-menu',
    attrs: {},
    slot: `
      <button slot="trigger" style="background:#161b22;border:1px solid rgba(255,255,255,0.15);color:#e6edf3;padding:8px 14px;border-radius:6px;cursor:pointer;">Open Menu ▾</button>
      <flowx-menu-item>Edit Profile</flowx-menu-item>
      <flowx-menu-item>Account Settings</flowx-menu-item>
      <flowx-menu-item disabled>Billing (Pro only)</flowx-menu-item>
    `,
  },
  'fx-bar-chart': {
    tag: 'flowx-bar-chart',
    attrs: {},
    slot: `<script type="application/json">{"labels":["Q1","Q2","Q3","Q4","Q5"],"datasets":[{"label":"Quarterly Revenue","data":[120,190,300,250,420],"color":"#0066cc"}]}</script>`,
  },
  'fx-line-chart': {
    tag: 'flowx-line-chart',
    attrs: {},
    slot: `<script type="application/json">{"labels":["Jan","Feb","Mar","Apr","May"],"datasets":[{"label":"Active Users","data":[10,25,18,35,48],"color":"#3fb950"}]}</script>`,
  },
  'fx-pie-chart': {
    tag: 'flowx-pie-chart',
    attrs: {},
    slot: `<script type="application/json">{"series":[{"name":"Direct","value":45,"color":"#0066cc"},{"name":"Organic","value":35,"color":"#3fb950"},{"name":"Social","value":20,"color":"#db6d28"}]}</script>`,
  },
  'fx-gauge': {
    tag: 'flowx-gauge',
    attrs: {},
    slot: `<script type="application/json">{"value":78,"zones":[{"min":0,"max":50,"color":"#3fb950"},{"min":50,"max":80,"color":"#d29922"},{"min":80,"max":100,"color":"#f85149"}]}</script>`,
  },
  'fx-kpi-card': {
    tag: 'flowx-kpi-card',
    attrs: {
      label: { type: 'text', value: 'Monthly Recurring Revenue' },
    },
    slot: `<script type="application/json">{"value":48250,"change":18.4}</script>`,
  },
  'fx-live-dashboard': {
    tag: 'div',
    attrs: {},
    slot: `
      <div class="dash-grid">
        <flowx-kpi-card id="kpi-users" fx-sse-connect label="Live Active Users">
          <script type="application/json">{"value":1420,"change":8.2}</script>
        </flowx-kpi-card>
        <flowx-kpi-card id="kpi-sales" fx-sse-connect label="Live Hourly Revenue">
          <script type="application/json">{"value":3890,"change":12.4}</script>
        </flowx-kpi-card>
        <div class="dash-row">
          <h4 style="margin:0 0 10px;color:#e6edf3">⚡ Realtime System Latency (SSE Stream)</h4>
          <flowx-line-chart id="live-line-chart">
            <script type="application/json">{"labels":["15:00","15:01","15:02","15:03","15:04"],"datasets":[{"data":[18,22,19,25,21]}]}</script>
          </flowx-line-chart>
        </div>
      </div>
    `,
  },
  // ── Tier 9 Media & Document Viewing Components ───────────
  'fx-image': {
    tag: 'flowx-image',
    attrs: {
      src: { type: 'text', value: 'https://picsum.photos/400/250' },
      alt: { type: 'text', value: 'Sample Image' },
      loading: { type: 'select', options: ['lazy', 'eager'], value: 'lazy' },
    },
    slot: '',
  },
  'fx-gallery': {
    tag: 'flowx-gallery',
    attrs: {},
    slot: `
      <img src="https://picsum.photos/300/200?random=1" alt="Gallery Item 1" style="border-radius:6px;width:100%" />
      <img src="https://picsum.photos/300/200?random=2" alt="Gallery Item 2" style="border-radius:6px;width:100%" />
      <img src="https://picsum.photos/300/200?random=3" alt="Gallery Item 3" style="border-radius:6px;width:100%" />
    `,
  },
  'fx-carousel': {
    tag: 'flowx-carousel',
    attrs: {
      autoplay: { type: 'boolean', value: true },
      interval: { type: 'number', value: 3000 },
    },
    slot: `
      <div style="background:#1f6feb;padding:40px;text-align:center;color:#fff;font-weight:bold">Slide 1: High Performance</div>
      <div style="background:#2ea043;padding:40px;text-align:center;color:#fff;font-weight:bold">Slide 2: Zero Dependencies</div>
      <div style="background:#db6d28;padding:40px;text-align:center;color:#fff;font-weight:bold">Slide 3: Server-Rendered HTML</div>
    `,
  },
  'fx-video-player': {
    tag: 'flowx-video-player',
    attrs: {},
    slot: `
      <video src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" style="max-height:260px;width:100%"></video>
    `,
  },
  'fx-markdown-viewer': {
    tag: 'flowx-markdown-viewer',
    attrs: {},
    slot: `# ⚡ FlowX Documentation\n\nBuild rich reactive UIs using **Server-Rendered HTML**.\n\n- Zero JS FOUC\n- Native Custom Elements\n- Progressive Enhancement`,
  },
  'fx-code-viewer': {
    tag: 'flowx-code-viewer',
    attrs: {
      lang: { type: 'select', options: ['js', 'html', 'css', 'python'], value: 'js' },
    },
    slot: `import { FlowX } from '@flowx/core';\n\n// Scan DOM and initialize reactive handlers\nFlowX.init();`,
  },
};
