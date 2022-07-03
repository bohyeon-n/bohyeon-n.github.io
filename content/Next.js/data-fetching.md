+++
category = Next.js
comments = true
date = "20220703"
draft = false
showpagemeta = true
showcomments = true
slug = ""
tags = [ "Next.js"]
title = "[Next.js] Next.js Data fetching하는 법"
description = "Next.js에서 data fetching 방식을 알아보자."
front = "true"
+++

Next.js에서 data fetching을 사용하면 앱의 유즈 케이스에 따라 다양한 방식으로 콘텐츠를 렌더링할 수 있다. 이번 글에서는 getServerSideProps, getStaticProps, getStatisPaths, getInitialProps등 다양한 data fetching 방식에 대해 알아봅니다.

## getServerSideProps 

- 페이지에서 getServerSideProps를 export하면 next.js는 각 요청마다 이 페이지를 pre-render한다. 
- 오직 page 에서만 export 해야 한다. page component에서 사용하면 동작하지 않는다.
- getServerSideProps에서 반환된 데이터를 사용한다. 

```js 
export async function getServerSideProps(context) {
  return {
    props: {} // page component에 prop으로 전달된다.
  }
}
```

### getServerSideProps는 언제 실행될까? 

- getServerSideProps는 오직 server-side에서만 실행되며 브라우저에서는 실행되지 않는다.
- 페이지가 getServerSideProps를 사용하는 경우: 
  - 이 페이지를 직접 요청하면 요청 시 getServerSideProps가 실행되고 이 페이지는 반환된 props로 미리 렌더링된다. 
  - next/link 또는 next/router를 통해 클라이언트 측 페이지 전환 시 이 페이지를 요청하면 Next.js는 getServerSideProps를 실행하는 서버에 API 요청을 보낸다. 

- getServerSideProps 는 render page에서 사용할 JSON을 리턴한다. 
- next-code-elimeniation 도구를 사용하여 Next.js가 클라이언트 측 번들에서 제거하는 항목을 확인할 수 있다. 

### getServerSideProps 언제 써야 할까? 

- 요청 시 데이터를 가져와야 하는 페이지를 렌더링해야 할 때 
- getServerSideProps를 사용하는 페이지는 요청 시 서버 측에서 렌더링되며 cache-control headers가 설정되어 있으면 캐싱된다. 
- 요청하는 동안 데이터를 렌더링할 필요가 없는 경우, 클라이언트 측 또는 getStaticProps에서 데이터 fetching을 고려해야 한다.

### getServerSideProps or API routes 

- 서버에서 데이터를 가져오고 싶을 때 API route에 도달하고 getServerSideProps에서 해당 API 경로를 호출하고 싶을 수 있는데 불필요하고 효율적이지 않은 접근이다. 
- 서버에서 실행되는 getServerSideProps 및 API routes로 인해 추가 요청이 발생하기 때문이다. 
- getServerSideProps에서 직접 fetch하자. 

### 클라이언트 사이드에서 data fetching 

- 페이지에 자주 업데이트되는 데이터가 포함되어 있고 데이터를 미리 렌더링할 필요가 없는 경우 클라이언트 측에서 데이터를 가져올 수 있다.

### Using getServerSideProps to fetch data at request time 

요청 시 데이터를 가져오고 결과를 미리 렌더링하는 방법을 보여준다. 

```js 
function Page({data}) {
  // Render data 
}

export async function getServerSideProps() {
  const res = await fetch('https://..../data')
  const data = await res.json()

  return {props: {data}}
}

export default Page
```

### Caching with Server-side rendering (SSR)

- getServerSideProps caching header(Cache-control) 을 사용하여 dynamic response 를 캐싱할 수 있다.
- e.g. stale-while-revalidate 를 사용할 수 있다. 

### Error page 

- getServerSideProps에서 에러나면, pages/500.js 파일을 보여준다. 

## getStaticPaths 

- dynamic routes가 있고 getStaticProps를 사용한다면, 정적으로 생성할 paths 목록을 정의해야 한다. 
- dynamic routes를 사용하는 페이지에서 getStaticPaths(static site generation) 라는 함수를 내보낼 때 Next.js 는 getStaticPaths에 의해 지정된 모든 path를 정적으로 pre-render 한다. 
- production build할 때 생성된다. 

## getStaticProps 

- 페이지에서 getStaticProps라는 함수를 내보내는 경우 Next.js는 getStaticProps에서 반환된 props를 사용하여 빌드 시 이 페이지를 미리 렌더링한다. 

