+++
categories = ["Algorithm"]
comments = true
date = "2018-7-19T22:59:13-04:00"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = [ "JS"]
title = "정규 표현식"
description = "정규 표현식"
+++

# 정규 표현식

## 정규표현식의 목적

1.  검사
2.  검색
3.  치환

## 정규 표현식 만들기

1.  `/`로 감싸는 패턴

```js
let re = /ab+c/;
```

- 문자열이 아니다.
- 즉시 정규식 객체로 변환되어 대입된다.

2.  RegExp 객체의 생성자 함수를 호출하는 방법

```js
let re = new RegExp("ab+c");
```

- 문자열을 정규식 객체로 변환하는 과정을 거친다. (문자열 리터럴이 메모리에 올라가는 과정이 추가로 필요하다.)
- 속도가 느릴 수 있다.
- 정규식의 패턴이 변경될 수 있는 경우, 사용자 입력과 같이 다른 출처로부터 패턴을 가져와야 하는 경우에는 생성자 함수를 사용한다.

- 문자열 래퍼 객체에는 match, search, split, replace 메소드가 정규 표현식을 지원하게 만들어져 있다.
  - 래퍼 객체?
    - 원시타입의 값은 객체가 아님에도 불구하고, 원시 타입에 점 표기법을 써서 메소드를 호출 하거나 속성을 읽어올 수 있다.
    - 원시 타입의 값에 대해 속성을 읽으려고 시도하면, 그 값은 그 순간에만 객체로 변환되어 마치 객체인 것처럼 동작한다.

## 정규식 패턴 작성하기

### 단순 패턴 사용하기

- 문자열을 있는 그대로 대응시키고자 할 때 사용된다.

```js
"Hi, do you know your abc".search(/abc/);

"Hi, do you know your abc".search("abc");

// 단순히 문자열을 그대로 찾아주는 것이므로 실행결과는 동일하다.
```

### 특수 문자 사용하기

1.  `\`

- 특수 문자가 아닌 문자 앞에서 사용된 백슬래시

  - '해당 문자는 특별하고, 문자 그대로 해석되면 안된다.'는 사실을 가리킨다.

- 특수 문자 앞에 위치한 백슬래시
  - '다음에 오는 문자는 특별하지 않고, 문자 그대로 해석되어야 한다.'는 사실을 가리킨다.
  - `"hello*world".match(/\*/)`

2.  `^`

- 입력의 시작 부분에 대응된다.
- 문자열 시작부분에 있지 않으면 대응되는 패턴이 있을 수 없다.

```js
"a1234f g".match(/^g/); //null
"An B".match(/^A/);
```

3.  `$`

- 입력의 끝 부분과 대응된다.

```js
"eat".match(/t$/);
"eat".match(/a$/); //null
```

4.  `*`

- 앞의 표현식이 0 회 이상 연속으로 반복되는 부분과 대응된다.
- 수량자라고도 한다.

5.  `+`

- 1 회 이상 반복을 의미
- 하나 이상은 있어야 대응된다.

```js
"ac".match(/ab*c/);
"ac".match(/ab+c/); //null
```

6.  `?`

- 앞의 표현식이 0 또는 1 회 등장하는 부분과 대응된다. {0,1}과 같은 의미이다.
- 만약 수량자 바로 뒤에 사용되면, 기본적으로 탐욕스럽던 수량자를 탐욕스럽지 않게 만든다.
- 수량자를 쓸 때 거의 ? 를 붙인다.
- `/e?le?/`
  - e 는 나와도 되고 안나와도 되고, 나올거면 한 번만 나온다.
  - l 은 나와야 한다.
  - e 는 있거나 없거나, 나올거면 한 번만 나와야 한다.

```js
"ac".match(/ab?c/); //ac
"abc".match(/ab?c/); //abc
"abbbbc".match(/ab?c/); //null
```

7.  `.`

- 개행 문자를 제외한 모든 단일 문자와 대응된다.
- 다만 엔터는 제외한다.

```js
"ba".match(/./);
"<hello>world".match(/\<.+\>/);
```

- 정규 표현식 패턴과 맞는 부분이 있는지 확인하 수 있다.
- 여는 꺽쇠괄호 뒤에 1 개 이상의 문자가 오고, 그 다음에 닫는 꺽쇠 괄호가 나오는 패턴.
- `.` 쓸모가 많음, 사이에 들어오는 문자는 무엇이든 상관없다.

```js
// 숫자만 있고 싶다면,
"<hello>world".match(/\<\d+\>/); //null
"<1234>world".match(/\<\d+\>/);

