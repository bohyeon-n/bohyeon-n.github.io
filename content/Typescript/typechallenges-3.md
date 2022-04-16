+++
category = Typescript
comments = true
date = "20220417"
draft = false
showpagemeta = true
showcomments = true
slug = ""
tags = ["Typescript", "Type challenges" ]
title = "[TypeScript]Type Challenges - Awaited, If, Concat"
description = "Typescript Challenges 세 번째"
front = true
+++

[Type challenges](https://github.com/type-challenges/type-challenges)를 풀이한 내용을 정리했습니다.

## Awaited 

이렇게 `Promise<ExampleType>` 처럼 Promise와 같이 래핑된 타입이 있는 경우, 래핑된 타입 내부에 있는 타입을 어떻게 가져올 수 있을까? 

```ts
type MyAwaited = any
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
]

// @ts-expect-error
type error = MyAwaited<number>
```

**solution** 


```ts
type MyAwaited<T extends Promise<any>> = T extends Promise<infer K> ? K : never
```

- 일단 Promise만 제네릭 타입으로 받아야 하므로 `T extends Promise<any>` Promise 로 한정해준다.
- 제약 조건에 따라 값을 받은 다음에 Promise 안에 있는 값을 찾는다.
- `infer`은 

## If 

조건 C를 받아서 truthy면 T 타입 리턴, falsy면 F 반환한다. C는 true나 false 타입이어야 한다. 

```ts
type If<C, T, F> = any


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<If<true, 'a', 'b'>, 'a'>>,
  Expect<Equal<If<false, 'a', 2>, 2>>,
]

// @ts-expect-error
type error = If<null, 'a', 'b'>
```

**solution** 

```ts
type If<C extends boolean, T, F> = C extends true ? T : F;
```

- C 타입은 boolean으로 제한하고 
- C가 true이면 T 타입, 아니면 F 타입 반환.

##  Concat 

type system에서 자바스크립트의 Array.concat을 구현한다.

```ts
type Concat<T, U> = any


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Concat<[], []>, []>>,
  Expect<Equal<Concat<[], [1]>, [1]>>,
  Expect<Equal<Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Concat<['1', 2, '3'], [false, boolean, '4']>, ['1', 2, '3', false, boolean, '4']>>,
]

```

**solution** 

```ts
type Concat<T extends any[], U extends any[]> = [...T, ...U]
```

- T와 U타입을 array 타입으로 제한 
- spread operator를 사용 


## Infer? 

infer에 대해서 더 알아보자. 

- `infer` 키워드는 조건부 타입을 보완하며 extends 절 외부에서 사용할 수 없다. 
- `infer`를 사용하면 제약 조건 내에서 참조하거나 반환할 변수를 정의할 수 있다. 

타입스크립트의 내장 타입인 ReturnType을 보면, function 타입을 받아서 리턴 타입을 준다. 

```ts
type a = ReturnType<() => void> // void
type b = ReturnType<() => string | number> //string | number 
type c = ReturnType<() => any> // any
```

- ReturnType은 먼저 type 인수가 Function 타입으로 제한한다. 
- 그리고 체크하는 과정에서 반환 타입을 변수로 만들고 infer R 하고 성공하면 반환한다.

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

 ### infer use cases 

- infer 키워드는 unwrapping type으로 설명된다.

- function의 첫 번째 인자 

```ts
type GetFirstArgumentOfAnyFunction<T> = T extends (
  first: infer FirstArgument, 
  ...args: any[]
) => any 
  ? FirstArgument 
  : never

type T = GetFirstArgumentOfAnyFunction<(name: string, age: number) => void> // string 
```

- array type 

```ts
type ArrayType<T> = T extends (infer Item)[] ? Item : T

type T = ArrayType<[string, number]> // string | number 
```

infer 키워드는 third-party 타입스크립트 코드를 사용할 때 타입을 unwrap하고, 저장할 수 있는 강력한 도구다.
## 참고 자료 

https://blog.logrocket.com/understanding-infer-typescript/ 
