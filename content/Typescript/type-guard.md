# Narrwoing

`padLeft`라는 함수가 있다고 한다면,

```ts
function padLeft(padding: number | string, input: string): string {
  throw new Error('Not implements yet!');
}
```

padding이 number라면, input에 추가하려는 공백수로 처리한다. padding이 string이면,
input에 패딩을 추가하기만 하면 된다.

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

타입스크립트의 타입 시스템이 타입 안정성을 얻기 위해 뒤로 구부리지 않고 가능한 한 쉽게 일반적인 자바스크립트 코드를 작성할 수 있도록 하는 것을 목표로 한다고 생각한다.

타입스크립트가 정적 타입을 사용하여 런타임 값을 분석하는 방법과 매우 유사하게 이는 모든 해당 타입에 영향을 미칠 수 있는 if/else, 조건문 삼항, 루프,truthniess 체 등과 같은 javascript 런타임 제어 흐름 구성에 대한 타입 분석을 오버레이 한다.

if check 내에서 타입스크립트는 typeof padding === 'number' 를 보고 이를 타입 가드라고 하는 특수한 형태의 코드로 이해한다.
타입스크립트는 우리 프로그램이 주어진 위치에서 가장 구체적은 값 타입을 분석하기 위해 취할 수 있는 가능한 실행 경로를 따른다.

이러한 특수 검사 및 할당을 살펴보고 타입을 선언된 것보다 더 구체적인 유형으로 정제하는 프로세스를 narrowing이라고 한다.
많은 editor에서 이러한 타입이 변경될 때 이를 관찰할 수 있으며 예제에서도 그렇게 할 것이다.

## typeof type guards

자바스크립트 런타임에 값의 타입에 대한 매우 기본적인 정보를 제공할 수 잇는 typeof 연산자를 지원한다.

타입스크립트는 이것이 특정 문자열 집합을 반환할 것으로 예상한다.

padLeft에서 보았듯이 이 연산자는 많음 자바스크립트 라이브러리에서 자주 등장하며 typescript는 이를 다른 분기의 narrow type으로 이해할 수 있다.

타입스크립트에서, typeof 에 의해 반환된 값에 대해 검사하는 것은 타입 가드이다.

타입스크립트는 tyoeof가 다른 값에서 작동하는 방식을 인코딩하기 때문에 javascript의 몇 가지 단점을 알고 있다.

예를들어 위의 목록에서 typeof는 문자열 null을 반환하지 않는다. 다음 예를 확인해보자.

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

printAll 함수에서 우리는 strs가 객체인지 확인하여 배열 유형인지 확인하려고 한다.
그러나 자바스크립트에서 typeof null은 실제로 '객체'이다.
타입스크립트는 str이 string[] 대신 string[] | null로 narrowed 할 수 있다.

## Truthiness narrowing

자바스크립트에서는 조건문, && s, || s, if 문, Boolean negations(!) 등에 모든 표현식을 사용할 수 있다. if문은 조건이 항상 부울 유형을 가질 것으로 예상하지 않는다.

