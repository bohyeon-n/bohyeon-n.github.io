+++
category = Typescript
comments = true
date = "20220709"
draft = false
showpagemeta = true
showcomments = true
slug = ""
tags = ["Typescript", "type narrowing" ]
title = "[TypeScripT]타입 좁히기"
description = "타입스크립트에서 타입 좁히기!"
front = true
+++
# Narrwoing

`padLeft`라는 함수가 있다고 한다면,

```ts
function padLeft(padding: number | string, input: string): string {
  throw new Error('Not implements yet!');
}
```

- padding이 number =>  input에 추가하려는 공백수로 처리
- padding이 string이면 => input에 패딩을 추가

```ts
function padLeft(padding: number | string, input: string) {
  return ' '.repeat(padding) + input;
}
```

이렇게 하면 숫자를 넣으라고 경고가 뜬다.
즉 패딩이 먼저 숫자인지 명시적으로 확인하지 않았고 문자열인 경우도 처리하지 않았다.

```ts
function padLeft(padding: number | string, input: string) {
  if (typeof padding === 'number') {
    return ' '.repeat(padding) + input;
  }
  return padding + input;
}
```

- 타입스크립트의 타입 시스템은 타입 안정성을 얻기 위해 뒤로 구부리지 않고(?) 가능한 한 쉽게 일반적인 자바스크립트 코드를 작성할 수 있도록 하는 것을 목표로 한다고 생각한다.

- 타입스크립트가 정적 타입을 사용하여 런타임 값을 분석하는 방법과 매우 유사하게 이는 모든 해당 타입에 영향을 미칠 수 있는 if/else, 조건문 삼항, 루프, truthniess 등과 같은 javascript(동적 타입 언어) 런타임 제어 흐름 구성에 대한 타입 분석을 오버레이 한다.

- if check 내에서 타입스크립트는 typeof padding === 'number' 를 보고 이를 타입 가드라고 하는 특수한 형태의 코드로 이해한다.
- 타입스크립트는 우리 프로그램이 주어진 위치에서 가장 구체적은 값 타입을 분석하기 위해 취할 수 있는 가능한 실행 경로를 따른다.

- 이러한 특수 검사 및 할당을 살펴보고 타입을 선언된 것보다 더 구체적인 유형으로 정제하는 프로세스를 narrowing이라고 한다.
- 많은 editor에서 이러한 타입이 변경될 때 이를 관찰할 수 있으며 예제에서도 그렇게 할 것이다.

## typeof type guards

- 자바스크립트는 런타임에 값의 타입에 대한 매우 기본적인 정보를 제공할 수 있는 typeof 연산자를 지원한다.

- 타입스크립트는 이것이 특정 문자열 집합을 반환할 것으로 예상한다.

- padLeft에서 보았듯이 이 연산자는 자바스크립트 라이브러리에서 자주 등장하며 typescript는 이를 다른 분기의 narrow type으로 이해할 수 있다.

- 타입스크립트에서, typeof에 의해 반환된 값에 대해 검사하는 것은 타입 가드이다.

- 타입스크립트는 tyoeof가 다른 값에서 작동하는 방식을 인코딩하기 때문에 javascript의 몇 가지 단점을 알고 있다.

- 예를들어 위의 목록에서 typeof는 문자열 null을 반환하지 않는다. 다음 예를 확인해보자.

```ts
function printAll(strs: string | string[] | null) {
  if (typeof strs === 'object') {
    for (const s of strs) {
      // Error Object is possibly 'null'.
      console.log(s);
    }
  } else if (typeof strs === 'string') {
    console.log(strs);
  } else {
    // do nothing;
  }
}
```

- printAll 함수에서 우리는 strs가 객체인지 확인하여 배열 유형인지 확인하려고 한다.
- 그러나 자바스크립트에서 typeof null은 실제로 '객체'이기 때문에 null과 string[] 타입을 객체인지, 아닌지로는 구분할 수 없음
- 타입스크립트는 위 처럼 함수를 만들었을 때, str이 string[] 대신 string[] | null로 narrowed 할 수 있다.
- 그런데 이렇게 자바스크립트에서는 typeof 로 타입을 좁힐 때 예상하지 않은 결과가 나올 수 있으므로, boolean, string, number, symbol 값들만 typeof 를 사용하는 것이 좋다.

## Truthiness narrowing

- 자바스크립트에서는 조건문, && s, || s, if 문, Boolean negations(!) 등에 모든 표현식을 사용할 수 있다. 
- if문은 조건이 항상 Boolean 타입을 가질 것으로 예상하지 않는다.

