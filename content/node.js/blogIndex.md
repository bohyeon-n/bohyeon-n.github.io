+++
category = Python
comments = true
date = "20180903"
draft = false

showpagemeta = true
showcomments = false
slug = ""
tags = [ "Python"]
title = "정적 블로그 생성기 만들기! "
description = "Sorting in Python"
front = true
show="false"
+++

## 정적 웹페이지란?

정적 웹 페이지란 서버에 미리 저장된 파일이 그대로 전달되는 웹 페이지입니다.

서버는 이미 완성된 HTML 파일을 클라이언트의 요청에 따라 보내주는 역할만 하게 됩니다.

블로그는 문서를 보여주는 역할을 하는 웹페이지입니다. 문서는 정적입니다. 블로그 페이지는 사용자가 글을 올리는 시점을 제외하고는 변하지 않습니다.
블로그의 모든 페이지를 미리 생성할 수 있으므로, 정적 웹페지에 적당하다고 할 수 있습니다.

## 정적 사이트 생성기를 만든다는 것은?

정적 사이트를 만들어주는 프로그램을 만드는 것 입니다.

우리가 하려고 하는 작업은 **소스파일**(.md 파일)을 **목적파일**(.html 파일)로 변환하는 일 입니다.

글을 쓸 때마다 HTML 파일로 작성하기에는 너무 힘들테니까요. 마크다운 언어로 쉽게 글을 쓰고 나머지는 문제는 프로그램이 알아서 해주도록 만드는 것 입니다.

이미 Hexo, Hugo, Jekyll 등 유명한 정적 사이트 생성기가 있습니다. 빠르고 쉽게 멋있는 블로그를 싶다면 정적 블로그 프레임워크를 사용할 수 있습니다!

## GitHub Page 만들기

