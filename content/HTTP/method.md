+++
category = HTTP
comments = true 
date = "20200920"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags="HTTP, HTTP METHOD, GET, POST, PUT"
title = "[HTTP]HTTP Method"
description = "HTTP 메소드 종류와 언제 사용하는지 알아보자"
front = 'true'
+++

## HTTP Method?

HTTP Method는 HTTP 프로토콜을 사용하여 자원에 어떤 행동을 하려고 할 때, 그 행동을 나타내는 것이다.

어떤 상황일 때 어떤 HTTP Method 를 사용하는지 정리해보았다.

## HTTP Method 의 종류

- GET
- POST
- PUT
- DELETE
- PATCH
- OPTIONS
- HEAD
- TRACE
- CONNECT

## HTTP Method 속성

HTTP Method들의 특징을 알아보기 전에, HTTP 속성을 먼저 알아보자!

HTTP Method 속성에는 idempotent와 Safe가 있다.

### Idempotent?

Idempotent는 멱등하다라고 번역한다.

멱등성을 가진 HTTP Method 는 여러번 요청해도 의도한 효과는 한 번 요청한 것과 같다.

### Safe?

Safe는 서버 자원에 영향을 끼치지 않는 요청으로, read-only인 효과를 의도한 요청이다.

## GET

GET 메소드는 서버의 리소스를 달라는 의미로 사용한다.
Safe하고 Idempotent하다.

## POST

POST는 서버에게 데이터를 보내겠다는 의미로 사용하며, Safe하지 않고, Idempotent 하지 않다.

POST가 idempotent 하지 않은 이유는, 예를들어 게시글 생성 요청을 POST 메소드로 여러 번 보냈다고 하 게시글이 계속해서 생성될 것이므로 동일한 요청에 항상 동일한 응답과, 서버에 동일한 영향을 주지 않을 것이다.

## PUT

PUT은 서버가 갖고 있는 리소스를 내가 보내는 것으로 대체하라라는 의미로 사용한다.

PUT은 Safe하지 않고, Idempotent하다.

PUT은 말 그대로 내가 말하는 곳에 내가 보낸 리소스를 갖다 놔라라는 것인데, 요청 URL에 해당하는 리소스 전체를 갈아 끼운다고 생각하면 된다.

그러므로, 리소스의 일부만 수정하고 싶고, 수정할 부분만 서버에 보내고 싶을 때는 적합하지 않은 메소드이다. 일부만 수정하고 싶을 때는 POST 메소드를 사용하는 것이 좋다.

## DELETE

DELETE는 서버가 갖고 있는 리소스를 삭제하라는 의미로 사용한다.

Safe하지 않고, Idempotent 하다.

## PATCH

PATCH는 서버가 갖고 있는 리소스를 수정하라는 의미로 사용한다.

PATCH 메소드는 Safe 하지 않고, Idempotent 하지 않다.

### PATCH 메소드가 idempotent 하지 않은 이유

여기서 궁금한 점이 생겼다, PATCH는 리소스를 수정할 때, 리소스의 일부만 수정할 때 사용하는 메소드라고 알고 있는데 PUT은 Idempotent한데, PATCH는 왜 idempotent하지 않을까?

PATCH 메소드는 단순히 내가 알고 있는 아래와 같은 방식으로 수정하고 싶은 리소스를 보내는 것 뿐만 아니라,

```jsx
PATCH / users / 1
{
  age: 30
}
```

아래와 같이 변경할 사항이 전달되는 방식이 다를 수 있다는 것이다.

```jsx
PATCH /users/1
{
	change: 'age',
	from : 30,
	to: 31
}
```

위 방식으로 PATCH 요청을 보내야 하면 , 첫 번째 요청에서 이미 수정되었으므로, 더이상 'age'가 30이 아니게 된다. 그러므로 idempotent 하지 않다.

## OPTIONS

OPTIONS는 특정 URL에 대한 옵션들을 알려달라는 의미로 사용되며, 보통 사용 가능한 메소드들을 반환한다.

Safe하고 Idempotent 하다.

## HEAD

HEAD는 GET으로 요청하면, 어떤 헤더들을 받게 될 지 알려달라는 메소드이다. GET 과 같은 응답 헤더를 받을 수 있지만, 본문은 없다.

Safe하고, Idempotent 하다.

## TRACE

TRACE는 내 요청이 서버에 갔다가 응답이 올 때 까지 어떤 프록시 서버들을 거치는지 알려달라는 의미이다.

Safe하고, Idempotent 하다.

## CONNECT

CONNECTION은 SSL 터널링 등 특수 용도에 사용하는 메소드이다.

Safe하고, Idempotent 하다.

## 참고자료

[https://developer.mozilla.org/ko/docs/Glossary/Idempotent](https://developer.mozilla.org/ko/docs/Glossary/Idempotent)

[https://softwareengineering.stackexchange.com/questions/260818/why-patch-method-is-not-idempotent](https://softwareengineering.stackexchange.com/questions/260818/why-patch-method-is-not-idempotent)
