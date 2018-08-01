+++
category = JavaScript
comments = true
date = "20180731"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = [ "JS"]
title = "this, javascript"
description = "javascript, this ,arrow function, bind"
+++

서론: this 란 무엇인가?
본론:

- this 의 동작 방식? 규칙
- 해결 방법
  - bind
  - arrow function

결론:
...

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

this 는 때에 따라 다른 값을 가리킨다. 어떠한 문맥이냐에 따라서 그 값이 바뀝니다.

1.  Global scope 에서 사용될 때 this 는 전역 객체를 가리킵니다.(window 객체)
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
      return `${this.username}님의 잔액은 ${this.balance}입니다.`; //undefined님의 잔액은 undefined입니다.
    };
    console.log(innerFunc());
  }
};
account.getBalance();
```

getBalance 가 외부에서 실행되면 this 는 account 입니다. 그러나, getBalance 함수 내부에서 innerFunc 를 호출 할 때는 그 어떤 문맥도 지정하지 않았기 때문에 innerFunc 의 this 가 window 가 됩니다.

## bind

bind 함수는 this 의 문맥을 유지할 때 사용합니다.
