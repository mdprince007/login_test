const http = require('http');
const fs = require('fs');
const path = require('path');

const DEFAULT_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5842;
const HOST = '127.0.0.1';

function createServer(port) {
  const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || HOST}`);
    const pathname = parsedUrl.pathname;

    // Handle HTML and static files
    if (req.method === 'GET' || req.method === 'HEAD') {
      let targetFile = null;

      if (pathname === '/law' || pathname === '/firm' || pathname === '/legal' || pathname === '/law.html') {
        targetFile = 'law.html'; // 3D Law Firm Codex Shelf Landing Page
      } else if (pathname === '/' || pathname === '/shelf' || pathname === '/codex' || pathname === '/shelf.html') {
        targetFile = 'shelf.html'; // 3D Workshop Codex Shelf Landing Page
      } else if (pathname === '/login' || pathname === '/login1' || pathname === '/index.html') {
        targetFile = 'index.html'; // First login page
      } else if (pathname === '/login2' || pathname === '/login2.html') {
        targetFile = 'login2.html'; // Second login page
      } else {
        // Dynamic file check (e.g. /login3 -> login3.html or any static file)
        const sanitized = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
        const directPath = path.join(__dirname, sanitized);
        const htmlPath = path.join(__dirname, sanitized + '.html');

        if (fs.existsSync(directPath) && fs.statSync(directPath).isFile()) {
          targetFile = sanitized;
        } else if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
          targetFile = sanitized + '.html';
        }
      }

      if (targetFile) {
        const filePath = path.join(__dirname, targetFile);
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes = {
          '.html': 'text/html; charset=utf-8',
          '.css': 'text/css; charset=utf-8',
          '.js': 'text/javascript; charset=utf-8',
          '.mjs': 'text/javascript; charset=utf-8',
          '.json': 'application/json; charset=utf-8',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.webp': 'image/webp',
          '.svg': 'image/svg+xml',
          '.ico': 'image/x-icon',
          '.woff': 'font/woff',
          '.woff2': 'font/woff2',
          '.ttf': 'font/ttf'
        };

        fs.readFile(filePath, (err, data) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Server Error');
            return;
          }
          res.writeHead(200, {
            'Content-Type': mimeTypes[ext] || 'application/octet-stream',
            'Content-Length': data.length
          });
          if (req.method === 'HEAD') {
            res.end();
          } else {
            res.end(data);
          }
        });
        return;
      }
    }

    // Mock Login Endpoint for both login and login2
    if (req.method === 'POST' && (pathname === '/api/login' || pathname === '/api/login2')) {
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', () => {
        try {
          const payload = JSON.parse(body || '{}');
          const { email, password } = payload;
          const page = pathname === '/api/login2' ? 'Login 2' : 'Login 1';

          console.log(`[${page} ATTEMPT] Email: ${email}`);

          if (!email || !password) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Both Email Address and Password are required.' }));
            return;
          }

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: true,
            message: `Sign in successful on ${page}! Logged in as ${email}`,
            page,
            user: { email }
          }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'Malformed request body' }));
        }
      });
      return;
    }

    // 404 handler
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <div style="font-family:sans-serif; text-align:center; padding: 4rem;">
        <h2>404 - Page Not Found</h2>
        <p>Available pages:</p>
        <p><a href="/login">👉 Page 1: /login</a></p>
        <p><a href="/login2">👉 Page 2: /login2</a></p>
      </div>
    `);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} in use, trying port ${port + 1}...`);
      createServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(port, HOST, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 Server Running on Port: ${port}`);
    console.log(`⚖️  3D Law Firm Codex: http://localhost:${port}/law (or /firm)`);
    console.log(`📚 3D Codex Shelf:    http://localhost:${port}/shelf (or /)`);
    console.log(`👉 Page 1 (Login):     http://localhost:${port}/login`);
    console.log(`👉 Page 2 (Login2):    http://localhost:${port}/login2`);
    console.log(`==================================================\n`);
  });
}

createServer(DEFAULT_PORT);