```js 
export async function getStaticProps(context) {
  return {
    props: {} 
  }
}
```
- 페이지를 렌더링하는 데 필요한 데이터는 사용자의 요청에 앞서 빌드 시 사용할 수 있다. 
- getStaticProps는 서버 측에서만 실행되므로 클라이언트 측에서는 실행되지 않는다. 
- 브라우저용 JS 번들에도 포함되지 않으므로 브라우저로 보내지 않고 직접 데이터베이스 쿼리를 작성할 수 있다. 

## Incremental Static Regeneration 

- Next.js를 사용하면 사이트를 구축한 후 정적 페이지를 만들거나 업데이트할 수 있다. 
- Incremental Static Regeneration(ISR)을 통해 페이지별로 정적 생성을 사용할 수 있다. 
- 전체 사이트를 rebuild할 필요 없이 ISR을 사용하면 수백만 페이지로 확장하면서 스태틱의 이점을 유지할 수 있다. 
- ISR을 사용하려면 getStaticProps에 revalidate prop을 추가하면 된다. 

```js 
export async function getStaticProps() {
  const res = await fetch('https://...');
  const posts = await res.json();

  return {
    props: {
      posts, 
    },
    revalidate: 10,
  }
}
```

```js
export async function getStaticProps() {
  const res = await fetch('https://')
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: {id: post.id};
  }))

  return {paths, fallback: 'blocking'}
}
```
## getInitialProps 

- getInitialProps대신 getStaticProps나 getServerSideProps를 사용해라. 
- 이러한 데이터 fetching 방법을 사용하면 static generation과 server side rendering 사이에서 세부적으로 선택할 수 있다. 
- getInitialProps는 페이지에서 서버측 렌더링을 가능하게 하고 초기 데이터 채우기를 수행할 수 있도록 한다. 
- 이는 서버에서 이미 채워진 데이터로 데이터를 보내는 것을 의미한다. 

- getInitialProps는 Automatic Static Optimization 을 비활성화한다.

- getInitialProps는 정적 메서드로 모든 페이지에 추가할 수 있는 비동기 함수이다. 

```js 
Page.getInitialProps = async(ctx) => {
  const res = await fetch('/')
  const json = await res.json();
  return {
    stars: json.stargazers_count
  }
}
```

- 초기 페이지 로드의 경우 getInitialProps는 서버에서만 실행된다.
- getInitialProps는 next/link 컴포넌트를 통해 또는 next/router를 사용하여 다른 경로로 이동할 때 클라이언트에서 실행된다.
- 그러나 getInitialProps가 custom _app.js에서 사용되고 탐색되는 페이지가 getServerSideProps를 구현하는 경우, getIntiialProps가 서버에서 실행된다.
- getInitialProps 내에서 server-side only module을 사용하는 경우 올바르게 import 해야한다.[ssr and server only modules](https://arunoda.me/blog/ssr-and-server-only-modules) 그렇지 않으면 앱 속도가 느려진다.


### SSR and SSR only modules? 

- 일반적으로 클라이언트 측 웹 앱에서 사용하는 대부분의 NPM모듈은 서버 및 클라이언트 환경 모두에서 사용할 수 있다. 
- 드물게 클라이언트 측에서도 일부 서버 전용 모듈을 사용할수 있다. 
- 예를 들어 대부분의 암호화 기반 모듈에 대해 이 작업을 수행한다. 

- 따라서 웹팩은 가능한 한 모든 NPM 모듈을 항상 번들하려고 한다.
- 또한 일부 핵심 Node.js 모듈의 클라이언트 측 버전을 구현하는 NPM 모듈 세트와 함께 제공된다. 

- 때로는 server에서만 npm 모듈을 구동해야 할 떄가 있다. 
- 예를 들면, data fetching할 때, 데이터를 가져오기 위해 서버 전용 모듈을 사용할 수 있다.

- 웹팩 번들러 시각화 도구를 사용해서 어떤 모듈을 가져오는지 확인할 수 있다. 
- 만약 필요없는 것 까지 번들에 포함된다면? 
  - eval을 사용하여 eval 내부의 내용을 정적으로 분석할 수 없다. 

```js 
const faker = eval('require('faker')')
```
   - webpack의 ignore plugin 을 사용한다. 
   - 또한 pacakge.json 파일에 config를 추가하여 번들링에 해당 모듈을 비활성화하도록 webapck에 요청할 수 있다. 

```json 
{
  "browser": {
    "faker": false
  }
}
```

