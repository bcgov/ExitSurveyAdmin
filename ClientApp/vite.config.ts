import ***REMOVED*** defineConfig ***REMOVED*** from 'vite';
import react from '@vitejs/plugin-react';
import ***REMOVED*** VitePWA ***REMOVED*** from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig(***REMOVED***
    plugins: [
        react(),
        VitePWA(***REMOVED***
            registerType: 'autoUpdate',
            manifest: ***REMOVED***
                name: 'Exit Survey Admin',
                short_name: 'ExitSurvey',
                start_url: '/',
                display: 'standalone',
                background_color: '#ffffff',
                theme_color: '#0d6efd',
                icons: [
                    ***REMOVED***
                        src: '/favicon.ico',
                        sizes: '64x64 32x32 24x24 16x16',
                        type: 'image/x-icon',
                  ***REMOVED***
                    ***REMOVED***
                        src: '/logo192.png',
                        type: 'image/png',
                        sizes: '192x192',
                  ***REMOVED***
                    ***REMOVED***
                        src: '/logo512.png',
                        type: 'image/png',
                        sizes: '512x512',
                  ***REMOVED***
                ],
          ***REMOVED***
      ***REMOVED***),
    ],
    resolve: ***REMOVED***
        alias: ***REMOVED***
            '@': path.resolve(__dirname, 'src'),
      ***REMOVED***
  ***REMOVED***
    server: ***REMOVED***
        port: 3000,
        open: true,
  ***REMOVED***
    build: ***REMOVED***
        outDir: 'build',
        emptyOutDir: true,
  ***REMOVED***
***REMOVED***);
