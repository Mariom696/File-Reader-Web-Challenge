const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const FILES_DIR = path.join(__dirname, 'files');

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>File Reader</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #cfecdf;
                        color: #333;
                        text-align: center;
                        margin: 0;
                        padding: 0;
                    }
                    h2 {
                        color: #2c3e50;
                        margin-top: 50px;
                    }
                    form {
                        margin-top: 20px;
                        padding: 20px;
                        border-radius: 8px;
                        background-color: #ffffff;
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                        display: inline-block;
                    }
                    input[type="text"] {
                        padding: 10px;
                        margin: 10px;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        width: 250px;
                    }
                    button {
                        padding: 10px 20px;
                        background-color: #3498db;
                        color: #fff;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                    button:hover {
                        background-color: #2980b9;
                    }
                    p {
                        font-size: 14px;
                        color: #888;
                        margin-top: 10px;
                    }
                    pre {
                        text-align: left;
                        background-color: #fafafa;
                        padding: 20px;
                        border-radius: 5px;
                        border: 1px solid #ddd;
                        max-width: 80%;
                        margin: 20px auto;
                        white-space: pre-wrap;
                        word-wrap: break-word;
                    }
                </style>
            </head>
            <body>
                <h2>File Reader</h2>
                <form method="GET" action="/read">
                    <input type="text" name="file" placeholder="Enter file name">
                    <button type="submit">Read File</button>
                </form>
                <p>Hint: Only files from the 'files/' folder are allowed.</p>
            </body>
        </html>
    `);
});

app.get('/read', (req, res) => {
    const rawInput = req.query.file;

    if (rawInput.includes("..")) {
        return res.status(403).send("Path traversal detected.");
    }

    const requestedFile = decodeURIComponent(decodeURIComponent(rawInput));

    const filePath = path.join(FILES_DIR, requestedFile);

    console.log("[DEBUG] Raw Input:", rawInput);
    console.log("[DEBUG] Decoded File:", requestedFile);
    console.log("[DEBUG] Full Path:", filePath);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(404).send('File not found or error reading file.');
            return;
        }
        res.send(`<h3>File Contents:</h3><pre>${data}</pre>`);
    });
});

app.listen(PORT, () => {
    console.log(`Challenge running at http://localhost:${PORT}`);
});
