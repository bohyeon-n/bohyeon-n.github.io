+++
category = Algorithm
comments = true
date = 20180723
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = ["Algorithm", "JS"]
title = 'Best Time to Buy and Sell Stock'
description = "Best Time to Buy and Sell Stock"
+++

# Best Time to Buy and Sell Stock

Say you have an array for which the ith element is the price of a given stock on day i.

If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.

Note that you cannot sell a stock before you buy one.

```js
Input: [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
             Not 7-1 = 6, as selling price needs to be larger than buying price.
```

## 나의 풀이

1.  prices 배열을 반복문을 돌면서 확인한다.
2.  buy 값이 없거나, buy 보다 작은 값이면 buy 에 대입한다.
3.  그렇지 않다면 buy 보다 큰 수이다. 큰 수 이면서 기존 profit 의 값보다 profit 이 크다면, profit 에 buy 와 현재 배열 요소의 차를 재대입한다.
4.  profit 을 리턴한다.

```js
var maxProfit = function(prices) {
  let profit = 0;
  let buy;
  for (let i = 0; i < prices.length + 1; i++) {
    if (buy === undefined || buy > prices[i]) {
      buy = prices[i];
    } else {
      if (profit < prices[i] - buy) {
        profit = prices[i] - buy;
      }
    }
    console.log(buy, profit);
  }
  return profit;
};
```
