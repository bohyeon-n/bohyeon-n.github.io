+++
category = Typescript
comments = true
date = "20220319"
draft = false
showpagemeta = true
showcomments = true
slug = ""
tags = ["Typescript", "Type challenges", "pick", "Radonly", "Tuple of Object" ]
title = "[TypeScript]Type Challenges - Pick, Readonly, Tuple of Object"
description = "TypeScript Challenges를 시작합니다."
front = true
+++

타입스크립트를 잘 써보고 싶기도 하고 재밌어 보여서 [type-challenges](https://github.com/type-challenges/type-challenges)를 시작했습니다.  
이번 글에서는 type challenges easy 단계인 Pick, Readonly, Tuple of Object 과제를 풀어보고 정리해보았습니다 ~ 

# Pick 구현하기

-   Pick<T, K>

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPrevidew = MyPick<Todo, 'title' | 'completed'>
const todo: TodoPrivew = {
  title: 'Celan room', 
  completed: false,
}
```

**solution**

```ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

-   `<T, K extends keyof T>`
    -   어떤 타입을 받아오고, K라는 것은 T 타입에 있는 키들을 상속한 것들이다.
    -   항상 Pick 을 할 때는 기존 T에 있는 키를 써야 함
-   전달된 K들에 한해서만 빙글빙글 돌면서 타입 지정 매핑

# Readonly 구현하기

-   Readonly

```ts
interface Todo {
  title: string
  description: string
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar"
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
```

**solution**

```ts
type MyReadonly<T> = {
 readonly [P in keyof T]: T[P]
}
```

-   P는 T타입의 모든 키들 중에 하나다.
    -   \[P in keyof T\]
-   Index Type
    -   T\[P\] Index Type 인덱스를 기준으로 타입을 결정할 수 있다.

# Tuple of Object

```ts
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

**solution**

```ts
type TupleToObject<T extends readonly any[]> = {
  [P in T[number]] : P
}
```

```ts
type tuple = readonly ['tesla', 'model 3', 'model X', 'model Y']
```

-   readonly 키워드를 명시적으로 수식한 이유는 어떤 인덱스에 어떤 자료가 들어있는지 기술한 것과 같아서 readonly와 마찬가지다.
-   즉 tuple 타입인 값을 선언할 때 해당 자리에 다른 값이 들어갈 수 없게 된다.

```ts
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
```

-   문제처럼 `as const` 를 써주면 값 정의도하고, tuple 타입을 가져올 수도 있다.
-   이렇게 정의한 튜플 타입의 값은 몇 가지 고유한 성질을 가진다.
    1.  Array 인터페이스를 만족한다.
    2.  인덱스 타입도 불변이며, 컴파일러가 그 정확한 값을 기억하고 있다.
-   T\[number\] 이렇게 배열 요소의 타입을 참조할 수 있다.

```ts
// indexed Access Types 

const MyArray = [
  {name: 'Alice', age: 15}, 
  {name: 'Bob', age: 23},
  {name: 'Eve', age: 38}, 
]

type Person = typeof MyArray[number];
type Age = typeof MyArray[number]['age'];

type Age2 = Person['age'];
```

## Mapped Type?

-   Mppaed 타입을 더 알아보자면...
-   이미 선언된 타입의 프로퍼티에서 새로운 타입을 만드는 것(Pick, Readonly..)

```ts
type OnlyBoolsAndHores = {
  [key: string]: boolean | Horse
}
```

매핑된 타입은 PropertyKey(keyof를 통해서 생성되는)의 조합을 사용하여 키를 통해 타입을 반복적으로 생성하는 제너릭 타입이다.

```ts

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
}
```

```ts
type CreateMutable<Type> = {
  - readonly [Property in keyof Type]: Type[Property];
}

type LockedAccount = {
  readonly id: string;
  readonly name: string;
}

type UnlockedAccount = createMutable<LockedAccount>;
```

optional 속성을 제거할 수도 있다.

```ts
type Concrete<Type> = {
  [Property in kyeof Type]-?: Type[Property];
}
```

# 회고

회사에서 유지보수나 단순 리팩터링 작업만 하고 있어서 딱히 타입을 복잡하게 사용할 일이 별로 없었다.  
하지만 나는 잘 모르기 때문에... 내가 잘 몰라서 안 쓰는 건지 쓸 필요가 없어서 안 쓰는 건지 잘 모른다... 이제부터 알아봐야지...ㅎ  
문제는 Easy 단계인데 어려웠다. Readonly나 Pick 같은 건 이전에 한번 해본 적이 있어서 괜찮았는데 마지막 문제는 너무 어려웠다.  
나는 모르는게 너무 많구나...😇

# 참고자료

[https://blog.cometkim.kr/posts/typescript-tuples/](https://blog.cometkim.kr/posts/typescript-tuples/)

[https://www.typescriptlang.org/ko/docs/handbook/2/mapped-types.html#key-remapping-via-as](https://www.typescriptlang.org/ko/docs/handbook/2/mapped-types.html#key-remapping-via-as)

[https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)