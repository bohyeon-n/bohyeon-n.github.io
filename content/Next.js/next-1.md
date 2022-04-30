Next.js 튜토리얼을 따라하면서 정리한 내용입니다.

# create Next.js App 

## Setup 

```
npx create-next-app my-app 
```

- 로컬 서버 돌리기
```
npm run dev
```

## Navigate Between Pages 

- 배우는 것들
  - 통합 파일 시스템 라우팅을 사용하여 새 페이지 만들기 
  - `Link` 컴포넌트 사용한 clinet-side navigation 배우기
  - 빌트인 code splitting 과 prefetching에 대해 배우기

### Pages in Next.js 

- Next.js에서 페이지는 page 디렉토리의 파일에서 export한 React component다.
- 페이지는 파일 이름과 route(경로)가 연결된다. 
   - `pages/index.js`는 `/` route. 
   - `pages/posts/first-posts.js` 는 `/posts/first-posts`
  

```js
// pages/posts/first-posts.js
export default function FirstPosts() {
  return (
    <h1>First Posts!</h1>
  )
}
```

- 파일 이름에 제한은 없고, `default` export 해야 한다.

### Link Component 

- 다른 페이지를 연결할 때 <a> 태그를 사용한다. 
- Next.js에서는, Link 컴포넌트를 사용하여 <a> 태그를 래핑한다. 
- Link를 사용하면 애플리케이션의 다른 페이지로 client-side navigation을 할 수 있다. 

- Link 컴포넌트 안에 a 태그를 넣어서 사용한다.

```js
<Link href="/">
  <a>Back to home</a>
</Link>
```

### Client-side Navigation 

- client-side navigation은 자바스크립트를 사용해서 페이지 전환을 한다는 것. 


### Code splitting and prefetching 

- Next.js는 자동으로 code splitting을 한다. 각 페이지는 해당 페이지에 필요한 것만 로드한다. 
- 홈페이지가 렌더링 될 때 다른 페이지의 코드는 처음에 제공되지 않는다. 
- 이렇게 하면 초기 로드가 빨라진다.
- 요청한 페이지의 코드만 로드하면 페이지가 따로 동작하므로 한 페이지에서 에러가 나도 다른 페이지는 작동한다. 
- Next.js의 프로덕션 빌드에서 Link 컴포넌트가 브라우저 뷰포트에 나타날 때 마다, Next.js에서는 백그라운드에서 연결된 페이지의 코드를 자동으로 prefetching한다. 
- 링크를 클릭하면 연결된 페이지에 대한 코드가 이미 백그라운드에서 로드되고 페이지 전환이 거의 즉시 이루어진다. 

## Assets, Metadata, and CSS 

- Next.js는 css와 Sass를 지원한다.

### Assets 

- Next.js 는 최상위 public 디렉토리에 이미지와 같은 static assets를 서빙할 수 있다.
- public 내부의 파일들은 애플리케이션의 루트에서 참조할 수 있다.
- robots.txt, google site verification 같은 static assets도 서빙할 수 있다.

- 일반 html 태그를 사용하면 다음과 같이 추가할 수 있다.

```js
<img src='/images/profile.jpg' alt='koo'>
```
- 그러나 이렇게 img 태그를 사용하면, 수동으로 다음을 처리해야 한다.
   - 이미지가 다양한 스크린 사이즈에서 responsive한지 
   - third-party tool 이나 library로 이미지 최적화 
   - 뷰포트에 들어갈 때만 이미지 로드하기 
  
- Next.js는 이를 처리하기 위해 즉시 사용할 수 있는 Image 컴포넌트를 제공한다. 
- Next.js는 빌드 시 이미지를 최적화하는 대신 사용자가 요청할 때 on-demand로 이미지를 최적화한다.
- static site generator 와 static-only solution과 달리, 몇 개의 이미지를 전송든 빌드 시간이 늘어나지 않는댜. 
- 이미지는 기본적으로 lazy load 된다. 
- 이미지의 width, height는 원본 이미지와 동일한 비율이어야 한다.

### Metadata 

- Next.js React component <Head> 사용

```js
<Head>
  <title>First Post</title>
</Head>
```

### Third-party Javascript 

- Third-party javascript는 third-party 소스에서 추가된 모든 스크립트를 말한다.

```js
<Head>
  <title>First Post</title>
  <script src="https://connect.facebook.net/en_US/sdk.js" />
</Head>
```

