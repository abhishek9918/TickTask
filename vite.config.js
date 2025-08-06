import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // Compress files >10kb
      algorithm: "gzip", // Also try 'brotliCompress' if server supports it
      ext: ".gz",
    }),
    visualizer({ open: false }),
    ,
    react(),
  ],
});
