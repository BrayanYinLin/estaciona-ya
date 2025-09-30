import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@shared': '/src/shared/',
      '@landing': '/src/modules/landing/',
      '@auth': '/src/modules/auth/',
      '@lessor': '/src/modules/lessor/',
      '@tenant': '/src/modules/tenant/',
      '@modules': '/src/modules/',
      '@': '/src/'
    }
  }
})
