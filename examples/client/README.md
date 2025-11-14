## Client Example (Vite + Bun)

This minimal Vite application uses Bun as the package manager/runtime to verify the SDK works in a browser environment.

### Running

```bash
cd examples/client
bun install
bun run dev
```

Set `VITE_PROJECT_KEY` and `VITE_ENVIRONMENT_KEY` in a `.env` file or your shell before starting the dev server so the SDK can authenticate.

### Production Build

```bash
bun run build
bun run preview
```

The dependency on `@basestack/flags-js` points to the workspace root via `link:../..`, so be sure to run `bun run build` at the root before trying the example so the `dist/` output exists.
