+++
category = JavaScript
comments = true
date = "20201029"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = [ "JS"]
title = "[자바스크립트]prototype??"
description = "자바스크립트 prototype을 알아보자!"
front = true
+++

이 글은 [You Don't Know JS : this와 객체 프로토타입](https://www.hanbit.co.kr/store/books/look.php?p_code=E7184102647)을 읽고 프로토타입에 대해서 정리한 글입니다.

## 클래스? 상속?

prototype에 대해 알아보기 전에 클래스와 상속은 무엇인지 알아보자.

클래스와 상속은 무엇일까?

클래스와 상속은 특정 형태의 코드와 구조를 형성하며 실생활 영역의 문제를 소프트웨어로 모델링하기 위한 방법이다.

객체 지향 또는 클래스 지향 프로그래밍에서는 데이터는 자신을 기반으로 실행되는 작동과 연관되므로(클래스 = 데이터 + 메소드) 데이터와 작동을 함께 잘 감싸는 것이 올바른 설계라고 강조한다. 이를 캡슐화라고 한다.

데이터와 관련된 작동들을 클래스의 메서드로 설계한다. 그래서 어떤 데이터가 주어지더라도, 데이터와 작동이 잘 포장된 클래스의 인스턴스로 나타낼 수 있다.

한 곳에 클래스를 정의해두고 이를 상속, 확장받아 인스턴스를 생성한다.

다형성은 부모 클래스에 뭉뚱그려 정의된 작동을 자식 클래스에서 좀 더 구체화하여 오버라이드하는 것을 뜻한다.

자바스크립트에는 클래스가 있을까?

자바스크립트는 클래스 개념이 없다. 그럼에도 개발자들이 다른 객체 지향 언어들과 비슷하게 상속을 구현하려고 했다

## 자바스크립트의 class

그동안 자바스크립트는 클래스처럼 생긴 구문을 제공하여 클래스 디자인 패턴을 실현하려고 했다. 그러나 개발자들이 클래스 디자인 패턴으로 코딩할 수 있도록 제공할 것일뿐 클래스는 아니다.

그럼 자바스크립트는 다른 객체 지향 언어들과 뭐가 다를까?

자바에서는 클래스를 인스턴스화해야 작업을 할 수 있다. 생성된 객체는 클래스에 기술된 모든 특성을 그대로 가진 사본이다.

자바스크립트는 객체를 상속받거나 인스턴스화해도, 자동으로 복사 작업이 일어나지 않는다. 자바스크립트에는 인스턴스를 만들 '클래스'라는 개념 자체가 없고 오직 객체만 있다.

객체지향을 설명할 때 붕어빵 틀과 붕어빵으으 설명하는데, 자바는 붕어빵만 먹을 수 있는데, 자바스크립트는 붕어빵 틀도 먹을 수 있다!

그리고 객체는 다른 객체에 복사 되는 게 아니라 서로 연결된다.

자바스크립트는 객체를 복사하는 것이 아닌, 객체를 위임받고자 한다. 이게 프로토타입이다.

## prototype?

자바스크립트에서는 상속과 구분하기 위해 프로토타입 상속이라는 말을 붙였다.

'일종의 클래스'같은 독특한 작동은 함수가 기본으로 프로토타입이라는 공용/열거 불가 프로퍼티를 가진다는 이상한 특성에 기인한다.

```js
function Foo() {
  //...
}

Foo.prototype // {}

const a = new Foo()
```

아래는 위 코드가 어떻게 연결되는지 표현한 그림이다.

![](https://user-images.githubusercontent.com/36990926/97564837-89eda900-1a28-11eb-9377-be27950253ff.png)

Foo 함수를 생성하면, Foo.prototype이 생성된다.

new Foo() 로서 만들어진 모든 객체는 결국 `Foo 점 프로토타입` 객체와 [[prototype]] 링크로 연결된다.

`new Foo()` 로 새 객체(a)가 만들어지고 이 객체는 `Foo.prototype` 객체와 내부적으로 연결이 맺어졌다.

상속은 기본적으로 복사를 수반하지만, 자바스크립트는 객체 프로퍼티를 복사하지 않는다. 대신 두 객체에 링크를 걸어두고 한쪽이 다른 쪽의 프로퍼티/함수에 접근할 수 있게 위임한다.

자바스크립트는 앞에 new를 붙여 호출한 함수를 모두 '생성자'라 할 수 있다. 함수는 결코 생성자가 아니지만, new를 사용하여 호출할 때에만 '생성자 호출'이다.

### constructor?

`a.constructor` 프로퍼티는 실제로 a에 존재하는 걸까? 아니다. 위 그림처럼 `.constructor` 역시 Foo.prototype에 위임된 레퍼런스로서 a.constructor는 Foo를 가리킨다.

Foo.prototype의 .constructor 프로퍼티는 기본으로 선언된 Foo함수에 의해 생성된 객체(Foo.prototype)에만 존재한다.

```js
Foo.prototype = {}
```

이렇게 새 프로토타입 객체를 생성하면, constructor 프로퍼티가 저절로 붙지 않는다.

이렇게 없어지면, 결국 계속 상위 객체로 위임하다가 결국 [[Prototype]]체인 끝자락인 Object.prototype 객체에 이르게 된다.

### 자바스크립트 상속

그럼 자바스크립트에서 상속은 어떻게 할까?

```js
function Foo(name) {
  this.name = name
}

Foo.prototype.myName = function() {
  return this.name
}

function Bar(name, label) {
  Foo.call(this, name)
  this.label = label
}
// Bar.prototype 를 Foo.prototype에 연결한다.
// 새로운 객체를 만들고 내부 [[Prototype]]을 지정한 객체(Foo.prototype)에 링크한다.
Bar.prototype = Object.create(Foo.prototype)

Bar.prototype.myLabel = function() {
  return this.label
}

const a = new Bar('a', 'obj a')

a.myLabel()
a.myName()
```

Bar가 Foo를 상속하는 것 처럼, Bar.prototype의 [[prototype]]이 Foo.prototype을 가리키도록 만들었다.

ES6에서는 위에서 처럼 새로운 객체를 생성하지 않고, 기존의 객체 연결 정보를 수정할 수 있는 표준적인 방안이 있다.

```js
Object.setPrototypeOf(Bar.prototype, Foo.prototype)
```

## 객체 링크

[[Prototype]] 체계는 다름 아닌 다른 객체를 참조하는 어떤 객체에 존재하는 내부 링크다.

이 연결 고리는 객체의 프로퍼티/메서드를 참조하려고 하는데, 그런 프로퍼티/메서드가 해당 객체에 존재하지 않을 때 주로 활용된다.

엔진은 [[Prototype]]에 연결된 객체를 하나씩 따라가면서 프로퍼티/메서드를 찾아보고 발견될 때까지 같은 과정을 되풀이한다.

이렇게 객체 사이에 형성된 일련의 링크를 '프로토타입 체인'이라고 한다.

## 마치며

책에서는 ES6 클래스가 자바스크립트가 마치 클래스처럼 동작한다고 착각하게 할 수 있다고 쓰여있었다.
나는 prototype으로 상속을 구현하는 것이 복잡하게 느껴져서 클래스 문법이 나온 것이 다행이라 생각했다. 😂

## 참고자료

[You Don't Know JS : this와 객체 프로토타입](https://www.hanbit.co.kr/store/books/look.php?p_code=E7184102647)
