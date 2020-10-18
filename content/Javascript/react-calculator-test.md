+++
category = JavaScript
comments = true
date = "20201018"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = [ "JS", 'REACT', 'TEST']
title = "[REACT]계산기 구현 + 테스트 코드"
description = "[REACT]계산기를 구현하면서 테스트 코드를 짜보자!"
front = true
+++

스택 계산기를 만들면서 테스트 코드 짜는 법을 공부했다.

# 테스트

## 테스트 코드를 짜야 하는 이유는 ?

왜 테스트 코드를 짜야 할까?

궁극적으로는 지속가능한 소프트웨어를 위해서다.

한 부분을 수정할 때, 다른 부분에 영향을 미칠 수 있고, 다른 사람이 내가 짠 코드를 수정하거나 영향을 줄 수 있는데 그 때 마다 일일이 테스트하기가 어렵다.

테스트 코드를 작성해 놓으면, 지속적으로 프로그래밍을 업데이트하는 데 도움이된다.

또한 테스트 코드는 내가 짠 코드를 설명하는 문서? 같은 것이 될 수 있다.

테스트 코드를 짜면서 정리할 수 있다. 테스트를 짜려고 하다보면, 함수를 한 가지 기능만 수행하도록 , 순수함수로 짤 수 있게 되는 것 같다.

## TDD ?

Test Driven Development 로 개발 후 테스트 코드를 작성하는 것이 아니라, 먼저 테스트 코드를 작성 후 이 테스트 코드를 충족하기 위해 함수를 구현하는 것이다.

테스트 코드 작성 → fail → 함수 구현 → pass → refactoring의 과정을 거친다.

## Jest 설치

- jest 설치하기

`npm install --save-dev jest`

- package.json에 추가

```jsx
{
	"scripts": {
		"test": "jest"
	}
}
```

`file.js`, 와 테스트 파일인 `file.test.js`

을 작성해서 `npm run test` 를 실행해주면 된다.

### Jest create-react-app 테스트

create react app 을 사용하면, jest 모듈이 설치되어 있다.

rendering snapshots 를 위해서 `react-test-render` 모듈만 설치해주면 된다.

`npm install --dev react-test-renderer`

## Unit 테스트

계산기 로직은 TDD로 테스트 코드를 먼저 작성하고, 함수를 구현했고,

UI 관련 부분은 아직 익숙치 않아서 먼저 코드 작성 후 테스트 코드를 작성했다.

### Stack Calculator 구현

#### 표현식 string을 받아서 배열로 파싱하는 함수

- test code 구현

```js
test('문자열을 표현식으로 쪼개기 테스트', () => {
  expect(splitedExpression('1.2+2.2')).toEqual(['1.2', '+', '2.2'])
})
```

- test code 실패

- 구현

```js
export const splitedExpression = expression => {
  let preValue = null
  const splitedExpression = []
  expression.split('').forEach(value => {
    if (
      value === '.' ||
      preValue === '.' ||
      (!isNaN(Number(value)) && preValue !== null && !isNaN(Number(preValue)))
    ) {
      splitedExpression[splitedExpression.length - 1] += value
    } else {
      splitedExpression.push(value)
    }
    preValue = value
  })

  return splitedExpression
}
```

- 테스트 코드 통과

#### 후위 표기법으로 변환하기

```js
test('후위 표기법 테스트', () => {
  expect(
    toPostfix(['(', '1', '+', '2', ')', '*', '(', '1', '+', '2', ')'])
  ).toEqual(['1', '2', '+', '1', '2', '+', '*'])
})
```

```js
export const toPostfix = expression => {
  const operationOrder = {
    '+': 2,
    '-': 2,
    '/': 3,
    '*': 3,
    '(': 1,
    ')': 1
  }

  const stack = []
  const result = []

  for (let i = 0; i < expression.length; i++) {
    let lastStack = stack[stack.length - 1]
    const key = expression[i]

    if (key === '(') {
      stack.push(key)
      continue
    }

    if (key === ')') {
      while (true) {
        if (lastStack === '(') {
          stack.pop()
          break
        }
        result.push(stack.pop())
        lastStack = stack[stack.length - 1]
      }
      continue
    }

    if (key in operationOrder) {
      if (!lastStack) {
        stack.push(key)
      } else {
        if (operationOrder[key] <= operationOrder[lastStack]) {
          result.push(stack.pop())
          stack.push(key)
        } else {
          stack.push(key)
        }
      }
    } else {
      result.push(key)
    }
  }
  return [...result, ...stack]
}
```

### 후위 표기법 계산하기

