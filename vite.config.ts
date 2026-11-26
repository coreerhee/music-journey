import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // npm run build cleans dist first using scripts/clean-dist.mjs.
  build: { emptyOutDir: false },
})
