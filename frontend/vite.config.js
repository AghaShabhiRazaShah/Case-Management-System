import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // ✅ Hamesha root domain ke liye build karega
  plugins: [react()],
})  