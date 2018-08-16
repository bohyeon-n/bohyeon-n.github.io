+++
category = Algorithm
comments = true
date = 20180816
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = ["Algorithm", "JS" , 'PY']
title = 'Best Time to Buy and Sell Stock'
description = "Best Time to Buy and Sell Stock"
+++

# Best Time to Buy and Sell Stock - Python, Javascript

Say you have an array for which the ith element is the price of a given stock on day i.

If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.

Note that you cannot sell a stock before you buy one.

```js
Input: [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
             Not 7-1 = 6, as selling price needs to be larger than buying price.
```

## Javascript

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

## Python

1. max_profit, min_buy 초기값을 설정한다.
2. prices for 문을 돌면서 인수를 확인한다.
3. price 와 현재 min_buy 의 값 중 작은 값을 min_buy 에 대입한다.
4. 현재 price 에서 min_buy 의 차와 max_profit 값 중 큰 값을 max_profit 에 대입한다.
5. min_buy 의 값을 가장 적은 값으로 대입한다고 하더라도, return 하는 값은 max_profit 이므로 실제로 min_buy 에 어떤 값이 있던 상관없다.

   [1,2,6,5,1,2] 이런식으로 prices list 가 주어졌다고 가정해보자

   4 번 째 인수 1 이 min_buy 에 대입되도 그 후 에 현재 max_profit 인 5(6 - 1) 보다 profit 을 크게 만들어 줄 인수가 나타나지 않는다면 max_profit 의 값은 변하지 않는다.

   `float('inf')`는 파이썬에서 무한을 표현하는 식이다.

```py
    def maxProfit(self, prices):
        max_profit, min_buy = (0, float('inf')  )
        for price in prices:
            min_buy = min(min_buy, price)
            max_profit = max(max_profit, price - min_buy )
        return max_profit
```
