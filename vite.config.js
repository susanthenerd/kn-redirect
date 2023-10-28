import {defineConfig} from 'vite';

export default defineConfig({
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: new URL('./ui/popup.html', import.meta.url).pathname,
                background: new URL('./src/background.html', import.meta.url).pathname,
            },
        },
        // Configure minification options for production build
        minify: false,
    },
});
