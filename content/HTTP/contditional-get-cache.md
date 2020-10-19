+++
category = HTTP
comments = true 
date = "20201019"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags="conditional get, cache, if-modified-since, etag, if-modified-since, last-modified, expires, cache-control, http"
title = "[HTTP]conditional get과 Cache"
description = "conditional get과 cache에 대해 알아보자!"
front = 'true'
+++

## Conditional GET?

클라이언트는 이전에 한 번 요청해서 돌려받은 리소스에 대해 다시 한 번 요청을 할 때, 불필요한 트래픽을 줄이기 위해 해당 리소스가 변경된 경우에만 다시 보내달라고 요청할 수 있다.

클라이언트가 어떤 웹 페이지에 접근한 후, 다시 같은 페이지에 접근했을 때 서버가 다시 그 페이지의 내용을 전송하는 것은 낭비이다.

웹 페이지의 내용에 변경이 없다면, 페이지의 내용을 다시 전송할 필요가 없지 않을까?

다시 전송하지 않기 위해서 사용하는 헤더 Last-Modified와 ETag를 살펴보자!

### Last-modified

이미지 요청에 대한 응답 헤더이다.

![naver-lastmodified](https://user-images.githubusercontent.com/36990926/96373859-1f2baa80-11aa-11eb-8b51-3fdd1ed6378a.png)

`last-modified: Thu, 04 Jun 2020 07:19:23 GMT`

- Last-Modified 생성 권한은 서버가 갖고 있다.

- Last-Modified는 Date보다 이후여서는 안된다. Date는 문서가 서버에서 만들어진 시간

- 서버는 가능한한 항상 Last-Modified 헤더를 보내야 한다.

#### 동작 과정

1. 요청을 보낸다.

2. 클라이언트에서는 Last-Modified 응답 헤더를 받는다.

3. 요청에 If-Modified-Since 헤더에 캐시된 마지막 수정일을 보낸다.

4. 서버에서 If-Modified-Since 헤더를 보고, 변경 일시가 클라이언트가 알고 있는 것과 같은 경우

   -> 바디가 없다

5. 최근 변경 일시가 클라이언트가 알고 있는 것과 다른 경우

   -> 바디를 준다.

   -> Last-Modified 헤더에 최근 변경 일시 값을 준다.

### ETag

![naver response header](https://user-images.githubusercontent.com/36990926/96374017-1c7d8500-11ab-11eb-886f-c493c6f0afbd.png)

- ETag 생성 권한은 서버가 갖고 있다.

- 강한 ETab : 리소스가 조금이라도 바뀌면 바뀌어야 한다.

- 약한 ETag : 리소스에 의미있는 수준의 변화가 없다면 바뀌지 않을 수 있다.

#### 동작 과정

1. 요청을 보낸다.

2. 응답 헤더에 Etag 값을 보낸다.

3. 요청 메시지에 캐시된 문서의 ETag값을 If-None-Match 헤더에 담아 보낸다.

4. 서버에서 If-None-Match값을 비교하여 변경되지 않았으면, 다른 곳을 봐라, 캐시를 보라는 의미로 300번대, 304 Not Modified를 응답한다.

5. ETag 클라이언트가 알고 있는 것과 다른 경우, 200 OK응답과 새 ETag와 함께 바디를 준다.

### If-modified ? ETag?

둘 다 같은 기능을 하는 것 같은데 왜 둘 다 써야 할까?

하나만 남기면, ETag가 강력하지만, 둘 중 하나라도 다르면 캐시를 이용하지 않고 무조건 새로 받아야 한다.

둘 다 검사해야 한다!

## Cache

Conditional get을 해도 일단, 클라이언트가 서버에 요청을 보내서 리소스가 변경되었는지 요청을 보내고, 응답이 올 때 까지 기다려야 한다.

한 번 왔다 갔다 하는 작업도 비용이 들기 때문에 클라이언트와 서버 사이의 오가는 HTTP 메시지를 저장한 후 재활용하여, 요청의 반응시간과 네트워크의 트래픽을 모두 줄여주는 기술이다.

`Cache-Control`과 `Expire` 헤더를 사용하여 라운드 트립을 하지 않고, 캐시된 리소스를 응답할 수 있다.

### 캐시 적중과 부적중

- 캐시 적중

  - 클라이언트가 이전과 같은 요청을 하면, 이전과 같은 응답을 반환한다

- 캐시 부적중

  - 대응하는 사본이 없다면, 그냥 원 서버로 전달된다.

### 재검사

재검사(Revalidation)

- 웹 서버 콘텐츠는 변경될 수 있기 떄문에 캐시는 반드시 그들이 갖고 있는 사본이 여전히 최신인지 서버를 통해 때떄로 점검해야 한다.
- 이러한 신선도 검사를 HTTP 재검사라고 부른다.
- HTTP는 캐시된 객체를 재확인하기 위해 가장 많이 쓰는 것이 if-Modified-Since 헤더다.

* 전통적으로 HTML은 캐시하지 않거나, 캐시 타임을 줄인다.

### 캐시 동작

1. 요청 받기

   캐시는 네트워크 커넥션에서의 활동을 감지하고, 들어오는 데이터를 읽어들인다.

2. 파싱

   캐시는 요청 메시지를 여러 부분으로 파싱하여 헤더 부분을 조작하기 쉬운 자료 구조에 담는다.

3. 검색

   캐시는 URL을 알아내고 그에 해당하는 로컬 사본이 있는지 검사한다.

   로컬 복사본은 메모리에, 아니면 디스크나 근처 다른 컴퓨터에 있을 수 있다.

4. 신선도 검사

   HTTP는 캐시가 일정 기간 동안 서버 문서의 사본을 보유할 수 있도록 해준다. 이 기간 동안, 문서는 '신선'한 것으로 간주되고 캐시는 서버와의 접촉 없이 이 문서를 제공할 수 있다.

5. 응답 생성

   캐시된 응답을 원 서버에서 온 것처럼 보이게 하고 싶기 때문에 캐시는 캐시된 서버 응답 헤더를 토대로 응답 헤더를 생성한다.
   Date 헤더는 그 객체가 원 서버에서 최초로 생겨난 일시를 표현하는 것으로 캐시가 조정해서는 안된다.

6. 전송

   캐시는 응답을 클라이언트에게 돌려준다.

7. 로깅

   대부분의 캐시는 로그 파일과 캐시 사용에 대한 통계를 유지한다.

### stale ? fresh?

HTTP는 Cache-Control과 Expire라는 특별한 헤더들을 이용해서 원 서버가 각 문서에 유효기간을 붙일 수 있계 해준다.

이 헤더들은 콘텐츠가 얼마나 오랫동안 신선한 상태로 보일 수 있는지 좌우한다.

캐시가 만료되지 않은 경우를 fresh한 상태라고 하고, 만료된 경우 stale cache라고 한다.

### 캐시 제어

HTTP는 문서가 완료되기 전까지 얼마나 오랫동안 캐시될 수 있게 할 것인지 서버가 설정할 수 있는 여러 가지 방법을 제공한다.

- `Cache-Control: no-store`

  - no-store가 표시된 응답은 캐시가 그 응답의 사본을 만드는 것을 금지한다.

- `Cache-Control: no-cache`

  - 진짜 이 캐시 써도 되냐고 서버에 물어봐야 한다. 재검사 필수!

- `Cache-Control: must-revalidate`

  - 만료 정보를 엄격하게 따르도록 설정

- `Cache-Control: max-age`

  - max-age같은 문서의 최대 나이를 정의한다. 최대 나이는 문서가 처음 생성된 이후부터(Date), 제공하기엔 더 이상 신선하지 않다고 간주될 때까지 경과한 시간의 합법적인 최댓값이다.

- `Expires`

  - 절대 유효 기간을 명시한다.

### 조건부 메서드와 재검사

conditional get에서 설명했듯이, `Cache-Control` 헤더, `Expires` 헤더를 보고 stale하면, 아래 헤더로 문서가 수정되었는지 확인한다.

#### If-Modified-Since

- `If-modified-Since: <data>`

  - 만약 문서가 주어진 날짜 이후로 수정되었다면, 요청 메서드를 처리한다.

#### If-None-Match

- `If-None-Match:<tags>`

  - 문서에 대한 일련번호와 같이 동작하는 특별한 태그를 제공할 수 있다.

## 정리

오리진 서버에서 리소스를 받아오는 과정의 비용을 줄이기 위해서 리소스를 캐싱할 수 있다.

ETag, Last-Modified 헤더를 통해서 이 문서의 태그와 마지막 수정일을 알 수 있다.

If-Modified-Since 와 If-None-Match를 요청 헤더에 보내면, 서버는 요청을 해석하여 리소스가 수정됐는지 확인 후 그에 맞는 응답을 준다.

이런 과정은 오리진 서버에 한 번 왔다 갔다 해야 한다. HTTP 요청은 응답이 올때까지 기다려야 하고, 서버가 멀다면 이 비용이 많이 들 수 있다.

이런 네트워크 비용을 줄이기 위해서 `Cache-Control`, `Expire` 헤더를 사용할 수 있다.

리소스의 신선도를 체크하여 리소스가 stale, 신선하지 않을 때만 오리진 서버에 If-Modified-Since, If-None-Match 헤더를 담아 요청을 보낸다.

아직 신선하다면, 요청을 보내지 않고 캐시된 리소스를 사용하여 응답한다.

## 참고

[HTTP 완벽 가이드](http://www.yes24.com/Product/Goods/15381085)
