const http = require("http");
const fs = require("fs");
const path = require("path");

const hostName = "localHost";
const port = "3000";

const server = http.createServer((req, resp) => {
  console.log(
    "Request for " + req.url + " by method " + req.method,
    "URl :",
    req.url
  );
  if (req.method == "GET") {
    var fileUrl;
    if (req.url == "/") fileUrl = "/index.html";
    else fileUrl = req.url;
    var filePath = path.resolve("./public" + fileUrl);
    console.log("Resolved filePath :", filePath);
    const fileExt = path.extname(filePath);
    console.log("FileExtension :", fileExt);
    if (fileExt == ".html") {
      fs.exists(filePath, (exists) => {
        if (!exists) {
          resp.statusCode = 404;
          resp.setHeader("Content-Type", "text/html");
          resp.end(
            "<html><body><h1>Error 404: " +
              fileUrl +
              " not found</h1></body></html>"
          );
          return;
        }
        resp.statusCode = 200;
        resp.setHeader("Content-Type", "text/html");
        fs.createReadStream(filePath).pipe(resp);
      });
    } else {
      resp.statusCode = 404;
      resp.setHeader("Content-Type", "text/html");
      resp.end(
        "<html><body><h1>Error 404: " +
          fileUrl +
          " not a HTML file</h1></body></html>"
      );
    }
  } else {
    resp.statusCode = 404;
    resp.setHeader("Content-Type", "text/html");
    resp.end(
      "<html><body><h1>Error 404: " +
        req.method +
        " not supported</h1></body></html>"
    );
  }
});

server.listen(port, hostName, () => {
  console.log(`Server listning at :http://${hostName}:${port}`);
});
