#!/usr/bin/env node
import fs from "fs";

const html = fs.readFileSync("index.html", "utf-8");

switch (process.argv[2]) {
  case "dev":
    dev();
    break;
  case "js":
    js();
    break;
  case "prod":
    prod();
    break;
}

function dev() {
  fs.writeFileSync("index.html", html.replace("/js/entry-client.js", "/src/entry-client.tsx"));
}

function js() {
  fs.writeFileSync("index.html", html.replace("/src/entry-client.tsx", "/js/entry-client.js"));
}

function prod() {}
