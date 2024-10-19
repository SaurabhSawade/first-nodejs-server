const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    let filePath = './public' + req.url;
    
    // Handle specific routes for home, about, and contact
    if (req.url === '/') {
        filePath = './public/home.html';
    } else if (req.url === '/about') {
        filePath = './public/about.html';
    } else if (req.url === '/contact') {
        filePath = './public/contact.html';
    }

    // Get the file's extension to determine the content type
    const extname = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found, serve the 404 page
                fs.readFile('./public/404.html', (error, pageContent) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(pageContent, 'utf-8');
                });
            } else {
                // Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Serve the file with the correct content type
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});