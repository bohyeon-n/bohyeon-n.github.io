+++
category = Typescript
comments = true
date = "20220323"
draft = false
showpagemeta = true
showcomments = true
slug = ""
tags = ["Typescript", "Type challenges", "First of Array", "Length of Tuple", "Exclude" ]
title = "[TypeScript]Type Challenges - First of Array, Length of Tuple, Exclude"
description = "Typescript Challenges 두 번째"
front = true
+++
 
[Type challenges](https://github.com/type-challenges/type-challenges)를 풀이한 내용을 정리했습니다.

# First of Array

- generic에 배열 타입을 넣으면 배열의 첫 번째 요소의 타입을 구현한다.

```ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3
```

**solutions**

```ts
type First<T extends any[]> = T extends [] ? never : T[0];
```

-   generic 타입으로 입력 된 타입을 배열로 제한한다. `extends any[]` ([Generic Constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html))
-   빈 배열이 들어온 경우를 처리한다. T 유형에 \[\] 유형이 할당이 가능한지 체크한다 `T extends []`

# Length of Tuple

-   tuple을 generic으로 넣으면 길이를 타입으로 구현한다.

```ts
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type teslaLength = Length<tesla>  // expected 4
type spaceXLength = Length<spaceX> // expected 5
```

**solutions**

```ts
type Length<T extends readonly any[]> =  T["length"];
```

-   tuple 타입을 선언할 때 각 요소 자리에 다른 타입이 들어갈 수 없으므로 readonly를 수식해준다.
-   배열이 들어와야 하므로, `extends any[]` 로 타입을 제한해준다.
-   T\['length'\] 로 타입의 길이를 가져올 수 있다.

# Exclude

-   Exclude Utility를 구현한다.
-   generic으로 들어온 T 타입 중 U 타입을 제외한 타입을 구현한다.

**solutions**

```ts
type MyExclude<T, U> = T extends U ? never : T;
```

-   타입스크립트에서도 삼항연산자같이 생긴 걸 쓸 수 있다. ([conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#handbook-content))
-   `condition ? trueExpression : falseExpression`
-   `extends`는 왼쪽 유형이 오른쪽에 있는 유형에 할당이 가능한 경우 trueExpression 타입이 할당된다.

## 참고자료

[타입스크립트 공식 문서](https://www.typescriptlang.org/docs/handbook/intro.html)