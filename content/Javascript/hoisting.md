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

zero -co blog
일단 처음 코드를 실행하는 순간, 브라우저가 스크립트를 로딩해서 실행하는 순간
모든 것을 포함하는 전역 컨텍스트가 생긴다.
코든 것을 관리하는 환경이다.
페이지가 종료될 때까지 유지된다.
전역 컨텍스트 말고도 함수 컨텍스트가 있다. 자바스크립트는 함수 스코프를 따른다. 함수를 호출할 때마다 함수 컨텍스트가 하나씩 더 생긴다.

컨텍스트의 원칙 네 가지

- 전역 컨텍스트 하나 생성 후, 함수 호출 시마다 컨텍스트가 생긴다.
- 컨텍스트 생성 시 컨텍스트 안에 변수객체(argument, variable, scope chain, this)가 생성된다.
- 컨텍스트 생성 후 함수가 실행되는데 사용되는 변수들은 변수 객체 안에서 값을 찾고, 없다면 스코프 체인을 따라 올라가며 찾는다.
- 함수 실행이 마무리되면 해당 컨텍스틑 사라지게 된다(클로저는 제외) 페이지가 종료되면 전역 컨텍스트가 사라진다.

'say 컨텍스트': {
변수객체: {
arguments: null,
variable: ['name'], // 초기화 후 [{ name: 'nero' }]가 됨
},
scopeChain: ['say 변수객체', '전역 변수객체'],// 스코프 체인, 자신과 상위 스코프들의 변수 객체
this: window,
}
전역 컨텍스트가 생성된 후 -> 코드를 위에서부터 실행된다. -> 함수가 실행되면 새로운 컨텍스트인 함수 컨텍스트가 생긴다. ->

```js
var name = "zero"; // (1)변수 선언 (6)변수 대입
function wow(word) {
  // (2)변수 선언 (3)변수 대입
  console.log(word + " " + name); // (11)
}
function say() {
  // (4)변수 선언 (5)변수 대입
  var name = "nero"; // (8)
  console.log(name); // (9)
  wow("hello"); // (10)
}
say(); // (7)
```

wow 호출 시에 wow 컨텍스트도 생김 word = 'hello' 이고 스코프체인은 와우 스코프와 전역 스코프 -> 렉시컬 스코핑, 와우 함수의 스코프 체인은 선언 시에 이미 정해져 있다. 세이 스코프는 와우 컨텍스트의 스코프 체인이 아니다.
세이 컨텍스트 안에서 와우 변수를 찾을 수 없다. 찾을 수 없으면 스코프 체인을 따라 올라가 상위 변수 객체에서 찾는다.
그래서 전역 변수객체에서 찾는다.

와우의 컨텍스트가 생긴 후 함수가 실행된다. 나중에 새긴 와우가 가장 먼저 실행된다.
월드는 인수에서 찾을 수 있고, 네임은 와우 변수객체에는 없으니 스코피 체인을 따라 전역 스코프에서 찾으면 된다.
전역 변수 객체로 올라가니 variable 에 네임이 제로라고 되어 있다. 그래서 hello zero 가 되는 것임

와우 컨텍스트에 따르면, 와우 함수는 애초에 세이 컨텍스트와는 일절 관련이 없다.
와우 함수 종료 후 와우 컨텍스트가 사라지고, 세이 함수의 실행이 마무리 된다.
따라서 세이 컨텍스트도 사라지고, 마지막에 전역 컨텍스트도 사라진다.

호이스팅
호이스팅 현상
호이스팅이란 변수를 선언하고 초기화했을 때 선언 부분이 최상단으로 끌어올려지는 현상을 의미한다.

선언보다 호출을 먼저하여도 에러없이 정상 작동한다.
변수 선언과 함수 선언식이 최상단으로 끌어올려졌기 때문이다.
함수 선언식일 때 식 자체가 통째로 끌어올려짐
그러나, 함수 표현식일 때는 에러 같은 함수여도 함수표현식으로 선언한 경우에는 에러가 발생한다.

```js
sayYeah();
var sayYeah = function() {
  console.log("yeah");
};
```

