import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
    base: process.env.VITE_APP_DOMAIN,
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Exit Survey Admin',
                short_name: 'ExitSurvey',
                start_url: process.env.VITE_APP_DOMAIN,
                display: 'standalone',
                background_color: '#ffffff',
                theme_color: '#0d6efd',
                icons: [
                    {
                        src: './favicon.ico',
                        sizes: '64x64 32x32 24x24 16x16',
                        type: 'image/x-icon',
                    },
                    {
                        src: './logo192.png',
                        type: 'image/png',
                        sizes: '192x192',
                    },
                    {
                        src: './logo512.png',
                        type: 'image/png',
                        sizes: '512x512',
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        port: 3000,
        open: true,
    },
    build: {
        outDir: 'build',
        emptyOutDir: true,
    },
});
