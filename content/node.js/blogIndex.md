+++
category = Python
comments = true
date = "20180901"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = [ "Python"]
title = "Sorting in Python "
description = "Sorting in Python"
front = true
show="false"
+++

yes 비전공자도 할 수 있는 정적 블로그 생성기 만들기!

1. 정적 웹페이지란?

정적 웹 페이지란 서버에 미리 저장된 파일이 그대로 전달되는 웹 페이지입니다.

서버는 이미 완성된 HTML 파일을 클라이언트의 요청에 따라 보내주는 역할만 하게 됩니다.

블로그는 문서를 보여주는 역할을 하는 웹페이지입니다.
문서는 정적입니다. 블로그 페이지는 사용자가 글을 올리는 시점을 제외하고는 변하지 않습니다.
블로그의 모든 페이지를 미리 생성할 수 있습니다.

2. 정적 사이트 생성기를 만든다는 것은?

우리가 하려고 하는 일은 정적 사이트 생성기를 만드는 것입니다.
소스파일(.md) -> 목적파일(.html)

마크다운 파일에 글을 쓰고 변환하면 자동으로 블로그에 포스팅을 할 수 있도록 하는 작업을 하는 것 입니다. 글을 쓸 때 마다 html 파일을 작성하는 것은 매우 귀찮은 일이기 때문입니다. 이것을 편리하게 해주는 프로그램을 만드는 것 입니다.

이미 Hexo, Hugo, Jekyll 등 정적 사이트 생성기가 있습니다. 빠르고 쉽게 멋있는 블로그를 싶다면 정적 블로그 프레임워크를 사용할 수 있습니다!

3. 깃헙페이지 만들기

github 에서는 github pages 라는 호스팅 서비스를 제공하고 있습니다. 이를 이용하면 개인 페이지를 무료로 생성할 수 있습니다.

- <usernmae>.github.io 로 저장소 만들면 자동으로 사이트가 만들어집니다.

* 만든 폴더에 index.html 파일을 만들어 내용을 넣습니다.

* 제대로 사이트가 구축되었는지 확인합니다.

완성!

![완성 이미지](/img/create-github-page.png)

4. 개발환경 구축하기

- node.js 와 npm 설치

