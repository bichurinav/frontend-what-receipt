const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const app = express();
const port = 3100;

const dirname = path.resolve();

app.use(express.static("dist"));

app.use("*", async (_, res) => {
  const html = await fs.readFile(path.join(dirname, "dist", "index.html"));
  res.send(html);
});

app.listen(port);
