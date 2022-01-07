const http = require("http");
const fs = require("fs");
const path = require("path");

const { branches } = require("./data/marketBranches.json");
console.log(branches);

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url.substring(1) == "markets") {
      fs.readFile(
        path.resolve(__dirname, "./data/markets.json"),
        (err, data) => {
          if (err) throw err;
          console.log(JSON.parse(data));
        }
      );
      res.end("marketlar:");
    }

    if (req.url.substring(1, 8) == "markets" && req.url.split("/")[2]) {
      const marketsId = req.url.split("/")[2];

      fs.readFile(
        path.resolve(__dirname, "./data/markets.json"),
        (err, data) => {
          if (err) throw err;
          const foundMarkets = JSON.parse(data).filter(
            (e) => e.id == marketsId
          );
          console.log(foundMarkets);
        }
      );
      res.end("markets/1:/2");
    }

    if (req.url.substring(1, 11) == "marketInfo" && req.url.split("/")[2]) {
      const marketsId = req.url.split("/")[2];

      fs.readFile(
        path.resolve(__dirname, "./data/marketBranches.json"),
        (err, data) => {
          if (err) throw err;
          const foundMarkets = JSON.parse(data).filter(
            (e) => e.id == marketsId
          );
          console.log(foundMarkets);
        }
      );
      res.end("markets/1:/2");
    }
  }
});

server.listen(9000, console.log(9000));
