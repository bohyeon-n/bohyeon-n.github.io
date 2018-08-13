+++
category = Development
comments = true
date = "20180810"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = [ "JS"]
title = "REST란?"
description = "REST란?"
+++

## REST 란?

### REST

**REST**(REpresentation State Transfer)

REST API 란 웹에 존재하는 모든 자원(이미지, 동영상, DB)에 고유한 URI 를 부여해 활용하는 것으로, 자원을 정의하고 자원에 대한 주소를 지정하는 방법론을 의미한다.

`무엇을(HTTP URI 로 정의된 리소스) 어떻게 한다(HTTP Method + payload)로 잘 정의된 API 를 REST API 라고 할 수 있다.`

REST 를 더 알아보기 전에 두 가지 용어를 알아보도록 하자.

1. 클라이언트

   클라이언트란 API 를 사용하는 사람이다.
   클라이언트는 사람이 아닌 웹브라우저가 될 수도 있다. 트위터 웹사이트에 접속하면, 브라우저는 트위터 API 를 호출하는 클라이언트가 되고, 반환되는 데이터는 화면에 렌더된다.

2. 리소스

   리소스는 API 가 정보를 제공할 수 있는 모든 객체가 될 수 있다.
   예를 들어 인스타그램의 리소스는 사용자, 해시태그, 사진 등이 될 수 있고 각각의 리소스는 사용자 이름, 숫자 등 고유한 식별자를 가지고 있다.

### REST 의 기본구조

REST API 는 다음의 세 가지 요소로 구성된다.

- 자원 - URI
- 행위 - HTTML Method
- 표현 - Representation

REST 는 제어할 자원을 표시한 **URI** 로 수행 할 행위인 **HTTP Method** 를 보내어 그 결과를 **표현**한다.

#### URI

**URI**(Uniform Resource Identifier)

URI 는 웹 상에 존재하는 어떤 자원을 나타내는 유일한 주소이다.

**URI 와 URL 의 차이**

URI 는 Uniform Resource Identifier 이고,
URL 은 Uniform Resource Locator 이다.

URL 은 어떤 자원의 위치를 나타내고
URI 는 어떤 자원을 식별하기까지 한다.

URL 은 URI 의 하위 개념이다.

#### HTTP Method

- POST
  POST 를 통해 URI 를 요청하면 리소스를 생성한다.
- GET
  GET 을 통해 해당 리소스를 조회한다. 리소스를 조회하고 해당 도큐먼트에 대한 자세한 정보를 가져온다.
- PUT
  PUT 을 통해 해당 리소스를 수정한다.
- DELETE
  DELETE 를 통해 리소스를 삭제한다.

#### Representation

가장 대표적인 representation 은 JSON 형식이다. 또한 xml html 형식이 될 수도 있다.

#### RESTful

REST API 의 설계 의도를 정확하게 지켜주는 API 를 **RESTful** 하다 라고 부른다.

##### REST API 중심 규칙

1. URI 는 정보의 자원을 표현해야 한다.
   `GET /members/delete/1`
   URI 는 자원을 표현하는 데 중점을 두어야 한다. delete 와 같은 행위에 대한 표현이 들어가서는 안된다.
2. 자원에 대한 행위는 HTTP Method 로 표현한다.
   `DELETE /member/1`
   URI 는 자원을 표현하는 데 집중하고 행위에 대한 정의는 HTTP Method 를 통해 설계한다.

##### URI 설계 원리

RESTful 한 API 를 설계하기 위해서는 URI 를 잘 정의하는 것이 중요하다.
URI 설계 원리는 일반적으로 다음과 같다.

1. 슬래시 `/`는 계층 관계를 나타내는 데 사용한다.
2. `_` 언더 스코어 문자를 URI 에 사용하지 않도록 한다.
3. `-` 하이픈은 URI 가독성을 높이는 데 사용된다.
4. 소문자를 사용한다.
5. 파일 확장자는 URI 에 포함시키지 않는다.
6. URI 에는 명사 위주로 쓴다.

### 참고자료

[what is REST](https://medium.com/extend/what-is-rest-a-simple-explanation-for-beginners-part-1-introduction-b4a072f8740f)

[Che1's Blog](https://nachwon.github.io/rest-1/)

[Toastmeetup Blog](http://meetup.toast.com/posts/92)
