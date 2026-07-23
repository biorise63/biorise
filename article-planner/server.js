const http = require('http')
const fs = require('fs')
const path = require('path')
const { URL } = require('url')

const PORT = process.env.ARTICLE_PLANNER_PORT || 3077
const ROOT = __dirname
const PUBLIC_DIR = path.join(ROOT, 'public')
const DATA_FILE = path.join(ROOT, 'data', 'articles.json')

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify(payload, null, 2))
}

function readArticles() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
}

function writeArticles(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + '\n', 'utf-8')
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
      if (body.length > 5 * 1024 * 1024) {
        reject(new Error('Body too large'))
        req.destroy()
      }
    })
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch (error) {
        reject(error)
      }
    })
    req.on('error', reject)
  })
}

function serveStatic(req, res, pathname) {
  const safePath = pathname === '/' ? '/index.html' : pathname
  const filePath = path.join(PUBLIC_DIR, safePath)
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403)
    res.end('Forbidden')
    return
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404)
      res.end('Not found')
      return
    }
    const ext = path.extname(filePath).toLowerCase()
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    })
    res.end(data)
  })
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`)

  if (req.method === 'GET' && url.pathname === '/api/articles') {
    try {
      const articles = readArticles()
      sendJson(res, 200, { articles })
    } catch (error) {
      sendJson(res, 500, { error: 'Failed to read articles' })
    }
    return
  }

  if (req.method === 'POST' && url.pathname === '/api/articles') {
    try {
      const payload = await parseBody(req)
      if (!payload || !Array.isArray(payload.articles)) {
        sendJson(res, 400, { error: 'Payload must contain articles array' })
        return
      }
      writeArticles(payload.articles)
      sendJson(res, 200, { ok: true, updatedAt: new Date().toISOString() })
    } catch (error) {
      sendJson(res, 500, { error: 'Failed to save articles' })
    }
    return
  }

  serveStatic(req, res, url.pathname)
})

server.listen(PORT, () => {
  console.log(`Article planner running at http://localhost:${PORT}`)
})
