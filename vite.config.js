import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "GroupsVisualizer",
      fileName: "groups-visualizer",
      formats: ["es"],
    },
    rollupOptions: {
      external: [],
    },
  },
});
