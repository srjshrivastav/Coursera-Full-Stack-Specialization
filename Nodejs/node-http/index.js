const http = require("http");

const hostName = "localHost";
const port = "3000";

const server = http.createServer((req, resp) => {
  console.log("These are the haeders  ", req.headers);
  console.log("These are the method  ", req.method);
  resp.statusCode = 200;
  resp.setHeader("content-type", "text/html");
  resp.end("<html><body><h1>Hello, World!</h1></body></html>");
});

server.listen(port, hostName, () => {
  console.log(`Server listning at :http://${hostName}:${port}`);
});
