+++
category = font-end
comments = true
date = "20210406"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags="WAI-ARIA, html, accessibility, 접근성"
title = "WAI-ARIA?"
description = "WAI-ARIA가 무엇인지 알아보자"
front = 'true'
+++

이번 글에서는 WAI-ARIA가 무엇인지, 왜 필요한지, 언제 사용할 수 있는지 정리했습니다.

## WAI-ARIA?

WAI-ARIA(Web Accessibility Initiative - Accessible Rich Internet Application)은 W3C에서 작성한 사양으로 장애를 가진 사용자가 웹 콘텐츠 및 웹 애플리케이션에 더 쉽게 접근할 수 있도록 하는 여러 특성을 말한다.

웹 콘텐츠의 접근성에는 보조 기술이 장애인에게 적절한 정보를 전달할 수 있도록 위젯, 구조 및 동작에 대한 의미 정보가 필요하다.
보조 기술은 콘텐츠 표시를 사용자에게 더 적합한 형식으로 변환하고 사용자가 다양한 방식으로 상호작용할 수 있도록 한다.
예를 들어, 웹 애플리케이션 개발자는 SVG에 시맨틱 버튼 요소가 없더라도 Javascript를 사용하여 SVG에서 대화형 버튼 위젯을 만든다. 장애가 없는 사용자에게는 버튼 위젯처럼 보이고 작동할 수 있지만 적절한 의미가 없으면 보조 기술이 역할을 인식하지 못할 수 있기 때문에 장애가 있는 사람이 버튼 위젯을 인식하거나 조작할 수 없다.

Rich Internet Application은 자바스크립트와 Ajax와 같은 기술을 사용하여 동적으로 콘텐츠를 변경하는데, 장애를 가진 사용자가 이러한 애플리케이션에 접근하기 어려울 수 있다.

이러한 문제를 해결하기 위해서 WAI-ARIA 기술을 사용하는데, 위 예시처럼 동적으로 콘텐츠가 변경되는 것 이외에도 다양한 상황에서 사용할 수 있다.

## 언제 WAI-ARIA를 사용할까?

WAI-ARIA가 유용한 4가지 주요 영역이 있다.

- signposts/Landmarks

- Dynamic content updates

- Enhancing keyboard accessibility

- Accessibility of non-semantic controls

## WAI-ARIA 주요 기능

세 가지 주요 기능이 정의되어 있다.

### roles

role은 엘리먼트가 무엇인지 정의한다. 일들 중 다수는 landmark role로 HTML5 structure element의 의미적 차이를 복제한다.

- `role="navigation"` or `<nav>`
- `role="complementary"`or `<aside>`

하지만 UI에서 흔히 볼 수 있는 `role="banner"` `role="search"` `role="tabgroup"` `role="tab"`등과 같이 다른 페이지 구조를 설명하는 것들도 있다.

### properties

이들은 요소의 속성을 정의하며 추가 의미 또는 의미를 부여하는 데 사용할 수 있다.

`aria-required="true"`는 유효하려면, input을 채워야 한다는 것을 지정할 수 있다.
반면, `aria-labelledby="label"`을 사용하면 엘리먼트에 ID를 넣은 다음 `<label for="input">`을 사용할 수 없는 여러 요소를 포함하여 페이지의 다른 항목에 대한 레이블로 참조할 수 있다.

### states

현재 엘리먼트의 상태를 정의할 수 있다.
`aria-disabled="true"` 처럼 스크린 리더에 input이 현재 비활성화되어 있음을 표시할 수 있다. state는 앱의 생명주기 동안 속성이 변경되지 않는다는 점에서 properties와 다르다. state는 자바스크립트를 통해 변경가능하다.

## WAI-ARIA 특징

WAI-ARIA 속성에 대한 중요한 점은 브라우저 접근성 API에 의해 노출되는 정보를 제외하고 웹 페이지에 영향을 미치지 않는다는 것이다.
WAI-ARIA는 웹 페이지 구조, DOM등에 영향을 주지 않지만 attributes는 CSS로 엘리먼트를 선택하는 데 유용할 수 있다.

HTML을 보완하여 애플리케이션 위젯에 필요한 정보를 제공한다. 예를들어 HTML4에서의 탐색 랜드 마크, Javascript 위젯, form 힌트 및 오류 메시지, 실시간 콘텐츠 업데이트 등을 접근 가능한 형태로 제공한다.

이러한 위젯은 대부분 나중에 HTML5에 통합되었으며 개발자는 ARIA를 사용하는 것보다 올바른 의미의 HTML 요소를 사용하는 것이 좋다.
다른 웹 기술과 마찬가지로, ARIA 역시 환경 별 지원 수준에 차이를 보이므로, 특정 ARIA 역할을 지원하지 않거나, 부분적으로만 지원하거나, 잘못된 기능을 가지고 있을 수 있다.

그러므로 가능한 한 보조 기술이 훨씬 넓게 지원하는 [의미를 가진 HTML 요소](https://developer.mozilla.org/ko/docs/Learn/Accessibility/HTML)를 사용하는 편이 좋다.

## 마무리

WAI-ARIA가 무엇인지 간단하게 알아보았다. 공식 문서를 읽어 보려고 했는데 너무 어려워서.. 조금 읽다가 포기했다. HTML공부하면서 천천히 읽어봐야겠다!

## 참고 자료

https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA

https://www.w3.org/TR/wai-aria-1.1/

https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics
