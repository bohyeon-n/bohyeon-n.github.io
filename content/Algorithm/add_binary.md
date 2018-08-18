+++
category = Algorithm
comments = true
date = "20180818"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = ["Algorithm", "JS"]
title = "Add Binary - Python"
description = "Add Binary"
front = 'true'
+++

Given two binary strings, return their sum (also a binary string).

The input strings are both non-empty and contains only characters 1 or 0.

## 풀이 1

```py
def addBinary(self, a, b):
    sum = 0
    for idx,num in enumerate(a):
        sum += int(num)*2**(len(a- (idx + 1))
    for idx, num in enumerate(b):
        sum += int(num)*2**(len(b- (idx + 1))
    quotient = sum
    remainder = []
    if sum == 1 or sum == 0:
        return str(sum)
    else:
        while quotient != 1:
            remainder.appe(quotient%2)
            quotient = quotient//2
        remainder.append(1)
        return ''.join(str(e) for in reversed(remainder))
```

## 풀이 2

`int()`함수와 `bin()`함수를 사용한 풀이

```py
def addBinary(a,b):
    return bin(int(a,2) + int(b, 2))[2:]
```

`bin()` function converted an interger number to a binary string.
`int(x, base=10)` 두 번째 매개변수는 number format 을 결정 default value 는 10 이다.
`[2:]` 두 번째 부터 끝까지 자르기

## 풀이 3

재귀 함수를 사용한 풀이

```py
def addBinary(self, a,b):
    if len(a)==0: return b
    if len(b)==0: return a
    if a[-1]== '1' and b[-1] == '1':
        return self.addBinary( self.addBinary(a[0:-1], b[0:-1]), '1')
    if a[-1] == '0' and b[-1] == '0':
        return self.addBinary(a[0:1], b[0:1]) + '0'
    else:
        return self.addBinary(a[0:-1], b[0:-1]) + '1'
```
