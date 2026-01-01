import { createServer } from 'node:http';
import server from './dist/server/server.js';

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

const httpServer = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    
    // Build the request
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach(v => headers.append(key, v));
        } else {
          headers.set(key, value);
        }
      }
    }

    // Read body for non-GET requests
    let body = null;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      body = Buffer.concat(chunks);
    }

    const request = new Request(url.toString(), {
      method: req.method,
      headers,
      body,
      duplex: 'half',
    });

    // Call the TanStack Start fetch handler
    const response = await server.fetch(request);

    // Send response
    res.statusCode = response.status;
    res.statusMessage = response.statusText;

    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }

    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (error) {
    console.error('Server error:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
});

httpServer.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
