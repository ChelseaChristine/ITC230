const http = require("http");

const callback = (req, res) =>{
    const path = req.url.toLowerCase();

    switch(path) {
      case '/':
        const fs = require("fs");
        console.log("Step 1")
        fs.readFile("home.html", (err, data) => {
        console.log("Step 2")
        if (err) return console.error(err);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data.toString());
        });
        console.log("Step 3")
        break;
      case '/about':
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('About page');
        break;
      default:
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not found');
        break;
      }
    }

http.createServer(callback).listen(process.env.PORT || 3000);