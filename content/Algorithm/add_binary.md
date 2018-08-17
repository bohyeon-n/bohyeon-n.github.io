+++
category = Algorithm
comments = true
date = "20180817"
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

```py
def addBinary(self, a, b):
    sum = 0;
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

하하...
내일 다시 풀어봐야겠다 ㅠㅠ
