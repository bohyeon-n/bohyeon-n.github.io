
+++
category = TIL
comments = true
date = "20220605"
draft = false
showpagemeta = true
showcomments = true
slug = ""
tags = ["picture tag" ]
title = "[TIL]이미지 최적화 방법"
description = "이미지 최적화하는 방법을 알아본다."
front = true
+++

이번 글에서는 웹 성능을 최적화하는 방법 중 하나인 이미지룰 최적화하는 방법을 알아봅니다.

# 최적화?

웹 사이트의 전체 부분 중에 이미지 및 멀티 미디어 소스가 많은 부분을 차지한다. 이 부분을 잘 처리하면 사이트 성능을 향상시킬 수 있다.

# 이미지 크기 

화면 크기에 맞는 이미지를 사용한다. 작은 화면인데 큰 크기의 이미지를 사용하지 않아야 한다.

# 이미지 포맷 

가장 많이 사용하는 형식이 JPG와 PNG 이다.

JPG 포맷을 사용하면 크기를 희생하면서 사진의 품질을 제어할 수 있다. JPG는 카메라로 찍은 실제 사진에 최적화 되어 있다.
반면 PNG 포맷은 투명도를 지원하는 무손실 형식이므로 이미지의 일부를 투명하게 만들어 다른 페이지 콘텐츠와 혼합하려는 경우에 더 적합하다. PNG는 만들어진 이미지에 더 적합하다.
그리고 이러한 경우, PNG는 SVG파일로 대체될 수 있다.

GIF 포맷은 애니메이션이 가능하다. 품질과 투명도가 개선된 GIF 포맷을 사용하고 싶다면 APNG 포맷을 고려하는 것이 좋다.


# webp 포맷 

webp는 구글이 만든 이미지 포맷으로 jpg, png보다 훨씬 더 효과적인 압축 수준을 제공하지만 png가 제공하는 투명도의 이점을 포함한다. 
그러나 최신 브라우저에서만 동작하는 포맷이므로, png/jpg 포맷과 함께 제공하는 것이 좋다.

# Responsive Images 

size와 srcset 속성 지원이 보편화되면서 기기의 화면 크기와 해상도에 따라 사용자의 브라우저에 다양한 크기의 이미지를 전달할 수 있게 되었다.

```html
<img srcset="elva-fairy-320w.jpg 320w,
             elva-fairy-480w.jpg 480w,
             elva-fairy-800w.jpg 800w"
     sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
     src="elva-fairy-800w.jpg" alt="요정 옷을 입은 엘바">     
```

# picture 태그 

`<image>` 요소의 다중 이미지 소스를 위한 컨테이너를 정의할 떄 사용한다. 

`<picture>` 요소는 뷰포트의 너비에 따라 커지거나 작아지는 하나의 이미지를 사용하는 대신 서로 다른 디스플레이나 기기에서 해당 뷰포트에 알맞게 채워질 수 있도록 여러 개의 이미지 중에 적절한 이미지를 사용할 수 있도록 해준다. 

picture 태그는 다음과 같은 이유로 사용되는데

- 디스플레이 크기에 따라 적합한 이미지 노출 
- 특정 이미지 파일 형식이 지원되지 않는 경우 (ex: webp 포맷)
- 레티나 디스플레이에서는 고밀도의 이미지를 노출시킴으로써 선택적으로 고밀도/저밀도 화면에 따라 다른 해상도의 이미지를 노출시킨다.

```html 
<picture>
  <source media="(min-width: 700px)" srcset="/test_960.jpg">
  <source media="(min-width: 400px)" srcset="/test_500.jpg">
  <img src="/text_200.jpg" >
</picture>
```

브라우저는 `<source>` 요소들의 속성값을 각각 확인해 나가며 조건을 만족하는 첫 번째 source 요소를 사용하고, 나머지 soruce 요소들은 무시한다. `<picture>` 를 지원하지 않으면 img 태그를 사용한다. img 태그는 가장 마지막에 위치해야 한다.

# layz-loading images 

loading 속성은 이미지 렌더링 속도에 큰 영향을 줄 수 있는 비교적 새로운 솔루션이지만 지원이 아직 완벽하지 않다.

lazy loading을 할 때 두 가지 사항을 확인해야 한다.

