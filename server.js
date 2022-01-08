const http = require("http");
const fs = require("fs");
const path = require("path");

const [branches] = require("./data/marketBranches");
const [workers] = require("./data/marketWorkers.json");
const [products] = require("./data/marketProducts.json");

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
        path.resolve(__dirname, "./data/markets.json"),
        (err, data) => {
          if (err) throw err;
          const foundMarket = JSON.parse(data).filter((e) => e.id == marketsId);

          console.log({
            foundMarket,
            branches: branches,
            workers: workers,
            products: products,
          });
        }
      );

      res.end("marketInfo:");
    }
  }

  if (req.method == "POST") {
    if (req.url == "/newMarket") {
      req.on("data", (chunk) => {
        const newMarket = JSON.parse(chunk);
        fs.readFile(
          path.resolve(__dirname, "./data/markets.json"),
          (err, data) => {
            if (err) {
              console.log(err);
            }
            data = JSON.parse(data);
            data.push(newMarket);
            fs.writeFile(
              path.resolve(__dirname, "./data/markets.json"),
              JSON.stringify(data, null, 4),
              (err) => {
                if (err) {
                  console.log(err);
                }
              }
            );
          }
        );
      });
      req.on("end", () => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end("Successfully added a new Market🎉");
      });
    }
    if (req.url == "/newBranch") {
      req.on("data", (chunk) => {
        const newMarket = JSON.parse(chunk);
        fs.readFile(
          path.resolve(__dirname, "./data/marketBranches.json"),
          (err, data) => {
            if (err) {
              console.log(err);
            }
            data = JSON.parse(data);
            data.push(newMarket);
            fs.writeFile(
              path.resolve(__dirname, "./data/marketBranches.json"),
              JSON.stringify(data, null, 4),
              (err) => {
                if (err) {
                  console.log(err);
                }
              }
            );
          }
        );
      });
      req.on("end", () => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end("Successfully added new a Market Branch 🎉");
      });
    }
    if (req.url == "/newWorker") {
      req.on("data", (chunk) => {
        const newWorker = JSON.parse(chunk);
        fs.readFile(
          path.resolve(__dirname, "./data/marketWorker.json"),
          (err, data) => {
            if (err) {
              console.log(err);
            }
            data = JSON.parse(data);
            data.push(newWorker);
            fs.writeFile(
              path.resolve(__dirname, "./data/marketWorker.json"),
              JSON.stringify(data, null, 4),
              (err) => {
                if (err) {
                  console.log(err);
                }
              }
            );
          }
        );
      });
      req.on("end", () => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end("Successfully added a new Market Worker🎉");
      });
    }
    if (req.url == "/newProduct") {
      req.on("data", (chunk) => {
        const newProduct = JSON.parse(chunk);
        fs.readFile(
          path.resolve(__dirname, "./data/marketProducts.json"),
          (err, data) => {
            if (err) {
              console.log(err);
            }
            data = JSON.parse(data);
            data.push(newProduct);
            fs.writeFile(
              path.resolve(__dirname, "./data/marketProducts.json"),
              JSON.stringify(data, null, 4),
              (err) => {
                if (err) {
                  console.log(err);
                }
              }
            );
          }
        );
      });
      req.on("end", () => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end("Successfully added a new Market product🎉");
      });
    }
  }
});

server.listen(9000, console.log(9000));
