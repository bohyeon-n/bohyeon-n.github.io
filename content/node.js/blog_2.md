+++
category = Nodejs
comments = true
date = "20180911"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = [ "Nodejs, Blog"]
title = "정적 블로그 생성기 만들기! - 2탄 "
description = "정적 블로그 생성기 만들기"
front="true"
+++

정적 블로그 생성기 만들기 첫 번째 글에서는 마크다운 파일을 HTML 로 변환하여 글 목록 페이지와 본문 페이지를 만들어 보았습니다. 이번 글에서는 글의 제목, 설명, 날짜등의 글의 정보를 받아 페이지에 추가하는 작업을 해보도록 하겠습니다.

## 글의 정보 받기

우리는 지금까지 글의 본문만을 마크다운 파일로 작성하여 HTML 포맷으로 변경해주었습니다. 글의 제목이나 설명, 작성한 날짜 등은 따로 작성하지 않았습니다.
어떻게 하면 마크다운 파일 안에 우리가 원하는 정보를 넣을 수 있을까요?
글의 정보를 마크다운에 넣기 위해서는 정해진 포맷안에 정보를 입력하고 마크다운 파일을 읽을 때 문자열에서 특정한 패턴을 찾아 글의 정보를 추출할 수 있습니다.
저는 글의 정보를 `+++ <글의 정보> +++` 안에 입력하였습니다.
마크다운 파일 상단에 아래와 같은 형식으로 contents 디렉토리의 의 마크다운 파일을 수정해주세요.

```js
+++
title="정적 블로그 생성기 만들기"
desc="글의 정보 받기"
date="20180909"
+++

이번 글에서는 정적 블로그 생성기 만들어보겠습니다.
```

현재 마크다운 텍스트에는 우리가 입력한 정보가 포함되어 있습니다. 본문에는 글의 정보를 제외한 글의 내용만을 넣어주어야 합니다.
마크다운 파일에서 `+++<>+++` 안에 있는 글의 정보 값을 제외한 본문을 가져오는 함수를 추가해 보겠습니다.

매개변수로 text 를 받아서 replace 메서드를 실행한 값을 반환하는 함수입니다. 아래의 코드를 추가해주세요.

```js
const extractBody = text => {
  return text.replace(/(\+{3})([\s\S]+?)(\1)/, "");
};
```

extracBody 함수는 text 문자열에서 `+++<>+++` 패턴이 일치하는 문자열을 빈 문자열로 교체한 새로운 문자열을 반환합니다.

[str.replace(regexp|substr, newSubStr|function)](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/replace) 메소드는 어떤 패턴에 일치하는 일부 또는 모든 부분이 교체된 새로운 문자열을 반환합니다. 그 패턴은 문자열이나, 정규식이 될 수 있습니다.

위의 함수에서는 `+++<>+++`패턴을 찾기 위해 [정규 표현식](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/%EC%A0%95%EA%B7%9C%EC%8B%9D)을 사용하였습니다. 정규 표현식이란 문자열을 처리하는 방법 중 하나로 정규표현식을 사용하면 특정한 조건에 맞는 문자를 검사, 검색 그리고 치환하는 과정을 매우 간편하게 처리할 수 있습니다.

`+{3}`은 `+` 가 세 번 반복된다는 뜻입니다. `[\s\S]+?` 의 `\s`는 공백문자 그리고 `\S`는 공백문자가 아닌 문자를 뜻하며 `+`는 1 회이상 반복된다는 의미의 수량자입니다.
`+` 수량자는 탐욕스럽기 때문에 가능한 많이 대응시킵니다. 많이 대응시키게 되면 맨 처음 등장한 패턴 외의 본문에서 이러한 패턴이 등장했을 시 그 문자열도 포함하여 교체하기 때문에 `+`수량자를 탐욕스럽지 않게 바꿔주어야 합니다. `*, +, ?, {}`등의 수량자 뒤에 `?`를 사용하면 기본적으로 탐욕스러운 수량자를 탐욕스럽지 않게, 가능한 적은 문자을 대응시키게 만들 수 있습니다.
`1` 은 첫 번째 괄호를 지칭할 때 사용합니다.

이제 이전 글에서 작성하였던 map 메소드의 콜백 함수부분을 수정해야 합니다. 전체 text 가 아닌 글의 정보를 제외한 본문만을 렌더할 수 있도록 아래와 같이 기존 코드를 수정해주세요.

```js
const text = fs.readFileSync(`./contents/${file}`, "utf8");
const convertedBody = md.render(extractBody(text));
```

글의 정보와 본문을 담고있는 text 를 extractBody 함수에 인수로 넣어 글의 정보를 제외한 본문을 HTML 포맷으로 변경해주었습니다.

그리고 이제 `+++<>+++` 안에 넣어주었던 글 정보를 반환하는 함수를 추가해보겠습니다.

