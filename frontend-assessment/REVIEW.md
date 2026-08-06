# Code Review — VeeLion Frontend Assessment

Review of the starter Task Dashboard and Activity Feed modules. The Task Dashboard is generally solid; the Activity Feed has intentional quality issues that this review documents and that the refactor addresses.

---

## Performance

### 1. Unnecessary interval-driven re-renders (Activity Feed)

**What’s wrong:** `app/activity/page.tsx` starts a `setInterval` every 1.4s that increments `tick`. That value is wired into filter and list-copy effects, so the page refilters and recreates list objects on a timer even when data and search query are unchanged.

**Why it matters:** Extra work on every tick wastes CPU, can cause visible flicker, and scales poorly if the feed grows. Users get no benefit from the timer.

**Suggested improvement:** Remove the interval entirely. Derive the filtered list with `useMemo` from `allActivity` and `query` only.

### 2. Redundant list cloning on every tick (Activity Feed)

**What’s wrong:** A second effect copies `shownActivity` into `forcedList`, alternating between spread and `.map((item) => ({ ...item }))` based on `tick % 2`.

**Why it matters:** Creates new object identities each tick, forcing React to reconcile the list repeatedly for no UI change.

**Suggested improvement:** Render the filtered array directly; do not keep a parallel “forced” list in state.

---

## Maintainability

### 3. Duplicated filter and formatter helpers (Activity Feed)

**What’s wrong:** `formatTimeA` / `formatTimeB` and `applyFilterA` / `applyFilterB` are near-identical pairs. Filtering is applied twice in sequence for the same query.

**Why it matters:** Duplicate logic increases the chance of fixing one path and leaving the other broken. Harder for new developers to know which helper is “canonical.”

**Suggested improvement:** Keep a single `formatTime` and a single filter function (or inline filter inside `useMemo`).

### 4. Redundant state mirroring server data (Activity Feed)

**What’s wrong:** The page stores the same fetch result in `allActivity`, `shownActivity`, and `forcedList`, then syncs them through effects.

**Why it matters:** Multiple sources of truth make bugs easy (stale lists, racey updates) and inflate the component.

**Suggested improvement:** Store only the fetched logs (and `query`). Compute the visible list as derived data.

### 5. Monolithic page component (Activity Feed)

**What’s wrong:** Fetching, filtering, formatting, and rendering all live in one page file with heavy inline styles.

**Why it matters:** Harder to test, reuse, and review. Diverges from the Task Dashboard pattern (`useTasks` + `components/tasks/*`).

**Suggested improvement:** Extract `useActivity`, `ActivityList`, and `ActivityItem` (and optionally a search field component), matching the Tasks module structure.

---

## UX issues

### 6. No loading or error UI (Activity Feed)

**What’s wrong:** Fetch uses `.then` / `.catch` with no loading flag. Errors silently reset lists to `[]`, so a failed request looks like an empty feed.

**Why it matters:** Users cannot tell failure from “no activity,” and there is no retry path.

**Suggested improvement:** Mirror Tasks: `loading`, `error`, and a Retry button that re-fetches.

### 7. Duplicate timestamps (Activity Feed)

**What’s wrong:** Each item renders the same timestamp twice via `formatTimeA` and `formatTimeB`.

**Why it matters:** Confusing UI and wasted space; looks unfinished.

**Suggested improvement:** Show a single formatted time.

### 8. Limited empty / search feedback (Activity Feed)

**What’s wrong:** When the filter matches nothing, the list is simply empty with no message. Stats show totals but give little guidance.

**Why it matters:** Users may think the app broke when search returns no rows.

**Suggested improvement:** Show a short empty state (“No activity matches your search”) when filtered length is 0 and data has loaded.

---

## Code quality

### 9. Inline styles instead of shared classes (both modules, worse on Activity)

**What’s wrong:** Layout and spacing rely on repeated inline `style={{ ... }}` objects rather than reusable CSS classes.

**Why it matters:** Inconsistent spacing, harder theming, and noisier JSX. Global CSS already defines `.card`, `.button`, etc., but composition is incomplete.

