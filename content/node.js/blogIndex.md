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

비전공자도 할 수 있는 정적 블로그 생성기 만들기!

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
option 에는 보통 인코딩 방식이 오게 되며 웹에서는 utf8 을 주로 사용합니다.

파일의 내용을 읽어왔다면, 이 파일의 내용을 마크다운 형식에서 html 형식으로 변환해주어야 합니다.
단순히 텍스트만 있는 문서를 보여줄 것이라면 마크다운을 그대로 사용해도 되지만, 마크다운의 다양한 기능들을 사용하고 싶다면, 마크다운을 html 파일로 변환해 주어야 합니다.

저는 markdown-it 을 설치해주세요

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

이제 forEach 문을 돌면서 마크다운 문서를 html 문서로 변환해보도록 하겠습니다.

```js
contentFiles.forEach(file => {
  body = fs.readFileSync(`./contents/${file}`, "utf8");
  result = md.render(body); // 이 부분을 추가해주세요
  console.log(result);
});
```

node hello-node.js 실행해보면 커맨드 창에 html 형식으로 변환된 텍스트가 보일 것 입니다.

```js
<h1>고양이</h1>

<ul>
<li>강아지</li>
</ul>

<p><strong>마카롱</strong></p>
```

- 마크다운잇설치해서 마크다운파일 html 형식으로 바꿔주기
- index.html 파일에 ejs 문법을 사용하여 파일 세 개의 파일이름을 리스트 형식으로 보여주기
- 파일을 눌렀을 시에는 해당 마크다운내용을 html 로 변환한 페이지로 이동할 수 있도록
- article.html 파일을 만들고 마크다운 텍스트를 내용으로 집어넣은 ejs
- 깃헙에 파일을 업로드해서 블로그 만들어보기

5. 정규 표현식 이용해서 title 이랑 날짜랑 카테고리 받기
   정규 표현식을 이용해서 사용자 페이지도 만들고, 사이드바, 포스팅 화면도 만든다.

6. 헤더 , 사이드바 완성하기 (블로그 운영자 정보 받기 ) (프레임워크를 써볼까?? 쌩으로 할까 )

7. 댓글기능 넣기

8. 여러가지 값을 받아서 다양하게 커스터마이징 할 수 있음을 말해줌(예: 작업중인 글은 show="false"를 넣어준다. )

4 / 5,6/ 7
