+++
category = CS
comments = true
date = "20200223"
draft = false
showpagemeta = true
showcomments = false
slug = ""
title = "HashMap"
description = "HashMap을 알아보자!"
front = 'true'
+++

## HashMap이란?

![hash - wiki](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Hash_table_3_1_1_0_1_0_0_SP.svg/630px-Hash_table_3_1_1_0_1_0_0_SP.svg.png)
출처: Wikipedia - hash table

HashMap은 키를 배열의 인덱스로 사용하여 키 i와 i번째 배열 항목을 연관시켜 저장하는 데이터 구조이다. 키값으로 데이터에 한 번에 접근할 수 있기 때문에 원하는 데이터를 빠르게 찾을 수 있다.

키가 인덱스로 사용된다면, 정수값만 키 값으로 사용할 수 있을까? 정수값이 아닌 다른 값들을 어떻게 인덱스로 변환할 수 있을까?

## Hash란?

![hash](https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Hash_table_4_1_1_0_0_1_0_LL.svg/480px-Hash_table_4_1_1_0_0_1_0_LL.svg.png)
출처: Wikipedia - Hash function

키값은 해시 함수를 통해 해시로 변경된다. 이를 해싱이라고 한다.
해싱은 정수가 아닌 다른 더 복잡한 데이터 타입을 키로 사용할 수 있도록 확장한 것이다.

해시은 **단방향**이다. 같은 객체를 해싱하면 항상 같은 해시값이 나오지만, 같은 해시값이라고 해서 꼭 같은 객체는 아니다. 같은 해시값을 가진 두 객체는 서로 다른 객체일 수 있다.

항상 같은 해시값이 나오므로 이를 인덱스로 사용할 수 있지만, 같은 해시값을 가진 서로 다른 키가 같은 인덱스를 가리키는 상황이 생길 수 있다.
이러한 상황을 **충돌**이라고 한다.

## 충돌

해시 함수는 입력값은 무한하지만 출력값은 유한하다. 해시 함수가 서로 다른 두 개 이상의 키를 같은 해시값으로 반환한다면 인덱스 하나에 여러 개의 키를 삽입해야 하는 상황이 생긴다. 이 상황을 해결하는 것을 **충돌처리**라고 한다.

### 충돌을 해결하는 방법

충돌을 해결하는 방법에는 **개별 체이닝**과 **개방형 주소 지정**이 있다.

#### 개별 체이닝

![wiki 개별 체이닝](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Hash_table_5_0_1_1_1_1_1_LL.svg/900px-Hash_table_5_0_1_1_1_1_1_LL.svg.png)
출처: Wikipedia - Hash table

개별 체이닝은 크기가 m인 해시 배열 인덱스의 항목 각각에 연결 리스트를 두어 해시값이 같은 항목들을 저장한다.

개별 체이닝의 경우, 최악의 경우 모든 키가 같은 테이블에 저장될 수 있으므로 O(n)의 시간복잡도를 가질 수 있다.
그러므로 개별 체이닝은 해시값이 가능한 키값 범위에 균일하게 분포해야 한다. 또한 리스트의 길이가 작아서 두 단계의 탐색이 이루어지더라도 빠르게 끝낼 수 있도록 해시 값의 범위를 크게 잡을 수 있다.

#### 개방형 주소 지정

![wikipedia](https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/HASHTB12.svg/600px-HASHTB12.svg.png)
출처: Wikipedia - Linear probing

해시 테이블의 크기가 저장할 키-값 쌍의 개수보다 큰 경우, 해시값이 충돌날 때 이미 존재하는 빈 공간에 값을 저장하여 충돌을 해소할 수 있다. 이러한 방법을 개방형 주소 지정 해싱이라고 한다.

개방형 주소 지정 해싱의 가장 단순한 형태는 선형 탐지이다. 충돌이 발생할 때마다 단순히 테이블의 다음 항목 위치를 검사하면서 빈 공간을 찾는다.
위 그림에서 Sandra Dee는 해시값이 873이지만 이미 그 인덱스에 John Smith가 저장되어 있으므로 충돌이 발생한다. 이를 해결하기 위해 그 다음 빈 자리인 874에 값을 저장한다.

값을 찾을 때는 키를 인덱스로 해싱하고 탐색 키와 매칭되는 키가 그 위치에 있는지 검사하는 작업을 같은 키가 발견되거나 빈 공간을 찾을 때까지 반복한다. (빈 공간을 찾았다면 탐색에 실패한 것이다)

체이닝처럼 또 다른 저장 공간 없이 해시 테이블 내에서 데이터를 저장할 수 있다. 그러나 테이블의 크기가 키-값 쌍의 개수보다 커야 하므로 적은 수의 데이터를 저장할 때 사용하는 것이 적합한다.

## 참고 자료

[edwith - 파이썬을 이용한 알고리즘의 이해 ](https://www.edwith.org/introalgorithm/lecture/26426/)

[알고리즘](https://www.gilbut.co.kr/book/view?bookcode=BN002341&perdevice=pc)
