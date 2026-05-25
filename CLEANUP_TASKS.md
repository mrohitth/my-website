# Cleanup Tasks — Architectural Audit

Findings from static analysis of `client/src/`, `server/`, and `shared/`.
No source code has been modified. Each item notes the file and the risk level.

---

## 1. Dead Components (never imported)

| File | Evidence |
|---|---|
| `client/src/components/ControlMlogo.tsx` | Zero imports outside the file itself; `controlm.png` asset is only consumed here |
| `client/src/components/sqllogo.tsx` | Zero imports outside the file itself; `sql.png` asset is only consumed here |
| `client/src/components/scrollfloat.tsx` | Zero imports outside the file itself despite depending on `gsap` + `ScrollTrigger` |

- [x] Delete `ControlMlogo.tsx`
- [x] Delete `sqllogo.tsx`
- [x] Delete `scrollfloat.tsx` (also remove the `gsap` + `gsap/ScrollTrigger` dep if it becomes unused)

---

## 2. Shadcn UI Components Never Used Outside `ui/`

The following files in `client/src/components/ui/` are present but have zero imports from any non-`ui/` file. They are Shadcn scaffolding that was never wired up.

`accordion`, `alert-dialog`, `alert`, `aspect-ratio`, `avatar`, `badge`,
`breadcrumb`, `calendar`, `carousel`, `chart`, `checkbox`, `collapsible`,
`command`, `context-menu`, `drawer`, `dropdown-menu`, `form`, `hover-card`,
`input-otp`, `menubar`, `navigation-menu`, `pagination`, `popover`, `progress`,
`radio-group`, `resizable`, `scroll-area`, `select`, `sidebar`, `slider`,
`switch`, `table`, `tabs`, `toggle-group`

- [x] Delete all 34 listed unused `ui/` component files
- [x] After deletion, run a TypeScript check to confirm no transitive imports break

---

## 3. Dead / Duplicate Data in `portfolio.ts`

| Issue | Location |
|---|---|
| `EXPERIENCES` array is never imported — `ExperienceSection.tsx` defines its own local `EXPERIENCE_CARDS` | `data/portfolio.ts:357` |
| `PIPELINE_STAGES` export is identical in shape to `SKILL_DOMAINS` and is never imported anywhere; comment says "retained for backward compat" but no consumer exists | `data/portfolio.ts:530` |
| `PipelineTool` and `PipelineStage` interfaces are declared twice in the same file (TS duplicate identifier) | `data/portfolio.ts:431` and `data/portfolio.ts:515` |
| `SkillDomain` interface is exported but has no consumer | `data/portfolio.ts:414` |
| `import { Star, Database } from "lucide-react"` at line 595 — neither symbol is used in the file | `data/portfolio.ts:595` |

- [x] Remove the `EXPERIENCES` array (or make it the single source of truth by refactoring `ExperienceSection.tsx` to import it)
- [x] Remove `PIPELINE_STAGES` export
- [x] Remove the second duplicate `PipelineTool` / `PipelineStage` interface declarations
- [x] Remove the unused `SkillDomain` interface
- [x] Remove the unused `import { Star, Database }` line

---

## 4. Unused Assets

| Asset | Status |
|---|---|
| `assets/profile2.jpg` | Not imported anywhere |
| `assets/pipeline-dag.svg` | Not imported anywhere |
| `assets/logos/fm.jpg` | Duplicate of `fm.png`; only `fm.png` is imported |
| `assets/logos/capco_logo.png` | Not imported (ExperienceSection shows Freddie Mac logo for the Capco role) |
| `assets/logos/cmu_logo.png` | Not imported (DRC role uses `drc.png`) |
| `assets/logos/freddie-mac.png` | Not imported (`fm.png` is imported instead) |
| `assets/sql.png` | Only used by `sqllogo.tsx` — dead if that component is deleted |
| `assets/controlm.png` | Only used by `ControlMlogo.tsx` — dead if that component is deleted |

