+++
category = Network
comments = true
date = "20200914"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags="네트워크, IP, TCP/IP, Protocol"
title = "[네트워크]google.com을 입력하면 일어나는 일"
description = "google.com을 입력하면 일어나는 일에 대해서 알아보자!"
front = 'true'
+++

google.com을 입력하면 일어나는 일을 정리해보았다.

자세히 알아보기 전에 과정을 요약하면,

사용자가 웹 브라우저를 통해 google.com 을 입력하면 URL 주소 중 도메인 네임 부분을 DNS 서버에서 검색한다.
DNS 서버에서 해당 도메인 네임에 해당하는 IP 주소를 찾아 사용자가 입력한 URL 정보와 함께 전달한다.
브라우저는 HTTP 프로토콜을 사용하여 요청 메시지를 생성하고 HTTP 요청 메시지는 TCP/IP 프로토콜을 사용하여 서버로 전송된다. 서버는 response 메시지를 생성하여 다시 브라우저에게 데이터를 전송한다.
브라우저는 response를 받아 파싱하여 화면에 렌더링한다.

데이터 통신을 설명할 때 OSI 참조 모델을 사용할 수 있다.

OSI 참조 모델은 데이터 통신을 단계로 나누어 각 단계의 순서를 명확히 하고, 이 모델에 따라 프로토콜을 정의해서 데이터 통신을 구축하려고 한 것이다. 이 표준 모델은 실패하였지만, 참조 모델은 데이터 통신 설명을 위한 자료로 많이 사용된다.

## OSI 7 Layer

