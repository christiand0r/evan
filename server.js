const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { loadEnvConfig } = require('@next/env');
const path = require('path');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';

loadEnvConfig(__dirname, dev);

const hostname = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const socket = path.join(__dirname, 'server.sock');

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

if (fs.existsSync(socket)) {
    fs.unlinkSync(socket);
}

app.prepare().then(() => {
    const server = createServer(async (req, res) => {
        try {
            // Be sure to pass `true` as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            const parsedUrl = parse(req.url, true);
            await handle(req, res, parsedUrl);
        } catch (err) {
            console.error('Error occurred handling', req.url, err);
            res.statusCode = 500;
            res.end('Internal server error');
        }
    })
    .once('error', (err) => {
        console.error(err);
        process.exit(1);
    })
    .listen(socket, () => {
        if (fs.existsSync(socket)) {
            fs.chmodSync(socket, '777');
        }
        console.log(`> Ready on http://${hostname}:${port}`)
    });

    process.on('SIGINT', () => {
        server.close();
        process.exit(0);
    });

    process.on('SIGTERM', () => {
        server.close();
        process.exit(0);
    });
});