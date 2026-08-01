import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        acomodacoes: resolve(__dirname, 'acomodacoes.html'),
        quarto: resolve(__dirname, 'quarto.html'),
        sobre: resolve(__dirname, 'sobre.html'),
        reserva: resolve(__dirname, 'reserva.html')
      }
    }
  }
});
