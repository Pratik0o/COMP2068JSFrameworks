// Import required modules
const connect = require('connect');
const http = require('http');
const url = require('url');

// Create a Connect app
const app = connect();

// Function to calculate math operations and return HTML page
function calculate(req, res) {
    const query = url.parse(req.url, true).query;

    const method = query.method;
    const x = parseFloat(query.x);
    const y = parseFloat(query.y);

    // If no method/x/y is provided, show only examples
    if (!method || isNaN(x) || isNaN(y)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
            <head>
                <title>Calculation Examples</title>
                 <meta charset="UTF-8">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
                    h1 { color: #333; }
                    ul { margin-top: 20px; }
                    a { color: #007acc; text-decoration: none; }
                    a:hover { text-decoration: underline; }
                </style>
            </head>
            <body>
                <h1>Calculation Examples</h1>
                <ul>
                    <li>Sample URL: <a href="/lab2?method=add&x=16&y=4">http://localhost:3000/lab2?method=add&x=16&y=4</a> → Output: 16 + 4 = 20</li>
                    <li>Sample URL: <a href="/lab2?method=subtract&x=16&y=4">http://localhost:3000/lab2?method=subtract&x=16&y=4</a> → Output: 16 - 4 = 12</li>
                    <li>Sample URL: <a href="/lab2?method=multiply&x=16&y=4">http://localhost:3000/lab2?method=multiply&x=16&y=4</a> → Output: 16 * 4 = 64</li>
                    <li>Sample URL: <a href="/lab2?method=divide&x=16&y=4">http://localhost:3000/lab2?method=divide&x=16&y=4</a> → Output: 16 / 4 = 4</li>
                </ul>
                <p>To calculate, add query parameters <code>?method=add&x=16&y=4</code> to the URL.</p>
            </body>
            </html>
        `);
        return;
    }

    // Perform calculation if method/x/y are provided
    let result;
    let operator;

    switch (method.toLowerCase()) {
        case 'add':
            result = x + y;
            operator = '+';
            break;
        case 'subtract':
            result = x - y;
            operator = '-';
            break;
        case 'multiply':
            result = x * y;
            operator = '*';
            break;
        case 'divide':
            if (y === 0) {
                res.writeHead(400, { 'Content-Type': 'text/html' });
                res.end('<h1>Error:</h1><p>Division by zero is not allowed.</p>');
                return;
            }
            result = x / y;
            operator = '/';
            break;
        default:
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.end('<h1>Error:</h1><p>Invalid method. Use add, subtract, multiply, or divide.</p>');
            return;
    }

    // Return the calculation result as an HTML page
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
        <html>
        <head>
            <title>Calculation Result</title>
        </head>
        <body>
            <h1>Math Operation Result</h1>
            <p>${x} ${operator} ${y} = <strong>${result}</strong></p>
        </body>
        </html>
    `);
}

// Use the calculate function for all requests
app.use(calculate);

// Create and start the server
http.createServer(app).listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
