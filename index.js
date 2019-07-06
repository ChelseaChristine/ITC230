const http = require("http");
let animal = require('./lib/module');

const callback = (req, res) =>{
  const querystring = require('querystring');
  let url = req.url.split("?");
  let path = url[0].toLowerCase();
  let queryParams = querystring.parse(url[1]);
  
    switch(path) {
      case '/':
        const fs = require("fs");
        fs.readFile("public/home.html", (err, data) => {
        if (err) return console.error(err);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data.toString());
        });
        break;
      case '/about':
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('this application is for utilizing in my ITC230 class');
        break;
      case '/detail':
        res.writeHead(200, {'Content-Type' : 'text/plain'});
        let found = animal.getItem(queryParams.name);
        let result = (found) ? JSON.stringify(found) : "Not found";
        res.end('Searching for ' +queryParams.name +"\n" + result);
        break;
      case '/delete':
        res.writeHead(404, {'Content-Type': 'text/plain'});
        let remove = animal.deleteItem(queryParams.name);
        let confirm = (remove) ? queryParams.name + " Not Removed" : queryParams.name+ " Removed";
        res.end(confirm);
        break;
      default:
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Oops! 404, Page Not found');
        break;
      }
    }

http.createServer(callback).listen(process.env.PORT || 3000);