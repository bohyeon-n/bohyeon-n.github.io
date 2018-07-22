+++
categories = ["Algorithm"]
comments = true
date = "2018-7-18T23:59:13-04:00"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = ["Algorithm", "JS"]
title = "sort colors"
description = "sort colors"
+++

# sort colors

Given an array with n objects colored red, white or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white and blue.

Here, we will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.

# 나의 풀이

- in-place 알고리즘이란 원소들의 개에 비해서 충분히 무시할 만한 저장 공간만을 더 사용하여 정렬 알고리즘들을 의미한다.

- 버블 정렬
  - 두 인접한 원소를 검사하여 큰 수를 뒤로 보내는 간단한 알고리즘
  - 다른 정렬 알고리즘에 비해 속도가 상당히 느리다.

```js
var sortColors = function(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - i; j++) {
      if (nums[j] > nums[j + 1]) {
        let temp = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = temp;
      }
    }
  }
};
```

# 다른 사람 풀이

- low, high, index 변수가 있다.
- nums 배열을 돌면서 확인한다.
- 0 이면, nums[low]에 위치한다.
- low++ index++ 를 해준다. 0, 가장 낮은 수 이므로 고정시키면 되기 때문에 이제 더 이상 볼 필요가 없어졌다.
- 다시 nums[index]를 확인한다.
- 1 이면, index++ 를 해서 다음 숫자를 확인한다.
- 2 이면, nums[high] nums 배열의 끝에 위치하고, 2 도 가장 큰 수이므로, 더이상 확인할 필요가 없으므로, nums[high]에 고정시키면 된다. high-- 해준다.
- 계속해서 반복하다보면, 0 과 2 는 앞 뒤로 위치된다.
- 1 은 자동으로 그 사이에 위치된다.

* 나는 언제쯤 이런 생각을 할 수 있을까... 😱

```js
var sortColors = function(nums) {
  let temp,
    lo = 0,
    hi = nums.length - 1;
  for (let i = 0; i <= hi; ) {
    if (nums[i] === 0) {
      temp = nums[i];
      nums[i] = nums[lo];
      nums[lo] = temp;
      lo++;
      i++;
    } else if (nums[i] === 2) {
      temp = nums[i];
      nums[i] = nums[hi];
      nums[hi] = temp;
      hi--;
    } else {
      i++;
    }
  }
};
```
