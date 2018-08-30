+++
category = JavaScript
comments = true
date = "20180830"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = [ "JS"]
title = "컨텍스트와 호이스팅 - JavaScript"
description = " 컨텍스트와 호이스팅 - JavaScript"
front = true
+++

## context

브라우저가 스크립트를 로딩해서 실행하는 순간 모든 것을 포함하는 **전역 컨텍스트**가 생긴다.
모든 것을 관리하는 환경이다.
전역 컨텍스트는 페이지가 종료될 때까지 유지된다.
전역 컨텍스트 말고도 함수 컨텍스트가 있다. 자바스크립트는 함수 스코프를 따른다. 함수를 호출 할 때마다 함수 컨텍스트가 하나씩 더 생긴다.

컨텍스트의 원칙 네 가지

1. 전역 컨텍스트 하나 생성 후, 함수 호출 시마다 컨텍스트가 생긴다.

2. 컨텍스트 생성 시 컨텍스트 안에 변수객체(argument, variable, scope chain, this)가 생성된다.

3. 컨텍스트 생성 후 함수가 실행되는데 사용되는 변수들은 변수 객체 안에서 값을 찾고, 없다면 스코프 체인을 따라 올라가며 찾는다.

4. 함수 실행이 마무리되면 해당 컨텍스트는 사라지게 된다(클로저는 제외) 페이지가 종료되면 전역 컨텍스트가 사라진다.

```js
var name = "bohyeon";
function greeting(word) {
  console.log(`${word} ${name}`);
}
function say() {
  var name = "pizza";
  console.log(name);
  greeting("hello");
}
say();
// pizza
// hello bohyeon
```

```js
'say 컨텍스트' : {
  변수객체: {
    arguments: null,
    variable: ['name'], // pizza
  },
  scopeChain: ['say 변수객체', '전역 변수객체'],
  // 스코프 체인: 자신과 상위 스코프들의 변수 객체
  this: window
}
```

전역 컨텍스트가 생성 -> 코드를 위에서부터 실행 -> 함수가 실행되면 새로운 컨텍스트인 함수 컨텍스트가 생긴다.

`greeting`호출 시에 `greeting` 컨텍스트도 생긴다.

`greeting`의 스코프 체인은 전역 스코프와 `greeting`스코프이다. `greeting`의 스코프 체인은 선언 시에 이미 정해져 있다. `say`스코프는 `greeting`스코프 체인이 아니다.

`say`컨텍스트 안에서는 `greeting` 변수를 찾을 수 없다. 찾을 수 없다면, 스코프 체인을 따라 올라가 상위 변수 객체인 전역 변수객체에서 찾는다.

`greeting`의 컨텍스트가 생긴 후 함수가 실행된다.

word 는 인수에서 찾을 수 있고, name 은 greeting 변수객체에는 없으니, 스코프 체인을 따라 전역 스코프에서 찾으면 된다.

전역 변수 객체로 올라가니 `name = 'bohyeon'`이라고 되어 있다. 그래서 `hello bohyeon`이 되는 것이다.

`greeting` 컨텍스트에 따르면, `greeting`함수는 애초에 `say`컨텍스트와는 일절 관련이 없다.

`greeting`함수 종료 후 컨텍스트가 사라지고, `say`함수의 실행이 마무리된다.
따라서 `say`컨텍스트도 사라지고, 마지막에 전역 컨텍스트도 사라진다.

## 호이스팅

호이스팅이란 변수를 선언하고 초기화했을 때 선언 부분이 최상단으로 끌어올려지는 현상을 의미한다.

선언보다 호출을 먼저하여도 에러없이 정상 작동한다.

변수 선언과 함수 선언식이 최상단으로 끌어올려졌기 때문이다.
함수 선언식일 때 식 자체가 통째로 끌어올려진다.

그러나, 함수 표현식일 때는 에러가 발생한다.

```js
sayHello();
var sayHello = function() {
  console.log("hello");
};
// sayHello is not a function
```

함수 표현식에서는 대입되기 전에 호출되었기 때문에 에러가 발생하였다.

함수 선언식은 컨텍스트 생성 후 바로 대입된다.

```js
'전역 컨텍스트': {
  변수객체: {
    arguments: null,
    variable: [{ sayHello: Function }, 'sayHello'],
  },
  scopeChain: ['전역 변수객체'],
  this: window,
```

## let, const

let 과 const 는 함수스코프를 따르지 않고 블록스코프를 따른다.

블록스코프란, 해당 변수를 해당 블록에서만 접근할 수 있는 것을 말한다.

const, let 을 사용할 때는 선언한 곳보다 위에서 접근하는 것이 금지된다.(에러발생)

그렇다면, let 과 const 는 호이스팅이 일어날까? 일어난다.
그러나 TDZ 에 의해 제약을 받는다.
변수가 초기화되기 전에 액세스하려고 하면 에러가 발생한다.

```js
const x = "outer scope";
(function() {
  console.log(x);
  const x = "inner scope";
})();
```

TDZ 란?
변수는 그들의 어휘적 환경에 포함될 때 생성되지만, 어휘적 바인딩이 실행되기 전까지는 액세스할 수 없다.

새로운 범위에 진입할 때마다 지정된 범위에 속한 모든 let, const 바인딩이 지정된 범위 내부의 모드가 실행되기 전에 실행된다(호이스팅 된다.)

어휘적 바인딩이 실행되기 전까지 액세스 할 수 없는 현상을 TDZ 라고 한다.

초기화되지 않은 바인딩에 액세스 하려는 경우, 예기치 않은 결과를 내는 대신, 개발자에게 여러 피드백을 제공하기 때문에 유용하게 사용된다.

#### 참고 자료

[let 과 const 는 호이스팅 될까? - yocee57](https://medium.com/korbit-engineering/let%EA%B3%BC-const%EB%8A%94-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85-%EB%90%A0%EA%B9%8C-72fcf2fac365)

[ 실행 컨텍스트 - ZeroCho 블로그](https://www.zerocho.com/category/JavaScript/post/5741d96d094da4986bc950a0)

[](https://medium.freecodecamp.org/what-is-variable-hoisting-differentiating-between-var-let-and-const-in-es6-f1a70bb43d)
