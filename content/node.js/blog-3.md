+++
category = Nodejs
date = "20180918"
tags = [ "Nodejs, Blog"]
title = "정적 블로그 생성기 만들기 - 댓글 기능 추가하기"
description = "블로그에 Disqus 서비스를 이용하여 댓글기능 추가하기"
front ='true'
+++

이번 글에서는 Disqus 서비스를 이용하여 블로그에 댓글 기능을 추가하는 간단한 작업을 해보겠습니다.

## Disqus?

[Disqus](https://disqus.com/) 는 소셜 댓글 서비스입니다. 사이트와 서비스에 관계없이 댓글을 다는 것이 가능하며, 여러 사이트에 달았던 댓글들을 쉽게 통합 관리할 수 있습니다.

---

## Disqus 사용법

[Disqus](https://disqus.com/) 회원가입을 해주세요.

메인 화면의 GET STARTED 버튼을 눌러주세요.

![get start disqus image](/img/disqus1.png)

사이트에 disqus 설치하기 버튼을 눌러 주세요.

![install disqus ](/img/disqus-2.png)

사이트 이름, 카테고리, 언어를 설정합니다.

![create a new site](/img/disqus3.png)

사이트 플랫폼을 설정합니다. 해당하는 플랫폼이 없다면 Universal Code 를 선택해주세요.

![플랫폼 설정](/img/disqus4-select-platform.png)

화면에 보이는 코드를 복사하여 댓글을 로드하고 싶은 곳에 넣어주기만 하면 Disqus 댓글 기능이 추가됩니다!

![diqus 코드](/img/disqus5-code.png)

---

## Article 페이지에 Disqus 추가하기

지금까지 일반적인 Disqus 서비스 사용법을 알아보았습니다. 이제 우리가 만들고 있는 블로그에 Disqus 코드를 추가하는 작업을 해보겠습니다.

혼자만 사용하는 블로그 생성기라면 article_format.htm 에 Disqus 코드를 바로 추가할 수 있습니다. 하지만 우리가 만든 블로그 생성기를 다른 사람이 사용하는 경우라면 사용자의 Disqus url 이 무엇인지 지금은 알 수 없습니다.

그럼 어떻게 사용자의 url 을 받을 수 있을까요? 블로그 글의 정보를 작성하고 읽어왔던 것 처럼 사용자의 정보도 읽어올 수 있습니다. 사용자에게 Disqus url 을 받아서 Disqus 댓글 기능을 추가하는 작업을 해보겠습니다.

### 사용자 정보 작성하기

블로그 사용자의 정보를 받기 위해서 author 디렉토리를 하나 만들어주세요.
그리고 그 안에 `author.md` 라는 파일을 생성합니다.

`author.md` 파일은 사용자에 대한 정보를 받아서 사용자의 이름이나, 소개말등 블로그를 만드는 데 필요한 값들을 받는 파일이 될 것 입니다. 이번 글에서는 간단하게 Disqus url 값만 받아보도록 하겠습니다.

`author.md` 파일안에 disqus 값을 넣어주세요.

```
+++
disqus = 'https://bohyeon.disqus.com/embed.js'
+++
```

### 사용자 정보 가져오기

author.md 파일안에 있는 사용자의 정보를 가져오기 위해서는 먼저 파일을 읽어와야 합니다. 아래의 코드를 추가해주세요.

```js
const authorFile = fs.readFileSync("./author/author.md", "utf8");
```

우리는 이전에 전체 텍스트에서 `+++ +++` 안에 넣은 값만 가져올 수 있는 `extractValue` 함수를 만들었습니다. 이 함수를 사용하여 사용자의 값을 가져오겠습니다.

```js
const authorValue = extractValue(authorFile);
console.log(authorValue);
```

코드를 실행해보면 아래와 같이 찍히는 것을 확인할 수 있습니다.

```shell
{ disqus: 'https://bohyeon.disqus.com/embed.js' }
```

이제 이 값을 사용하여 블로그 글 하단에 Disqus 코드를 넣어주는 작업을 해보겠습니다.

### article 템플릿에 Disqus 코드 추가하기

article_format.html 파일에 Disqus 코드를 추가해주세요. 단, Disqus url 에 사용자의 값을 넣을 수 있도록 템플릿 태그를 넣어 빈칸으로 만들어 주어야 합니다.

![disqus 템플릿](/img/disqus-template.png)

이제 이 템플릿에 사용자의 Disqus 값을 넣어주겠습니다.

이전에 작성하였던 articleHtmlFormat 을 렌더하는 코드에 Disqus 값을 추가로 입력해주세요.

```js
const articleContent = ejs.render(articleHtmlFormat, {
  body: convertedBody,
  title,
  date,
  disqus: authorValue.disqus
});
```

이제 node hello-node.js 를 실행해줍니다.

완성되었습니다. 댓글 기능이 잘 추가되었죠?

![댓글 기능 추가화면](/img/disqus7.png)

## 마무리

댓글 서비스를 이용하여 블로그에 댓글 기능을 추가하는 작업을 해보았습니다. 다음 글에서는 오늘 만들었던 author.md 파일에 추가적인 정보를 받아서 헤더와 About 페이지를 만들어보도록 하겠습니다!😻

코드가 궁금하시다면 [github](https://github.com/bohyhyeon-n/bohyhyeon-n.github.io) 에서 확인하실 수 있습니다!
