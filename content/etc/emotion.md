# emotion 

emotion 문서를 읽어보자.

## css Props 

className prop을 허용하는 모든 component 또는 element는 css prop도 사용할 수 있다.
css prop에 제공된 스타일이 평가되고 계산된 클래스 이름이 className prop에 적용된다.

### Object styles 

```jsx
import { jsx } from '@emotion/react'
render(
 <div
    css={{
      backgroundColor: 'hotpink',
      '&:hover': {
        color: 'lightgreen'
      }
    }}
  >
    This has a hotpink background.
  </div>
)
```

### string styles 

string style를 전달하려면, @emotion/react에서 내보낸 css 를 사용해야 한다.

```jsx
render(
  <div
    css={css`
      background-color: hotpink;
      &:hover {
        color: ${color};
      }
    `}
  >
    This has a hotpink background.
  </div>
)
```
## styled components 

- chaning based on props 

```jsx
const Conatiner = styled.div(props => ({
  display: flex;
  flexDifection: props.column && 'column'
}))
```

### 렌더링되는 tag를 바꾸는 withComponent 

```jsx 
const Section = styled.section``
const Aside = Section.withComponent('aside')
```

### 다른 emotion 컴포넌트 타겟팅 

```jsx 
const Child = styled.div``
const Parent = styled.div`
  ${Child} {
    ...
  } 
`
```

- object style 

```jsx 
const Child = styled.div({
  color: 'red'
})

const Parent = styled.div({
  [child]: {
    color: 'green'
  }
})
```
```jsx
const H1 = styled.h1(
  {
    fontSize: 20
  }, 
  props => ({color: props.color})
)
```

#### composing dynamic styles 

```jsx 
const dinamicStyle = props => css`
  color: ${props.color};
`

cosnt Container = styled.div` 
 ${dynamicStyle}
`

render(
  <Container color='lightgreen'/>  
)
```

## Composition 

- 다른 style block의 css에서 반환된 값을 다른 style block에 적용할 수 있다.

```jsx
const base = css`
  color: hotpink;
`

render(
  <div
    css={css`
      ${base};
      background-color: #eee;
    `}
  >
    This is hotpink.
  </div>
)
```

- 일반 css를 사용하면 여러 class name을 사용하여 스타일을 함께 구성할 수 있지만, 정의되는 순서가 적용되는 순서이기 때문에 제한적이다.
- [casecade rules](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#the_cascade)

