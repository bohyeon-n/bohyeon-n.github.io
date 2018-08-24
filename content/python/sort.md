+++
category = Python
comments = true
date = "20180824"
draft = false
showpagemeta = true
showcomments = false
slug = ""
tags = [ "Python"]
title = "Sorting in Python "
description = "Sorting in Python"
front = true
+++

## Sorting in Python

### sorting function

1. `list.sort()`

- list 에서만 사용할 수 있다.
- `None` 반환한다. in-place 로 입력 리스트 내부에서 정렬이 이루어진다.
- original list 가 필요하지 않다면, sorted 보다 sort 를 쓰는 것이 좀 더 효율적이다.

2. `sorted(any iteralble)`

- iterable 자료 구조형에 모두 사용할 수 있다.
- sorted 된 새로운 리스트를 반환한다.

`list.sort()` 와 `sorted()`는 _key_ 라는 매개변수로 sort 하기 전에 각 요소에 대해 호출 할 함수를 지정할 수 있다.

```py
student_tuples = [
    ('john', 'A', 15),
    ('jane', 'B', 12),
    ('dave', 'C', 10),
]
sorted(student_tuples, key=lambda student: student[2])

# 나이로 sort 하기  [('dave', 'B', 10), ('jane', 'B', 12), ('john', 'A', 15)]
```

#### 내림차순 정렬

reverse default value False

```py
sorted(student_tuples, key=lambda student: student[2], reverse=True)
# 내림차순 정렬 [('john', 'A', 15), ('jane', 'B', 12), ('dave', 'C', 10)]
```

### 람다 사용하기

람다는 한 줄로 함수를 작성하는 방법이다. 식 형태로 되어 있다고 해서 람다 표현식이라고 부른다.
람다는 함수를 간편하게 작성할 수 있어서 다른 함수의 인수로 (map, reduce, filter ... )넣을 때 주로 사용한다.

fruites 리스트 재정렬하기

`apple` 이면 리스트 앞으로 정렬하기

```py
fruites = ['apple', 'banana', 'orange','apple']
fruites.sort(key=lambda fruite : 0 if fruite == 'apple' else 1 )
print(fruites)
# ['apple', 'apple', 'banana', 'orange']
```

참고자료

[Python Documentation/ Sorting How To](https://docs.python.org/3/howto/sorting.html)
