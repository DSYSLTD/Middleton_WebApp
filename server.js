const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const distPath = path.join(__dirname, "dist");

app.use(express.static(distPath));

const subdomainRoutes = {
  "blog.middletonfuneralservices.com": "/blog",
  "flowers.middletonfuneralservices.com": "/flowers",
  "shop.middletonfuneralservices.com": "/shop",
};

// Keep the subdomain mapping available to the frontend.
app.get("/", (req, res, next) => {
  const route = subdomainRoutes[req.hostname];

  if (route) {
    res.sendFile(path.join(distPath, "index.html"));
    return;
  }

  next();
});

// Required for React Router clean URLs such as /blog and /shop.
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
