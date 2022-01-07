const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url.substring(1, 8) == "markets" && req.url.split("/")[2]) {
      const marketsId = req.url.split("/")[2];

      fs.readFile(
        path.resolve(__dirname, "./data/markets.json"),
        (err, data) => {
          if (err) throw err;
          const foundMarkets = JSON.parse(data).filter(
            (e) => e.id == marketsId
          );
          console.log(JSON.parse(data));
          console.log(foundMarkets);

          res.end("markets/1:/2");
        }
      );
      res.end("markets:");
    }
    // if (req.url.substring(9) == "1") {
    //   fs.readFile(path.resolve(__dirname, "./data/markets.js"), (err, data) => {
    //     if (err) throw err;
    //     console.log(data.toString());
    //   });
    // }
  }
});

server.listen(9000, console.log(9000));
