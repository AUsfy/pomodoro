import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set base to the repository name so assets are referenced correctly on GitHub Pages
export default defineConfig({
  base: '/pomodoro/',
  plugins: [react()]
})
