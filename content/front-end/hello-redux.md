+++
category = font-end
comments = true
date = "20201219"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags="flux, mvc, redux, store, reducer, action"
title = "Redux 알아보기"
description = "리덕스가 나오게 된 배경을 알아보고 리덕스가 무엇인지 알아본다"
front = 'true'
+++

리덕스가 나오게 된 배경과 리덕스가 무엇인지 정리한 글입니다.

# 리덕스란?

`A predictable state container for js app`

리덕스는 상태 관리 라이브러리로 일관되게 작동하고 다양한 환경에서 실행되며 테스트하기 쉬운 앱을 작성할 수 있도록 도와준다.

리덕스는 앱의 상태를 한 곳에서 관리함으로써 redo/undo, 상태 지속 등의 기능을 구현할 수 있다.

## 리덕스가 나오게 된 배경?

페이스북에서 MVC 패턴으로 데이터 흐름을 관리하기가 어려워지자, flux 아키텍처라는 패턴을 개발했다.

### MVC(Model-View-Controller) 패턴?

![mvc pattern](https://media.geeksforgeeks.org/wp-content/uploads/MVC-Design-Pattern.png)

출처 - [geeksforgeeks](https://www.geeksforgeeks.org/mvc-design-pattern/)

MVC 패턴의 세 가지 구성 요소를 알아보면,

- model: 앱 도메인의 동작과 데이터를 관리한다.
- view: model을 UI로 표현한다.
- controller: 사용자의 입력을 받아 model을 조작하고, 뷰를 업데이트한다.

위 그림에서는 간단해 보이지만, view와 model이 많아지면, 복잡해진다.

![mvc pattern](https://blog.kakaocdn.net/dn/ALrHe/btqBTMSuHfN/ZlW9i9ET34e90APgCRChk1/img.png)

출처 - [beomy.tistory](https://beomy.tistory.com/44)

view와 model이 서로 의존성을 가지고 있으므로, 데이터와 화면이 복잡하게 되면 controller에 복잡하게 연결될 수 있다.

데이터의 흐름이 양방향으로 흐르기 때문에 하나의 코드를 수정하면, 다른 부분에도 영향을 미칠 수 있고 디버깅하기도 어렵다.

이러한 문제를 해결하기 위해서 flux 패턴이 등장한다.

## flux?

![flux](https://facebook.github.io/flux/img/overview/flux-simple-f8-diagram-explained-1300w.png)

출처 - [facebook](https://facebook.github.io/flux/docs/in-depth-overview/)

flux는 페이스북에서 클라이언트 사이드 웹 앱을 개발할 때 사용한 아키텍쳐다.

단방향 데이터 흐름을 활용하며, flux 앱의 주요 개념은 dispatcher, store, view 이다.

flux 패턴의 대략적인 흐름은

`action이 발생 -> dispatcher로 store가 전달 -> store가 변경 -> view 변경`

MVC 패턴에서는 model이 업데이트가되면, view가 따라서 업데이트가 되고, 업데이트가 된 view는 다시 다른 model이나 view를 업데이트할 수 있다.

flux 패턴은 view가 변경된다고 해서, store가 변경되지 않고 action, dispatcher를 사용해야만 store 데이터를 변경할 수 있다. 스토어 외에는 도메인의 데이터를 관리하는 방법은 없다.

스토어의 상태를 직접 set하는 세터는 없지만, dispatcher에 등록하는 콜백을 가지고 있으므로 이를 통해 상태를 업데이트할 수 있다.

redux는 flux 아키텍처를 구현하기 위해서 만든 라이브러리로, flux와는 조금 다르다.

## redux?

redux는 액션이라는 이벤트를 사용하여 앱의 상태를 관리하고 업데이트하기 위한 패턴 및 라이브러리이다. 상태가 예측 가능한 방식으로만 업데이트될 수 있도록 보장하고, 전체 앱에서 사용해야 하는 상태에 대한 저장소 역할을 한다.

### redux의 구성 요소

redux의 주요 구성 요소인 store, reducer, action에 대해서 알아보고 간단하게 사용해보자.

#### store

store는 리덕스에서 제공하는 함수인 creatStore를 호출한 결괏값이다. store는 action, reducer, middleware, reducer를 합치는 역할을 한다.

createStore는 첫 번째 인자로 리듀서를 받는다. 필요하다면, 초기 state를 createStore에 전달할 수 있다. 서버사이드 렌더링, state preloading을 할 때 초기 값을 두 번째 인자로 줄 수 있다.

```js
import { createStore } from 'redux'

import rootReducer from '../reducers/index'

const store = createStore(rootReducer)

export default store
```

#### reducer

`리덕스의 상태는 reducer로부터 온다!`

리듀서는 앱의 상태를 생산한다. 리듀서는 자바스크립트 함수로, current state와 action을 받아 새로운 상태 반환한다.

flux와 redux의 다른 점 중 하나는 비즈니스 로직을 redux는 reducer에서 처리하고, flux는 store에서 처리한다는 것이다.

상태가 어떻게 바뀌는지 확인할 때 flux에서는 모든 action은 dispatcher로 전달되므로, dispatcher로 디버깅할 수 있고, redux에서는 하나의 스토어에서 상태가 관리되기 때문에 스토어에서 디버깅할 수 있다.

#### action

액션은 무슨 일이 일어났는지 설명하는 자바스크립트 객체다. 모든 변경 사항이 action으로 설명되도록 하면, 앱에서 진행되는 작업을 명확하게 이해할 수 있다.

state와 action을 연결하기 위해서는 reducer 함수를 작성해야 한다.

먼저 액션 객체 예시를 살펴보면 아래와 같다.

```js

{

type: 'ADD_TODO',

payload: {title: '리덕스 공부하기', id: 1}

}

```

action객체를 직접 사용하여 상태 추가 메서드를 구현해도 되지만, 추상화하여 함수로 만들 수 있다.

```js
export function addTodo(paylod) {
  return {
    tyupe: 'ADD_TODO',

    payload
  }
}
```

이렇게 모든 작업을 함수 내에서 래핑하면 객체 생성을 추상화하면, 외부에서는 어떻게 addTodo가 되는지 모르고 상태를 업데이트할 수 있다.

액션이 전달되면, 스토어는 메시지를 리듀서에게 전달한다.

액션 타입에 따라서 리듀서는 다음 상태를 생성하고 결국 action payload를 새 상태로 병합한다.

```js
const initialState = {
  todos: []
}

function rootReducer(state = initialState, action) {
  if (action.type === 'ADD_TODO') {
    return Object.assign({}, state, {
      todos: state.todos.concat(action.payload)
    })
  }
}
```

상태 객체가 불변성을 유지할 수 있도록 assign 함수를 사용하여 새 상태로 병합한다.

## redux store method

redux 라이브러리에서 가장 중요한 메서드 3가지가 있다.

- getState: 앱의 현재 상태를 가져오는 메서드
- dispatch: action을 보내는 역할을 하는 메서드
- subscribes: 상태 변화를 구독하기 위한 메서드

getState 메서드는 현재 store 객체를 반환하다. subscribe는 state변화를 구독하며, action이 전달될 때 마다 실행할 콜백을 받는다.

액션을 전달하기 위해서 dispatch 메서드를 호출한다.

예를 들어, 사용자가 action을 하면, 이 action 객체가 dispatch 메서드로 전달되고, dispatch 메서드는 reducer에 state와 action을 전달받아 새로운 상태를 만들어 state를 업데이트한다.

dsipatch 메서드는 변경된 사항을 subscribe 메서드에 전달하고, subscribe메서드에 등록된 콜백, 예를 들어 UI를 업데이트 하는 메서드를 실행한다. 렌더 메서드에서 새로운 상태를 getState 메서드를 사용하여 가져와서 변경된 상태를 화면에 렌더할 수 있다.

```js
store.subscribe(() => console.log('상태 업데이트'))

store.dispatch(addTodo({ title: '리덕스 공부', id: 1 }))
```

## 리덕스의 세 가지 원칙

리덕스는 세 가지 기본 원칙으로 설명할 수 있다.

### single source of truth

리덕스는 앱의 모든 상태를 하나의 스토어 안에서 하나의 객체 트리 구조로 저장한다.

이렇게 하면, 서버의 상태를 직렬화하고

### state is read-only

앱의 상태를 변경하고 싶을 떄 어떤 변화인지 설명하는 action 액션이라는 개념을 사용한다.

모든 state의 변경이 중앙 집중화되고 순서대로 하나씩 발생하기 때문에, 경쟁 조건이 없다. 만약 이전 값을 읽고 상태를 업데이트할 때 동시에 state를 set해줄 수 없으므로, 순서대로 업데이트될 수 있다.

state는 단순한 객체이므로 디버깅, 테스트 목적으로 재생할 수 있고 직렬화하여 서버에 저장하는 등의 작업을 하기가 쉽다.

### change are made with pure function

state 트리가 action에 의해 어떻게 업데이트되는지 지정하려면, reducer를 작성하여 state와 action을 묶을 수 있다.

리듀서는 이전 상태와 액션을 취하고 다음 상태를 반환하는 순수 함수이다. 이전 상태를 변경하는 대신 새 상태 객체를 반환해야 한다.

처음에는 단일 리듀서로 시작하지만 앱이 커지면 하나의 리듀서만 사용할 수 없으므로 작은 함수로 만들어 관리할 수 있다. 여러 개의 리듀서를 사용하여 하나의 store state를 만든다.

```js
function todoApp(state = {}, action) {
  return {
    todos: todos(state.todos, action),

    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  }
}
```

작은 함수로 만든 것들은 위처럼 해당 키에 대해 두 리듀서를 호출하여 앱의 전체 상태를 관리하는 또 다른 리듀서를 (todoApp)을 작성할 수 있다.

이러한 컨셉들을 구현하기 위한 다양한 유틸리티를 리덕스에서 제공한다.

## 마치며

리덕스가 나온 배경과 어떤 흐름을 거쳐 상태를 관리하는지 알아보았다.

리덕스의 컨셉을 알고 난 뒤에 이를 구현하기 위해 리덕스가 제공하는 다양한 유틸들의 사용법을 알아보면 좋을 것 같아서 정리해보았다. 리덕스의 자세한 사용법은 더 공부해봐야겠다. 👻

## 참고 자료

https://facebook.github.io/flux/docs/in-depth-overview/#:~:text=Flux%20is%20the%20application%20architecture,a%20lot%20of%20new%20code.

https://codepen.io/OneCent/pen/geyQZN

https://www.clariontech.com/blog/mvc-vs-flux-vs-redux-the-real-differences

https://www.valentinog.com/blog/redux/

http://bestalign.github.io/2015/10/06/cartoon-guide-to-flux/

https://haruair.github.io/flux/docs/todo-list.html
