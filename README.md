# Mathew Rohit Thomson — Portfolio

**Live site:** [https://mrohitth.github.io/my-website/](https://mrohitth.github.io/my-website/)

Senior Data Engineer specializing in real-time streaming pipelines, data lakehouse architecture, and large-scale ETL systems.

## What's in here

This isn't a template portfolio. The main feature is an interactive **Data Platform Sandbox** that models real production DE problems:

- **CDC Pipeline tab**: Models change data capture from a PostgreSQL source with configurable throughput, latency simulation, and failure mode scenarios
- **Batch Analytics tab**: Interactive dbt + Airflow DAG visualization with SLA impact modeling and cost analysis
- **Data Observability tab**: Anomaly detection simulation across freshness, volume, schema, and distribution dimensions

I built these because showing engineering thinking is more valuable than listing tools.

## Tech stack (and why)

| Layer | Choice | Rationale |
|---|---|---|
| Framework | React 18 + TypeScript | Hooks + strict typing = self-documenting component contracts |
| Build | Vite 5 | 10× faster HMR than CRA; native ESM; excellent GitHub Pages support |
| Routing | wouter | 1.3KB vs React Router's 50KB; no nested routing needed for a single-page portfolio |
| Styling | Tailwind CSS 3 + shadcn/ui | Design tokens without runtime cost; shadcn components are owned, not imported |
| Animation | Framer Motion 11 + GSAP ScrollTrigger | Declarative component transitions + scroll-synced text reveals |
| State | TanStack Query v5 + useState | Query for server state (contact form); useState for pure UI state |

## Architecture

```
client/src/
├── components/
│   ├── sections/          # Page sections: Hero, About, Projects, Sandbox, etc.
│   ├── simulations/       # DataPlatformSandbox — lazy-loaded, code-split
│   └── ui/                 # shadcn/ui primitives + custom chart.tsx wrapper
├── constants/
│   ├── animations.ts       # Typing, scroll, and flow animation timing values
│   └── sandbox.ts          # CDC, batch, network animation, cursor config
├── data/
│   └── portfolio.ts        # Project data, experience, skills — single source of truth
├── hooks/
│   ├── use-reduced-motion.ts  # prefers-reduced-motion media query hook
│   └── use-toast.ts        # Imperative toast store (module-level state + listener pattern)
└── pages/
    └── portfolio.tsx       # Root page — composes all sections, lazy-loads cursor + sandbox
```

**Code splitting**: The `DataPlatformSandbox` is the heaviest chunk (~445KB) and is lazy-loaded via `React.lazy()`. It only downloads when the user expands the sandbox tab — the main page loads without it.

**State pattern**: UI state lives in React (`useState`). Server state (contact form) uses TanStack Query. The toast store uses a module-level listener pattern — imperative updates without React context overhead.

## Running locally

```bash
git clone https://github.com/mrohitth/my-website
cd my-website
npm install
npm run dev
# → http://localhost:5173/my-website/
```

## What I'd add next

- **SSR / pre-rendering**: The SPA approach means Google sees an empty HTML shell. `vite-plugin-ssg` would fix this without adding framework complexity.
- **4th sandbox tab**: A real-time schema registry and compatibility checker — something I've dealt with in production but haven't seen modeled interactively elsewhere.
- **Blog section**: Architecture Decision Records (ADRs) from real projects, written for technical audiences.
- **Lighthouse CI**: Automated performance regression testing on every PR.

## Performance

| Metric | Value |
|---|---|
| Lighthouse Performance | ~75 (target: 90+) |
| Initial JS (index chunk) | ~105KB gzipped |
| Lazy-loaded sandbox | ~445KB (only loaded on expand) |
| LCP | ~1.2s |

## Contact

[mathew.rohit.thomson@gmail.com](mailto:mathew.rohit.thomson@gmail.com) · [LinkedIn](https://www.linkedin.com/in/mrohitth/) · [GitHub](https://github.com/mrohitth)