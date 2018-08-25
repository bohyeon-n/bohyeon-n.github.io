+++
category = Algorithm
comments = true
date = "20180825"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = ["Algorithm" ,'PY']
title = "FIZZ BUZZ in Python"
description ="FIZZ BUZZ in Python "
front = true
+++

## 문제

Write a program that outputs the string representation of numbers from 1 to n.

But for multiples of three it should output “Fizz” instead of the number and for the multiples of five output “Buzz”. For numbers which are multiples of both three and five output “FizzBuzz”.

## 풀이 1

```py
class Solution:
    def fizzBuzz(self, n):
        return ['FizzBuzz'if i % 15 == 0 else 'Fizz' if i % 3 == 0 else 'Buzz' if i % 5 == 0 else str(i) for i in range(1, n+1)]
```

## 풀이 2

```py
def fizzBuzz(self, n):
    return ['Fizz' * (not i % 3) + 'Buzz' * (not i % 5) or str(i) for i in range(1, n+1)]
```

True or False 면 첫 번째 표현식을 반환

False or True 면 두 번째 표현식을 반하므로 앞의 것이 빈 sequence(String, Tuple, List)일 때는 False 이기 때문에 두 번 째 표현식을 반환하게 된다.

0 도 False 이기 때문에 0 일 때 1 을 반환하므로 Fizz 가 출력될 수 있다.
