import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/vcube-website/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false
  },
  define: {
    __API_URL__: JSON.stringify(
      command === 'build' 
        ? 'https://ateliervcube.be/server/process-contact.php'
        : 'http://localhost/server/process-contact.php'
    )
  }
})) 