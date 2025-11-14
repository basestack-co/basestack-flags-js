import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: "esm",
  target: "es2020",
  platform: "neutral",
  outDir: "dist",
  sourcemap: true,
  dts: true,
  clean: true,
  treeshake: true,
  minify: true,
});
