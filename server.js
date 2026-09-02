import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DIST_DIR = path.resolve(__dirname, 'dist');

// Serve static assets from the Vite build directory with long cache expiration
app.use(
  express.static(DIST_DIR, {
    maxAge: '1y',
    immutable: true,
    index: false,
  })
);

// Optional API / Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// SPA fallback: Serve index.html for all non-static GET requests
app.get('*', (req, res) => {
  const indexPath = path.join(DIST_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(503).send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>Application Starting</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #fdfaf7; color: #411548; }
            .card { background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); text-align: center; max-width: 480px; }
            h1 { margin-top: 0; font-size: 1.5rem; }
            p { color: #555; line-height: 1.6; }
            code { background: #f3e8f4; padding: 0.2rem 0.4rem; border-radius: 4px; font-size: 0.9em; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Build Required</h1>
            <p>The frontend build is not yet generated in the <code>dist/</code> folder.</p>
            <p>Please run <code>npm run build</code> in the project directory to generate the static files.</p>
          </div>
        </body>
      </html>
    `);
  }
});

// Start listening on all available network interfaces
const HOST = process.env.HOST || '0.0.0.0';
app.listen(Number(PORT) || 3000, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});

export default app;
