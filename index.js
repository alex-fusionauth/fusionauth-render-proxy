const proxy = require("express-http-proxy");
const app = require("express")();

const port = process.env.PORT || 3001;
const fusionAuthURL =
  process.env.FUSIONAUTH_URL || "fusionauth-app-latest:9011";

app.use(
  "*",
  proxy(`http://${fusionAuthURL}:9011`, (req, res, next) => {
    req.headers["X-Forwarded-Port"] = 443;
    next();
  })
);

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
