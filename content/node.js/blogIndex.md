+++
category = Nodejs
comments = true
date = "20180905"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = [ "Nodejs, Blog"]
title = "정적 블로그 생성기 만들기! "
description = "정적 블로그 생성기 만들기"
front=true


+++

이번 글에선 정적 블로그 생성기를 만드는 방법에 대해 알아보겠습니다. 간단히 말해서 마크다운으로 문서를 작성하고 이를 블로그로 바꿔주는 프로그램을 만드는 것입니다. 제 블로그도 제가 만든 블로그 생성기로 글을 쓰고 있습니다. 아직 부족한 점이 많아 지금도 꾸준히 개선중이지만, 블로그 생성기를 만드는 과정을 공유하고 조언도 얻고자 블로그 생성기 만들기 글을 쓰게 되었습니다.

첫 번째 글에선
간단하게 마크다운을 HTML 로 변경하고, 리스팅 페이지를 보여주는 작업을 해보겠습니다.

이 글의 최종 완성 사이트는 이런 모습입니다. 글 목록과 글 내용을 보여주는 페이지입니다.

![블로그](/img/complete_view.png)

우선 정적 웹페이지란 어떤 것인지에 대해 설명하고, 이후 간단하게 프로토타입을 만들어보겠습니다.

언어는 Nodejs 를 사용합니다. 글을 이해하기 위해 기초적인 Git, JavasSript, Nodejs, HTML, CSS, Markdown 지식이 필요합니다.

## 정적 웹페이지란?

정적 웹 페이지란 서버에 미리 저장된 파일이 그대로 전달되는 웹 페이지입니다.

서버에 있는 데이터들을 스크립트에 의해 **가공처리한 후 생성**되어 전달되는 동적 웹페이지와는 달리, 정적 웹페이지는 서버에 미리 저장된 파일이 **그대로 전달**되는 웹페이지입니다.

블로그는 문서를 보여주는 역할을 하는 사이트입니다. 문서는 정적입니다. 블로그 페이지는 사용자가 글을 올리는 시점을 제외하고는 변하지 않습니다.
블로그의 모든 페이지를 미리 생성하여 서버에 저장할 수 있으므로, 블로그는 정적 웹페이지에 적당한 사이트입니다.

## 정적 사이트 생성기를 만든다는 것은?

정적 사이트를 만들어주는 프로그램을 만드는 것 입니다.

우리가 하려고 하는 작업은 **소스파일**(.md 파일)을 **목적파일**(.html 파일)로 변환하는 일입니다.
글을 쓸 때마다 HTML 파일로 작성하기에는 너무 힘들테니까요. 마크다운 언어로 쉽게 글을 쓰고 나머지는 문제는 프로그램이 알아서 해주도록 만드는 것 입니다.

