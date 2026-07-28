# Contributing to FlowX ⚡

Thank you for your interest in contributing to FlowX! We welcome community contributions, bug reports, and suggestions to help keep FlowX the fastest, lightest server-rendered HTML-first UI ecosystem.

---

## 🛠️ Local Monorepo Setup

1. **Prerequisites**: Node.js (v18+) and npm.
2. **Clone the Repository**:
   ```bash
   git clone https://github.com/flowx-org/flowx.git
   cd flowx
   ```
3. **Install Workspace Dependencies**:
   ```bash
   npm install
   ```
4. **Compile All Package Bundles**: Build core, UI components, charts, extensions, CLI, and devtools using Turborepo:
   ```bash
   npx turbo run build
   ```
5. **Run the Test Suite**: Verify unit and integration test suites:
   ```bash
   npm run test --workspace=packages/ui
   npm run test --workspace=packages/charts
   npx playwright test tests/e2e/
   ```

---

## 🌿 Branch Naming Conventions

Use clear branch prefixes when submitting contributions:

- `feat/description` — New features or UI components (e.g. `feat/tier9-media-components`).
- `fix/description` — Bug fixes or edge-case handling (e.g. `fix/swap-transition-delay`).
- `docs/description` — Documentation improvements (e.g. `docs/update-cdn-guide`).
- `refactor/description` — Code cleanup without behavior changes (e.g. `refactor/observer-cleanup`).

---

## 📨 Pull Request Guidelines

Before submitting a Pull Request, please ensure:

- All package builds compile clean (`npx turbo run build`).
- Unit and E2E test suites pass without regressions (`npm run test` and `npx playwright test`).
- Code preserves zero-dependency principles and server-rendered HTML-first fallback semantics.
- Provide a clear, descriptive PR title and summary explaining your changes.
