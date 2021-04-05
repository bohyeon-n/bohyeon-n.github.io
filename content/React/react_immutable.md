+++
category = React
comments = true
date = "20210405"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = [ "React", "Immutability", "불변성"]
title = "리액트의 상태가 불변해야 하는 이유"
description = "리액트의 상태가 불변해야 하는 이유를 알아보자"
front = true
+++

이번 글에서는 불변성이 무엇인지 알아보고, 리액트에서 왜 불변성을 유지해야 하는지, 다른 라이브러리에서는 어떤지에 대해 정리해보았다.

## 불변성?

불변성이 프로그래밍에서 주목받는 이유는 변경 가능한 상태를 여러 곳에서 공유하게 됨으로써 발생하는 여러 가지 문제를 해결하기 위함이었다.

이런 문제는 멀티 스레딩과 같은 동시성 프로그래밍을 사용할 때 많이 발생했는데(ex)동시에 값을 읽고 다른 동작을 할 때)
기존에는 락을 걸어놓고 락이 풀린 상태에만 스레드가 상태에 접근할 수 있도록 허가하는 방식을 주로 사용했었다.

그럼 불변성이 정확히 무엇일까? Immutability(불변성)는 상태나 값을 변경하지 않는 것이다.

자바스크립트에서 예를 들자면,

자바스크립트의 원시 타입의 값들은 불변성을 갖고 있다.

```js
let a = 1
a = 2
```

위 코드처럼 변수에 값을 재할당하면 'a'가 참조하고 있는 메모리의 값이 변경되는 것이 아니라 새로운 값인 '2'가 메모리에 새로 저장되고 그 주소 값이 'a'에 할당된다.

원시 타입 값이 아닌 다른 참조형 값들(객체, 배열, 함수 등)은 이와는 다르게 동작한다.

```js
const myObj = {
  a: 1
}

myObj.a = 2
```

'myObj'의 내부 프로퍼티의 값을 변경했을 때 myObj에서 참조하고 있는 'a'값은 변경되지 않고 값이 변경된다.
단, 'a'가 참조하고 있는 '1'의 주소 값은 변경된다.

이처럼 자바스크립트 객체는 가변한다. 리액트에서는 자바스크립트 객체가 가변하기 때문에 문제가 된다.

## 리액트 상태 불변성

리액트의 상태가 불변해야 하는 이유는 두 가지 정도가 있는데

1. 값이 변경됐는지 알기 위해서
2. 값을 수정하면, 이전 상태와 바뀐 상태값이 동일해져서 비교할 수 없어서

리액트에서는 상태가 변하면, 컴포넌트가 리렌더링된다.

리액트에서 리렌더링할 때 값 자체가 아니라 참조 값을 비교하므로 참조 값이 동일하면, 변경을 감지할 수 없다.

또한, 값을 수정하면 이전 상태와 바뀐 상태값이 동일해지기 때문에, 이전 상태와 현재 상태를 비교하여 렌더링할 수 없게 된다.

```js
myPackage.sender.address.country.id
```

위 'myPackage'객체처럼 무엇이 변경됐는지 확인하기가 매우 어려울 때가 있다.

불변 객체를 사용하지 않고 객체의 변화를 감지할 수 있지만, 효과적으로 객체의 변화를 감지할 수 있는 가장 좋은 방법은 불변 객체를 사용하는 것이다.

## 불변하게 만드는 방법

자바스크립트에서 객체를 불변하게 만드는 방법은 크게 3가지 정도가 있다. assign 메서드 사용, spread 연산자 사용, 라이브러리 사용이다.

### assign

`Object.assign` 메서드를 사용할 수 있다.

```js
Object.assign({}, myObj, {
  b: 2
})
```

Object.assign은 매개 변수로 전달된 객체의 모든 속성을 첫 번째 매개 변수에 지정된 객체에 복사한다.

### spread 연산자

```js
{
  ...myObj,
  b: 2
}
```

### 라이브러리 사용

