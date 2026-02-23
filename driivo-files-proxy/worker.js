export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': 'https://app.driivo.fr',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    const url = new URL(request.url);
    const token = url.searchParams.get('token');
    const expires = url.searchParams.get('expires');

    if (!token || !expires) {
      return new Response('Forbidden - token required', { status: 403 });
    }

    if (Date.now() > parseInt(expires)) {
      return new Response('Link expired', { status: 403 });
    }

    const path = url.pathname;
    const message = path + ':' + expires;

    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(env.SIGNING_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const sig = await crypto.subtle.sign(
      'HMAC',
      key,
      new TextEncoder().encode(message)
    );
    const arr = new Uint8Array(sig);
    let binary = '';
    for (let i = 0; i < arr.length; i++) {
      binary += String.fromCharCode(arr[i]);
    }
    const expected = btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/g, '');

    if (token !== expected) {
      return new Response('Invalid token', { status: 403 });
    }

    const objectKey = path.slice(1);
    const object = await env.R2_BUCKET.get(objectKey);

    if (!object) {
      return new Response('Not found', { status: 404 });
    }

    const headers = new Headers();
    headers.set(
      'Content-Type',
      object.httpMetadata?.contentType || 'application/octet-stream'
    );
    const download = url.searchParams.get('download');
    if (download === '1') {
      const filename = objectKey.split('/').pop() || 'file';
      headers.set('Content-Disposition', 'attachment; filename="' + filename + '"');
    } else {
      headers.set('Content-Disposition', 'inline');
    }
    headers.set('Cache-Control', 'private, max-age=300');
    headers.set('Access-Control-Allow-Origin', 'https://app.driivo.fr');

    return new Response(object.body, { headers });
  },
};