[OSI 참조 모델](https://ko.wikipedia.org/wiki/OSI_%EB%AA%A8%ED%98%95)은 데이터 통신을 7단계로 나누는데 이 단계를 계층(Layer) 라고 부른다.

각 계층마다 각 계층의 역할을 하는 프로토콜이 존재한다.
각 계층은 각각 독립해 있으며 하위 계층은 상위 계층을 위해 일하고 상위 계층은 하위 계층에 대해 관여하지 않는다.

그렇다면, 프로토콜은 무엇일까?

## 프로토콜

프로토콜은 통신하기 위한 약속들을 기술적으로 잘 정의해 둔 것이다. 데이터를 송수신하는 순서와 내용을 결정한다.

HTTP, TCP/IP, UDP 모두 프로토콜이다. 현대 internet Protocol은 보통 layering 되어 있다. 상위 계층은 하위 계층의 Protocol을 이용해서 새로운 protocol을 수립한다.

프로토콜군은 각각의 계층에서 사용되는 프로토콜을 통합한 것으로 가장 많이 사용되는 것이 TCP/IP 프로토콜군이다. TCP/IP가 인터넷에서 사용되는 프로토콜군이다.

## TCP/IP 모델

TCP/IP 모델에서 TCP/IP 프로토콜군이 제정되었다.

TCP/IP 프로토콜군은 OSI 7 계층과 데이터 통신 모델이라는 점에서 유사한 부분이 있지만, 전혀 관계는 없다.

TCP/IP 모델은 4개의 계층으로 이루어진다.

### TCP/IP 모델 계층과 프로토콜

- 4계층

  - 어플리케이션 계층
  - HTTP(Hyper Text Trasfer Protocol)
  - FRP(File Transfer Protocol)
  - SMTP(Simple Mail Trasfer Protocol)
  - OSI 7계층으로 생각하면, 7계층(응용계층), 6계층(표현계층), 5계층(세션계층)

- 3계층

  - 트랜스포트 계층
  - TCP(Transmisson Control Protocol)
  - UDP (User Datagram Protocol)
  - OSI 7계층으로 생각하면, 4계층(전송계층)

- 2계층

  - 인터넷 계층
  - IP(Internet Protocol)
  - ARP(Address Resolution Protocol)
  - OSI 7계층으로 생각하면, 3계층(네트워크계층)

- 1계층
  - 인터페이스 계층
  - 이더넷
  - 프레임 릴레이
  - PPP(Point-to Point Protocol)
  - OSI 7계층으로 생각하면, 2계층(데이터링크계층), 1계층(물리계층)

## 어플리케이션 계층

어플리케이션 계층은 binary protocol과 text protocol이 있다.

binary protocol은 데이터 효율이 좋지만, 사람이 이해하기 어렵다.

text protocol은 텍스트 기반의 규약이고 한 줄 한 줄 의미가 있다. 줄 단위로 구성되며 한 줄씩 파싱해서 처리한다. 구현이 쉽고 사람이 이해할 수 있다. 상대적으로 데이터 양이 많고 느리다.

### DNS

모든 통신에는 주소가 필요하다. 출발지와 도착지의 주소를 알아야 통신을 할 수 있다. 우리는 이 주소를 IP라고 부른다. IP 주소로 변환하는 과정에 개입하는 것이 DNS 이다.

Domain Name System 은 우리가 알고 있는 주소 (google.com) 을 IP 주소로 변환하는 과정에 개입한다.
점(.)으로 구분되며 계층적으로 구성되어 있다. 계층 끝은 root으로 root dns 서버가 나올 때 까지 거꾸로 타고 올라간다.

만약에 `mail.google.com.` 이면 다음과 같은 계층으로 이루어져 있다.

- `.`
- `com`
- `google.com`
- `mail.google.com`

DNS 프로토콜은 내 서버와 가장 가까운 DNS 서버는 한 번 조회된 주소에 대해서는 어느 정도의 기간동안 보관할 것인지 DNS 프로토콜에 정의해야 한다. 일정 이하의 TTL은 무시함 실무적으로는 보통 3000초정도다.

`google.com`의 IP 주소를 DNS 서버에 요청해 받아 왔고 요청 할 서버의 IP 주소를 알았으니, 데이터를 전송해야 하는데, 어떻게 전송해야 할까?

### HTTP

서버에 데이터를 요청하기 위해서는 HTTP 프로토콜이 필요하다.

(HTTP(HyperText Transfer Protocol))[https://ko.wikipedia.org/wiki/HTTP]은 TCP 기반의 클라이언트와 서버 사이에 이루어지는 요청/응답 프로토콜이다.

HTTP는 Text Protocol로 사람이 쉽게 읽고 쓸 수 있다.
프로토콜 설계상 클라이언트가 요청을 보내면 반드시 응답을 받아야 한다. 응답을 받아야 다음 request를 보낼 수 있다.

브라우저는 request 메시지를 작성하여 google.com에 리소스를 요청한다.

아래는 google.com에 HTTP 요청하여 응답받는 예시이다.

![request](https://user-images.githubusercontent.com/36990926/93026493-3faf9480-f641-11ea-9efa-fc5fd46b72f7.png)
![response](https://user-images.githubusercontent.com/36990926/93026479-26a6e380-f641-11ea-8371-c03c542e2568.png)

작성한 HTTP요청 메시지는 TCP 프로토콜을 사용하여 인터넷을 거쳐 해당 IP 주소의 컴퓨터로 전송된다.

## 트랜스포트 계층

### TCP

TCP는 무엇일까?
TCP는 전송 제어 프로토콜로 데이터를 전송을 제어하고 데이터를 어떻게 보낼 지, 어떻게 맞출 지 정한다.

IP(Internet Protocol)의 특징은 비신뢰성과 비연결성이다. 그래서 IP 프로토콜 만으로는 통신을 할 수 없다. 신뢰성과 연결성을 책임지기 위한 프로토콜이 TCP이다.
호스트와 호스트간의 데이터 전송은 IP(인터넷 계층 프로토콜)에 의지하면서 동시에 신뢰성 있는 전송에 대해서는 TCP가 책임지는 구조이다.

TCP는 왜 연결성을 지향할까? 통신을 할 때는 연결 지향적인 것이 편하다. 연결 지향이라는 것은 컨텍스트를 부여하는 것이고 컨텍스트를 유지되는 흐름을 관리하는 것이다. IP는 호스트와 호스트 사이의 데이터가 무슨 데이터인지, 데이터를 어떻게 나누고 맞추는지는 신경쓰지 않는다.

TCP는 3 way handshake 과정을 통해서 연결을 수립하고 데이터를 송수신하고, 4 way handshake 과정을 거친 후 연결을 종료한다.
TCP는 신뢰성을 위해서 전송한 데이터를 받았는지, 얼만큼 받았는지에 대한 응답을 꼭 받아야 한다. 받은 데이터를 순서대로 재조립해서 어플리케이션 계층으로 올려준다.

#### 3-way handshake process

![https://www.geeksforgeeks.org/tcp-3-way-handshake-process/](https://media.geeksforgeeks.org/wp-content/uploads/handshake-1.png)

### TCP VS UDP

UDP (User Datagram Protocol)는 ip에 별도의 기능 없이 사용자 정의 데이터 + port 를 전송할 수 있는 정도의 기능만 추가한 protocol이다.

UDP 헤더에는 송신처와 수신처의 포트 번호, 페이로드 사이즈, 체크섬정도만 있다. datagram 단위를 정의할 뿐 보장하는 기능은 없다.
중복되거나 순서가 바뀌거나 누락되기도 한다.

그럼 왜 UDP 를 쓸까?

그전에, 네트워크의 성능의 3가지 요소를 알아보자.

- latency
  - 내 호스트가 상대 호스트와 데이터를 주고 받는 데 걸리는 시간
- bandwidth
  - 대역폭
- loss

TCP는 신뢰성과 정확성을 위해서 3-way handshake, 에러 복구, 흐름제어 등을 한다. 특히 확인 응답을 기다리는 시간이 치명적이다. 무엇을 하던, 일정시간 기다려야 한다. TCP는 정확하지만 전송 효율이 떨어질 수 있다.

UDP의 최대 특징은 latency가 짧다는 것이다. 고속성, 즉 효율이 높다는 점을 살려서 고속성이나 실시간 송수신이 필요한 애플리케이션, 예를 들어 동영상 스트리밍 배포등에 사용한다. 동영상은 잠깐 잠깐 화면이 깨져도 크게 상관이 없기 때문이다.

### SSL/TLS

SSL(Secure Sockets Layer), TLS(Transport Layer Security) 는 컴퓨터 네트워크에 통신 보안을 제공하기 위해 설계된 암호 프로토콜이다.

TCP 계층까지는 본질적으로 암호화등의 보안 기능을 제공하지 않는다. 누군가 봐서는 안되는 통신을 위해서는 암호화 등의 보안 기능을 제공하는 레이어가 필요한데, 이를 위한 기능을 제공하는 레이어이다.

SSL/TLS를 사용한 보안 프로토콜 중 가장 대표적인 것이 HTTPS 이다.

## 인터넷 계층

인터넷 작업에서 필요한 것이 어드레싱과 라우팅이다. 이 두 가지를 수행해서 TCP/IP 로 인터넷 작업을 수행하기 위한 프로토콜이 IP이다.

### 어드레싱과 라우팅

어드레싱은 어드레스를 어떻게 써서 어떻게 배당하는 지에 대한 작업, IP 주소 지정 작업을 한다.

데이터를 목적지까지 전달하기 위해서는 라우터라고 하는 네트워크 장비가 필요하다. 라우터는 네트워크와 네트워크를 연결하는 역할을 하는데, 하나의 라우터는 데이터를 목적지까지 전달하기 위해 다음 네트워크의 경로를 찾고, 그 경로상에 있는 라우터에게 데이터 전달을 위임한다.

이렇게 수신처까지 어떤 경로로 갈 지 정하는 것, 경유하는 네트워크를 결정하는 과정을 라우팅이라고 한다.

IP는 비신뢰성과 비연결성이 특징이다. 신호를 보낸다고 해서 이 데이터가 전송이 되리라는 보장이 없고, 한 번만 되리라는 보장도 없고, 순서대로 간다는 보장도 없다. 물리적으로 신호만 연결되는 것이다.

인터넷 계층에서 동작하는 프로토콜에는 IP, ARP등이 있다.

### IP

Internet Protocol은 비신뢰성, 비연결지향 데이터그램 프로토콜로 패킷을 받아서 주소를 해석하고 경로를 결정하여 다음 호스트로 전송하는 역할을 한다.

## 인터페이스 계층

인터페이스 계층은 무선 LAN, 유선 LAN등 하드웨어들을 제어하면서 인접한 다른 통신 기기까지 데이터를 전달하는 역할을 한다.
우리가 보내려고 하는 데이터들을 실제로 전송하는 계층이다.

위와 같은 과정을 거쳐 리소스를 요청하면 서버에서 Response를 생성하여 브라우저에게 응답한다. 브라우저는 이 문서를 파싱하여 처리를 한다.

브라우저에서 content-type이 text/html 형식의 문서를 받았다고 한다면, 이를 파싱하여 렌더링하는 과정을 거친다.

## 렌더링

![rendering](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/render-tree-construction.png?hl=ko)

### DOM과 CSSOM 생성

브라우저가 페이지를 렌더링 하려면 먼저 DOM 및 CSSSOM 트리를 생성해야 한다.

### Render Tree 생성

DOM Tree와 CSSOM Tree를 결합하여 Render Tree를 형성한다. 요소들의 구조와 텍스트만 있는 DOM 과 달리, 스타일 정보가 설정되어 있으며, Render Tree에는 페이지를 렌더링하는 데 필요한 노드만 포함된다.

### Layout

레이아웃은 각 객체의 정확한 위치와 크기를 계산한다.

### Paint

마지막 단계는 최종 렌더링 트리에서 수행되는 페인트이며, 픽셀을 화면에 렌더링한다.

## 마무리

`google.com`을 치면 일어나는 일을 설명하시오가 왜 면접에 많이 나오는지 알겠다 😱
이곳 저곳에서 네트워크 관련 수업을 들었을 때는 들어도 무슨말인지 모르겠고 낯설고 어려웠다. 지금도 다 알진 못하지만 용어가 익숙해져서 그런지 예전보단 개념을 이해하기 수월했다. 그냥 주워듣고 다니는 것도 언젠가 도움이 되는 것 같다...ㅎ
이 글을 정리하면서 흩어져있던 네트워크 개념들을 정리할 수 있어서 좋았다.

## 참고 자료

https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction?hl=ko

[TCP/IP 쉽게, 더 쉡게](http://www.yes24.com/Product/Goods/32203210)

[하루3분 네트워크 교실](http://www.yes24.com/Product/Goods/30670329)
