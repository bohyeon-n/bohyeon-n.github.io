+++
category = Web
comments = true
date = "20200823"
draft = false
showpagemeta = true
showcomments = true
slug = ""
tags = [ "apache", "client-side-rendering", "react", "404error"]
title = "React앱 Apache로 배포 시 404 에러 해결하기"
description = "React앱 배포 시 새로고침 할 때 404 에러가 오는 이유를 알아보고 해결해보자!"
front = true
+++

리액트 앱을 Apache 서버로 배포하였는데, 시작 페이지가 아닌 다른 url에서 새로고침 시 404 응답을 받았다.

왜 404 에러가 오는지와 이를 해결하는 방법을 정리했다.

---

## 서버사이드 렌더링 vs 클라이언트 사이드 렌더링

왜 에러가 나는지 알기 위해 먼저, 서버사이드 렌더링과 클라이언트 사이드 렌더링에 대해 알아야 한다.

서버 사이드 렌더링은 말 그대로 서버에서 렌더링 작업을 해서 전체 페이지를 내려주는 것이다. http://hoho.com/posts를 요청하면 서버에 있는 posts 자원을 내려준다.

클라이언트 사이드는 비어있는 html과 js 파일들을 받아온 후에 필요한 데이터를 클라이언트에서 렌더링한다.

## 왜 404 응답을 받을까?

리액트는 클라이언트 사이드 렌더링을 한다.
위에서 설명한 것처럼 처음에는 클라이언트에 js 코드가 로드되지 않는다. 따라서 처음에는 리액트 및 리액트 라우터 등을 로드하는 데 필요한 스크립트 태그가 포함된 html 페이지가 반환된다.
그리고 필요한 스크립트 파일을 로드한다. 스크립트가 로드 된 후에 라우팅을 할 수 있게 된다.

스크립트가 로드되지 않은 상태에서 http://hoho.com/posts 요청받으면 서버에 해당 소스를 찾아서 주려고 한다. posts라는 자원은 서버에 없는데, 달라고 하니까 404 에러가 뜨는 것이다.

---

## 해결 방법

이 문제를 해결하는 방법은 서버에 들어오는 요청을 무조건 index.html로 바꾸는 방법이 있다. 서버에 들어오는 요청을 재작성하는 것이다가

클라이언트에서 처리하는 방법과 서버에서 처리하는 방법 두 가지를 알아보았다.

### 클라이언트에서 처리하는 방법

첫 번째 방법은 클라이언트에서 rewrite를 설정하는 것이다.

1. **index.html 파일이 있는 곳에 .htaccess 파일 생성 후 아래와 같이 작성한다.**

```
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

2. **.htaccess 파일 사용을 허용하도록 AllowOverride를 설정한다.**

```
<Directory "/var/www/html">
    ...
    AllowOverride All
    ...
</Directory>
```

### 서버에서 처리하는 방법

두 번째 방법은 서버에서 apache 설정 파일을 수정하는 것이다.

1. **설정 파일에서 rewrite 설정을 해준다.**

```
<Directory "/var/www/html">

	  Options -MultiViews
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.html [QSA,L]

    Require all granted
</Directory>
```

2. **rewrite 모듈을 설치한다.**

```
sudo a2enmod rewrite
```

### 어떤 방법을 사용하면 좋을까?

클라이언트에서 처리하는 방법은 서버 설정 파일을 건드릴 수 있는 경우 사용할 수 있다. 그러나 가능하면 두 번째 방법을 쓰는 것이 좋다고 한다.
서버에서 처리하는 방법이 더 좋은 이유는 두 가지 가 있다.

첫 번째는 성능에 좋지 않다. .htaccess 파일 사용을 허용하도록 AllowOverride를 설정하면, httpd는 모든 디렉토리에서 이 파일을 찾는다. 또한 문서가 요청될 때 마다 .htaccess 파일이 로드된다.

두 번째는 보안문제이다. 사용자(클라이언트가) 서버 구성을 수정하도록 ㅅ허용하면, 이로 인해 제어할 수 있는 변경이 발생할 수 있다.

---

## 참고 자료

[https://httpd.apache.org/docs/current/mod/mod_rewrite.html](https://httpd.apache.org/docs/current/mod/mod_rewrite.html)

[https://gist.github.com/ywwwtseng/63c36ccb58a25a09f7096bbb602ac1de](https://gist.github.com/ywwwtseng/63c36ccb58a25a09f7096bbb602ac1de)

[https://medium.com/infinitbility/deploy-react-application-on-ubuntu-apache-af109bc9d952](https://medium.com/infinitbility/deploy-react-application-on-ubuntu-apache-af109bc9d952)

[https://httpd.apache.org/docs/2.4/en/howto/htaccess.html](https://httpd.apache.org/docs/2.4/en/howto/htaccess.html)
s
