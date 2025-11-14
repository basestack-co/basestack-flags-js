## Server Example (Hono + Bun)

This example verifies the SDK works in a server/Bun runtime by exposing a simple Hono endpoint that fetches a flag.

### Running

```bash
cd examples/server
bun install
PROJECT_KEY=xxx ENVIRONMENT_KEY=yyy bun run dev
```

Then `curl http://localhost:8080` (Bun defaults to port 8080) to see the JSON response.

### Notes

- Dependencies point to the local SDK via `link:../..`. Run `bun run build` from the repo root first so the `dist/` output is fresh.
- Update `src/index.ts` if you want to test other flag slugs or custom behavior.
