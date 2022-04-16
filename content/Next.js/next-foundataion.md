+++
category = Next.js
comments = true
date = "20220410"
draft = false
showpagemeta = true
showcomments = true
slug = ""
tags = [ "Next.js"]
title = "[Next.js] Next.js를 학습하기 위한 기초"
description = "Next.js 학습하기 전에 Next.js가 무엇인지 알아봅니다."
front = "true"
+++

# Next - foundation 

Next.js 공식 문서를 보면서 학습한 내용을 정리할 예정입니다.

첫 번째 글은 Next 공식 페이지에서 제공하는 [Learn Next.js](https://nextjs.org/learn/foundations/about-nextjs?utm_source=next-site&utm_medium=nav-cta&utm_campaign=next-website) 에서 기초 내용으로 Next.js가 무엇인지 알아봅니다.

## Next.js? 

- Web SDK 
- server rendering, typescript support, smart bundling, route, re-fetching 등 next.js에서는 웹을 만드는 데 필요한 모든 도구가 있다. 

## Bundling block of a web applictaion 
- 모던 웹을 빌딩할 때 몇 가지 생각할 것이 있다. 
  - User Interface 
  - Routing 
    - 앱의 다른 파트를 검색하는 방법 
  - data fetching 
    - 데이터의 위치와 가져오는 방법 
  - rendering 
    - static이나 dynamic 콘텐츠 렌더를 언제, 어디서 할 지
  - infrastructure 
    - 앱 코드를 배포, 저장 및 실행할 곳(serverless, CDN, Edge...)
  - Performance 
  - Scalability 
  - Developer expreience 

  각 부분들에 대해 직접 구축할건지, 외부 툴을 사용할건지 선택해야 한다. 

- Next.js는 웹 애플리케이션을 만들기 위한 building block을 제공하는 React 프레임워크다. 
- Next.js는 리액트에 필요한 도구 및 configuration을 처리하고 애플리케이션에 대한 구조, 기능 및 최적화를 제공한다.
- 리액트를 사용하여 UI를 구축한 다음 Next.js 기능을 점진적으로 채택하여 Routing, data fetching, integration과 같은 애플리케이션 요구 사항을 해결할 수 있다. 

## How Next.js works

-  next.js는 애플리케이션의 개발 및 production 단계 모두를 위한 기능을 제공한다. 
-  컴파일링, 번들링, code splitting 등을 지원한다. 
- 빌드 타임이란 프로덕션용 애플리케이션 코드를 준비하는 일련의 단계를 말한다. 
애플리케이션을 빌드할 때 Next.js는 코들르 프로덕션에 최적화된 파일로 변환하여 서버에 배포하고 사용자가 사용할 수 있다.
- 런타임은 애플리케이션이 빌드 및 배포 후 사용자의 요청에 대한 응답으로 애플리케이션이 실행되는 타임을 의미한다. 

### rendering 

- 렌더링은 서버 또는 클라이언트에서 수행될 수 있다. 
- 빌드 시 미리 발생하거나 런타임 시 모든 request에서 발생할 수 있다. 
- Next.js에서는 SSR, CSR, SSG 세 가지 유형의 렌더링 방법을 사용할 수 있다. 

#### pre rendering 
- SSR, SSG는 결과가 클라이언트로 전송되기 전에 외부 데이터를 가져오고, React component를 HTML로 변환하기 때문에 pre-rendering이라고 한다. 

#### CSR vs Pre-rendering 

- 리액트 앱 기준으로, 브라우저는 UI를 구성하기 위한 Javascript instruction과 함께 서버로부터 빈 HTML 껍데기를 받는다.  초기 렌더링 작업이 사용자 장치에서 발생하기 떄문에 클라이언트 사이드 렌더링이라고 한다. 
- 리액트의 useEffect() 또는 useSWR과 같은 데이터 fetching hook으로 데이터를 가져오록 선택하여 Next.js 애플리케이션의 특정 component에 대해 클라이언트 사이드 렌더링을 사용하도록 선택할 수 있다. 

- Next.js는 기본적으로 모든 페이지를 미리 렌더링한다. 
- pre-renderingd은 HTML이 사용자 장치에서 Javascript로 모두 수행되는 대신 서버에서 미리 생성된다. 
- 서버 사이드 렌더링에서 각 요청마다 서버에서 페이지를 생성한다. 
- 페이지를 인터랙티브하게 만들기 위해 생성된 HTML, JSON, data, javscript instruction이 클라이언트로 전송된다. 
- 클라이언트에서는 HTML은 빠르게 표시하고, React는 JSON데이터와 Javscript 명령을 사용하여 구성 요소를 인터렉티브하게 만든다. 
- 이 과정을 hydration이라고 한다. 
- Next.js에서 getServerSideProps를 사용하여 서버 사이드 렌더링할 페이지를 선택할 수 있다. 

#### Static Site Generation 

SSG는 HTML이 서버에서 생성되지만, 서버측 렌더링과 달리 런타임에 서버가 없다. 대신 빌드 타임에 애플리케이션이 배포될 때 콘텐츠가 한 번 생성된다. 그리고 CDN에 저장되고 각 request에 재사용된다. 

Next.js에서는 getStaticProps를 사용하여 페이지를 정적으로 생성하도록 선택할 수 있다. 

Incremental static genration을 사용하여 사이틀르 구축한 후 정적 페이지를 만들거나 업데이트할 수 있다. 
즉, 데이터가 변경되더라도 전체 사이트를 다시 만들 필요가 없다. 

Next.js의 장점은 SSG, SSR, CSR 여부에 관계 없이 페이지별로 가장 적합한 렌더링 방법을 선택할 수 있다는 것이다. 


#### 배포 

애플리케이션 코드가 저장되고 네트워크에 배포된 후 실행되는 위치는 어디일까.
Next.js로 만든 앱의 경우 애플리케이션 코드를 origin server, CDN, Edge에 배포할 수 있다. 

각 서버의 차이점을 알아보자. 

- Origin servers 
  - CDN, Edge 서버와 구분하기 위해서 origin 서버라는 용어를 사용한다. 
  - original 서버는 요청을 받으면 응답을 보내기 전에 몇 가지 계산을 수행한다. 
  - 이 계산 작업의 결과는 CDN으로 이동할 수 있다.

- Content Delivery Network 
  - CDN은 전 세계 여러 위치에 정적 콘텐츠(HTML 및 이미지)를 저장하고 클라이언트와 origin server 사이에 배치된다. 
  - 새 요청이 들어오면, 사용자와 가장 가까운 CDN 위치에 캐시된 결과를 응답할 수 있다.
  - 이렇게 하면 각 요청에 대한 계산을 수행할 필요가 없어 original server의 부하가 줄어든다. 
  - 또한 사용자와 물리적으로 가까운 위치에서 제공되기 떄문에 빠르다. 
  - Next.js에서는 pre-rendering이 미리 수행될 수 있기 때문에 CDN 작업의 정적 결과를 저장하는 데 매우 적합하여 콘텐츠 전달을 더 빠르게 만든다.

- The Edge 
  - edge는 사용자에게 가장 가까운 fringe(or edge)에 대한 일반화된 개념이다. 
  - CDN은 네트워크의 fringe에 정적 콘텐츠를 저장하기 때문에 edge의 일부로 간주할 수 있다. 
  - CDN과 유사하게 edge서버는 전 세계 여러 위치에 배포된다. 그러나 정적 콘텐츠만을 저장하는 CDN과 달리 일부 edge 서버는 코드를 실행할 수 있다. 
  - 즉 사용자에게 더 가까운 Edge에서 캐싱과 코드 실행을 모두 수행할 수 있다. 
  - Edge에서 코드를 실행하면 전통적으로 클라이언트 측 또는 서버 측에서 수행되었던 일부 작업을 Edge로 이동할 수 있다. 
  - 클라이언트로 전송되는 코드의 양을 줄이고 사용자의 요청의 일부가 서버로 완전히 돌아갈 필요가 없기 때문에 
애플리케이션의 성능이 향상되어 latency가 줄어든다.
  - Next.js에서는 미들웨어를 사용하여 Edge에서 코드를 실행할 수 있다. 


## 마치며 

다음에는 실제로 애플리케이션을 만들어보면서 Next.js를 익혀보자. 