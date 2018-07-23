const MarkdownIt = require("markdown-it"),
  md = new MarkdownIt();

//requiring path and fs modules
const path = require("path");
const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const ejsLint = require("ejs-lint");
//joining path of directory
let directoryPath = path.join(__dirname, "content");
//passsing directoryPath and callback function

const indexHtmlFormat = fs.readFileSync("./public/index.html", "utf8");
const sidebarHtmlFormat = fs.readFileSync("./public/sidebar.html", "utf8");
const listHtmlFormat = fs.readFileSync("./public/list.html", "utf8");
const homeHtmlFormat = fs.readFileSync("./public/home.html", "utf8");
const articleHtmlFormat = fs.readFileSync("./public/article.html", "utf8");
const headerHtmlFormat = fs.readFileSync("./public/header.html", "utf8");

// md파일에서 사용자가 입력한 값 추출하기
function extractedValue(md) {
  string = md.match(/\n*(\+\+\+)\n*([\s\S]+)\n*(\+\+\+)/);

  if (string === null) {
    value = { title: "", date: "" };
    return value;
  } else {
    str = string[2].match(/[^\r\n]+/g);
    let extractedValue = {};
    str.forEach(value => {
      if (value !== " ") {
        let valueline = value.match(/(.+)[=\n](.+)/);
        if (valueline != null) {
          key = valueline[1].replace(/\s/g, "");
          value = valueline[2].replace(/['"]*/g, "").replace(/\s/g, "");
          extractedValue[key] = value;
        }
      }
    });
    return extractedValue;
  }
}

// md 파일에서 사용자가 입력한 값을 제외한 본문 추출하기
function extractedBody(md) {
  return md.replace(/\n*(\+\+\+)\n*([\s\S]+)\n*(\+\+\+)/, "");
}

// 폴더 만들어주기
let dir = "./deploy/category";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// 사용자 정보 읽기
const author = fs.readFileSync("./content/author/author.md", "utf8");
const authorValue = extractedValue(author);

// content 안에 있는 directories 읽기
let directories = fs.readdirSync(directoryPath);

// header
const header = ejs.render(headerHtmlFormat, {
  author: authorValue,
  postNum: 0,
  categoryNum: 0
});
// sidebar
const sidebar = ejs.render(sidebarHtmlFormat, {
  categories: directories
});
// articles
let articles = [];

directories.forEach((directory, index) => {
  let files = fs.readdirSync(`./content/${directory}`);
  let articleValue = [];
  files.forEach(file => {
    // markdown to html file article
    const markdownFile = fs.readFileSync(
      `./content/${directories[index]}/${file}`,
      "utf-8"
    );

    let value = extractedValue(markdownFile);
    let body = extractedBody(markdownFile);

    let convertedFile = md.render(body);
    articleValue.push(value);

    let article = ejs.render(articleHtmlFormat, {
      body: convertedFile,
      article: value
    });
    let html = ejs.render(indexHtmlFormat, {
      main: article,
      sidebar: sidebar,
      header: header
    });
    let n = file.indexOf(".");
    let fileName = file.slice(0, n);
    if (value.category !== undefined) {
      let dir = `./deploy/${value.category}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      fs.writeFileSync(`./deploy/${value.category}/${fileName}.html`, html);
    }

    articles.push({ convertedFile, value });
    console.log(article);
    // ./deploy에 카테고리별로 파일을 생성한다.
  });

  let main = ejs.render(listHtmlFormat, {
    fileList: files,
    category: directory,
    articles: articleValue
  });
  let indexHtml = ejs.render(indexHtmlFormat, {
    header: header,
    folderList: directories,
    main: main,
    sidebar: sidebar
  });

  fs.writeFileSync(`./deploy/category/${directory}.html`, indexHtml);

  // articlesValue.push(...articleValue);
});

// 홈화면
main = ejs.render(homeHtmlFormat, {
  articles: articles
});
html = ejs.render(indexHtmlFormat, {
  main,
  sidebar,
  header
});

fs.writeFileSync("./index.html", html);
