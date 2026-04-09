const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3001;
const dir = __dirname;

const routes = {
  "/": "index.html",
  "/our-pools": "our-pools.html",
  "/about": "about.html",
  "/admission-policies": "admission-policies.html",
  "/account-creation": "account-creation.html",
  "/faq": "faq.html",
  "/contact": "contact.html",
};

http.createServer((req, res) => {
  const url = req.url.split("?")[0].replace(/\/$/, "") || "/";
  const file = routes[url];
  if (file) {
    const filePath = path.join(dir, file);
    if (fs.existsSync(filePath)) {
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>Page not built yet</h1>");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 — Not Found</h1>");
  }
}).listen(PORT, () => {
  console.log(`COSPA preview running at http://localhost:${PORT}`);
});
