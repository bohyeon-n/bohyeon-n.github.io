+++
category = front-end
comments = true
date = "20220403"
draft = false
showpagemeta = true
showcomments = true
slug = ""
tags = [ "rollup"]
title = "Rollup 사용법"
description = "rollup이 무엇인지 알아보고 typescript와 최신 자바스크립트 문법을 사용할 수 있도록 세팅하는 법을 정리합니다."
front = "true"
+++

이번 글에서는 rollup이 무엇인지 알아보고 typescript와 최신 자바스크립트 문법을 사용할 수 있도록 세팅하는 법을 정리해보았습니다.

예제는 rollup을 설치, plugin 사용법, 타입스크립트 사용하기, 바벨 붙이기 순으로 진행됩니다.

## Rollup?

-   Rollup은 자바스크립트 모듈 번들러다.

## 모듈 번들러?

-   모듈 번들란 HTML, CSS Javascript, Images 등을 모두 각각의 모듈로 보고 모듈 단위로 나누어 최소한의 파일 묶음(번들)을 만든다.
-   여러 파일들을 하나의 파일로 묶음으로서 네트워크 요청을 줄일 수 있음
-   또한 최신 문법의 자바스크립트 코드가 모든 브라우저에서 돌아갈 수 있도록 변환(Transpile)하는 등 다양한 기능을 지원함

## rollup 번들러 세팅하기

rollup 번들러를 사용하여 간단한 유틸 함수를 번들링해보자.

### install

-   프로젝트를 폴더 만들기
-   npm init 명령으로 package.json을 생성해서 npm으로 관리하기
-   rollup을 설치하기
-   rollup 패키지는 개발할 때만 필요하므로 배포 패키지에는 포함시키지 않아야 하므로 `--save-dev` 나 `-D` 옵션으로 설치했음

```
mkdir my-utils
npm init -y
npm install rollup --save-dev
```

### Config Files

-   간단한 옵션은 cli로 실행 시 옵션을 넣어줄 수 있지만,
-   config 파일을 생성해서 빌드 시 실행할 옵션을 파일에 작성할 수 있음
-   기본 파일명은 rollup.config.js 지만,
-   rollup.config.dev.js, rollup.config.prd.js 이런식으로 파일을 따로 만들어서 상황에 따라 프로파일링할 수 있다.

```
// rollup.config.js
export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },
}
```

-   여기까지 테스트 해보려면
-   input으로 지정한 경로에 src/main.js 파일 생성 후
-   `npx rollup --config`를 실행해보면, bundle.js 파일이 생성된 것을 볼 수 있다.

> npx?
> 
> -   npx는 package runner다.
> -   npm을 더 편하게 쓰려고 나온 것.
> -   기존 npm과 다르게 패키지를 설치, 제거, 실행할 필요없이 원하는 패키지를 레지스트리에 접근해서 설치하고 실행시키는 실행도구다.

-   빌드 스크립트를 package.json에 추가해서 명령을 편하게 실행할 수 있도록 할 수 있다.

```
// package.josn

{
  "scripts": {
    "build": "rollup --config"
  }
}
```

### 플러그인 사용하기