```js
extractValue = text => {
  const string = text.match(/(\+{3})([\s|\S]+?)\1/);
  if (!string) {
    return null;
  } else {
    const valueLines = string[2].match(/[^\r\n]+/g);
    const values = {};
    if (valueLines) {
      valueLines.map(valueLine => {
        const keyAndValue = valueLine.match(/(.+)[=\n](.+)/);
        if (keyAndValue) {
          const key = keyAndValue[1].replace(/\s/g, "");
          const value = keyAndValue[2].replace(/['"]/g, "").trim();
          values[key] = value;
        }
      });
      return values;
    }
  }
};
```

extractValue 함수는 매개변수인 text 의 `+++<>+++` 패턴안에 있는 문자열을 찾아서 = 를 기준으로 key 와 value 객체 쌍을 반환하는 함수입니다.

콘솔로 확인해보면 아래와 같이 찍히는 것을 확인할 수 있습니다.

```shell
{ title: '고양이', desc: '고양이 한마리', date: '20180901' }
{ title: '강아지', desc: '강아지 너무 귀여워', date: '20180902' }
{ title: '마카롱', desc: '마카롱 너무 맛있어', date: '20180904' }
{ title: 'Sigrid',
  desc: 'Sigrid Album [Raw] Tracklist',
  date: '20180909' }
```

[str.match(regexp)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match) 메소드는 정규식과 비교하여 일치 항목을 검색하는 메소드입니다. 문자열이 표현식과 일치하면 일치하는 전체 문자열을 배열 첫 번째 요소로 포함하고 그 다음 요소부터 괄호 안에 캡처 된 결과가 표시됩니다.

