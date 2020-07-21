+++
category = CSS
comments = true
date = "20200722"
draft = false
showpagemeta = true
showcomments = false
slug = ""

title = "Flexbox"
description = "Flexbox를 공부하면서 헛갈리는 개념들을 정리해보았다."
front = 'true'
+++

flex box를 공부하면서 헛갈리는 개념들을 정리해보았다.

## 중심 축과 교차 축

flex box에서 중요한 것은 메인 축이 어디인가이다.

flex-direction이 기본 값인 row 이면 메인 축은 왼쪽에서 오른쪽이고, 교차 축은 아래에서 위이다. column이면 이와 반대이다.

## container, item, flex-line

flex 컨테이너는 css 속성이 flex 또는 flex-inline으로 설정된 html 요소를 나타낸다. 플렉스 컨테이너의 직접적인 자식인, 정렬 될 요소를 item이라고 한다. 그리고 이 아이템의 각 행 또는 열을 flex-line이라고 한다.

## align-items vs align-content

align-center 와 align-items 둘 다 교차 축을 따라 정렬된다. 이 두 속성의 차이점은 뭘까?

### align-items

align-items는 교차 축을 따라 flex-line 내에 아이템들을 정렬한다.

각각의 라인 안에서 아이템들을 정렬한다. flex-direction이 row인 경우, height 가 모두 다른 박스를 정렬할 때, align-items 속성 값이 center 일 때, 각각의 상자의 높이의 가운데에 맞춰서 정렬된다.

### align-content

align-content 속성은 conatiner가 래핑되도록 설정된 경우에만 관련이 있다. 둘 이상의 flex-line이 없으면 align-content 속성은 필요하지 않다.

flex-line 이 교차 축을 따라 정렬되는 방식을 결정한다. flex-line 끼리 어떻게 정렬될 지 정하는 것이다.

align-center vs align-items

- 플렉스 컨테이너
- 플렉스 컨테이너의 직접적인 자식인 정렬 될 요소는 플렉스 아이템이다.

실습하기

[align-items/align-content 실습해보기](https://codepen.io/koobh/pen/QWyYLoE)

[grow / align-self 실습해보기](https://codepen.io/koobh/pen/dyGabxw)

## 회고

오늘 flex-box 를 사용하려고 하니 마음대로 잘 되지 않았다. 이전에는 flex-box 를 잘 모르고 사용했었는데, flex-line 과 메인 축과 교차 축 개념을 알고 나니 좀 더 이해하기 쉬웠다.

## 참고 자료

[flexbox-align-items-and-align-content](https://medium.com/better-programming/flexbox-align-items-and-align-content-a60b6f8451e3)