[빠르게 배우는 Node.js 와 NPM 설치부터 개념잡기 - Dev.DY](https://kdydesign.github.io/2017/07/15/nodejs-npm-tutorial/)

node.js 설치
npm init -y
package.json 파일이 생성되면 완성!

4. 마크다운 파일을 html 파일로 변환하기

우리가 index.html 을 만든 것 처럼 포스팅 하려고 할 때마다 html 파일을 만들기는 매우 어려울 것 입니다.

지금부터 하려고 하는 일은
마크다운 파일로 작성한 글을 html 파일로 변환하여 포스팅하는 것 입니다.

일단 폴더를 하나 만듦니다.
저는 contents 라는 폴더를 만들었습니다.
contents 폴더 안에 마크다운 파일을 만들고 텍스트를 입력해주세요.

저는 이렇게 만들었습니다!

```js
- blog folder

  - contents
      - cat.md
      - dog.md
      - macaron.md
```

2. 새로 생성된 파일을 변환하려면 일단 내 폴더 안에 있는 폴더들과 파일들을 읽어야 합니다.

이 작업을 해줄 자바스크립트 파일을 블로그 폴더에 하나 만듦니다.

```js
- blog foler
  - content
  - hello-node.js <- 파일을 만들어 줍니다.
```

```js
const path = require("path");
const fs = require("fs");
// contents폴더의 경로
const directoryPath = path.join(__dirname, "contents");
console.log(directoryPath);
// 폴더에 있는 파일 읽기
const contentFiles = fs.readdirSync(directoryPath);
console.log(contentFiles);
```

- fs 모듈은 FileSystem 의 약자로 파일 처리와 관련된 모듈입니다.
- path 모듈은 파일의 경로를 다루기 위한 모듈입니다.
- sync 가 붙은 것은 동기적 읽기는 것으로 파일을 모두 읽은 후 forEach 문을 사용해야 하므로 다 읽기 전에는 다른 작업을 할 수 없도록 동기적 읽기를 사용하였습니다.

이렇게 하면 contents 안에 있는 파일들의 목록을 배열형식으로 저장할 수 있습니다.

참고로 node.js 를 실행하기 위해서는 커맨드창에 node hello-node.js 라고 입력해주세요

이제 각각의 파일 내용을 읽어오도록 하겠습니다.

```js
contentFiles.forEach(file => {
  body = fs.readFileSync(`./contents/${file}`, "utf8");
  console.log(body);
});
```

fs.readFileSync(filename, [options])
option 에는 보통 인코딩 방식이 오게 되며 웹에서는 'utf8' 을 주로 사용합니다.

파일의 내용을 읽어왔다면, 이 파일의 내용을 마크다운 형식에서 html 형식으로 변환해주어야 합니다.
단순히 텍스트만 있는 문서를 보여줄 것이라면 마크다운을 그대로 사용해도 되지만, 마크다운의 다양한 기능들을 사용하고 싶다면, 마크다운을 html 파일로 변환해 주어야 합니다.

markdown-it 을 설치해주세요

`npm install markdown-it --save`

설치가 완료되면 package.json 파일의 dependencies 에 markdown-it 이 추가된 것을 볼 수 있습니다.

```js
  "dependencies": {
    "markdown-it": "^8.4.2"
  }
```

markdown-it 을 사용해보도록 하겠습니다.

```js
var MarkdownIt = require("markdown-it"),
  md = new MarkdownIt();
md.render("여기에 마크다운 형식의 text를 넣어주면 html로 변환");
```

이제 map 함수를 사용하여 배열을 돌면서 마크다운 문서를 html 문서로 변환해보도록 하겠습니다.

```js
contentFiles.map(file => {
  body = fs.readFileSync(`./contents/${file}`, "utf8");
  result = md.render(body); // 이 부분을 추가해주세요
  console.log(result);
});
```

node hello-node.js 실행해보면 커맨드 창에 html 형식으로 변환된 텍스트가 보일 것 입니다.

이런식으로요 !

```html
<h1>고양이</h1>

<ul>
<li>강아지</li>
</ul>

<p><strong>마카롱</strong></p>
```

마크다운을 html 로 변환하였다면 ejs 템플릿 엔진을 사용해 보도록 하겠습니다.
템플릿 엔진이란, 템플릿을 읽어 엔진의 문법과 설정에 따라서 파일을 HTML 형식으로 변환시키는 모듈입니다.
ejs 페이지를 작성할 때, 몇 가지 특수한 태그들을 사용할 수 있습니다.

- <% code %> : 자바스크립트 코드를 넣을 수 있습니다.
- <%=value%> : 데이터를 출력할 수 있습니다.

HTML 에 빈 칸을 넣어놓고 그 빈 칸에 그때 그때 원하는 내용을 채워넣을 수 있습니다.

그 빈 칸에 변환한 마크다운 문서를 넣어보도록 하겠습니다.

일단 teplates 라는 폴더를 하나 만듦니다.
여기에 틀을 작성할 것입니다.

이 폴더 안에 index.html 이라는 파일을 만들었습니다.

이 폴더 안에
이렇게 우리가 넣을 본문의 빈칸을 만들어 주세요.

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
  <%= Body %>
</body>

</html>
```

빈칸에 원하는 내용을 넣고 html 파일을 만들어 낼 것입니다. 새로 만든 html 파일들의 폴더를 하나 만들도록 하겠습니다.
저는 deploy 란 폴더를 만들겠습니다.
deploy 폴더가 삭제될 수도 있고 내가 아닌 다른 사람이 이 프로그램을 쓰게 되는 것을 생각한다면
자바스크립트 코드로 폴더를 만들어줍니다.

```js
const dir = "./deploy";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
```

이 로직을 추가하면 deploy 폴더가 없으면 !fs.existsSync(dir) 생성이 됩니다. fs.mkdirSync(dir)

```js
const indexHtmlFormat = fs.readFileSync("./templates/index.html", "utf8");
```

우리가 만든 틀을 indexHtmlFormat 변수에 대입하였습니다.

```js
//  deploy디렉토리 추가
const dir = "./deploy";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
// 확장자를 제외한 파일 이름을 반환하는 함수
getFileName = file => {
  return file.slice(0, file.indexOf(".")).toLocaleLowerCase();
};
contentFiles.forEach(file => {
  let body = fs.readFileSync(`./contents/${file}`, "utf-8");
  body = md.render(body);
  articleHtml = ejs.render(indexHtmlFormat, {
    body
  });
  const fileName = getFileName(file);
  fs.writeFileSync(`./deploy/${fileName}.html`, articleHtml);
});
```

우리가 contents 폴더를 forEach 문으로 돌면서 내용을 html 형식으로 변환했었습니다.

이제 이 변환한 것을 변수에 담아서 ejs template 에 이 데이터를 넣어줍니다.

{body: body} 를 {body}로 축약하여 표현할 수 있습니다.
그리고 지금 file 에는 .md 확장자로 된 파일들이 있습니다. 이 파일을 .html 로 바꿔주기 위해서
getFileName 이라는 함수를 만들었습니다.

0 부터 '.'이라는 문자가 나오기 전까지 자르고 이를 소문자로 변환하였습니다.
html 파일은 소문자로 작성하는 것이 좋습니다. 만약 사용자가 대문자로 작성을 하였더라도, 이부분에서 바꿔주기로 합시다.

그리고 실행을 하면 deploy 디렉토리 안에 html 파일이 만들어진 것을 볼 수 있습니다.
그리고 바로 확인을 해보고 싶다면

`npm install -g live-server`을 설치하고 live-server 를 실행시켜주면 로컬 서버를 띄워서 확인해 볼 수 있습니다.

깃헙 페이지는 폴더 바로 하위에 있는 index.html 파일을 가장 먼저 렌더링해줍니다. 블로그로 접속했을 때 가장 처음 보이는 화면이 됩니다.

- blog directory
  - index.html

그럼 이 index.html 파일에 우리가 만든 파일로 이동할 수 있는 파일 목록을 만들어보도록 하겠습니다.

```ejs
<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
  <ul>
    <% fileList.map(fileName => {%>
      <li>
        <a href="./deploy/<%=fileName %>.html">
          <%=fileName %>
        </a>
      </li>
      <% }) %>
  </ul>
</body>

</html>
```

Map 함수를 사용하였습니다.
fileList 를 배열로 받아서 배열이 길이만큼 li 태그를 생성해줍니다.

이제 index.html 파일에 목록을 렌더링하였습니다. 목록을 클릭하면, 우리가 만들었던 html 파일을 보여줍니다.

2 단계

5. 정규 표현식 이용해서 title 이랑 날짜랑 카테고리 받기
   정규 표현식을 이용해서 사용자 페이지도 만들고, 사이드바, 포스팅 화면도 만든다.

6. 헤더 , 사이드바 완성하기 (블로그 운영자 정보 받기 ) (프레임워크를 써볼까?? 쌩으로 할까 )

7. 댓글기능 넣기

8. 여러가지 값을 받아서 다양하게 커스터마이징 할 수 있음을 말해줌(예: 작업중인 글은 show="false"를 넣어준다. )

4 / 5,6/ 7
