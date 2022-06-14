const http = require('http');
const fs = require('fs');
const path = require('path');


function sendFile(res, filePath) {
    fs.readFile(path.resolve(__dirname,'public',filePath), function (err,data) {
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
        }
        res.writeHead(200);
        res.end(data);
      });
}

const server = http.createServer((req, res) =>  {
    const url = req.url;
    switch (url) {
        case '/':
           sendFile(res, 'home.html')
            break;
        case '/about':
            sendFile(res, 'about.html')
            break;
        case '/home':
            res.writeHead(302, {
                'Location': '/'
            })
            res.end()
            break;
        case '/contact':
            sendFile(res, 'contact.html')
            break;
        default:
            res.end('<h1>404 Page, page not found!</h1>')
    }
})

server.listen(3000, () => {console.log('Server is Running');})