**Suggested improvement:** Expand `globals.css` with layout utilities (page header, nav, list rows, error panel) and prefer classes over inline styles.

### 10. Home page incomplete module list

**What’s wrong:** Home only links to Tasks and Activity; there is no Reports entry despite a backend reports API.

**Why it matters:** New features are hard to discover; navigation does not match the product surface.

**Suggested improvement:** Add a Reports link once `/reports` exists, and use consistent nav across pages.

---

## React best practices

### 11. Derived state updated in `useEffect` (Activity Feed)

**What’s wrong:** Filtered results are written into state inside an effect that depends on `query`, `allActivity`, and `tick`.

**Why it matters:** Anti-pattern: derived data should not be synchronized into state. Causes extra renders and is easy to get out of sync.

**Suggested improvement:** Use `useMemo` for the filtered list (as Tasks does for `filteredTasks`).

### 12. Silent catch without typed error handling (Activity Feed)

**What’s wrong:** Failed fetches clear state without reading the API error shape (`{ error: { message } }`) used elsewhere.

**Why it matters:** Inconsistent with `useTasks` / route handlers; loses useful messages for debugging and UX.

**Suggested improvement:** Share a small `requestJson` helper pattern (like `useTasks`) and surface `error.message` in the UI.

---

## Task Dashboard — what’s already good

- Clear separation: `useTasks` handles data; presentational components handle UI.
- Loading, error, and retry are present.
- Filter state is simple; filtered list is derived with `useMemo`.
- Optimistic-enough update path with per-item `updatingTaskId` busy state.

## Task Dashboard — light notes (optional polish, not blockers)

### 13. Inline styles and one-off error panel styling

**What’s wrong:** Error panel colors are hardcoded hex values in JSX.

**Why it matters:** Slight drift from design tokens in `:root`.

**Suggested improvement:** Move error/success panel styles into CSS variables/classes (done as part of UI polish).

### 14. `requestJson` lives only inside `useTasks`

**What’s wrong:** The client fetch helper is not shared with Activity/Reports.

**Why it matters:** Risk of duplicating error parsing when new modules appear.

**Suggested improvement:** Extract a tiny shared client helper, or copy the same pattern into each hook without introducing a heavy data layer. Prefer consistency over a large abstraction.

---

## Docker (extra feature — not required by the assessment brief)

Docker is **not** part of the original VeeLion task list (code review, refactor, Reports UI, UI polish). It was added as a **supporting production feature** so the full stack can run the same way on any machine without manually installing and starting frontend and backend separately.

### What exists

- Root `docker-compose.yml` — runs **backend** (`:4000`) and **frontend** (`:3000`) together
- `backend/Dockerfile` and `frontend/Dockerfile` — container images for each app
- Frontend receives `NEXT_PUBLIC_BACKEND_API_URL=http://backend:4000` so Next.js API proxies reach the backend service on the Compose network
- Backend can use `DATA_DIR` for JSON persistence (volume-backed in Compose)

### Why add it anyway

| Reason | Detail |
|--------|--------|
| Reproducible setup | One command (`docker compose up --build`) avoids “works on my machine” Node/version drift |
| Mirrors production thinking | Treats frontend + backend as deployable services with explicit env wiring |
| Easier review / demo | Reviewers can start the whole system without reading separate install steps for each folder |
| Env clarity | Makes the backend URL contract visible (`NEXT_PUBLIC_BACKEND_API_URL` with localhost fallback outside Docker) |

### How to run

```bash
docker compose up --build
```

- App: http://localhost:3000  
- API: http://localhost:4000  

Local `npm run dev` / `npm start` without Docker still works; unset `NEXT_PUBLIC_BACKEND_API_URL` falls back to `http://localhost:4000`.

---

## Summary

Align Activity with the Task Dashboard: one source of truth, memoized filtering, loading/error/retry, small components, and no timer. Add a Reports page against `GET /reports/tasks-summary` using the same proxy + hook pattern. Polish shared CSS and navigation so all three modules feel like one app. Docker Compose is an optional but useful ops feature for running both services together consistently.