이미 [Hexo](https://hexo.io/ko/index.html), [Hugo](https://gohugo.io/), [Jekyll](https://jekyllrb.com/) 등 유명한 정적 사이트 생성기가 있습니다. 빠르고 쉽게 멋있는 블로그를 만들고 싶다면 정적 블로그 프레임워크를 사용할 수 있습니다!

## GitHub Page 만들기

우선 HTML 페이지를 인터넷을 통해 사용자에게 서빙하기 위한 호스팅 서비스를 정하겠습니다. 내 컴퓨터에서 만든 HTML 파일을 사용자에게 보여주기 위해선 이러한 호스팅 서비스가 필요합니다.
본 글에선 GitHub 에서 제공하는 [GitHub Pages](https://pages.github.com/) 를 선택했습니다. Github Pages 는 개발자가 개인 블로그를 호스팅하기 위해 많이 쓰이는 플랫폼입니다.
이를 사용하면 우리가 만든 HTML 페이지를 간단하게 다른 사용자에게 보여줄 수 있습니다.

GitHub Pages 를 만드는 방법

1. GitHub 저장소를 새로 만듭니다.
2. 저장소의 이름은 `<usernmae>.github.io` 로 해야 합니다.
3. 로컬 저장소로 연결합니다.
4. 이제 블로그 디렉토리 바로 하위에 index.html 파일을 하나 만들어 내용을 작성합니다.

```
├ 블로그 디렉토리
│  ├ index.html
```

5. 새로 생성한 `index.html` 파일을 원격 저장소에 푸시 합니다.
6. 내 GitHub 사이트(`https://username.github.io/`)에 들어가 사이트가 제대로 빌드되었는지 확인합니다.

나의 첫 번째 블로그 사이트가 완성되었습니다!

![완성 이미지](/img/create-github-page.png)

## 개발환경 구축하기

Markdown 을 HTML 로 변경하기 위해 Nodejs 를 사용할 것입니다. 이를 위해 우선 Nodejs 를 설치해보겠습니다. 저는 아래 글을 통해 개발 환경을 설정했습니다.

[빠르게 배우는 Node.js 와 NPM 설치부터 개념잡기 - Dev.DY](https://kdydesign.github.io/2017/07/15/nodejs-npm-tutorial/)

- _node.js_ 를 설치합니다. Node.js 를 설치하면 NPM 은 자동으로 설치됩니다.
- 블로그 디렉토리에서 커맨드라인에 `npm init -y` 를 실행합니다.
- 블로그 디렉토리에 _package.json_ 파일이 생성되면 성공!

## 블로그에 올릴 컨텐츠 작성하기

먼저 블로그에 올릴 글을 작성해 보도록 하겠습니다. 글은 Markdown 포맷으로 작성하겠습니다. Markdown 이 익숙치 않은 분은 [마크다운 작성법](https://gist.github.com/ihoneymon/652be052a0727ad59601) 링크를 통해 문법을 확인할 수 있습니다.

우선 원본 컨텐츠(markdown)을 저장히기 위한 디렉토리를 만듭니다. 저는 _contents_ 라는 이름으로 디렉토리를 생성했습니다. 그리고 _contents_ 디렉토리 안에 마크다운 포맷으로 된 컨텐츠를 작성합니다. 여기서 만든 마크다운 파일 하나가 블로그 글 하나에 해당됩니다.

저는 아래와 같이 cat, dog, macaron  이라는 세 글을 만들었습니다.

```
├ 블로그 디렉토리
│  ├  contents
│  │ ├  cat.md
│  │ ├  dog.md
│  │ ├  macaron.md
```

## node.js 로 파일 읽기

이제 마크다운을 HTML 파일로 변경해보겠습니다. 앞서 말했듯이 Markdown 은 글을 작성하기 위한 포맷이고, 이를 웹브라우저에서 사용자에게 보여주기 위해선 Markdown 이 아니라 HTML 로 포맷을 변경해야 합니다.

우리가 작성한 컨텐츠는 _contents_ 디렉토리 안에 있으므로 해당 디렉토리를 읽어서 어떤 글이 있는지 확인하고, 이를 HTML 로 변경해야 합니다.
이러한 작업을 해줄 자바스크립트 파일을 블로그 디렉토리 하위에 만들어줍니다. 저는 hello-node.js 라는 이름으로 파일을 만들었습니다.

그럼 파일과 디렉토리는 아래와 같은 모양이 됩니다.

```
├ 블로그 디렉토리
│  ├ contents
│  │ ├  cat.md
│  │ ├  dog.md
│  │ ├  macaron.md
│  ├ hello-node.js
```

이제 hello-node.js 파일 안을 채워봅시다.

하나씩 살펴보겠습니다.

우선 필요한 모듈을 로딩해야 합니다. 여기선 파일의 경로를 다루기 위한 path  모듈과, 파일시스템 처리를 위한 fs 모듈을 사용합니다.

```js
const path = require("path");
const fs = require("fs");
```

이제 우리가 정한 컨텐츠 디렉토리를 훑고 파일을 읽어보겠습니다.

```js
// contents 디렉토리 경로
const directoryPath = path.join(__dirname, "contents");
console.log(directoryPath);
// 디렉토리에 있는 파일 읽기
const contentFiles = fs.readdirSync(directoryPath);
console.log(contentFiles);
```

`path.join(__dirname, "contents")`는 현재 파일의 경로와 'contents' 를 구분문자를 넣어 합쳐주는 메소드입니다. \_\_dirname 은 현재 파일의 디렉토리입니다. directoryPath 에는 contents 디렉토리의 경로가 대입되어 있습니다.

이를 통해 _contents_ 안에 있는 파일들의 목록을 배열형식으로 읽을 수 있습니다.

fs.readdirSync()는 디렉토리의 컨텐츠들을 읽는 메소드입니다. _sync_ 는 동기적 읽기로 파일을 모두 읽은 후 다른 작업을 할 수 있습니다.

그럼 완성된 코드는 아래와 같을 것입니다.

```js
// 모듈
const path = require("path");
const fs = require("fs");

// contents 디렉토리의 경로
const directoryPath = path.join(__dirname, "contents");
// contents 디렉토리에 있는 파일 읽기
const contentFiles = fs.readdirSync(directoryPath);
console.log(contentFiles);
```

_node.js_ 샐행은 커맨드창에 _node hello-node.js_(자바스크립트 파일 이름) 라고 입력하고 실행해주세요. 실행하면 컨맨드 창에 아래와 같이 찍히는 것을 볼 수 있습니다.

```shell
[ 'cat.md', 'dog.md', 'macaron.md' ]
```

여기까지 _contents_ 디렉토리 하위에 있는 파일들의 이름을 읽어오는 데 성공하였습니다.

### 파일의 내용 읽기

이제 Markdown 형식의 파일을 읽고, 이를 변환해 새로운 HTML 파일을 만들고 저장해봅시다.

우선 파일의 내용을 읽어봅시다.

[map 메소드](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map)로 배열내의 모든 요소를 돌면서 파일을 읽습니다.

```js
contentFiles.map(file => {
  const body = fs.readFileSync(`./contents/${file}`, "utf8");
});
```

fs.readFileSync(filename, [options])는 동기 방식으로 파일을 읽는 메서드 입니다. options 에는 보통 인코딩 방식이 오게 되며 웹에서는 'utf8' 을 주로 사용합니다.

## HTML 언어로 변환하기

작성한 마크다운 파일을 자바스크립트로 읽는 것까지 성공했습니다. 이제 이를 HTML 로 변경해봅시다.

이를 위한 라이브러리는 많이 있습니다. 여기선 [markdown-it](https://github.com/markdown-it/markdown-it)을 사용하겠습니다. 사용하기 위해 npm 으로 모듈을 설치하겠습니다.

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

이제 설치한 markdown-it 모듈로 마크다운을 HTML 로 변환해봅시다.

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

markdown-it 과 hljs 모듈을 불러옵니다. 모듈 로딩 시 마크다운을 어떻게 렌더할 것인지 옵션을 설정해줄 수 있습니다. 자세한 내용은 [옵션 항목](https://markdown-it.github.io/markdown-it/)을 참고해주세요.

이제 위에서 파일을 읽을 때 사용했던 map 메소드의 콜백 함수 안에 다음 코드를 추가해주세요.

```js
contentFiles.map(file => {
  const body = fs.readFileSync(`./contents/${file}`, "utf8");
  const convertedBody = md.render(body); // 이 부분을 추가해주세요!
  console.log(convertedBody);
});
```

md.render(body) 함수로 간단하게 마크다운을 HTML 로 변경할 수 있습니다!

이제 실행해봅시다. `node hello-node.js` 를 실행하면 커맨드 창에 HTML 형식으로 변환된 텍스트가 찍히는 것이 보일 것 입니다.

이런 식으로요 !
![markdown-it적용](/img/markdown-it.png)

## EJS 템플릿 엔진

마크다운을 HTML 로 변경해보았습니다. 이제 만든 HTML 코드조각을 합치는 작업을 해야 합니다. 이를 위해 템플릿 엔진을 쓰겠습니다. 템플릿 엔진이란 템플릿 양식과 특정 데이터 모델에 따른 입력자료를 합성하여 결과 문서를 출력하는 소프트웨어 또는 컴포넌트입니다. 자료를 결합하여 페이지를 만들어 내기도 하고 많은 양의 Content 를 표현하는 것을 도와줍니다.

우리는 EJS 라는 템플릿 엔진을 사용해보겠습니다.
EJS 를 쓰면, 아래 문법과 같이 간단한 방법을 통해 템플릿을 적용할 수 있습니다.

- <% code %>
  - 자바스크립트 코드를 넣을 수 있습니다.
- <%=value%>
  - 데이터를 출력할 수 있습니다.
  - HTML 태그 등이 포함되어 있는 경우, 이스케이프 처리된다.
- <%- value %>
  - 마찬가지로 데이터를 출력할 수 있다.
  - HTML 관련 태그가 이스케이프 처리되지 않고 그대로 쓰여진다.

쉽게 생각해서 빈칸이 있는 틀을 만들고, 그 떄 그 때 원하는 내용을 채워넣는 작업을 템플릿 엔진이 해주는 것입니다.

일단, ejs 를 설치해주세요.

```shell
npm install ejs
```

그럼 EJS 를 사용해봅시다.

우선 templates 라는 디렉토리를 하나 만듭니다. templates 디렉토리 안에 블로그에서 사용하는 모든 틀을 작성할 것입니다. 그리고 templates 디렉토리 안에 `layout_format.html` 이라는 파일을 만듭니다. 이 파일은 블로그 글의 레이아웃을 위한 기본 템플릿이 됩니다. 기본 레이아웃 안에 글 내용, 글 목록 등 원하는 컨텐츠를 넣을 수 있습니다.

layout_format.html 에 우리가 넣을 Content 의 빈칸을 만들어 주세요.

이런 식으로요!

![layout_format.html format](/img/layout_format_0.png)

이제 레이아웃 템플릿에 필요한 코드를 추가해보겠습니다. 우선 코드 하이라이팅을 위해 highlightjs 의 코드 블록 스타일을 추가하겠습니다.
위에서 만들었던 layout_format.html 파일의 `<head></head>` 태그 안에 다음의 코드를 추가해주세요.

```
<link rel="stylesheet" href="/node_modules/highlight.js/styles/atelier-cave-light.css">
```

여기서는 `atelier-cave-light.css`스타일을 적용하였습니다.
[highlightjs demo site](https://highlightjs.org/static/demo/)에서 다양한 스타일을 볼 수 있습니다. 원하는 스타일을 적용해보세요.

다음으로는 우리가 만든 레이아웃 템플릿의 빈칸을 채울 또 다른 템플릿을 만들어 봅시다. 큰 틀(layout_format template) 안에 조각으로 된 작은 템플릿(artice_format templates)을 넣는 것 입니다.

글의 내용을 넣을 article 템플릿을 만들어 봅시다.

_templates_ 디렉토리 안에 article_format.html 파일을 만들고 글의 내용을 넣을 body 라는 빈칸을 만들어주세요.

이런 식으로요!
![article_format.html](/img/article_format.png)

처음에 만들었던 _layout_ 템플릿 안에 글의 내용을 넣는 _article_ 템플릿 조각을 넣어서 하나의 페이지를 완성할 수 있습니다.

이제 템플릿 안의 빈칸을 채우고 Article 페이지를 만들어 봅시다.

먼저, 새로 만들어지는 HTML 파일을 생성할 상위 디렉토리인, _deploy_ 를 만들어 줍니다. 직접 만들어도 되지만 조금 더 편리하게 사용하기 위해서 또는 다른 사람도 이 프로그램을 사용할 수 있도록 _deploy_ 디렉토리를 자동으로 생성하는 코드를 추가합니다.

```js
const dir = "./deploy";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
```

그리고 템플릿 엔진을 사용하기 위해 모듈을 불러옵니다.

```js
const ejs = require("ejs");
```

템플릿 엔진을 적용하기 위해 layout_format.html 파일과 article_format.html 파일을 읽는 코드를 작성합니다.

```js
const layoutHtmlFormat = fs.readFileSync(
  "./templates/layout_format.html",
  "utf8"
);
const articleHtmlFormat = fs.readFileSync(
  "./templates/article_format.html",
  "utf8"
);
```

layout_format.html 파일을 읽어 layoutHtmlFormat 변수에 대입해줍니다. article_format.html 파일도 이같은 방식으로 작성합니다. articleHtmlFormat 은 틀이고 빈칸인 body 안에 무엇을 넣을 지 정해줘야 합니다.
map 콜백 함수에 다음의 코드를 추가해주세요

```js
contentFiles.map(file => {
  const body = fs.readFileSync(`./contents/${file}`, "utf8");
  const convertedBody = md.render(body);
  const articleContent = ejs.render(articleHtmlFormat, {
    body: convertedBody
  });
});
```

`ejs.render(str, data, options)` 함수를 통해 HTML 로 변환한 convertedBody(data) 를 indexHtmlFormat(str) 의 빈칸인 body 에 넣어주었습니다. 이제 이 articleContent 를 레이아웃 템플릿 안에 넣어줘야 합니다.

다음의 코드를 추가해주세요.

```js
const articleHtml = ejs.render(layoutHtmlFormat, {
  content: articleContent
});
```

content 에 article 의 내용이 채워진 articleContent 를 넣어주었습니다.

이제 빈칸이 채워진 HTML 언어로 된 text 를 완성하였습니다. 이 text 로 새로운 HTML 파일을 생성해봅시다.

다음 코드를 추가해주세요.

```js
// 확장자를 제외한 파일 이름을 얻는 함수
getHtmlFileName = file => {
  return file.slice(0, file.indexOf(".")).toLowerCase();
};
// deploy 폴더 안에 넣은 파일의 리스트
const deployFiles = [];
// map함수로 content안에 있는 파일들을 반복문을 돌면서 deploy안에 html파일 생성
contentFiles.map(file => {
  const body = fs.readFileSync(`./contents/${file}`, "utf8");

  const convertedBody = md.render(body);
  const articleContent = ejs.render(articleHtmlFormat, {
    body: convertedBody
  });
  const articleHtml = ejs.render(layoutHtmlFormat, {
    content: articleContent
  });
  const fileName = getHtmlFileName(file);
  fs.writeFileSync(`./deploy/${fileName}.html`, articleHtml);
  deployFiles.push(fileName);
});
```

- `fs.writeFileSync(filename, data[, options])`는 filename 의 파일에 [options]의 방식으로 data 의 내용을 동기적으로 쓰는 메소드입니다.
- 지금 _file_ 은 .md 확장자로 된 파일입니다. 그러나 우리가 실제로 생성해야 할 파일은 html 확장자입니다.
- 새로 생성할 filename 에 html 확장자를 넣어 주기 위해서 파일 확장자를 제외한 파일이름을 얻는 fetFileName 함수를 추가하였습니다.
- getFileName 함수
  - 0 부터 '.'이라는 문자가 나오기 전까지 자르고([slice](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)) 이를 소문자([toLowerCase()](https://www.w3schools.com/jsref/jsref_tolowercase.asp))로 변환하였습니다.
  - html 파일은 소문자로 작성하는 것이 좋습니다.

실행을 하면 _deploy_ 디렉토리 안에 html 파일들이 만들어진 것을 볼 수 있습니다.

렌더링된 모습은 이렇습니다!
![고양이 페이지](/img/cat1.png)

브라우저에 어떻게 렌더링되는 지 바로 확인하고 싶다면

```
npm install -g live-server
```

[live-server](https://www.npmjs.com/package/live-server) 를 설치하고 커맨드창에 live-server 를 입력하면 로컬에 서버를 띄워서 확인해 볼 수 있습니다.

### 목록 페이지 만들기

마크다운으로 작성한 글을 HTML 로 변경하여 웹 페이지를 만드는 작업을 했습니다. 하지만 블로그에 어떤 글이 있는지 알기 위해선 현재 블로그의 글 목록을 리스팅하기 위한 페이지가 필요합니다. 이를 만들어보도록 하겠습니다.

GitHub Pages 는 블로그 디렉토리 바로 하위에 있는 index.html 파일을 가장 먼저 렌더링해줍니다. index.html 파일은 블로그로 접속했을 때 가장 처음 보이는 화면이 됩니다.

```
├ 블로그 디렉토리
│ ├ index.html
```

index.html 파일을 생성해 우리가 만든 파일로 이동할 수 있는 목록 페이지를 만들어보겠습니다.

일단 templates 디렉토리 하위에 list_format.html 파일을 생성합니다.

![list.html format](/img/list_format.png)

다음의 코드를 hello-node.js 파일에 추가합니다.

```js
// list_format.html파일 읽기
const listHtmlFormat = fs.readFileSync("./templates/list_format.html", "utf8");

// index.html파일 생성 / 파일 목록 렌더
const listContent = ejs.render(listHtmlFormat, {
  lists: deployFiles
});
const listHtml = ejs.render(layoutHtmlFormat, {
  content: listContent
});

fs.writeFileSync("./index.html", listHtml);
```

node hello-node.js 를 실행하면 홈 화면이 완성됩니다.

![리스트 홈화면](/img/list1.png)

위에서 deployFiles 라는 배열을 만들었습니다. 이 배열에는 새로만든 파일들의 파일이름이 담겨있었습니다. list_format.html 에 deployFiles 를 lists 로 데이터를 전해주고, 각 배열의 요소는 file_format.html 에서 만들었던 file 이라는 빈칸에 들어가게 됩니다.

이제 생성한 모든 파일을 푸시하면, 내가 만들었던 페이지를 배포할 수 있습니다.

## 마무리

블로그 생성기 만들기 1 단계가 끝났습니다 🎉 목록페이지와 본문페이지를 만드는 것 까지 성공하였습니다!!!😄

다음 편은 제목이나, 날짜 등 다양한 옵션을 받는 것과 블로그를 조금 더 예쁘게 꾸미는 작업을 해보겠습니다.

혹시 오늘 작성한 코드가 궁금하시다면
여기로! [github](https://github.com/bohyhyeon-n/bohyhyeon-n.github.io)
