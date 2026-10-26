
## Tech stack
Do not change the existing tech stack by removing the libraries or downloading new ones from npm, unless the libraries are not related to Frontend.
- React 19.2, TypeScript 5.9, Vite 7.2, ES modules.
- React Router 7.10; Redux Toolkit 2.11 with React Redux 9.2.
- Tailwind CSS 4.1 through its Vite plugin; global CSS and inline SVG icons.
- React Hook Form 7.69, Zod 4.3, and Hook Form resolvers for form validation.
- TanStack Query 5.90 is configured, with limited current usage. HTTP calls use native `fetch`; Axios 1.13 is installed but no source usage was found.
- ESLint 9 with TypeScript, React Hooks, and React Refresh rules; npm lockfile. Versions above describe package.json ranges.

## Important directories and components
| Path | Purpose |
| --- | --- |
| `src/app/` | React entry point, providers, router, Redux store, auth context, global CSS/theme. |
| `server/` | All the files related to server-side development. |
| `src/pages/` | Home, signup, login, collection, and favourite-tracks screens; barrel exports in `index.tsx`. |
| `src/widgets/` | Composed Sidebar, Track player, Profile, MediaHeader, and MediaControl UI. |
| `src/features/` | Auth steps, navigation/search, sidebar/library operations, playback controls, and media presentation. |
| `src/entities/` | Auth, login, track, and collection models, Redux slices/selectors, and track API. |
| `src/shared/` | Generic API helper, backend URL, route constants, reusable icons. |
| `public/`, `index.html` | Static assets and Vite HTML entry. |

`src/app/index.tsx` mounts StrictMode and Redux; `App.tsx` supplies QueryClient and AuthContext. Routes are `/`, `/collection/tracks`, `/auth/signup`, and `/auth/login`. The exported Collection page is not mounted as a route component. The Track widget assembles audio playback, seeking, volume, repeat/shuffle, and previous/next controls; some other controls are UI scaffolding.

The backend is outside this repository. `src/shared/config/config.ts` hardcodes `http://localhost:3000`; it serves auth/collection endpoints and `/media/{id}/` metadata, MP3s, and covers. No environment setup template or backend startup instructions were found.

## Commands
```sh
npm ci             # Install dependencies from package-lock.json
npm run dev        # Vite development server
npm run lint       # ESLint
npm run build      # TypeScript project build checks, then Vite production build
npm run preview    # Serve the production build locally
```
No `test` script, test runner, test files, or CI workflow was found. No project-specific Node version is pinned; use a runtime compatible with the locked dependencies.

## Conventions and development patterns
- Feature-oriented layers resembling Feature-Sliced Design: app → pages/widgets → features/entities/shared. 
- Feature folders commonly separate `ui/`, `model/`, and `api/`; components use PascalCase, hooks/functions camelCase, and slices `*Slice.ts`.
- Functional components, hooks, relative imports, and barrel exports. Most app code uses two-space indentation, double quotes, and semicolons; 
- Redux Toolkit `createSlice`, typed PayloadAction, selectors, RootState/AppDispatch exports; local interaction state uses React hooks.
- For API integration use TanStack Query. 
- Strict TypeScript includes unused-symbol checks, type-only imports, and switch fallthrough checks. Tailwind utilities coexist with shared CSS classes/theme tokens.

## Security and modification boundaries
For future changes, preserve unrelated work, keep lockfile edits tied to dependency changes, and avoid committing generated `dist/`, `node_modules/`, or credentials. 

Observed gaps requiring attention before production:
- AuthContext trusts a localStorage `userId`; collection requests send that ID in query parameters. The shared client supplies no auth token or explicit credential policy. Server-side authentication and ownership checks must be verified separately.

## Validation before finishing future tasks
1. Review applicable guidance and the initial Git diff; keep the change scoped and preserve existing work.
2. Install dependencies if needed, then run `npm run lint` and `npm run build`; distinguish baseline failures from regressions. Existing unused symbols suggest build/lint failures may already exist.
3. With the separate backend available, smoke-test affected routes, signup/login/logout, library loading, and playback/seek/volume/repeat/shuffle/track transitions as relevant. Include reloads, missing data, and API failures; `/collection/tracks` currently assumes its playlist exists in Redux.
4. Check browser console/network errors, layout, keyboard access, and labels for affected UI. Preview the production build when build/runtime behavior changes.
5. Review the final diff for unintended files, sensitive data, and dependency churn; report actual validation and limitations.