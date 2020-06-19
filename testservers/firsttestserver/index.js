const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    let filepath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    let extentiontype = path.extname(filepath);
    let contentType = "";
    switch (extentiontype) {
        case '.js':
            contentType == "text/javascript";
            break;
        case '.css':
            contentType == "text/css";
            break;
        case '.json':
            contentType == "application/json";
            break;
        case '.png':
            contentType == "image/png";
            break;
        case '.jpg', "jpeg":
            contentType == "image/jpg";
            break;
        default:
            contentType = "text/html"
            break;
    }
    
    fs.readFile(filepath, (err, content) => {
        if (err) {
            if (err.code == "ENOENT") {
                fs.readFile(
                    path.join(__dirname, "public", "404.html"),
                    (err, content) => {
                        res.writeHead(404, { "Content-Type": "text/html" });
                        res.end(content, "utf8");
                    });
            }else{

                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }


        } else {
            res.writeHead(200, { "Content-type": contentType });
            res.write(content, 'utf-8');
            res.end();
        }


    });

});

server.listen(PORT, () => {
    console.log('server has just started running on ' + PORT);
});