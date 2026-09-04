const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, "dist");

const subdomainPages = {
  "blog.middletonfuneralservices.com": "/blog",
  "flowers.middletonfuneralservices.com": "/flowers",
  "shop.middletonfuneralservices.com": "/shop"
};

app.use(express.static(distPath));

app.get("/", (req, res, next) => {
  if (subdomainPages[req.hostname]) {
    return res.sendFile(path.join(distPath, "index.html"));
  }

  next();
});

// Supports clean URLs such as /blog, /flowers and /shop.
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Application running on port ${PORT}`);
});
