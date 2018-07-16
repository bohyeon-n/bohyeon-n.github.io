//requiring path and fs modules
const path = require("path");
const http = require("http");
const fs = require("fs");

//joining path of directory
let directoryPath = path.join(__dirname, "content");
//passsing directoryPath and callback function

directories = fs.readdirSync(directoryPath);
directoryFiles = [];
directories.forEach(directory => {
  const fileDirectoryPath = `${directoryPath}/${directory}`;
  files = fs.readdirSync(fileDirectoryPath);
  files.forEach(f => directoryFiles.push(f));
});

let ejs = require("ejs");
var indexHtmlFormat = fs.readFileSync("./public/index.html", "utf-8");
html = ejs.render(indexHtmlFormat, {
  title: "aaaa",
  fileList: directoryFiles
});

fs.writeFileSync("./deploy/index.html", html);
