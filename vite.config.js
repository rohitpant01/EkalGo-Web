import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

// ---- Local API Simulator Plugin ----
// This plugin mimics Vercel's behavior locally, allowing you to use 
// the api/ folder with non-VITE_ environment variables.
const localApiSimulator = () => ({
  name: 'local-api-simulator',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url.startsWith('/api/')) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const apiPath = url.pathname.replace('/api/', '');
        const filePath = path.resolve(__dirname, `api/${apiPath}.js`);

        if (fs.existsSync(filePath)) {
          try {
            // Load environment variables for the handler
            const env = loadEnv(server.config.mode, process.cwd(), '');
            Object.assign(process.env, env);

            // Import the handler (Windows fix: Convert to file:// URL)
            const fileUrl = pathToFileURL(filePath).href;
            const module = await import(`${fileUrl}?update=${Date.now()}`);
            const handler = module.default;

            // Mock Vercel response object
            const vercelRes = {
              status: (code) => {
                res.statusCode = code;
                return vercelRes;
              },
              json: (data) => {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
                return vercelRes;
              },
              redirect: (url) => {
                res.writeHead(302, { Location: url });
                res.end();
                return vercelRes;
              }
            };

            // Add query parameters to req
            req.query = Object.fromEntries(url.searchParams);

            // Basic body parsing for POST requests
            if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => { body += chunk.toString(); });
              req.on('end', () => {
                try {
                  req.body = JSON.parse(body);
                  handler(req, vercelRes);
                } catch (e) {
                  vercelRes.status(400).json({ error: 'Invalid JSON body' });
                }
              });
            } else {
              await handler(req, vercelRes);
            }
            return;
          } catch (err) {
            console.error(`API Error (${apiPath}):`, err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
            return;
          }
        }
      }
      next();
    });
  }
});

export default defineConfig({
  plugins: [react(), localApiSimulator()],
  server: {
    port: 5173,
    proxy: {
      '/maps-api': {
        target: 'https://maps.googleapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/maps-api/, ''),
        secure: true,
      },
    },
  },
})
