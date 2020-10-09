+++
category = JavaScript
comments = true
date = "20201009"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = [ "JS"]
title = "[자바스크립트]this는 뭘까?"
description = "자바스크립트 this 알아보기"
front = true
+++

이번에 유돈노 js 책을 보면서 this를 다시 공부했다. this가 무엇인지와 this를 바인딩하는 방법, 두 가지 내용을 정리해보았다.

아래 예제와 내용은 [You Don’t Know JS : 스코프와 클로저](https://www.hanbit.co.kr/store/books/look.php?p_code=B8227329776)에서 가져왔다.

## this??

this는 모든 함수 스코프 내에 자동으로 설정되는 특수한 식별자이다.

this를 자기 자신을 가리키는 키워드이거나 혹은 함수 스코프를 가리킨다는 오해가 있다.

왜 오해인지 알아보자!

- this는 자기 자신을 가리킬까?

```js
function func() {
  this.count++
}

func.count = 0

for (let i = 0; i < 5; i++) {
  func()
}

console.log(func.count) //0
```

this가 자기 자신을 가리키는 것이라면, count가 증가해야 하는데, `func.count` 는 0이다.

`this.count`를 할 때 이 this는 func 함수 객체를 바라보지 않는다.

- this는 자신의 함수 스코프를 가리킬까?

```js
function foo() {
  var a = 1
  this.bar()
}

function bar() {
  console.log(this.a)
}

foo()
```

bar 함수를 foo 함수 내부에서 실행해서 foo 변수에 접근하려고 통로? 같은 것을 만들어서 연결하려고 했지만, undefined가 나온다.

this는 어떤 식으로도 함수의 어휘 스코프를 참조하지 않는다.

- 참고

  어휘 스코프?

  어휘 스코프는 함수를 어디서 호출했는지가 아니라, 어디에 선언했는지에 따라 결정된다. 런타임 때 스코프가 결정되는 것이 아니라, lexing 과정을 거칠 때 스코프가
  결정된다.

## 그래서 this가 뭔데?

this는 모든 함수 스코프 내에 자동으로 설정되는 특수한 식별자이며, 작성 시점이 아닌 런타임 시점에 바인딩 되며, 함수 호출 당시 상황에 따라서 콘텍스트가 결정된다.

어떤 함수를 호출하면, 활성화 레코드(active record), 즉, 실행 콘텍스트(execution context)가 만들어진다.
여기엔 함수가 호출된 콜스택과 호출 방법, 전달된 파라미터 등의 정보가 담겨있다.

this 레퍼런스는 그 중 하나로 함수가 실행되는 동안 이용할 수 있다.

## this 바인딩

실제로 코드에서 this가 무엇을 참조하는지 알려면, 함수를 호출하는 부분을 봐야 한다. 호출부를 보고 다음 4가지 중 어느 것에 해당하는지 살펴보면 된다.

### 기본 바인딩

단독 함수 실행에 관한 규칙으로 나머지에 해당하지 않을 때 적용되는 기본 규칙이다.

```js
function func() {
  console.log(this.a) // 1
}

var a = 1
```

- 참고
  예제에서 const 키워드를 써서 a를 선언하면?

  ES6에서는 전역 객체의 속성이 아닌 전역 변수도 있다. let, const, 클래스로 선언한 변수는 전역 객체 (window, global Node.js)의 속성이 아니다!

  this는 window를 참조하고 있기 때문에, a가 없다

### 암시적 바인딩

호출부에 콘텍스트 객체가 있는지, 즉 객체의 소유/포함 여부를 확인한다.

```js
const obj = {
  a: 1,
  func: function() {
    console.log(this.a) // 1
  }
}
```

객체에 함수가 포함되어 있으면 해당 객체를 참조한다.

### 명시적 바인딩

call(...), apply(...)를 사용한 바인딩

### new 바인딩

자바스크립트에서 '생성자'는 앞에 new 연산자가 있을 때 호출되는 함수다.

new를 붙여서 생성자를 호출하면, 새 객체가 만들어진다. 새로 생성된 객체는 해당 함수 호출 시 this로 바인딩된다.

new는 함수 호출 시 this를 새 객체와 바인딩하는 방법이다.

아래 예제에서는 bar 객체에 this를 바인딩했다.

```js
function foo(a) {
  this.a = a
}

const bar = new foo(2)
console.log(bar.a) //2
```

## 바인딩 규칙의 우선순위

- 명시적 바인딩이 암시적 바인딩보다 우선순위가 있다.
- new 바인딩이 암시적 바인딩보다 우선순위가 있다.
- 명시적 바인딩이 new 바인딩보다 우선순위가 있고, new로 오버라이드할 수 있다.

## 어휘적 this

ES6 화살표 함수는 위에서 본 4가지 표준 규칙 대신 에두른 스코프(enclosing scope)를 보고 this를 알아서 바인딩한다.

여기서 에두른 스코프를 보고 this를 알아서 바인딩 한다는 의미는 뭘까?
화살표 함수는 자신의 this가 없다. 대신 화살표 함수를 둘러싸는 어휘적 범위의 this가 사용된다.

화살표 함수는 일반 변수 조회 규칙을 따른다. 때문에 현재 범위가 존재하지 않는 this를 찾을 때, 화살표 함수는 바로 바깥 범위에서 this를 찾는다.

```js
function foo() {
  return a => {
    console.log(this.a)
  }
}

var obj = {
  a: 2
}

var obj2 = {
  a: 3
}

var bar = foo.call(obj1)
bar.call(obj2) // 2
```

`foo()` 함수의 this를 사용한다.
`foo()`함수를 obj1으로 바인딩했으므로, obj1 객체를 참조하고 있다.

```js
const person = {
  age: 0,
  grow: function() {
    setInterval(() => {
      this.age++
      console.log(this.age)
    }, 1000)
  }
}

person.grow()
```

setInterval에 전달된 함수 내부의 this는 SetInterval을 포함한 function의 this와 동일한 값을 갖는다.
grow 함수의 this는 person 객체이므로, age값이 정상적으로 출력된다.

## 문제!

js 컨퍼런스에서 당근마켓에서 문제를 풀면 js 뱃지? 스탬프?를 줬는데, 그 때 낸 문제 중 하나다.

```js
const obj = {
  title: '자바스크립트',
  subObj: {
    title: 'Javascript',
    show(func) {
      return func.apply(this)
    }
  },
  show() {
    return this.subObj.show(() => {
      return this.title
    })
  }
}

console.log(obj.show() === '자바스크립트' ? 'O' : 'X')
```

화살표 함수는 this도 없고, 오버라이딩도 안된다. 그래서 func this를 subObj로 오버라이딩하는 코드를 실행했지만, 안된다.

그러므로 this.title은 둘러싼 함수 show()의 this를 참조하므로 obj의 title이 된다.

## 참고 자료

[es6-scoping - 2ality JavaScript and more](https://2ality.com/2015/02/es6-scoping.html)

[화살표 함수 - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/%EC%95%A0%EB%A1%9C%EC%9A%B0_%ED%8E%91%EC%85%98)

[You Don’t Know JS : 타입과 문법, 스코프와 클로저](https://www.hanbit.co.kr/store/books/look.php?p_code=B8227329776)
