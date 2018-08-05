+++
category = JavaScript
comments = true
date = "20180806"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = [ "JS"]
title = "Javascript this, bind and arrow function"
description = "Javascript this, bind and arrow function"
+++

## this

this 는 생성자 혹은 메소드에서 객체를 가리킬 때 사용하는 키워드입니다.

this 는 이럴 때 사용합니다!

1.  새로 만들어지는 객체에 생성자의 속성을 넣어줄 때 사용합니다.
2.  객체의 속성에 접근(메소드에서 사용하는 this)할 때 사용합니다.

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
    //this키워드를 사용하여 객체의 속성이 username과 balance에 접근하고 있다.
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

4 번, 객체에 속한 메소드의 내부함수에서 사용되는 경우를 자세히 살펴보도록 하겠습니다.

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

getBalance 가 외부에서 실행되면 this 는 account 입니다. 그러나, getBalance 함수 내부에서 innerFunc 를 호출 할 때는 그 어떤 문맥도 지정하지 않았기 때문에 innerFunc 의 this 는 window 가 됩니다.
window 에는 username 이나 balance 속성이 없기 때문입니다.

이렇게 함수가 언제 호출되는지에 따라서 this 의 값이 변한다면,

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

이렇게 bind 를 사용하여 this 를 원하는 값으로 설정할 수 있습니다.

bind 는 원하는 this 문맥을 가진 새로운 함수를 생성합니다. 첫 번째 매개변수를 bind 에 넘겨줌으로써 this 를 명확하게 설정할 수 있습니다.

그런데, 이렇게 this 의 문맥을 정해주고 싶을 때 마다 bind 를 사용해야 한다면 좀 불편하겠죠?

ES6 문법에서는 화살표 함수(Arrow function)을 제공합니다.

## 화살표 함수

화살표 함수와 function 문법 함수는 완전히 다릅니다.
화살표 함수는 다음과 같은 특징을 가지고 있습니다.

- 화살표 함수는 익명 함수로만 만들 수 있다.
- 화살표 함수는 생성자로 사용할 수 없다.
- 화살표 함수는 스스로의 this, argument 를 가지지 않습니다.
- 함수가 정의된 스코프에 존재하는 this 를 가리킵니다.
- 화살표 함수는 생성될 때 this 가 결정됩니다.
- 화살표 함수가 어떻게 사용되건, 호출되건, this 는 바뀌지 않습니다.

```js
const account = {
  username: "bohyeon",
  balance: 10000,
  getBalance: function() {
    // 화살표 함수를 사용
    innerFunc = () => {
      console.log(this === window); // false
      return `${this.username}님의 잔액은 ${this.balance}입니다.`; //undefined님의 잔액은 undefined입니다.
    };
    console.log(innerFunc());
  }
};
account.getBalance(); //bohyeon님의 잔액은 10000입니다.
```

innerFunc 함수에서 화살표 함수를 사용하면 더이상 bind 를 사용해서 this 를 binding 하지 않아도 됩니다.

화살표 함수는 this 를 바인딩 하지 않기 때문에, 둘러싸인 스코프에서 this 의 값을 찾을 수 있다.

그러나 이러한 특징 때문에 객체의 메소드로 호출할 경우 적합하지 않습니다.

```js
const person = {
  name: "bohyeon",
  greet: () => console.log(`hi ${this.name}`)
};
person.greet(); // hi
```

화살표 함수는 this 를 바인딩 하지 않기 때문에 외부 스코프에서 this 의 값을 계승받습니다.

즉 메소드를 호출한 객체를 가리키지 않고 상위 컨텍스트인 전역 객체 window 를 가리키게 됩니다.

객체의 메소드에서는 화살표 함수가 아닌, function 문법 함수를 사용해야 합니다.

## 결론

## 참고 자료

https://medium.freecodecamp.org/when-and-why-you-should-use-es6-arrow-functions-and-when-you-shouldnt-3d851d7f0b26
