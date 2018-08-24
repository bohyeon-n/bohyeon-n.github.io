+++
category = Algorithm
comments = true
date = "20180824"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = ["Algorithm" ,'PY']
title = "Move Zeroes"
description ="Move Zeroes"
front = true
+++

## 문제

Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.

1. You must do this in-place without making a copy of the array.
2. Minimize the total number of operations

## 풀이 1

1. 리스트의 0 의 개수만큼 반복문
2. remove(0)
3. append(0)

```py
class Solution(object):
    def moveZeroes(self, nums):
        for i in range(0, nums.count(0)):
            nums.remove(0)
            nums.append(0)
```

## 풀이 2

1. 리스트의 길이 만큼 반복문을 돈다.
2. i 번 째 인수가 0 이 아니면, last_zero 보다 앞으로 가야 하므로 last_zero 와 자리를 바꾼다.
3. last_zero 가 이동하였으므로 last_zero 자리 값을 1 증가시켜 준다.

```py
def moveZeroes(nums):
    last_zero = 0
    for i range(0, len(nums)):
        if nums[i] != 0:
          nums[i], nums[last_zero] = nums[last_zero], nums[i]
          last_zero += 1
```

## 풀이 3

1. sort 함수를 사용한다.
2. x 가 0 이면 1 을 리턴
3. x 가 0 이 아니면 -1 을 리턴

```py
def moveZeroes(self, nums):
    nums.sort(key=lambda x: 1 if x == 0 else -1)
```
