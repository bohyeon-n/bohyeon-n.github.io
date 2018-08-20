+++
category = JavaScript
comments = true
date = "20180817"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = [ "JS"]
title = "호이스팅 - Javascript"
description = "호이스팅 - Javascript"
front = false
+++

## 호이스팅

호이스팅이란 변수와 함수 선언이 컴파일 단계에서 메모리 어디에 놓이는지에 대한 자바스크립트 메커니즘이다.
함수와 변수의 선언이 어디서 이루어지던 간에 상관없이 그들의 스코프의 가장 위로 이동한다. 전역, 로컬 스코프에 관계없이

그러나 값은 호이스팅되지 않는다.

그들의 스코프에서 가장 최상위로 끌어올려진다는 의미는

````js
var x = 'outter scope'
function() {
  console.log(x)
  var x = 'inner scope'
}

var x = 'outter scope'
function() {
  var x;
  conosle.log(x) // 자신의 스코프에 최상위로 끌어올려짐 // undefinde
  var x = 'inner scope'
}
```js
console.log(hoist);
var hoist = "value"; //undefined

var hoist;
console.log(hoist); // undefinde
hoist = "value";
````

또한 호이스팅은 함수 선언을 유발한다. 프로그램에서 선언되기 전에

```js
myFunction(); // No error, logs 'hello'
function myFunction() {
  console.log("hello");
}
```

그러나 변수에 할당된 함수 식은 주의해야 한다.

```js
myFunction() //Error: 'myFunction' is not a function
var myFunction() {
  console.log('hello')
}
```

정리
호이스팅이란 자바스크립트의 선언을 상위로 끌어올리는 디폴트 특성이다.
함수 선언은 호이스팅 된다. 변수가 선언되기 전에

let/const
let const 선언은 실행중인 실행 컨텍스트의 어휘적 환경으로 범위가 지정된 변수를 정의한다.
lexical scope 는 변수나 함수가 정의 된 곳의 context 를 사용하며 dynamic scope 는 변수니 힘스기
불려진 곳의 constext 를 사용한다.

바인딩
속성과 개체 사이 또는 연산과 기호 사이의 같은 연관이다.
이름을 속성에 연관(바인드)시키는 과정이 바인딩이다.

변수는 그들의 어휘적 환경에 포함될 때 생성된다.
이는 새로운 스코프에 진입할 때 마다 지정된 범위에 속한 모든 let/const 가 호이스팅된다.
그러나 어휘적 바인딩이 실행되기 전까지는 액세스 할 수 없다.

let/const 선언 변수는 호이스팅되지 않는 것이 아니다. 스코프에 진입할 때 변수가 만들어지고 TDZ(Temporal Dead Zone) 가 생성되지만
코드 실행이 변수가 실제 있는 위치에 도달할 때 까지 액세스 할 수 없다는 것이ㅏㄷ.
let/const 변수가 선언된 시점에서 제어 흐름은 TDZ 를 떠난 상태가 되면, 변수를 사용할 수 있게 된다.

[let 과 const 는 호이스팅 될까?](https://medium.com/korbit-engineering/let%EA%B3%BC-const%EB%8A%94-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85-%EB%90%A0%EA%B9%8C-72fcf2fac365)

[Understanding Hoisting in JavaScript](https://scotch.io/tutorials/understanding-hoisting-in-javascript)
