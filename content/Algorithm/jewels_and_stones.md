+++
category = Algorithm
comments = true
date = "20180820"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = ["Algorithm", "JS", 'PY']
title = "Jewels and Stones"
description = "Jewels and Stones"
front = true
+++

## 문제

You're given strings J representing the types of stones that are jewels, and S representing the stones you have. Each character in S is a type of stone you have. You want to know how many of the stones you have are also jewels.

The letters in J are guaranteed distinct, and all characters in J and S are letters. Letters are case sensitive, so "a" is considered a different type of stone from "A".

## Python

### 내 풀이

```py
import functools
def numJewelsInStones(self, J, S):
    jewels = 0
    for jewel in J:
        jewels += S.count(jewel)
    return jewels
```

python count() method

substring 이 정해진 범위에서 몇 번 나오는지 그 숫자를 반환해주는 함수
`str.count(sub, start= 0,end=len(string))`

### 다른 사람 풀이

```py
def numJewelsInStones(self, J, S):
    return sum(map(S.count, J))
```

map 함수를 써서 stone 에 포함 된 jewel 리스트 요소의 수를 새로운 리스트로 반환하고 sum 메소드를 사용하여 리스트 요소의 합을 구한다.

```py
def numJewelsInStones(self, J, S):
    return sum(map(J.count, S))
```

```py
def numJewelsInStones(self, J, S):
    return sum(s in J for s in S)
```

```py
def numJewelsInStones(self, J, S):
        setJ = set(J)
        return sum(s in setJ for s in S)
```

python 집합 자료형

```py
>>> s1 = set([1,2,3])
>>> s1
{1,2,3}

# 값 1 개 추가하기
>>> s1.add(4)
>>> s1
{1,2,3,4}

# 값 여러 개 추가하기
>>> s1.update([4,5,6])
>>> s1
{1,2,3,4,5,6}

# 특정 값 제거하기
>>> s1.remove(2)
>>> s1
{1,3,4,5,6}
```

집합 자료형의 특징

- **중복을 허용하지 않는다.**
- 순서가 없다. => 인덱싱을 제공하지 않는다.
- 자료형의 중복을 제거하기 위한 필터 역할로 종종 사용되기도 한다.

이 문제를 푼 사람은 jewels 가 중복된 문자열일 수도 있다고 생각했기 때문인 것 같다.

하지만 이 문제에서는 jewels 가 중복되지 않는다고 되어있다.

## Javascript

```js
var numJewelsInStones = function(J, S) {
  var stones = new Map();

  for (i = 0; i < S.length; i++) {
    if (stones.has(S[i])) {
      var value = stones.get(S[i]) + 1;
      stones.set(S[i], value);
    } else {
      stones.set(S[i], 1);
    }
  }
  var jewles = 0;
  for (i = 0; i < J.length; i++) {
    if (stones.has(J[i])) {
      jewles += stones.get(J[i]);
    }
  }
  return jewles;
};
```

string 은 내부적으로 배열이기 때문에 J.split('')을 해주지 않아도 된다.
