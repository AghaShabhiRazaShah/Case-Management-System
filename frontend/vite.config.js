import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: process.env.VITE_BASE_URL || (command === 'build' ? '/Case-Management-System/' : '/'),
  plugins: [react()],
}))