위 두 가지 방식을 사용하면 얕은 복사가 된다. 그러므로 객체 안의 객체가 있으면 그 안의 객체도 복사해주어야 한다.

하지만 무분별하게 깊은 복사를 사용하는 것은 다음과 같은 이유로 문제가 될 수 있다.

- 깊은 복사는 성능이 저하될 수 있다.
- 리액트에서 변경되지 않은 객체도 변경되었다고 감지하여 모든 것을 리렌더링할 수 있다.

그러므로, 변경된 객체만 변경해주는 것이 좋다.

이를 편하게 하고자 [immer.js](https://github.com/immerjs/immer)와 같은 라이브러리를 사용하여 쉽게 불변성을 관리할 수 있다.

immer.js performance 문서를 보면, 변경된 객체만 복사하여 성능을 향상시킬 수 있다고 나와 있다.

## mobx

그럼 다른 라이브러리에서도 상태를 불변하게 유지할까? mobx를 살펴보기로 했다.

일단 mobx를 간단하게 설명하면 mobx는 Observer 패턴을 사용하여 상태 데이터가 관찰 가능(Observable)하게 관리하여 상태가 변경되었을 때 반응할 수 있도록 돕는 라이브러리다.

mobx는 상태를 불변하게 변경하지 않는데, 그 이유는 무엇일까? 일단 불변성의 단점을 알아보고 mobx가 가변하게 상태를 변경하는 이유를 알아보자

### 불변성의 단점

불변성 자체에 문제가 있는 것은 아니지만, 다음과 같은 단점이 있을 수 있다.

- 객체 지향 프로그래밍과 맞지 않는다.
- 불변성 유지를 위해 노력해야 한다.

### mobx가 상태를 불변하게 유지하지 않는 이유

mobx에서 왜 상태를 불변하게 유지하지 않는지 찾아보았는데, 다음과 같은 답변을 찾았다.

- observable 배열에 item을 추가하는 경우 변경 불가능한 방식으로 항목을 추가하면 전체 배열이 다시 렌더링하는 때도 있다.
- mobx에서는 상태를 관찰 가능(observable)하게 관리하기 때문에 observable 데이터를 업데이트할 때 불변의 개념을 사용하면 안 된다.

mobx가 상태를 가변하게 업데이트하기 때문에 상태를 추적하거나 저장할 때 문제가 될 수 있는데 mobx에서는 mobx-state-tree 라이브러리를 제공하여 이러한 문제들을 해결한다.

### Mobx-state-tree?

Mobx-sate-tree는 mobx를 기반으로 한 state container 시스템이다. mobx-state-tree를 씀으로써 트리 모델 구조 안에서 state를 관리함과 동시에 트리 구조에서 자유롭게 위아래로 이동할 수 있다. mobx-state-tree은 상태를 가변하게 관리하지만, immutable snapshot을 보장한다. 스냅샷을 저장하여 상태를 저장하거나 되돌릴 수 있다.

## 마치며

mobx에서 왜 상태를 불변하게 유지하지 않는지에 대한 정확한 답변은 찾지 못했다. observable 객체를 트래킹할 때 어떤 식으로 동작하는지에 대한 글은 아직 찾아보지 못했다.

mobx든 redux든 각자가 추구하는 컨셉이 있어서 장단점이 있고 이를 잘 알고 사용하는 것이 중요한 것 같다.

## 참고 자료

https://immerjs.github.io/immer/performance/

https://en.wikipedia.org/wiki/Observer_pattern

https://oliverbenns.com/posts/mutable-state-with-mobx/

https://woowabros.github.io/experience/2019/01/02/kimcj-react-mobx.html

http://www.secmem.org/blog/2019/03/09/mobx-internals/

https://stackoverflow.com/questions/48040627/mobx-mutability-vs-immutability

https://blog.logrocket.com/immutability-in-react-ebe55253a1cc/

https://medium.com/@justintulk/why-immutability-boosts-react-performance-145f40bfbf00