매치가 되었다면 배열을 순환하면서 두 번째로 캡쳐된 `+++<>+++` 안에 있는 문자열을 다시 match 메소드를 사용하여 `=` 문자를 기준으로 나누었습니다. 매치된 결과가 있다면 `=`를 기준으로 오른쪽 문자열을 key, 왼쪽 문자열을 value 변수에 대입해줍니다. key 는 정해진 문자열을 넣는 것이므로 모든 공백문자를 빈 문자열로 바꿔줍니다. value 에는 사용자가 입력한 제목이나, 글의 설명등이 들어있으므로, [trim 메소드](https://www.w3schools.com/jsref/jsref_trim_string.asp)를 사용하여 앞과 뒤의 공백만 제거하였습니다. 또한 `'`, `"`를 함께 입력할 수도 있으므로 `'` `"` 문자를 빈문자열로 교체하였습니다.
사용자가 값을 입력하지 않는 경우도 있으므로, 값이 있는지 확인하는 코드도 추가해주었습니다.

이제 우리가 마크다운 파일에서 가져온 글의 정보들을 article 페이지를 렌더하는 데 사용해보도록 하겠습니다.

일단, 템플릿에 title 과 date 의 빈 칸을 만들어보겠습니다.
templates 디렉토리에 article_format.html 파일을 수정해보겠습니다.

이런식으로 제목과 날짜를 추가해주세요.
![article template 제목, 날짜 추가](/img/article_add_title.png)

이제 article page 를 생성했던 map 메소드의 콜백 함수를 수정해주세요.

```js
contentFiles.map(file => {
  const text = fs.readFileSync(`./contents/${file}`, "utf8");
  const convertedBody = md.render(extractBody(text));
  const value = extractValue(text);
  if (value) {
    const title = value.title || " ";
    const date = value.date || " ";
    const articleContent = ejs.render(articleHtmlFormat, {
      body: convertedBody,
      title,
      date
    });

    const articleHtml = ejs.render(layoutHtmlFormat, {
      content: articleContent
    });
    const fileName = getHtmlFileName(file);
    fs.writeFileSync(`./deploy/${fileName}.html`, articleHtml);
    deployFiles.push(fileName);
  }
});
```

value 가 있는 글들만 HTML 파일을 생성해주도록 하였습니다.
value 값 중 title 과 date 를 사용자가 입력하지 않았을 때를 대비하여 만약 title 과 date 가 없다면, 빈 문자열을 넣어주기로 하였습니다.

완성된 모습입니다!
아티클 페이지에 제목과 날짜가 추가되었습니다.
![아티클 페이지에 제목과 날짜 추가](/img/article_add_title_page.png)

이제 우리는 글의 제목과 다양한 정보를 알고 있습니다. 더이상 홈페이지에서 파일 이름으로 목록을 리스팅하지 않아도 됩니다. 글의 목록을 글의 제목과 설명 그리고 날짜로 리스팅하도록 수정해봅시다.

templates 디렉토리의 list_format.html 파일을 열어 title, date, desc 을 넣을 수 있도록 수정해주세요.

저는 이렇게 작성하였습니다!

![리스트 템플릿 제목, 날짜, 설명추가](/img/list_add_title.png)

홈페이지에 contents 디렉토리에 작성한 모든 글을 리스팅하기 위해서는 작성한 모든 글의 정보를 담은 객체를 배열에 넣어주어야 합니다.
deployFiles 배열에 fileName 을 push 하던 로직을 수정해보겠습니다. fileName 은 path 로 넣어주고 title 과 date, desc 를 이름과 값 쌍으로 넣어주었습니다.

desc 도 작성하지 않았을 때를 대비하여 title 과 date 처럼 desc 도 아래의 코드를 추가해줍시다.

```js
const desc = value.desc || " ";
```

```js
deployFiles.push({ path: `${fileName}.html`, title, date, desc });
```

이제 deployFiles 에는 contents 안에 있는 모든 파일의 정보가 이름과 값 쌍으로 객체에 저장되었습니다.

deployFiles 를 커맨드에 찍어보면 이런식으로 나오는 것을 볼 수 있습니다!

```shell
[ { path: 'cat.html',
    title: '고양이',
    date: '20180901',
    desc: '고양이(cat)는 식육목 고양이과에 속하는 포유류 동물이다' },
  { path: 'dog.html',
    title: '강아지',
    date: '20180902',
    desc: '강아지는 개의 어린 형태를 일컫는 순우리말이다' },
  { path: 'macaron.html',
    title: '마카롱',
    date: '20180904',
    desc: '마카롱(프랑스어: Macaron, IPA: [​makaˈʁɔ̃][1])은 프랑스의 대표적인 당과 제품이다' },
  { path: 'music.html',
    title: 'Sigrid',
    date: '20180909',
    desc: 'Sigrid Album [Raw] Tracklist' } ]
```

이제 nodejs 를 실행하면 글의 제목, 글을 작성한 날짜 그리고 글의 설명이 목록 페이지에 렌더됩니다.

이렇게요!

![리스팅 페이지에 글, 날짜, 설명추가](/img/list_add_title_page.png)

그런데, 이 페이지를 블로그에 그대로 쓰기에는 조금 지저분해보이죠? 그래서 스타일을 추가하는 작업을 해보겠습니다.

## 스타일링

저는 CSS extension 언어인 [Sass](https://sass-lang.com/install)로 스타일링 해보겠습니다.
Sass 의 자세한 사용법은 [Sass guid](https://sass-lang.com/guide)를 참고해주세요.

일단 sass 를 설치합니다.

```
npm install sass
```

style 폴더를 하나 만들고 `index.css` 파일과 `index.scss` 파일을 하나씩 만들어주세요.

그리고 `index.scss` 파일에 다음 코드를 입력해주세요.

```scss
$grey-lighter: #dddddd;
$black-darkest: #262626;
$black-darker: #212121;
$grey-darkest: #424242;
.list {
  padding: 1.5rem;
  border-bottom: 1px solid $grey-lighter;
  font-size: 0.8rem;
  &__date {
    color: $black-darker;
    padding-bottom: 0.5rem;
  }
  &__link {
    text-decoration: none;
    .title {
      margin: 0.5rem 0;
      font-size: 2rem;
      font-weight: 900;
      color: $black-darkest;
    }
    .desc {
      color: $grey-darkest;
    }
  }
}
```

scss 파일을 작성하였다면, sass 명령을 사용하여 sass 를 css 컴파일해야 힙니다. sass 에게 빌드할 파일과 css 를 출력할 위치를 알려줘야 합니다.

```shell
sass --watch index.scss index.css
```

명령을 실행하면, sass 문법이 css 로 변환됩니다. 이를 편하게 해주는 확장 프로그램을 사용할 수도 있습니다. 저는 Visual Studio 에디터의 Live Sass Compiler 를 설치하여 사용하고 있습니다.
css 를 적용하기 위해서 templates 폴더의 layout_format.html 파일에 style link 를 추가해주세요.

```html
<link rel="stylesheet" href="/style/index.css">
```

nodejs 를 실행하고 로컬 서버를 띄워 확인해봅시다.

처음보다는 깔끔해습니다!

![리스트 페이지 css추가](/img/list_add_css.png)

### 마무리

이번 글에서는 글의 제목과 설명, 글을 작성한 날짜를 받아서 이를 목록 페이지와 아티클 페이지에 추가해보았습니다.
저도 실제로 제가 만든 블로그 생성기를 사용하면서 불편한 점들을 개선해나가고 있습니다. 혹시 이 글을 보시면서 틀린 정보가 있거나, 더 좋은 방향을 알고계시다면 언제든 알려주시면 감사하겠습니다 :)

다음 글은 블로그 사용자의 정보를 받아서 헤더와 About 페이지를 추가하는 작업을 해보도록 하겠습니다!
