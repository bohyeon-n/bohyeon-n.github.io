+++
category = etc
comments = true
date = "20220501"
draft = false
showpagemeta = true
showcomments = true
slug = ""
tags = ["peerDependencies", "npm" ]
title = "Peer Dependencies는 왜 쓸까?"
description = "Peer Dependencies가 왜 나타났고, 어떻게 쓰는지 알아봅니다."
front = true
+++

# Peer Dependencies 

이번 글에서는 Peer Dependencies가 무엇인지 알아봅니다. 

peerDependencies 기능을 만든 개발자가 작성한 [블로그 글](https://nodejs.org/en/blog/npm/peer-dependencies/)을 보고 정리한 것으로, 내용이 거의 같습니다!

## Peer Dependencies? 

npm(Node Package Manager) 패키지 매니저가 sub-dependencies 를 다루는 예시는 다음과 같다.

내가 만든 패키지가 `request` version2와 `some-other-libaray`에 의존성이 있는데 `some-other-library`가 `request` version1에 의존성이 있을 때 
dependency graph는 이렇게 된다. 

```
├── request@2.12.0 
└─┬ some-other-library@1.2.3 
  └── request@1.9.9 
```

`some-ohter-library`에는 내 패키지의 v2 복사본을 방해하지 않으면서 사용할 수 있는 v1의 자체 카피본이 있으므로, 코드가 잘 동작하게 된다. 

## The Problem: Plugins 

그런데 한 가지 동작하지 않는 유즈 케이스가 있다. 
plugin package는 항상 'host' 패키지를 직접 사용하지는 않지만 다른 'host' 패키지와 함께 사용하도록 되어 있다.
Node.js 패키지 생태계에는 이미 이 패턴의 많은 예가 있다. 

- Grunt plugins 
- Chai plugins 
- Levelup Plugins 
- Express middleware 
- Winstom transports 

본질적으로, 플러그인은 host 패지키와 함께 사용하도록 설계되어 있다. 하지만 더 중요한 것은 특정 버전의 호스트 패키지와 함께 사용하도록 설계되어있다. 
예를 들어, chai-as-promised version1.x 와 2.x 플러그인은 chai version 0.5와 동작한다. 반면에  version 3.x 는 chai 1.x 와 동작한다. 

패키지 매니저로서, 종속성을 설치할 때 npm이 하는 일의 대부분은 버전을 관리하는 것이다. 
하지만 package.json의 'dependencies' hash가 있는 일반적인 모델은 분명히 플러그인에 해당된다. (여기서 hash는 dependencies에 패키지가 있는 걸 그냥 이렇게 말하는 것 같다. 왜 해시지? 패키지 코드 해시값을 의미하는 건가?)

대부분의 플러그인은 실제로 host package에 의존하지 않는다. 즉 grunt 플러그인은 절대로 require('grunt')하지 않으므 플러그인이 호스트 패키지를 dependency로 설정하더라도 다운로드한 카피본은 사용되지 않는다. 따라서 사용하는 쪽에서 호환되지 않는 호스트 패키지에 플러그인을 꽂을 가능성이 있다. 

유틸리티 API를 제공하는 호스트 패키지로 인해 직접적인 종속성이 있는 플러그인의 경우에도, 플러그인의 package.json에 종속성을 지정하면 원하는 것이 아닌 호스트 패키지의 여러 복사본이 있는 종속성 트리가 생성된다. 
예를 들어, winston-mail 0.2.3이 dependencies hash에 최신 버전인 winston: 0.5.x를 지정했다고 한다면, 앱 개발자로서 최신의 것을 원하므로 winston과 winston-mail의 최신 버전을 찾아서 pacakge.json에 다음과 같이 넣을 것이다. 

```
{
  "dependencies": {
    "winston": "0.6.2",
    "winston-mail": "0.2.3"
  }
}
```
그러나 이제 npm install을 실행하면 예기치 않은 종속성 그래프가 나타난다. 

```
├── winston@0.6.2
└─┬ winston-mail@0.2.3
  └── winston@0.5.11
```
메인 애플리케이션과 다른 winston api를 사용하는 플러그인에서 미묘하게 오류가 발생할 수 있다. 


## The solution: Peer Dependencies 

이를 해결하기 위해서는 호스트 패키지 간의 이러한 '종속성'을 표현해야 한다.
패키지 매니저에게, '나는 내 호스트 패키지 버전 1.2.x에 연결될 때만 작동하므로 나를 설치하는 경우 호환되는 호스트가 설치되어있는지 확인해주세요' 라고 말해야 하는데,
이 관계를 peer dependency라고 한다. 

dependency는 내가 만든 모듈에서 사용하는 패키지들을 지정하는 반면, peer dependency는 반대로 내가 만든 모듈이 다른 모듈과 함께 동작할 수 있다는 호환성을 표시하는 것이다. 
내가 만든 모듈이 호스트의 모든 버전이 아니라 1.3 버전과만 동작한다면, 그런 정보를 표시해줘야 하는데 이럴 때 사용하는 것이 peerDependencies라는 것이다.

## Using Peer Dependencies 

플러그인을 작성할 때 의존하는 호스트 패키지의 버전을 파악하고 package.json에 추가한다.

```
{
  "name": "chai-as-promised",
  "peerDependencies": {
    "chai": "1.x"
  }
}
```
chai-as-promised를 설치할 때 chai 패키지가 함께 제공된다.
그리고 나중에 chai 0.x 버전에서만 작동하는 다른 chai 플러그인을 설치하려고 하면 오류가 발생한다. 

### 버전 작성 팁

일반 regular dependencies와 달리 peer dependency 요구 사항은 관대해야 한다. 
peer dependency를 특정 패치 버전으로 특정하면 안 된다. 
하나의 chai 플러그인이 chai 1.4.1에만 피어 종속된다면 앱에서 사용하는 다른 플러그인에서 chai 버전을 올리거나, 내릴 수 없게 된다.

다른 하나는 chai 1.5.0 에 의존했는데, 단순히 작성자가 게으르고 호환되는 chai의 실제 최소 버전을 파악하는데 시간을 소비하지 않았기 때문이다.

피어 디펜던시 requirement 가 무엇인지 결정하는 가장 좋은 방법은 [semver](https://semver.org/) 를 따르는 것이다.

host package의 주요 버전만 변경하면, 플러그인이 깨진다고 가정한다면, 따라서 호스트 패키지의 모든 1.x 버전으로 작업했다면 "~1.0" 또는 "1.X' 를 사용하여 이를 표현한다.

1.5.2에 도입된 기능에 의존하는 경우 ">= 1.5.2 < 2"를 사용하면 된다.

## 마치며 

코드 리뷰에 peerDependency에 새로 추가한 패키지들을 추가해달라는 리뷰를 받았는데, 사실 peerDependency를 잘 몰라서 얼렁뚱땅 추가하고(잘못 추가한 것 같다...) 주말에 다시 공부해서 정리하는 중이다.

peerDependency를 정리하다가 회사에서는 peerDependency 어떻게 하고 있지? 싶어서 궁금해서 찾아봤다.
위에서 설명한 것 처럼 내가 사용하진 않지만, 이런 특정 버전과 동작해요(인터페이스가 안맞아서라던가...) 가 아니라 다른 이유 때문에 peerDependency에 의존성을 추가하는 경우를 발견하게 되었다.

회사에서 만든 패키지들을 여러 개 사용하는데, 이 패키지들이 서로에게 의존성이 있는 경우에는 위에서 설명한 것 처럼 여러 패키지들이 설치가 된다. 일반적인 경우라면 각각 다른 패키지가 설치되므로 동작하는 데 이슈가 없어야 한다. 그런데 같은 페이지에서 동시에 다른 코드를 사용할 때 서로 공유되어야 할 값들이 공유되지 않아 문제가 생겼다. 
이를 해결하기 위해서 peerDependency에 해당 패키지들을 추가해서 이 패키지를 설치하는 쪽에서 알아서 하나의 버전만 다운로드 하도록 해서 이슈를 회피한다는 내용을 정리한 문서를 보았다.

이 문서가 이전에 공유됐었는데... 이런 이슈가 있었는지 기억이 안나는 걸 보니, 보지 않았거나 쓱 한 번 봤던 것 같다. 
오늘도 또 이렇게 얼렁뚱땅하면 결국에 다시 돌아오게 된다는 교훈을 얻는다...


## 참고 자료 

https://nodejs.org/en/blog/npm/peer-dependencies/

https://www.zerocho.com/category/NodeJS/post/5825a3caaff5c70018279975

