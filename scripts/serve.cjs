'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT || 4173);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.webp':'image/webp' };
http.createServer((req, res) => {
  let filename;
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    filename = path.resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
  } catch { res.writeHead(400); res.end('Solicitud inválida'); return; }
  if (!filename.startsWith(root + path.sep)) { res.writeHead(403); res.end('Acceso denegado'); return; }
  fs.readFile(filename, (err, data) => {
    if (err) { res.writeHead(404); res.end('Archivo no encontrado'); return; }
    res.writeHead(200, { 'Content-Type':types[path.extname(filename)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, '127.0.0.1', () => console.log(`Bema Vita: http://127.0.0.1:${port}`));