```ts
function getUserOnlineMessamberge(numUserOnline: number) {
  if (numUsersOnline) {
    return `There are ${numUserOnlne} online now!`;
  }
  return `Nobody's here. :(`;
}
```

- 0
- NaN
- " "
- null
- 0n (the bigint version of zero)
- undefined

모두 false로 강제 변환되고 다른 값은 true로 강제 변환된다.
Boolean 함수를 통해 실행하거나 더 짧은 이중 부울 부정을 사용하여 항상 값을 부울로 강제 변환할 수 있다.
후자는 타입스크립트가 좁은 리터럴 부울 현상을 true로 유지하는 반면 첫 번째는 부울 유형으로 유추한다는 이점이 있다.

특히 null 또는 undefined와 같은 값에 대한 보호를 위해 이 동작을 활용하는 것이 매우 일반적이다.

```ts
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === 'object') {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === 'string') {
    console.log(strs);
  }
}
```

타입스크립트는 종종 초기에 버그를 잡는 데 도움이 되지만 값으로 아무것도 하지 않기로 선택하면 지나치게 규범적이지 않으면서 할 수 있는 일이 너무 많습니다.

## type predicates

지금까지 narrowing을 처리하기 위해 기존 Javadcript 구조로 작업했다.
그러나 때로는 코드 전체에서 타입이 변경되는 방식을 직접적으로 제어하고 싶을 때가 있다.

user-defined type guard 를 정의하려면 반환 타입이 type predicate인 함수를 정의하기만 하면 된다.

트루시로 좁히는 것에 대한 마지막 단어는 부울 부정이 ! 부정 분기에서 걸러낸다.

```ts
function multiplyAll(
  values: numbers [] | undefined;
  factor: number
): number [] | undefiend {
  if(!values) {
    return values;
  } else {
    return values.map((x) => x * factor);
  }
}
```

## Equality narrowing

```ts
function printAll(strs: string | string[] | null) {
  if (strs !== null) {
    if (typeof strs === 'object') {
      for (const s of strs) {
      }
    } else if (typeof strs === 'string') {
      console.log(strs);
    }
  }
}
```

null or indefined 인지 체크
a == null
null 인지 체크
a === null

## The in operator narrowing

자바스크립트에는 객체에 이름이 있는 속성이 잇는지 확인하는 연산자인 in 연산자가 있다.
타입스크립트는 타입을 좁히는 걸로 이것을 고려한다.

"value" in x value는 string literal 그리고 x는 union type이다.

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

value가 다른 value의 'instance'인지 확인하는 연산자가 있다.
x instanceof Foo는 x의 프로토타입 체인에 Foo.prototype이 포함되어 있는지 확인한다.

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

변수 할당할 때 변수의 오른쪽을 보고 적당히 할당해준다.

```ts
let x = Math.random() < 0.5 ? 10 : 'hello word!';

x = 1;

x = 'goodbye!';
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

타입스크립트는 이 코드를 분석하여 padding이 숫자인 경우 본문의 나머지 부분에 도달할 수 없음을 확인할 수 있다.

결과적으로 나머지 함수에 대해 패딩 타입에서 숫자를 제거할 수 있다.
string | number 에서 string으로 축소

도달 가능성을 기반으로 하는 이러한 코드 분석을 제어 흐름 분석이라고 하며 타입스크립트는 이 흐름 분석을 사용하여 타입 가드 및 할당이 발생할 때 타입을 좁힌다.

## using type predicates

```ts
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

`pet is Fish`는 이 예에서 type predicate이다. (type 술어?)
여기서 predicate는 parameterName is type 형식이다.
parameterName은 현재 함수 시그니처의 매개변수 이름이어야 한다.

isFish가 어떤 변수와 함께 호출될 때 마다 typescript는 원래 타입이 호환되는 경우 해당 변수를 특정 타입으로 좁힌다.

```ts
let pet = getSmallPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```

타입스크립트는 if 브랜치에서 pet is Fish 라는 것을 알고 있을뿐만 아니라, else 브랜치에서, Fish가 없으므로 Bird가 있어야 한다는 것을 알고
있다.

type guard isFish를 사용하여 Fish | Bird 및 Fish 배열을 획득할 수 있다.

```ts
const zoo: (Fish | Bird) [] [getSmallPet(), getSmallPet(), getSmallPet()];

const underWater1: Fish[] = zoo.filter(isFish);
// or, equivalently
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];

// the predicate may need repeating for more complex examples
const underWater3: Fish[] = zoo.filter(pet): pet is Fish => {
  if(pet.name === 'sharkey") return false;
  return isFish(pet);
}
```

타입 assertion vs casting

캐스팅이란 말은 실행 시간에 어떤 동작이 일어날 것임을 내포하기 때문이다.
하지만 타입 assertion은 순순하게 컴파일 시간 구성물이고 당신의 코드가 어떤 식으로 분석되길 원하는지 컴파일러에게 힌트를 제공하는 수단이다.

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

```ts
function getArea(shape: Shape) {
  return Math.PI * shape.radius ** 2;

  // Object is possibly 'undefined'
}
```

```ts
function getArea(shape: Shape) {
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2;
  }
}
```

타입 검사기보다 더 많은 정보를 우리가 알고 있는 상황이 됐다.
타입 체커에게 우리가 알고 있는 정보를 전달해야 한다.

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

여기에서는 Shape를 두 개의 타입으로 나눴다.
그러나 radius, sideLength가 필수 속성으로 선언되어 있다.

```ts

function getArea(shape: Shape) {
  return Math.PI * shape.radius ** 2;
  // Property 'radius' does not exist on type 'Shape'.
  // Property 'radius' does not exist on type 'Square'.
}
```