```js
test('후위 표기법 계산 테스트', () => {
  expect(calcPostfix(['1', '2', '+', '1', '2', '+', '*'])).toBe(9)
})
```

```js
export const calcPostfix = expression => {
  const stack = []

  for (let i = 0; i < expression.length; i++) {
    let n1
    let n2
    switch (expression[i]) {
      case '+':
        stack.push(parseFloat((stack.pop() + stack.pop()).toFixed()))
        break
      case '-':
        n1 = stack.pop()
        n2 = stack.pop()
        stack.push(parseFloat((n2 - n1).toFixed(2)))
        break
      case '*':
        stack.push(parseFloat((stack.pop() * stack.pop()).toFixed(2)))
        break
      case '/':
        n1 = stack.pop()
        n2 = stack.pop()
        stack.push(parseFloat((n2 / n1).toFixed(2)))
        break
      default:
        stack.push(parseFloat(expression[i]))
    }
  }

  return stack.pop()
}
```

## Dom 테스트

react-testing-library Enzyme 또는 리액트의 TestUtils 를 사용할 수 있다.

react-testing-library 를 사용하기로 했다.

설치하기 위해서 `npm install --dev @testing-library/react` 를 실행해준다. cra 를 사용하면 모듈이 설치되어 있다.

```jsx
import React from 'react'
import {
  cleanup,
  fireEvent,
  render,
  waitForElement
} from '@testing-library/react'

import App from './App'

afterEach(cleanup)

it('App.js: 계산기가 노출된다.', () => {
  const { queryByText } = render(<App />)
  expect(queryByText('계산기')).toBeInTheDocument()
})
```

```jsx
import React from 'react'
import { cleanup, render } from '@testing-library/react'

import App from './App'

afterEach(cleanup)

it('App.js: 계산기 제목이 노출된다.', () => {
  const { queryByText } = render(<App />)
  expect(queryByText('계산기')).toBeInTheDocument()
})
```

## 이벤트 핸들러 테스트

```jsx
import Calculator from './Calculator'
import React from 'react'
import { fireEvent, render } from '@testing-library/react'

it('Calculator.js: button을 click하면 클릭한 데이터가 노출된다.', () => {
  const { getByText, getByTestId } = render(<Calculator />)
  fireEvent.click(getByText('1'))

  const result = getByTestId('result')
  expect(result.innerHTML).toBe('1')
})
```

result에 있는 text를 선택해야 하는데, getByTestId를 사용했다.

1을 누르면, result에 1이 나오는지 확인하는 테스트

## 비동기 테스트

'loading user' 버튼 클릭 시 api 요청 보내서, 받은 데이터로 UI 업데이트해준다.

```jsx
import React, { useState } from 'react'
import './App.css'
import Calculator from './containers/Calculator'

function App() {
  const [username, setUsername] = useState('')

  const fetchData = async () => {
    const response = await fetch(
      `https://e6e2c81c-c22b-48cf-9e42-fd4cfd887b17.mock.pstmn.io/username`
    )

    const data = await response.json()

    setUsername(data.username)
  }

  const onClickBtn = () => {
    fetchData()
  }

  return (
    <div className="App">
      <h1>계산기</h1>
      <button onClick={e => onClickBtn()}>loading user</button>
      <div>{username}</div>
      <Calculator />
    </div>
  )
}

export default App
```

```jsx
it('App.js: button을 click하면 사용자 이름이 노출된다.', async () => {
  //given
  const result = {
    username: 'stranger'
  }

  //when
  const { getByText } = render(<App />)
  fireEvent.click(getByText('loading user'))

  //then
  await waitForElement(() => getByText(result.username))
})
```

## 모든 파일 테스트하기

정의한 모든 테스트 파일을 테스트하고 싶으면, test 실행 스크립트를 수정해준다.

```jsx
{
	"test": "react-scripts test --watchAll"
}
```

## 마치며

spring 프레임워크 사용할 때 TDD를 하니, 오히려 더 빨리 개발할 수 있다는 사실을 알게 되었는데

UI 테스트는 아직 그런 생각이 잘 안든다. 제대로 사용해보지 않아서 그런 것 같기도 하다.😂

## 참고 자료

[https://create-react-app.dev/docs/running-tests/](https://create-react-app.dev/docs/running-tests/)

[https://jestjs.io/docs/en/getting-started](https://jestjs.io/docs/en/getting-started)

[https://velog.io/@velopert/react-testing-library](https://velog.io/@velopert/react-testing-library)

[https://testing-library.com/docs/react-testing-library/cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet)