- [x] Delete `profile2.jpg`
- [x] Delete `pipeline-dag.svg`
- [x] Delete `logos/fm.jpg` (keep `fm.png`)
- [x] Delete `logos/capco_logo.png`
- [x] Delete `logos/cmu_logo.png`
- [x] Delete `logos/freddie-mac.png`
- [x] Delete `sql.png` and `controlm.png` after removing the logo wrapper components

---

## 5. Missing / Broken CSS Class

| Issue | Location |
|---|---|
| `subtle-dots` is applied in `portfolio.tsx:20` but is **never defined** in `index.css` or `tailwind.config.ts` | `pages/portfolio.tsx:20` |

- [ ] Either define `.subtle-dots` in `index.css` (e.g., a dot-grid background) or remove the class from the wrapper `div`

---

## 6. Dead CSS Blocks in `index.css`

| Issue |
|---|
| `.dark { ... }` block — the app is hard-coded to `bg-portfolio-background` (always dark); no dark-mode toggle exists. The `.dark` block is never applied. |
| All `--shadow-*` variables use `/ 0.00` opacity in both `:root` and `.dark` — they render as no-op transparent shadows (Replit theme scaffolding). |
| `--sidebar-*` CSS variables in both `:root` and `.dark` — the `sidebar` UI component is never used anywhere in the app. |
| `--font-serif` and `--font-mono` variables are declared but no component references them. |

- [ ] Remove the entire `.dark { }` block from `index.css` (or keep only if dark mode toggle is planned)
- [ ] Either tune `--shadow-*` variables to real values or remove them
- [ ] Remove `--sidebar-*`, `--font-serif`, `--font-mono` variable declarations

---

## 7. Unused Server-Side Scaffolding

| Issue | Files |
|---|---|
| `storage.ts` is imported in `routes.ts` but the `storage` object is never called — the import and comment are placeholder boilerplate | `server/routes.ts:3`, `server/storage.ts` |
| `shared/schema.ts` defines a Drizzle `users` table and Zod schema, but there is no database connection anywhere and `storage.ts` uses a plain in-memory `Map`, not Drizzle | `shared/schema.ts`, `server/storage.ts` |
| `drizzle.config.ts` exists at the root with no active database URL wired up | `drizzle.config.ts` |
| `queryClient.ts` exports `apiRequest` and `getQueryFn`, neither of which is used anywhere in the app. `QueryClientProvider` is instantiated in `App.tsx` but no component calls `useQuery` or `useMutation`. | `lib/queryClient.ts`, `App.tsx` |

- [ ] Remove the unused `import { storage }` from `routes.ts` (or implement actual usage)
- [ ] Decide: keep Drizzle schema for future DB use, or delete `shared/schema.ts`, `drizzle.config.ts`, and simplify `storage.ts`
- [ ] Either remove `apiRequest` / `getQueryFn` exports from `queryClient.ts` or keep them if server calls are planned
- [ ] Consider removing `QueryClientProvider` wrapper from `App.tsx` if no queries are ever issued (saves ~12 kB)

---

## 8. Routing Dead Code

| Issue | File |
|---|---|
| `App.tsx` registers `/:rest*` → `Portfolio` in addition to `/` → `Portfolio`. The catch-all is never meaningfully different from the root route for a single-page portfolio with no sub-routes. | `App.tsx:14` |

- [ ] Remove the `/:rest*` catch-all route (or document why it exists, e.g., client-side deep-linking)

---

## Summary Counts

| Category | Items |
|---|---|
| Dead standalone components | 3 |
| Unused shadcn UI components | 34 |
| Dead data exports / duplicates in portfolio.ts | 5 |
| Unused asset files | 8 |
| Missing/broken CSS classes | 1 |
| Dead CSS blocks/variables | 4 groups |
| Unused server scaffolding | 4 |
| Routing dead code | 1 |