```ts
function getUserOnlineMessamberge(numUserOnline: number) {
  if (numUsersOnline) {
    return `There are ${numUserOnlne} online now!`;
  }
  return `Nobody's here. :(`;
}
```

```
- 0
- NaN
- " "
- null
- 0n (the bigint version of zero)
- undefined
```

- 모두 false로 강제 변환되고 다른 값은 true로 강제 변환된다.
- Boolean 함수를 통해 실행하거나 더 짧은 이중 부울 부정을 사용하여 항상 값을 부울로 강제 변환할 수 있다.
- 후자는 타입스크립트가 좁은 리터럴 부울 현상을 true로 유지하는 반면 첫 번째는 부울 유형으로 유추한다는 이점이 있다.
- 특히 null 또는 undefined와 같은 값에 대한 보호를 위해 이 동작을 활용하는 것이 매우 일반적이다.

```ts
function printAll(strs: string | string[] | null) {
   // strs가 참인지 확인하여 null일 때 object 타입으로 들어가지 않도록 함.
  if (strs && typeof strs === 'object') {
    for (const s of strs) { //null이 들어가게 되면 null is not iterable 에러가 발생
      console.log(s);
    }
  } else if (typeof strs === 'string') {
    console.log(strs);
  }
}
```

truthiness로 좁히는 것에 대한 마지막 단어는 부울 부정이 ! 부정 분기에서 걸러낸다.

```ts
function multiplyAll(
  values: numbers [] | undefined;
  factor: number
): number [] | undefiend {
  if(!values) { // 여기서 undefined 걸러냄
    return values;
  } else {
    return values.map((x) => x * factor);
  }
}
```

## Equality narrowing

- 타입스크립트틑 타입을 좁히기 위해 ===, !==, == 및 != 와 같은 switch 문과 equlity 도 체크합니다. 예를 들어서, 

```ts
function printAll(strs: string | string[] | null) {
  if (strs !== null) {
    // string | string []
    if (typeof strs === 'object') {
      // string[]
      for (const s of strs) {
      }
    } else if (typeof strs === 'string') {
      // string
      console.log(strs);
    }
  }
}
```
## The in operator narrowing

- 자바스크립트에는 객체에 이름이 있는 속성이 있는지 확인하는 연산자인 in 연산자가 있다.
- 타입스크립트는 타입을 좁힐 때 in 연산자를 사용할 수 있다.

- "value" in x 
- : value는  string literal 그리고 x는 union type을 쓴다.

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ('swim' in animal) {
    return animal.swim();
  }
  return animal.fly();
}
```

## instanceof narrowing

- value가 다른 value의 'instance'인지 확인하는 연산자가 있다.
- x instanceof Foo는 x의 프로토타입 체인에 Foo.prototype이 포함되어 있는지 확인한다.

```ts
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
  } else {
    console.log(x.toUpperCase());
  }
}
```

## Assignments

- 변수 할당할 때 변수의 오른쪽을 보고 알아서 할당해준다.

```ts
let x = Math.random() < 0.5 ? 10 : 'hello word!';
// let x: string | number;
x = 1;
// let x: number;
x = 'goodbye!';
// let x: string;
```

## Control flow analysis

```ts
function padLeft(padding: number | string, input: string) {
  if (typeof padding === 'number') {
    return ' '.repeat(padding) + input;
  }
  return padding + left;
}
```

- 타입스크립트는 이 코드를 분석하여 padding이 숫자인 경우 본문의 나머지 부분에 도달할 수 없음을 확인할 수 있다.
- 결과적으로 나머지 함수에 코드에 대해 패딩 타입에서 숫자를 제거할 수 있다.
- string | number 에서 string으로 축소

- 도달 가능성을 기반으로 하는 이러한 코드 분석을 **제어 흐름 분석**이라고 하며 
- 타입스크립트는 이 흐름 분석을 사용하여 타입 가드 및 할당이 발생할 때 타입을 좁힌다.

## using type predicates

```ts
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

- `pet is Fish`는 이 예에서 타입 단언이다.
- parameterName is type 형식이다.
- parameterName은 현재 함수 시그니처의 매개변수 이름이어야 한다.

- isFish가 어떤 변수와 함께 호출될 때 마다 typescript는 원래 타입이 호환되는 경우 해당 변수를 특정 타입으로 좁힌다.

```ts
let pet = getSmallPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```

- 타입스크립트는 if 브랜치에서 pet is Fish 라는 것을 알고 있을뿐만 아니라, 
- else 브랜치에서, Fish가 없으므로 Bird가 있어야 한다는 것을 알고 있다.

- type guard isFish를 사용하여 Fish | Bird 및 Fish 배열을 획득할 수 있다.

```ts
const zoo: (Fish | Bird) [] [getSmallPet(), getSmallPet(), getSmallPet()];