//hello를 가져오고 싶다.
"<hello>world <java>script".match(/\<.+\>/); //<hello>world<java> 탐욕적이다.
"<hello>world <java>script".match(/\<.+?\>/);
// ? 가능한 한 적게 일치시켜라.
```

### 괄호를 사용하기

- 정규식 내부의 일부를 둘러싼 괄호는, 해당 부분에서 대응된 문자열을 기억하는 효과를 갖는다.
- 기억된 문자열은 다른 곳에서 사용하기 위하여 불러질 수 있다.

- 포획괄호
  - 부분 표현식을 하나의 단위로 취급하는 기능
  - 대응된 문자열을 기억하는 기능

```js
"foo".match(/(foo)/);
"foo foo".match(/(foo) \1/);
"foooo foooo".match(/(fo+) \1/);
"foooo foooo foooo".match(/(fo+) \1/);
"foo bar foo bar".match(/(foo) (bar) /);
"foo bar foo bar".match(/(foo) (bar) \1/);
"foo bar foo bar".match(/(foo) (bar) \2/); //null
```

- 비포획괄호
  - 부분 표현식을 하나의 단위로 취급가능
  - 괄호를 사용하면서 대응된 문자열을 기억하고 싶지 않을 때

```js
"foofoofoo".match(/(?:foo)*/);
```

- {}

```js
// 같은 의미
"caaaandy".match(/a+/);
"caaaandy".match(/a{1,}/);

"caaaandy".match(/a*/);
"caaaandy".match(/a{0,}/);

"caaaandy".match(/a?/);
"caaaandy".match(/a{0,1}/);
```

- 문자셋
  - a 또는 b 또는 c 와 일치하는 하나의 문자와 대응되는 패턴

```js
"abcdef".match(/[abc]/);
"abcdef".match(/[abc]+/);

"hello*.!'***...**!!!**wolrd".match(/[*.!]+/);

// 특수문자를 찾을 때에도 사용할 수 있다.
"hello*******world".match(/\*+/);
"hello*******world".match(/[*]+/);
```

### 실습하기

- 이메일 아이디와 도메인 분리하기

```js
"kbh@google.com".replace(/(.+?)@(.+)/, "아이디: $1, 도메인: $2");
```

- 특정 패턴에 일치하는 문자열을 찾아서 바꾸기

```js
"1234 abbbbc 1234".replace(/ab*c/, /{$&}/);

// foo가 몇 번 등장하던, 그 패턴을 찾고 싶을 때
"foofoofoo".match(/(foo)+/);
```

- 연속된 소문자 알파벳 찾아내기

```js
"hello world".match(/[a-z]+/);
```

- 연속된 대문자 알파벳 찾아내기

```js
"hello WORLD".match(/[A-Z]+/);
```

- 연속된 한글 찾아내기

```js
"hello 안녕하세요".match(/[가-힣]+/);
```

- 연속된 숫자 찾아내기

```js
"hello 012345".match(/[0-9]+/);
```

- 문자 공백 제거

```js
"hello world java script".replace(/\s/g, "");
```

### 참고 자료

[정규표현식 예제](https://regexr.com/3cpbs)

[Form data validation](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation#Validating_against_a_regular_expression)

[mdn 정규표현식](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/%EC%A0%95%EA%B7%9C%EC%8B%9D)
