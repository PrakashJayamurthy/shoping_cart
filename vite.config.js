import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({

  plugins: [react()],

  server: {
    port: 5173,
    strictPort: true,

    watch: {
      usePolling: false,
      interval: 100,
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/dist/**'
      ]
    }
  },

  preview: {
    port: 5173
  },

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setupTests.js'
  }

})