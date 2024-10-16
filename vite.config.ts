import { defineConfig } from 'vite' // this is for type checking(TS)
import react from '@vitejs/plugin-react'
import { resolve } from "path" // it used to construct an absolute path

// https://vitejs.dev/config/
export default defineConfig({
  /* adds react plugin to vite */
  plugins: [react()],
  /* contains setting for vite build process. Vite uses rollup under the hood */
  build: {
    /* specify custom setting for the rollup */
    rollupOptions: {
      /* define the entry points for the build */
      input: {
        popup: resolve(__dirname, "index.html"),
        content: resolve(__dirname, "src/content.ts"),
        background: resolve(__dirname, "src/background.ts")
      },
      // This configuration allows you to control where each output file is placed and what it’s named,
      // which is useful for Chrome extensions as they often require content and background scripts to 
      // be in specific locations.
      output: {
        /* define custom output filenames based on the chunk name */
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === "content" || chunkInfo.name === "background") {
            return "[name].js"
          }
          return "[name].js"
        }
      }
    },
    outDir: "dist"
  }
})