-   지금까지 진입점과 상대 경로를 통해 가져온 모듈에서 간단한 번들을 만들었다.
-   번들을 사용하는 경우, npm과 함께 설치된 모듈을 가져오고, babel로 최신 코드를 컴파일하고, json 파일 작업 등 더 많은 유연성이 필요한 경우가 많다.
-   이를 위해 번들링 프로세스의 주요 포인트에서 동작을 변경하는 플러그인을 사용한다.
-   롤업 프로러그인들을 [The Rollup Awesome List](https://github.com/rollup/awesome)에서 관리된다.

#### JSON 플러그인 추가하기

-   일단 rollup 튜토리얼에 있는 json 파일을 가져오는 예제를 보자.
-   [@rollup/plugin-json](https://github.com/rollup/plugins/tree/master/packages/json)을 사용하여 Rollup이 JSON 파일에서 데이터를 가져올 수 있도록 한다.

1.  설치하기

```
  npm install --save-dev @rollup/plugin-json
```

-   package.json에 있는 version 정보를 가져오는 함수를 작성해보자.

```
// src/mian.js
import { version } from '../package.json'

export default function () {
  console.log('version: ' + version)
}
```

그리고 config 파일에 JSON 플러그인을 추가해준다.

```
// rollup.config.js
import json from '@rollup/plugin-json'

export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },
  plugins: [json()],
}
```

-   `npm run build` 스크립트를 실행해서 빌드를 하면, 번들 파일이 생성된다.
-   아래 코드와 같이 변환된 bundle.js 파일을 볼 수 있다.

```
'use strict'

var version = '1.0.0'

function main() {
  console.log('version: ' + version)
}

module.exports = main
```

-   번들된 파일을 보면, 실제로 필요한 데이터만 가져온다.
-   name 등 package.json의 다른 부분은 무시된다. 이게 tree-shaking 이다.

### output plugins 사용하기

-   일부 플러그인은 특정 output에만 적용할 수도 있다.
-   output-specific plugin이 실행할 수 있는 세부 기술 정보를 보려면  
    [plugin hooks](https://rollupjs.org/guide/en/#build-hooks)를 참조하자.
-   간단히 말하면 output-specific plugin은 주요 분석이 완료된 후에만 코드를 수정할 수 있다.
-   한가지 예시는 브라우저에서 사용할 번들을 축소하는 것이다.

#### terser

1.  rollup-plugin-terser 를 설치

```
npm install --save-dev rollup-plugin-terser
```

2.  config 파일을 수정한다.

-   format으로는 iife를 선택한다.
-   이 포맷은 다른 코드와의 원치 않은 상호 작용을 피하면서 브라우저의 스크립트 태그를 통해 사용할 수 있도록 코드를 래핑한다.
-   다른 코드가 이 변수를 통해 export에 접근할 수 있도록 번들에 의해 생성될 전역 변수의 이름을 제공해야 한다.

```
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/main.js',
  output: [
    {
      file: 'bundle.js',
      format: 'cjs',
    },
    {
      file: 'bundle.min.js',
      format: 'iife',
      name: 'version',
      plugins: [terser()],
    },
  ],
  plugins: [json()],
}
```

## format

-   번들러가 코드 출력을 어떻게 포맷팅하는지 여러가지 선택지가 있다. ([output.format](https://rollupjs.org/guide/en/#outputformat))
-   CJS, AMD, UMD, ESM, System, IIFE 로 설정할 수 있는데 각각의 차이점을 알아보자.

### AMD(Asynchronous Module Definition)

-   비동기 모듈 로딩을 지원하기 위해서 CJS에서 나왔다.
-   AMD는 브라우저 측에서 작동하는 RequireJS에서 사용된다.

### CJS(CommonJS)

-   Node 및 기타 번들러(alias: commonjs)인 웹 브라우저 외의 생태계에 적합하다.
-   [서버 사이드](https://javascript.plainenglish.io/a-hands-on-guide-for-a-server-side-rendering-react-app-dd1efa3ec0d8)에서 널리 사용된다.
-   자바스크립트 클라이언트 개발에서 널리 사용되며 추가 type이 있는 타입스크립트에서도 채택됐다.

### ESM

-   ESM은 ES2015 이후 자바스크립트에서 사용되는 공식 표준이 되었다.
-   번들을 ES 모듈 파일로 유지한다. 다른 번들러에 적합하고 최신 브라우저에서 `<script type=module >` 태그로 포함한다.

### IIFE

-   `<script>` 태그로 포함하기에 적합한 즉시 실행 함수에 적합하다.
-   이 형식을 사용하여 애플리케이션용 변들을 생성할 수 있다.

### umd(Univeral Module Definition)

-   UMD는 어디에서나 동작하도록 설계되어 있다.
-   브라우저 사이드, 서버 사이드 모두 가능하다.
-   RequireJS같은 오늘날 가장 인기 있는 스크립트 로더와 호환성을 제공하려 한다.
-   system
-   CJS, AMD, ESM 모듈을 지원하는 범용 모듈 로더다.
-   롤업은 코드를 SystemJS의 기본 형식으로 묶을 수 있다.

### 여러 포맷 사용하기

-   한 번에 여러 형식으로 출력할 수 있도록 설정할 수 있다.

```

output = [
  {
    file: 'dist/bundle.amd.js',
    format: 'amd',
    sourcemap: false,
  },
  {
    file: 'dist/bundle.cjs.js',
    format: 'cjs',
    sourcemap: false,
  },
  ....
]
```

각 형식마다 실제 번들링한 코드를 보고 싶다면 [https://betterprogramming.pub/what-are-cjs-amd-umd-esm-system-and-iife-3633a112db62](https://betterprogramming.pub/what-are-cjs-amd-umd-esm-system-and-iife-3633a112db62) 이 블로그를 참고!

(근데 어떤 포맷 사용해야 하는지 헛갈린다... 좀 더 알아봐야 할 듯!)

## 타입스크립트

-   타입스크립트를 사용해보자.
-   타입스크립트를 사용하려면 타입스크립트를 자바스크립트로 변환하고 type definition 파일을 생성해야 한다.

1.  타입스크립트 플러그인 설치
2.  `npm install --save-dev @rollup/plugin-typescript`
3.  config 파일 수정

-   타입스크립트 플러그인을 설치하고 플러그인에 typescript를 실행해주면 된다.

```
import typescript from '@rollup/plugin-typescript'
plugins: [typescript()]
```

-   컴파일 기본적으로 tsconfig.json에 정의된 옵션으로 컴파일 되는데
-   플러그인에 직접 오버라이드해서 옵션을 전달할 수도 있다.

```
// 직접 오버라이드하기
plugins: [
  typescript({
    compilerOptions: { lib: ['es5', 'es6', 'dom'], target: 'es5' },
  }),
]
```

### 타입스크립트 컴파일 옵션

#### lib

-   typescript에서는 내장 JS API(like Math)에 대한 기본 타입 정의 세트가 포함되어 있다.
-   뿐만 아니라 브라우저 환경에서 사용하는 document같은 객체의 타입이 정의되어 있다.
-   타입스크립트는 target에서 지정한 새로운 JS 피쳐와 매칭되는 타입도 포함하고 있다.
-   에를 들어 Map은 target ES6거나 그 이후이면 타입을 사용할 수 있다.

#### target

-   모던 브라우저에선느 ES6 기능을 모두 지원한다. ES6는 좋은 선택이다.
-   실행 환경이 더 낮은 기능만을 지원하면 다운그레이드할 수 있다.
-   ESNext 값은 Typescrpit 버전이 지원하는 가장 높은 버전을 나타낸다.

#### declaration

-   type declaration 파일(d.ts 파일)을 생성할건지

## babel

-   브라우저와 노드 환경에서 동작하지 않는 최신 자바스크립트 문법을 쓰기 위해서 Babel을 이용해서 자바스크립트 코드를 변환해야 한다.

1.  바벨 플러그인 설치

```
npm install --save-dev @babel/puligin-babel @rollup/plugin-node-resolve
```

```
plugins: [resolve(), babel({ babelHelpers: 'bundled' })]
```

2.  babel-core, 필요한 preset 설치

-   롤업을 실행하기 전에 babel-core와 env config 설정을 해야 한다.

```
npm i -D @babel/core @babel/preset-env
```

```
//babelrc.json
{
  "presets": [
    "@babel/preset-env",  // @babel/env와 같음
    "@babel/preset-typescript", 
  ] 
}
```

3.  config 파일 구성

-   바벨이 실제로 코드를 컴파일하기 전에 설정 파일을 구성해야 한다.

babelrc.json

```
{
  "presets": ["@babel/env"]
}
```

### babel presets?

-   presets는 바벨 플러그인 모음이다.
-   config 옵션을 공유할 수 있게 함.
-   sytax traspile, 폴리필
-   공식 presets
    -   @babel/preset-env
        -   ES2015+ 구문 컴파일링
    -   @babel/preset-typescript
    -   @babel/preset-react
    -   @babel/preset-flow

### babel tooling package?

-   바벨 작업을 도와주는 도구들
-   @babel/core?
    -   바벨 컴파일러의 코어

## typescript? babel? 타입스크립트 컴파일은 어떤 걸로 컴파일 해야할까?

-   이렇게까지 설정하고 나니까 타입스크립트 설정에서도 최신 문법을 설정한 환경에서 돌아갈 수 있도록 컴파일 할 수 있는데 왜 바벨을 사용해야 하는지 의문이 들었다.

[babel with typescript](https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html) 글을 찾아보았는데 간단하게 정리하자면,

-   바벨의 타입스크립 컴파일을 사용하게 되면, 기존 빌드 파이프라인으로 작업할 수 있고 바벨이 타입 검사를 하지 않기 때문에 빠르게 컴파일 할 수 있다.
-   그러나 바벨만 사용할 순 없다.
-   바벨은 타입 검사를 하지 않기 때문에 ts에서 js로 변환하는 동안 타입 검사를 받지 못한다.
-   그래서 에디터에서 놓친 오류가 프로덕션에 들어갈 수 있다.
-   바벨은 .d.ts파일을 생성할 수 없으므로, 라이브러리를 만드는 경우라면 타입을 제공할 수 없게 된다.
-   그래서 바벨의 @babel/preset-typescript을 사용하여 js 파일을 생성한 다음 타입스크립트를 사용하여 타입 검사 및 .d.ts 파일을 만드는 하이브리드 접근 방식을 채택할 수 있다.

\=> @babel/preset-typescript + tsc

```
"scripts": {
    "type-check": "tsc --noEmit",
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "npm run build:types && npm run build:js",
    "build:types": "tsc --emitDeclarationOnly",
    "build:js": "rollup --c rollup.config.js  && tsc"
  },
```

# 참고 자료

[rollup 공식문서](https://rollupjs.org/guide/en/#creating-your-first-bundl)

[npx?](https://webruden.tistory.com/275)

[What Are CJS, AMD, UMD, ESM, System, and IIFE?](https://betterprogramming.pub/what-are-cjs-amd-umd-esm-system-and-iife-3633a112db62)

[webpack and rollup the same but different](https://medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c)

[typescript lib options](https://www.typescriptlang.org/tsconfig#lib)

[publish esm and cjs](https://antfu.me/posts/publish-esm-and-cjs)

[babel presets](https://babeljs.io/docs/en/presets)

[ts with babel](https://ageek.dev/ts-with-babel)

[babel with typescript](https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html)