const proxy = require("express-http-proxy");
const app = require("express")();

const port = process.env.PORT || 3001;
const targetServerURL = process.env.TARGET_SERVER_URL || "localhost:9011"; // Use TARGET_SERVER_URL for flexibility

// Proxy all requests to the target server

app.all(
  "*",
  proxy(`http://${targetServerURL}`, {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      // You can add custom middleware here if needed
      proxyReqOpts.headers["X-Forwarded-Port"] = port;
      return proxyReqOpts;
    },
  })
);

const server = app.listen(port, () =>
  console.log(`Proxy server listening on port ${port}!`)
);
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
