+++
categories = ["Algorithm"]
comments = true
date = "2018-4-01T16:59:13-04:00"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = ["Algorithm", "JS"]
title = "3sum Closest"
description = "3sum Closest"
+++

# 3Sum Closest

Given an array nums of n integers and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume that each input would have exactly one solution.

Example:

```
Given array nums = [-1, 2, 1, -4], and target = 1.

The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
```

### 나의 풀이

1.  반복문을 돌면서 배열의 세 정수의 조합을 모두 확인한다.
2.  target 수와 세 정수의 합이 같으면 return 해서 반복문을 종료한다.
3.  sum 과 target 숫자의 차가 현재 closestSum 과 target 의 숫자의 차보다 작으면 sum 을 closestSum 에 대입한다.

- sort 를 사용해서 정렬을 한 후 문제를 풀어보려고 했지만, 잘 되지 않아서 일단은 반복문으로 모든 숫자의 조합을 생각하기로 하였다.

```js
//	80 ms
var threeSumClosest = function(nums, target) {
  let closestSum;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let t = j + 1; t < nums.length; t++) {
        let sum = nums[i] + nums[j] + nums[t];
        if (sum === target) {
          return sum;
        } else if (
          !closestSum ||
          Math.abs(closestSum - target) > Math.abs(sum - target)
        ) {
          closestSum = sum;
        }
      }
    }
  }
  return closestSum;
};
```

## 다른 사람 풀이

1.  nums.length 가 3 보다 작으면 바로 리턴한다.
2.  nums 배열을 sort 메소드를 사용하여 작은 수 부터 정렬한다.
3.  반복문을 돈다.
4.  첫 번 째 숫자를 고정시킨다.
5.  고정시킨 배열의 첫 번째 숫자와 두 번 째 숫자, 맨 마지막 숫자를 더해준다.
6.  현재 result 의 값이 없거나, result 와 target 의 차이가 현재 sum 과 target 의 차이값보다 크다면, sum 을 result 에 대입해준다.
7.  result 값이 target 값보다 작으면, 더 큰 수를 더해줘야 하므로, 정렬된 배열의 두번째 숫자의 인덱스를 ++ 해준다. 반대의 경우라면, 더 작은 수를 더해줘야 하므로 마지막 숫자의 인덱스를 -- 해준다.

- 조건에 맞는 정수의 합을 찾기 위해서 반복문을 도는 것은 첫 번째 방식과 비슷하지만, target 과 일치하는 세 정수의 합이 있다면,
- target 과의 차이를 줄여갈 수 있기 때문에
- 첫 번째 방식보다 빠르게 찾아낼 수 있다.

```js
let threeSumClosest = function(nums, target) {
  let result;
  if (nums.length <= 3) {
    result = nums[0] + nums[1] + nums[2];
    return result;
  }
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 2; i++) {
    let lo = i + 1,
      hi = nums.length - 1;
    while (lo < hi) {
      let sum = nums[i] + nums[lo] + nums[hi];
      if (sum === target) {
        return sum;
      }
      if (
        typeof result === "undefined" ||
        Math.abs(target - sum) < Math.abs(target - result)
      ) {
        result = sum;
      }
      sum > target ? hi-- : lo++;
    }
  }
  return result;
};
```