- 이렇게 작성해도 동작하지만, 이렇게 스크립트를 임포트하면 동일한 페이지에서 가져온 다른 자바스크립트 코드와 관련하여 로드될 시기를 명확하게 알 수 없다.
- 특정 스크립트가 렌더링을 막고 페이지 콘텐츠 로딩을 지연시킬 수있다. 
- Script 컴포넌트를 사용할 수 있다. 

```js
<Head>
... 
</Head>
<Script
  src="https://connect.facebook.net/en_US/sdk.js"
  strategy="lazyOnload"
  onLoad={() =>
    console.log(`script loaded correctly, window.FB has been populated`)
  }
/>
```
- strategy 
  - third-party 스크립트를 로드해야 하는 시기를 제어 
  - lazyOnload 값은 브라우저 idle time 동안 이 특정 스크립트를 느리게 로드하도록 한다. 
- onLoad 
  - 스크립트가 로딩이 끝나자마자 실행할 콜백을 넘겨줄 수 있다.

### CSS Styling 

- styled-jsx 지원 
- scss 지원

https://nextjs.org/learn/basics/assets-metadata-css/layout-component

### Global styles 

- CSS 모듈은 component-level에서 유용하다. 모든 페이지에서 일부 CSS를 로드하는 방법도 지원한다.
- global CSS 파일을 로드하려면 /_app.js 파일을 만든다. 

```js
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```
- App 컴포넌트는 다른 모든 페이지에서 공통적으로 사용되는 최상위 컴포넌트다. 
- 이 컴포넌트에 global css를 임포트하면 된다. 

### polishing Layout

- utils.module.css 이런 식으로 util 스타일 파일을 만들어서 스타일을 재사용할 수 있음 
- https://nextjs.org/learn/basics/assets-metadata-css/polishing-layout

## Pre-rendering and Data Fetching 

### pre-rendering 

next.js의 pre-rendering을 알아보자. 

- 기본적으로 Next.js는 모든 페이지를 pre-render 한다. Next.js는 각 페이지에 대해 미리 HTML을 생성한다. 

- 생성된 HTML은 해당 페이지에 필요한 최소한의 자바스크립트 코드와 연결된다.
- 브라우저에서 페이지를 로드하면 해당 자바스크립트 코드가 실행되고 페이지가 완전히 interactive 해진다.(이 과정을 hydration이라고 함)
- Next.js는 앱을 static html로 미리 렌더링하여 자바스크립트를 실행하지 않고도 앱 UI를 볼 수 있다. 
- 자바스크립트를 비화성화 시켜도 html은 로드된다. 하지만 import 하고 있는 css 파일은 로드할 수 없다(자바스크립트 실행을 못하니까)


![pre-rendering](https://nextjs.org/static/images/learn/data-fetching/pre-rendering.png)

![no pre-rendering](https://nextjs.org/static/images/learn/data-fetching/no-pre-rendering.png)

### Two Forms of Pre-rendering 

- Next.js는 static generation과 Server-side Rendering 두 가지 pre-rendering 방식이 있다. 
- 차이점은 HTML을 언제 생성하느냐다.

#### Static Generation 

static generation은 빌드 타입에 html을 생성한다. 

![static generation](https://nextjs.org/static/images/learn/data-fetching/static-generation.png)

#### Server-side Rendering 

server-side rendering은 각 요청에 html을 생성한다.

![server-side rendering](https://nextjs.org/static/images/learn/data-fetching/server-side-rendering.png)

- 개발 모드에서는 yarn dev를 실행할 때 모든 페이지는 static-generation을 사용하는 페이지의 경우에도 
각 요청에 pre-render 된다.

- Next.js를 사용하면 각 페이지에서 사용할 pre-rendering 방식을 선택할 수 있다.

#### Static generation vs Server-side rendering 

- static generation은 페이지를 한 번 만들고 CDN에 제공할 수 있으므로 모든 요청에 대해 서버가 페이지를 렌더링하도록 하는 것 보다 빠르기 때문에 가능하면 static generation을 사용하는 것이 좋다.
- static generation을 사용하는 경우 
  - marketing pages 
  - blog posts 
  - e-commerce product listings 
  - help and documentation 

- 페이지에 따라 자주 업데이트가 되는 데이터가 표시되고, 각 요청에 따라 페이지 콘텐츠가 변경되는 경우에는 static-generation이 맞지 않을 수 있다.
- 이런 케이스에는 server-side rendering 방식을 사용한다.

### static generation with and without Data 

