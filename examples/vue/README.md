## Vue Example (Vite + Bun)

This Vue + Vite application mirrors the plain client setup and uses the same `FlagsSDK` configuration pulling credentials from `import.meta.env`.

### Run

```bash
cd examples/vue
bun install
VITE_PROJECT_KEY=xxx VITE_ENVIRONMENT_KEY=yyy bun run dev
```

Open [http://localhost:5175](http://localhost:5175) to see the flag output.

### Build

```bash
bun run build
bun run preview
```

The dependency on `@basestack/flags-js` is linked to the repo root, so run `bun run build` in the root project before testing.