대입되기 전에 호출해서 에러가 발생한다.

함수 선언식은 컨텍스트 생성 후 바로 대입된다.

```js
'전역 컨텍스트': {
  변수객체: {
    arguments: null,
    variable: [{ sayWow: Function }, 'sayYeah'],
  },
  scopeChain: ['전역 변수객체'],
  this: window,
```

클로저
비공개 변수를 가질 수 있는 환경에 있는 함수가 클러저이다.
비공개 변수는 클로저 함수 내부에 생성한 변수도 아니고, 매개변수도 아닌 변수를 의미한다.

클로저를 말할 때는 스코프/컨텍스트/비공개변수와 함수의 관계를 항상 같이 말해주어야 한다.

```js
var makeClosure = function() {
  var name = "zero";
  return function() {
    console.log(name);
  };
};
var closure = makeClosure();
closure(); // zero
```

name 은 closure 함수의 매개변수도 아니고, closure 함수 내부에서 생성한 변수도 아니다. 바로 이런 것이 비공개 변수이다.

```js
"전역 컨텍스트": {
  변수객체: {
    arguments: null,
    variable: [{ makeClosure: Function }, 'closure'],
  },
  scopeChain: ['전역 변수객체'],
  this: window,
}
"makeClosure 컨텍스트": {
  변수객체: {
    arguments: null,
    variable: [{ name: 'zero' }],
  },
  scopeChain: ['makeClosure 변수객체', '전역 변수객체'],
  this: window,
}
```

closure = makeClosure() 할 때,
function 을 return 하는데 그 function 선언 시의 scope chain 은 lexical scoping 을 따라서

그니까 makeClousure() 하고 함수를 리턴하는데 이 함수는 lexical scope 를 따르기 때문에 name = 'zero' 변수가 스코프 체인에 있다?
-> 그래서 scope chain 을 통해 makeClosure 의 name 변수에 접근할 수 있다.

클로저 예제

```js
var counter = function() {
  var count = 0;
  function changeCounter(number) {
    count += number;
  }
  return {
    increase: function() {
      changeCounter(1);
    },
    decrease: function() {
      changeCounter(-1);
    },
    show: function() {
      alert(count);
    }
  };
};
var counterClosure = counter();
counterClosure.increase();
counterClosure.show();
counterClosure.decrease();
counterClosure.show();
```

counter 함수는 호출 시 return 을 통해 counterClosure 컨텍스트에 비공개 변수인 count 에 접근할 수 있는 scope chain 을 반환한다.

자바스크립트에서 사용자를 통제하기 위한 기본적인 방법이 클로저이다.

let, const 는 함수스코프를 따르지 않고 블록스코프를 따른다는 것이다.
블록스코프란, 해당 변수를 해당 블록에서만 접근할 수 있는 것을 말한다.
const, let 을 사용할 때는 선언한 곳보다 위에서 접근하는 것이 금지된다.(에러 발생)

const 에 할당된 객체나 배열의 요소를 바꾸는 것은 막지 않는다.

let/const 는 호이스팅이 일어난다!
그러나 tdz 에 의해 제약을 받는다.
변수가 초기화되기 전에 액세스하려고 하면

let x = 'outer scope';

(function() {
console.log(x);
let x = 'inner scope';
}());

호이스팅이 된다는 증거
에러 발생 함.

tdz 살펴보기
변수는 그들의 어휘적 환경에 포함될 때 생성되지만, 어휘적 바인딩이 실행되기 전까지는 액세스 할 수 없다.
새로운 범위에 진입할 때마다 지정된 범위에 속한 모든 let/const 바인딩이 지정된 범위 내부의 코드가 실행되기 전에 실행된다.(let/const 선언이 호이스팅된다.)
어휘적 바인딩이 실행되기 전까지 액세스 할 수 없는 현상을 tdz 라고 한다.

초기화되지 않은 바인딩에 액세스 하려는 경우, 예기치 않은 결과를 내는 대신, 개발자에게 여러 피드백을 제공하기 때문에 유용하게 사용된다.
