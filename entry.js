#!/usr/bin/env node
import fs from "fs";

const html = fs.readFileSync("index.html", "utf-8");

switch (process.argv[2]) {
  case "ts":
    ts();
    break;
  case "js":
    js();
    break;
}

function ts() {
  fs.writeFileSync(
    "index.html",
    html.replace("/js/client/entry-client.js", "/src/client/entry-client.tsx"),
  );
}

function js() {
  fs.writeFileSync(
    "index.html",
    html.replace("/src/client/entry-client.tsx", "/js/client/entry-client.js"),
  );
}
