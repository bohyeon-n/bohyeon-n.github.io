+++
category = TIL
date = "20180805"
title = "프로젝트"
description = "프로젝트 정리"
+++

## 프로젝트 관리 서비스

[github](https://github.com/bohyeon-n/final-project)
![](/img/project-manager.png)

- 기능

  - 프로젝트를 등록할 수 있으며 프로젝트에 해당하는 이슈를 등록할 수 있습니다.

  - 이슈의 상태를 수정할 수 있습니다.

  - 프로젝트 멤버들은 이슈를 열람할 수 있으며 코멘트를 작성 할 수 있습니다.

  - 기한이 임박한 이슈를 볼 수 있는 기능을 재공하였습니다.

- 개발 환경

  - create-react-app
  - axios
  - react context
  - semantic ui

## 블로그 생성 프로그램

[github](https://github.com/bohyeon-n/bohyeon-n.github.io)

- 기능

  - content 안에 폴더를 만들고 마크다운 파일을 넣는다. node hello-world.js 를 실행하면 deploy 폴더 안에 마크다운 파일이 html 파일로 변환되어 생성됩니다.

  - 마크다운 파일 안에서 글에 대한 정보를 넣으면 글의 제목과 날짜 카테고리를 설정할 수 있습니다.

  - 마찬가지로 author.md 에 사용자의 정보를 입력하면 이를 기반으로 about 페이지와 header 를 구성합니다.

- 개발 환경

  - node.js
  - ejs template
  - scss
  - markdown-it
  - highlight.js

파일 구조

```
blog

- index.html
- author
  - author.md
- content

  - folder1
    - hello.md

- deploy

  - category1
    - hello.html
  - author
    - author.html
  - category
    - category1.html

- hello-world.js
```
