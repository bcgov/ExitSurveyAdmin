import ***REMOVED*** defineConfig ***REMOVED*** from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(***REMOVED***
    plugins: [react()],
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