- 이미지를 로드할 때 콘텐츠가 페이지 주위로 이동하지 않도록 항상 너비 및 높이 속성을 통해 이미지의 크기를 지정해야 한다.
- 사용자가 최대한 빨리 볼 수 있도록 하려는 이미지의 경우 사용자가 뷰포트를 스크롤할 때까지 기다리지 않고 우선 로드되도록 즉시 로드한다.

lazy loading을 구현하는 몇 가지 방법이 있는데 

1. img 태그에 data-src 속성을 사용해서 뷰포트에 들어오는지 확인되면 data-src값을 src에 넣어주는 js를 작성하기 

intersection object api를 사용하거나 scroll, resize 또는 orientationonchange 이벤트 핸들러의 콜백으로 넘겨 뷰포트에 들어왔을 때 실행한다.

2. loading 속성을 사용
`<img loading=lazy>`는 가장 널리 사용되는 chromium 기반 브라우저(chrome, edge, opera) 및 firefox에서 지원된다.

브러우저에서 직접 지원하는 지연 로딩을 사용하면 외부 라이브러리가 필요하지 않다.
또한 브라우저 수준의 지연 로딩을 사용하면 클라이언트에서 javascript가 비활성화된 경우에도 지연된 이미지 로딩이 계속해서 작동한다.

```
<img src="image.png" loading="lazy" alt="…" width="200" height="200">
```

- auto: 속성을 포함하지 않는 것과 동일한 브라우저의 기본 지연 로딩 동작 
- lazy: 뷰포트로부터 계산된 거리에서 도달할 때까지 리소스 로딩을 지연시킨다.
- eager: 페이지에서의 위치에 관계없이 리소스를 즉시 로드한다.

# inline embedded images 

아주 작은 이미지의 로딩을 최적화 하는 대안은 Data URIs 통해 css/웹사이트 코드에 이미지를 포함하는 것이다.
이를 통해 이미지에 대한 링크를 제공하는 대신 이미지의 콘텐츠를 나타내는 코드를 제공한다.

```html
<img src=”data:<MIMETYPE>;base64,<BASE64_ENCODED_IMAGE>”>
```

## Preload images with media queries 

맨처음 이미지 로드를 빨리 하고 싶다면 rel='preload' 속성과 함께 링크 태그를 사용할 수 있다.
이를 통해 브라우저에게 가능한 한 빨리 이미지 데이터를 로드하고 표시하고 싶다고 알릴 수 있다. 

```html
<link rel="preload" as="image" href="/path/to/image.png" />
```

# Image CDN 

이미지 CDN은 이미지 변환, 최적화 및 전달을 전문으로 한다. 사이트에서 사용되는 이미지에 액세스하고 조작하기 위한 API로 간주할 수도 있다. 이미지 CDN에서 로드된 이미지의 경우 이미지 URL은 로드할 이미지뿐만 아니라 크기, 형식 및 품질과 같은 매개변수도 나타낸다. 이를 통해 다양한 사용 사례에 대한 이미지 변형을 쉽게 만들 수 있다.

# 이미지 크기 고정

DOM 요소의 크기나 위치 등을 변경하면 해당 노드의 하위 노드의 상위의 노드들을 포함하여 레이아웃 단계를 다시 수행하게 된다. 
width, height가 없는 이미지들은 reflow를 발생시켜 퍼포먼스를 저해하기 때문에 이를 해결하기 위해 이미지 및 멀티미디어 요소에 width와 height 속성을 항상 포함하거나 css를 사용하여 
필요한 공간 aspect-ratio 를 잡는다. 

반응형 웹 디자인의 경우 width와 height가 고정이 아니라, css를 사용하여 크기를 조정하는데, 
이미지가 로드되어 각 이미지가 화면에 나타나면 reflow되어 텍스트가 갑자기 화면 아래로 튀어나가는 등의 문제가 발생했는데 이것을 방지하기 위해 aspect-ratio를 사용한다. 


# 참고 자료 

https://web.dev/i18n/ko/browser-level-image-lazy-loading/


https://getpublii.com/blog/how-to-optimise-graphical-and-media-elements.html 

https://bigfastblog.com/embed-base64-encoded-images-inline-in-html

https://developer.mozilla.org/ko/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images

https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/Data_URLs

https://web.dev/i18n/ko/image-cdns/

https://inpa.tistory.com/entry/CSS-%F0%9F%93%9A-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%B9%84%EC%9C%A8-%EA%B3%A0%EC%A0%95%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-aspect-ratio