const underWater1: Fish[] = zoo.filter(isFish);
// or, equivalently
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];

// the predicate may need repeating for more complex examples
const underWater3: Fish[] = zoo.filter(pet): pet is Fish => {
  if(pet.name === "sharkey") return false;
  return isFish(pet);
}
```

- 타입 assertion vs casting
  - 캐스팅이란 말은 실행 시간에 어떤 동작이 일어날 것임을 내포한다.
  - 하지만 타입 assertion은 순순하게 컴파일 시간 구성물이고 
  - 당신의 코드가 어떤 식으로 분석되길 원하는지 컴파일러에게 힌트를 제공하는 수단이다.
  - : 캐스팅은 실제로 타입을 바꿈, assertion은 분석되길 원하는 타입을 제공
## Discriminated unions

```ts
interface Shape {
  kind: 'circle' | 'square';
  radius?: number;
  sideLength?: number;
}
```

string 대신 union 타입을 사용하면 철자 오류를 피할 수 있다.

```ts
function handleShape(shape: Shape) {
  if (shape.kind === 'rect') {
    // always false
  }
}
```
- circle 이나 square을 처리하는지 여부에 따라 올바른 논리를 적용하는 getArea 함수를 작성할 수 있다. 

- circle 처리하기 

```ts
function getArea(shape: Shape) {
  return Math.PI * shape.radius ** 2;
  // Object is possibly 'undefined'
}
```
- strictNullChecks 
  - strictNullChecks가 false이면 null 및 undefined가 언어에서 무시된다. 
  - 이로 인해 런타임에 예기치 않은 오류가 발생할 수 있다. 

```ts
function getArea(shape: Shape) {
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2;
  }
}
```
- 이렇게 작성하면 circle 일 때 shapre.radius 가 넘어온다는 전제하에 작성한 것이기 때문에
- 타입 검사기보다 더 많은 정보를 우리가 알고 있는 상황이 된다.
- 타입 체커에게 우리가 알고 있는 정보를 전달해야 한다.

```ts
interface Circle {
  kind: 'circle';
  radius: number;
}
interface Square {
  kind: 'square';
  sideLength: number;
}

type Shape = Circle | Square;
```

- 여기에서는 Shape를 두 개의 타입으로 나눴다.
- 그러나 radius, sideLength가 필수 속성으로 선언되어 있다. => 우리가 알고 있는 정보를 타입 체커도 알게 됨.

```ts
function getArea(shape: Shape) {
  return Math.PI * shape.radius ** 2;
  // Property 'radius' does not exist on type 'Shape'.
  // Property 'radius' does not exist on type 'Square'.
}
```

```ts 
function getArea(shape: Shape) {
  switch(shape.kine) {
    case 'circle': 
      return Math.PI * shape.radius ** 2;
    case 'square': 
      return shape.sideLength ** 2;
  }
}
```

## The never type 

- 타입을 좁힐 때 모든 가능성을 제거하고 아무것도 남지 않은 지점까지 union options를 줄일 수 있다. 
- 경우에 따라 타입스크립트는 never 타입을 사용하여 존재해서는 안 되는 상태를 나타낸다. 

## Exhaustiveness checking 

- Never 타입은 모든 타입에 할당할 수 있다. 그러나 Never에 할당할 수 있는 타입은 없다. 
- 타입을 좁히고 switch 문에서 철저한 검사를 하기 위해 never이 나타나지 않는 것에 의존한다.

- 에를 들어 Shape를 할당하려고 하는 getArea 함수에 기본값을 추가하면 가능한 모든 경우가 처리되지 않은 경우 발생하지 않는다. 

```ts **
type Shape = Circle | Square;

function getArea(shape: Shape) {
  switch(shape.kind) {
    case 'circle': 
      return Math.PI * shape.radius ** 2;
    case 'square': 
      return shape.sideLength ** 2;
    default: 
      const _exhaustiveCheck: never = shape;
      return _exhausitiveCheck;
  }
}
```
- Shape union 에 새로운 멤버를 추가하면 Type error가 발생한다. 
  - : Triangle is not assignable to type 'never'

- 그럼 타입을 좁힐 때 까지 좁히고, 나머지 타입들을 never 로 할당해 두면, union에 새 멤버가 추가 되었을 때 타입에러가 나서 에러를 찾을 수 있게 된다! 


## 참고 자료 

https://www.typescriptlang.org/docs/handbook/2/narrowing.html 

