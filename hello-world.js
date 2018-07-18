//requiring path and fs modules
const path = require("path");
const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const ejsLint = require("ejs-lint");
//joining path of directory
let directoryPath = path.join(__dirname, "content");
//passsing directoryPath and callback function

let fileLists = [];
let directories = fs.readdirSync(directoryPath);
directories.forEach((directory, index) => {
  fileLists.push(fs.readdirSync(`./content/${directory}`));
});
console.log(fileLists);

const indexHtmlFormat = fs.readFileSync("./public/index.html", "utf8");
const sidebarHtmlFormat = fs.readFileSync("./public/sidebar.html", "utf8");
const mainHtmlFormat = fs.readFileSync("./public/main.html", "utf8");
const homeHtmlFormat = fs.readFileSync("./public/home.html", "utf8");

let sidebar = ejs.render(sidebarHtmlFormat, {
  folderList: directories
});

fileLists.forEach((fileList, index) => {
  let main = ejs.render(mainHtmlFormat, {
    fileList: fileList,
    folderName: directories[index]
  });
  let html = ejs.render(indexHtmlFormat, {
    folderList: directories,
    main: main,
    sidebar: sidebar
  });

  fs.writeFileSync(`./deploy/${directories[index]}.html`, html);
});

html = ejs.render(indexHtmlFormat, {
  sidebar: sidebar,
  main: homeHtmlFormat
});
fs.writeFileSync("./deploy/home.html", html);