GitHub 에서는 [GitHub Pages](https://pages.github.com/) 라는 호스팅 서비스를 제공하고 있습니다. 이를 이용하면 개인 페이지를 무료로 생성할 수 있습니다.

1. GitHub 저장소를 새로 만듦니다.

2. 저장소의 이름은 `<usernmae>.github.io` 로 해야 합니다.

3. 로컬 저장소로 연결합니다.

4. 이제 블로그 디렉토리 바로 하위에 index.html 파일을 하나 만들어 내용을 넣습니다.

```
├ 블로그 디렉토리
│  ├ index.html
```

5. 새로 생성한 `index.html` 파일을 원격 저장소에 푸시 합니다.

6. 내 GitHub 사이트(`https://username.github.io/`)에 들어가 사이트가 제대로 빌드되었는지 확인합니다.

나의 첫 번째 블로그 사이트가 완성되었습니다!

![완성 이미지](/img/create-github-page.png)

## 개발환경 구축하기

**node.js 와 npm 설치**

[빠르게 배우는 Node.js 와 NPM 설치부터 개념잡기 - Dev.DY](https://kdydesign.github.io/2017/07/15/nodejs-npm-tutorial/)

- _node.js_ 를 설치합니다.(node.js 를 설치하면 npm 은 자동으로 설치됩니다. )

- 블로그 디렉토리에서 커맨드라인에 `npm init -y` 실행

- 블로그 디렉토리에 _package.json_ 파일이 생성되면 성공!

## 블로그에 올릴 글 작성하기

먼저 블로그에 올릴 글을 작성해 보도록 하겠습니다.

1. 디렉토리를 하나 만듦니다. 저는 _contents_ 로 디렉토리를 만들었습니다.
2. _contents_ 디렉토리 안에 마크다운 파일을 원하는 만큼 만들고 원하는 내용을 마크다운 언어로 작성해주세요.

[마크다운 작성법](https://gist.github.com/ihoneymon/652be052a0727ad59601)

저는 이렇게 만들었습니다!

```
├ 블로그 디렉토리
│  ├  contents
│  │ ├  cat.md
│  │ ├  dog.md
│  │ ├  macaron.md
```

## node.js 로 파일 읽기

HTML 파일로 변환하기 위해서는 먼저 _contents_ 디렉토리 안에 만들었던 파일들을 읽어와야 합니다.

### 자바스크립트 파일 만들기

블로그 디렉토리와 디렉토리 안에 있는 파일들을 읽는 작업을 해줄 자바스크립트 파일을 블로그 디렉토리 하위에 만들어줍니다.

```
├ 블로그 디렉토리
│  ├ contents
│  │ ├  cat.md
│  │ ├  dog.md
│  │ ├  macaron.md
│  ├ hello-node.js
```

### _contents_ 디렉토리의 파일 목록 읽기

-- hello-node.js file

```js
const path = require("path");
const fs = require("fs");

// contents 디렉토리 경로
const directoryPath = path.join(__dirname, "contents");
console.log(directoryPath);
// 디렉토리에 있는 파일 읽기
const contentFiles = fs.readdirSync(directoryPath);
console.log(contentFiles);
```

위에서 부터 하나씩 살펴보겠습니다.

- _fs_ 모듈은 FileSystem 의 약자로 파일 처리와 관련된 모듈입니다.
- _path_ 모듈은 파일의 경로를 다루기 위한 모듈입니다.
- _sync_ 가 붙은 것은 동기적 읽기는 것으로 파일을 모두 읽은 후 다른 작업을 해야 하므로 다 읽기 전에는 다른 작업을 할 수 없도록 동기적 읽기를 사용하였습니다.
- \_\_dirname 은 현재 파일의 경로입니다.
- `path.join(__dirname, "contents")`는 현재 파일의 경로와 'contents' 를 구분문자를 넣어 합쳐주는 메소드입니다. directoryPath 에는 contents 디렉토리의 경로가 대입되어 있습니다.

- fs.readdirSync()는 디렉토리의 컨텐츠들을 읽는 메소드입니다.

- _contents_ 안에 있는 파일들의 목록을 배열형식으로 읽을 수 있습니다.
  `[ 'cat.md', 'dog.md', 'macaron.md' ]`이렇게요!

참고로 _node.js_ 샐행은 커맨드창에 _node hello-node.js_(자바스크립트 파일 이름) 라고 입력하고 실행해주세요.

여기까지 _contents_ 디렉토리 하위에 있는 파일들의 이름을 읽어오는 데 성공하였습니다.

### 파일의 내용 읽기

파일의 내용을 읽고 변환하여 새로운 HTML 파일을 만들기 위해서
일단 파일의 내용을 읽어와야 합니다.

map 메소드로 배열내의 모든 요소를 돌면서 파일을 읽습니다.

[map() 메소드 MDN 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

```js
contentFiles.map(file => {
  const body = fs.readFileSync(`./contents/${file}`, "utf8");
  console.log(body);
});
```

- fs.readFileSync(filename, [options])
- options 에는 보통 인코딩 방식이 오게 되며 웹에서는 'utf8' 을 주로 사용합니다.

## HTML 언어로 변환하기

### markdown-it , highlightjs 설치하기

파일의 내용을 읽어왔다면, 이 파일의 내용을 마크다운 언어에서 HTML 언어로 변환해주어야 합니다.
이 작업을 대신 해줄 [markdown-it](https://github.com/markdown-it/markdown-it) 모듈을 설치해주세요.

```
npm install markdown-it --save
```

설치가 완료되면 package.json 파일의 dependencies 에 markdown-it 이 추가된 것을 볼 수 있습니다.

```js
  "dependencies": {
    "markdown-it": "^8.4.2"
  }
```

[highlightjs](https://highlightjs.org/) 도 설치해주세요. 코드를 예쁘게 보여주는 모듈입니다.

```
npm install highlight.js
```

### markdown-it 사용하기

```js
const hljs = require("highlight.js");

const md = require("markdown-it")({
  html: false,
  xhtmlOut: false,
  breaks: false,
  langPrefix: "language-",
  linkify: true,
  typographer: true,
  quotes: "“”‘’",
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  }
});
```

1. markdown-it 과 hljs 모듈을 불러옵니다.
2. 마크다운을 어떻게 렌더할 것인지 옵션을 설정해줍니다.

이제 위에서 파일을 읽을 때 사용했던 map 메소드의 콜백 함수 안에 다음 코드를 추가해주세요.

```js
contentFiles.map(file => {
  const body = fs.readFileSync(`./contents/${file}`, "utf8");
  const convertedBody = md.render(body); // 이 부분을 추가해주세요
  console.log(convertedBody);
});
```

node hello-node.js 를 실행하면 커맨드 창에 html 형식으로 변환된 텍스트가 보일 것 입니다.

이런식으로요 !

![markdown-it적용](/img/markdown-it.png)

## EJS 템플릿 엔진

마크다운을 html 로 변환하였다면 [EJS](http://ejs.co/) 템플릿 엔진을 사용해보겠습니다.

### 템플릿 엔진이란?

템플릿 엔진이란, 템플릿을 읽어 엔진의 문법과 설정에 따라서 파일을 HTML 형식으로 변환시키는 모듈입니다.

### EJS 사용법

ejs 페이지를 작성할 때, 몇 가지 특수한 태그들을 사용할 수 있습니다.

- <% code %> : 자바스크립트 코드를 넣을 수 있습니다.
- <%=value%> : 데이터를 출력할 수 있습니다.

쉽게 생각해서 빈칸이 있는 틀을 만드는 것입니다.
HTML 에 빈 칸을 만들고 그 빈 칸에 그때 그때 원하는 내용을 채워넣는 것 입니다.

### EJS 사용하기

1. templates 라는 디렉토리를 하나 만듦니다. templates 디렉토리 안에 블로그에서 사용하는 모든 틀을 작성할 것입니다.

2. templates 디렉토리 안에 index.html 이라는 파일을 만들어주세요.

3. index.html 에 우리가 넣을 본문(위에서 html 로 변환하였던 body)의 빈칸을 만들어 주세요.

이런식으로요!
![index.html format](/img/index_format.png)

**highlightjs 스타일 적용하기**

templates 디렉토리의 index.html 파일의 `<head></head>` 태그 안에 다음의 코드를 추가해주세요.

```
<link rel="stylesheet" href="/node_modules/highlight.js/styles/atelier-cave-light.css">
```

`atelier-cave-light.css`스타일을 적용하였습니다.
highlightjs 데모 사이트에서 다양한 스타일을 볼 수 있습니다.

[highlightjs demo site](https://highlightjs.org/static/demo/)

4. body 라는 빈칸을 만들었고, 이제 그 빈칸에 원하는 원하는 문자를 넣을 수 있습니다.

5. 새로만들어지는 html 파일을 생성할 상위 디렉토리인, _deploy_ 를 만들어 줍니다.

6. 직접 만들어도 되지만 조금 더 편리하게 사용하기 위해서 또는 다른 사람도 이 프로그램을 사용할 수 있도록 deploy 디렉토리를 자동으로 생성하는 로직을 추가합니다.

```js
const dir = "./deploy";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
```

- deploy 디렉토리가 없다면 `!fs.existsSync(dir)`

- deploy 디렉토리를 생성해라. `fs.mkdirSync(dir)`
  라는 의미입니다.

```js
const indexHtmlFormat = fs.readFileSync("./templates/index.html", "utf8");
```

- 위에서 만든 index.html 파일을 읽어 indexHtmlFormat 변수에 대입해줍니다.
- indexHtmlFormat 은 틀이고 빈칸에 무엇을 넣을 지 정해줘야 합니다.
- map 콜백 함수에 다음의 코드를 추가해주세요

```js
contentFiles.map(file => {
  const body = fs.readFileSync(`./contents/${file}`, "utf8");
  const convertedBody = md.render(body);

  articleHtml = ejs.render(indexHtmlFormat, {
    body: convertedBody
  });
});
```

`ejs.render(str, data, options);`

- HTML 로 변환한 convertedBody(data) 를 indexHtmlFormat(str) 의 빈칸인 body 에 넣어줍니다.

빈칸이 채워진 HTML 언어로 된 text 를 완성하였습니다.이제 이 text 로 새로운 파일을 생성해야 합니다.

다음 코드를 추가해주세요.

```js
// 확장자를 제외한 파일 이름을 얻는 함수
getHtmlFileName = file => {
  return file.slice(0, file.indexOf(".")).toLocaleLowerCase();
};
// deploy 디렉토리 안에 새로 생성한 파일 리스트
const deployFiles = [];

// map함수로 content안에 있는 파일들을 반복문을 돌면서 deploy안에 html파일 생성
contentFiles.map(file => {
  const body = fs.readFileSync(`./contents/${file}`, "utf8");

  const convertedBody = md.render(body);

  articleHtml = ejs.render(indexHtmlFormat, {
    body: convertedBody
  });

  const fileName = getHtmlFileName(file);
  fs.writeFileSync(`./deploy/${fileName}.html`, articleHtml);
  deployFiles.push(fileName);
});
```

`fs.writeFileSync(file, data[, options])`

- 지금 _file_ 은 .md 확장자로 된 파일이였고 우리가 실제로 생성하는 파일을 html 확장자입니다.
- writeFileSync 메소드에는 html 확장자로 파일을 작성해야 합니다.
- 파일 확장자를 제외한 파일이름을 얻는 함수를 추가하였습니다.
- getFileName
  - 0 부터 '.'이라는 문자가 나오기 전까지 자르고(slice) 이를 소문자(toLocaleLowerCase())로 변환하였습니다.
  - html 파일은 소문자로 작성하는 것이 좋습니다.

그리고 실행을 하면 deploy 디렉토리 안에 html 파일들이 만들어진 것을 볼 수 있습니다.

그리고 실행을 해보면!
![고양이 페이지](/img/cat1.png)

참고로 브라우저에 어떻게 렌더되는 지 바로확인해보고 싶다면

```
npm install -g live-server
```

live-server 를 설치하고 커맨드창에 live-server 를 입력하고 실행하면 로컬에 서버를 띄워서 확인해 볼 수 있습니다.

### 목록 페이지 만들기

GitHub Page 는 블로그 디렉토리 바로 하위에 있는 index.html 파일을 가장 먼저 렌더링해줍니다. 블로그로 접속했을 때 가장 처음 보이는 화면이 됩니다.

```
├ 블로그 디렉토리
│ ├ index.html
```

index.html 파일을 생성해 우리가 만든 파일로 이동할 수 있는 파일 목록을 만들어보겠습니다.

- 일단 templates 디렉토리 하위에 list.html 파일을 생성합니다.
  ![list.html format](/img/list_format.png)

- 다음의 코드를 hello-node.js 파일에 추가합니다.

```js
const listHtml = ejs.render(listHtmlFormat, {
  fileList: deployFiles
});
fs.writeFileSync("./index.html", listHtml);
```

node hello-node.js 를 실행하면
홈 화면 완성!

![리스트 홈화면](/img/list1.png)

- 위에서 deployFiles 라는 배열을 만들었습니다. 이 배열에는 새로만든 파일들의 파일이름이 담겨있었습니다.
- list.html 에 fileList 를 데이터로 전해주고, 각 배열의 요소는 fileName 이라는 빈칸에 들어가게 됩니다.

## 마무리

블로그 생성기 만들기 1 단계가 끝났습니다 🎉

목록을 작성하고 본문을 만드는 것 까지 성공하였습니다!!!😄

다음 편은 제목이나, 날짜 등 다양한 옵션을 받는 것과 블로그를 조금 더 예쁘게 꾸미는 작업을 해보겠습니다.

혹시 오늘 작성한 코드가 궁금하시다면
여기로! [github](https://github.com/bohyhyeon-n/bohyhyeon-n.github.io)
