+++
category = JavaScript
comments = true
date = "20180806"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = [ "JS"]
title = "자바스크립트 this, bind 그리고 화살표 함수 "
description = "Javascript this, bind and arrow function"
front = true
+++

## this

this 는 생성자 혹은 메소드에서 객체를 가리킬 때 사용하는 키워드입니다.

this 는 이럴 때 사용합니다!

1.  새로 만들어지는 객체에 생성자의 속성을 넣어줄 때
2.  객체의 속성에 접근(메소드에서 사용하는 this)할 때

```js
function Account(username, balance) {
  // 속성
  this.username = username;
  this.balance = balance;
  // 메소드
  this.getBalance = function() {
    return `${this.username}님의 잔액은 ${this.balance}입니다.`;
  };
  this.deposit = function(monye) {
    this.balance = this.balance + monye;
  };
}

account = new Account("bohyeon", 20000);
account.getBalance();
account.deposit(2000);
account.getBalance();
```

```js
const account = {
  username: "bohyeon",
  balance: 10000,
  getBalance: function() {
    //this키워드를 사용하여 객체의 속성인 username과 balance에 접근하고 있습니다.
    return `${this.username}님의 잔액은 ${this.balance}입니다.`;
  },
  deposit: function(monye) {
    this.balance = this.balance + monye;
  }
};

account.getBalance();
account.deposit(20000);
account.getBalance();
```

this 는 때에 따라 다른 값을 가리킵니다. 어떠한 문맥이냐에 따라서 **그 값이 바뀝니다**.

1.  global scope 에서 사용될 때 this 는 전역 객체를 가리킵니다.(window 객체)
2.  함수에서 사용될 때에도 this 는 전역 객체를 가리킵니다.
3.  객체에 속한 메소드에서 사용될 때 this 는 메소드가 속한 객체를 가리킵니다.
4.  객체에 속한 메소드의 내부함수에서 사용될 때 this 는 **전역 객체**를 가리킵니다.
5.  생성자에서 사용될 때 this 는 이 생성자로 인해 생성된 새로운 객체를 가리킵니다.

4 번, 객체에 속한 메소드의 내부함수에서 사용되는 경우를 더 알아보도록 하겠습니다.

```js
const account = {
  username: "bohyeon",
  balance: 10000,
  getBalance: function() {
    innerFunc = function() {
      console.log(this === window); // true
      return `${this.username}님의 잔액은 ${this.balance}입니다.`;
    };
    console.log(innerFunc());
  }
};
account.getBalance(); //undefined님의 잔액은 undefined입니다.
```

getBalance 가 외부에서 실행되면 this 는 account 를 가리킵니다. 그러나 getBalance 함수 내부에서 innerFunc 를 호출 할 때는 그 어떤 문맥도 지정하지 않았기 때문에 innerFunc 의 this 는 window 가 됩니다.

window, 전역객체에는 username 나 balance 속성이 없기 때문에 undefined 가 나오게 됩니다.

this 를 바꾸고 싶거나, this 의 문맥을 유지하고 싶다면 어떻게 해야 할까요

bind 메소드를 사용하면 호출을 어디에서 하는지 상관없이 this 가 무엇을 가리킬 지 정할 수 있습니다.

## bind

[bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) 함수는 this 의 문맥을 유지할 때 사용합니다.

```js
const account = {
  username: "bohyeon",
  balance: 10000,
  getBalance: function() {
    innerFunc = function() {
      console.log(this === window); // false
      return `${this.username}님의 잔액은 ${this.balance}입니다.`;
    }.bind(this);
    console.log(innerFunc());
  }
};
account.getBalance(); //bohyeon님의 잔액은 10000입니다.
```

위와 같이 bind 를 사용하여 this 를 원하는 값으로 설정할 수 있습니다.

bind 는 원하는 this 문맥을 가진 새로운 함수를 생성합니다. 첫 번째 매개변수를 bind 에 넘겨줌으로써 this 를 명확하게 설정할 수 있습니다.

this 의 문맥을 정해주고 싶을 때 마다 bind 를 사용하는 방법 말고, 다른 방법으로도 this 의 문맥을 유지할 수 있습니다.

화살표 함수를 사용하는 것입니다.

ES6 화살표 함수(Arrow function)를 사용하면 this 는 lexical scope 를 갖게 됩니다. 즉 정의된 곳의 문맥을 사용합니다.

## 화살표 함수

화살표 함수는 다음과 같은 특징을 가지고 있습니다.

- 화살표 함수는 익명 함수로만 만들 수 있습니다.
- 화살표 함수는 생성자로 사용할 수 없습니다.
- 화살표 함수는 스스로의 this, argument 를 가지지 않습니다.
- 함수가 정의된 스코프에 존재하는 this 를 가리킵니다.
- 화살표 함수는 생성될 때 this 가 결정됩니다.
- 화살표 함수가 어떻게 사용되건, 호출되건, this 는 바뀌지 않습니다.

```js
const account = {
  username: "bohyeon",
  balance: 10000,
  getBalance: function() {
    //화살표 함수 사용
    //화살표 함수는 return 하지 않아도 값이 반환됩니다.
    innerFunc = () => `${this.username}님의 잔액은 ${this.balance}입니다.`;
    console.log(innerFunc());
  }
};
account.getBalance(); //bohyeon님의 잔액은 10000입니다.
```

innerFunc 함수에서 화살표 함수를 사용하면 더이상 bind 를 사용하여 this 를 binding 하지 않아도 됩니다.

화살표 함수는 자신만의 this 를 갖지 않기 때문에, 바깥 스코프에서 this 의 값을 계승받습니다.

그러나 이러한 특징 때문에 객체의 메소드로 화살표 함수를 사용하는 것은 적합하지 않습니다.

```js
const person = {
  name: "bohyeon",
  greet: () => console.log(`hi ${this.name}`)
};
person.greet(); // hi
```

바깥 스코프에서 this 의 값을 계승받습니다. 즉 this 는 메소드를 호출한 객체를 가리키지 않고 상위 컨텍스트인 전역 객체, window 를 가리키게 됩니다.

객체의 메소드에서는 화살표 함수가 아닌, function 문법 함수를 사용해야 합니다.

## 정리

객체의 메소드로는 화살표 함수보다 function 문법 함수를 사용해야 한다는 것만 유의한다면,
화살표 함수를 사용하여 좀 더 직관적이고 편리하게 this 를 사용할 수 있습니다.

function 문법에서 this 는 함수가 어떻게 실행되는가에 따라서 동적으로 바뀌게 됩니다.

화살표 함수의 경우 화살표 함수가 정의된 곳의 문맥에 의해서 this 가 정의됩니다.

this 가 예상한 대로 동작하지 않는다면 함수의 실행 환경을 생각해보아야 합니다.

## 참고 자료

https://medium.freecodecamp.org/when-and-why-you-should-use-es6-arrow-functions-and-when-you-shouldnt-3d851d7f0b26

https://blueshw.github.io/2018/03/12/this/

https://www.codementor.io/niladrisekhardutta/how-to-call-apply-and-bind-in-javascript-8i1jca6jp

https://gist.github.com/zcaceres/2a4ac91f9f42ec0ef9cd0d18e4e71262
