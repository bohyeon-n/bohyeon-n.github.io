+++
category = Development
comments = true
date = "20200522"
draft = false
showpagemeta = true
showcomments = true
slug = ""
tags = [ "CORS", "HTTP"]
title = "CORS란? CORS를 해결해보자"
description = "CORS가 무엇인지 알아보고 해결 방법을 찾아보자!"
front = true
+++

프로젝트를 하면서 프론트에서 서버에서 제공한 API로 요청하자, CORS 에러가 발생했다.
지금까지 CORS에러를 해결하기만 하고 정확히 CORS가 무엇이고 어떻게 동작하는지 알지 못했다.        
이번에 CORS가 어떻게 동작하고 CORS 에러를 해결하는 방법을 공부하였고 공부하면서 알게된 내용을 정래해보았다.      

## CORS?

**Cross Origin Resource Sharing**
 
CORS는 한 도메인 또는 Origin의 웹 페이지가 다른 도메인 (도메인 간 요청)을 가진 리소스에 액세스 할 수 있게하는 보안 메커니즘이다.

CORS는 서버와 클라이언트가 정해진 헤더를 통해 서로 요청이나 응답에 반응할지 결정하는 방식으로 **CORS**라는 이름으로 표준화 되었다.
CORS는 최신 브라우저에서 구현된 동일 출처 정책(same-origin policy) 때문에 등장했다.
  
## 동일 출처 정책? 

동일 출처 정책은 동일한 출처의 리소스에만 접근하도록 제한하는 것이다. 
여기서 출처는 프로토콜, 호스트명, 포트가 같다는 것을 의미한다.

`https://naver.com:80`을 예시로 들면, 
`https`는 프로토콜, `naver.com`은 호스트명 `80`은 포트다. 
 
왜 동일한 출처에서만 접근하도록 허용하는 것일까? 
모든 출처를 허용하면 어떻게 될까? 

`https://bank.com` 이라는 도메인 사이트가 있다 이 사이트의 api 주소는 `https://bank.com/api`이다. 사용자가 은행 사이트에서 로그인을 한 후 인증 토큰을 받았다.
그런데 사용자가 로그인한 상태에서 `https://evil.com`사이트에 접속하게 되면, 
`https://evil.com`사이트에서 `https://bank.com/api`로 ajax 요청을 보낼 때 유저가 획득한 인증 토큰이 자동으로 첨부되어 사용자인척하면서 요청을 보낼 수 있게 된다.

이렇게 자동으로 쿠키가 첨부되기 때문에 보안상의 이유로 브라우저는 HTTP 호출을 동일한 출처로 제한했다. 

## 왜 CORS가 생겼을까? 

그럼 왜 CORS가 필요하게 됐을까?   
이전에는 동일한 도메인에서 리소스를 받아왔는데, 지금은 클라이언트에서 도메인이 다른 서버에서 제공하는 API를 사용하는 일이 많아졌다.  
그래서 이전처럼 동일한 도메인간의 요청만 할 수 없어졌고 CORS가 생겼다. 

## CORS는 어떻게 동작할까? 

동일 출처 정책은 브라우저에서 임의로 하는 것이다. 즉 브라우저를 통하지 않고 요청을 보내거나 브라우저에서 동일 출처 정책이 아니라면, 동일 출처가 아니라도 요청을 보내고 응답을 받을 수 있다.
그럼 브라우저에서는 다른 출처로 요청을 보낼 때 어떻게 동작할까? 
 
브라우저는 다른 출처로 요청을 보낼 때 다음과 같은 절차를 거친다. 
우선 다른 출처라도, 다 같은 방식으로 동작하지 않는다. CORS 요청에는 simple request와 preflighted request 두 가지가 있다.   

### Simple request 

simple 요청은 pre-flighted 요청을 보내지 않는다. 

simple 요청은 다음과 같은 과정을 거친다. 

1. 요청을 보낸다. 
2. 브라우저는 Host와 같은 헤더를 추가하는 것 외에도 교차 출처 요청에 대해 Origin Request Header를 자동으로 추가한다. 

```
GET /products/ HTTP/1.1 
Host: api.domain.com 
Origin: https://www.domain.com 
```

3. 서버에서 `Origin` 리퀘스트 헤더를 확인합니다. Origin 값이 허용되면, `Access-Control-Allow-Origin`요청 헤더 Origin 값으로 설정한다. 

```
Http/1.1 200 OK 
Access-Control-Allow-Origin: https://www.domain.com
Content-Type: application/json 
```

4. 응답을 받은 브라우저는 Access-Control-Allow-Origin 헤더가 탭의 출처와 일치하는지 확인한다. Access-Control-Allow-Origin 값이 정확히 출처와 일치하거나, "*" 와일드 카드 연산자를 포함하는 경우 검사가 통과된다. 

 
서버는 요청의 출처의 따라 요청을 허용할 지 결정할 수 있다. 브라우저는 Origin 요청 헤더가 정확하게 설정해야 한다.  

### Preflighted request 

preflighted 요청은 simple request와는 다른 유형의 CORS 요청이다. 브라우저에서 진짜 요청을 보내기 전에 미리 확인 요청을 보낸다. 이 요청은 `OPTIONS` 메소드를 사용한다.  

preflighted 요청은 다음과 같은 과정을 거친다. 

1. ajax 요청을 보낸다. 
```
OPTIONS /products/ HTTP/1.1 
Host: api.domain.com 
Origin: https://www.domain.com
Access-Control-Request-Method: POST 
Access-Control-Request-Headers: Authorization, Content-Type 
```

2. 서버는 허용된 메소드 및 헤더를 지정하여 응답한다. 

```
HTTP/1.1 200 OK 
Access-Control-Allow-Origin: https://www.domain.com
Access-Control-Allow-Method: GET, POST, OPTIONS, PUT
Access-Control-Allow-Headers: Authorization, Content-Type 
Content-Type: application/json 
``` 

3. 헤더와 메소드가 통과되면, 브라우저는 원래 CORS 요청을 보낸다. 

```
POST /products/ HTTP/1.1 
Host: api.domain.com
Authorization: token 
Content-Type: application/json
Origin: https://www.domain.com
```

4. 응답은 Access-Control-Allow-Origin 헤더에 올바른 출처가 있으므로 검사를 통과한다. 


## CORS 에러 해결하기 

지금까지 CORS에 대한 브라우저가 어떻게 동작하는지 알아보았다. 그렇다면, 우리가 클라이언트 개발자나 서버 개발자면 브라우저에게 어떻게 알려줄 수 있을까?  

### 클라이언트에서 해결하기 


1. 웹 브라우저 실행 옵션이나 플러그인을 통한 동일 출처 정책 회피하기 
   - 동일 출처 정책은 브라우저에서 임의로 하는 것이기 때문에 브라우저에서 동일 출처 정책을 사용하지 않으며 된다.   

2. jsonp 방식으로 json 데이터 가져오기
   - 자바스크립트 파일이나 css 파일은 동일 출처 정책에 영향을 받지 않고 가져올 수 있다. 
   - 이를 이용해서 자바스크립트 파일을 가져와서 이를 json 형식으로 파싱해서 데이터를 사용할 수 있다. 
    
    
### 서버에서 해결하기

### 스프링 CORS 

#### @CrossOrigin 어노테이션 사용하기

메소드 레벨 및 글로벌 레벨에서 srping mvc 애플리케이션에서 spring cors를 지원하는 방법이다. 
sprign mvc는 `@CorssOrigin` 어노테이션을 제공한다. 이 어노테이션은 어노테이션이 달린 메소드 또는 타입을 교차 출처를 허용하는 것으로 표시한다. 

기본적으로 `@CrossOrigin`은 모든 출처, 모든 헤더, `@RequestMapping` 주석에 지정된 Http 메소드에 최대 30분을 허용한다.
어노테이션에 속성 값을 넣어 기본 값을 대체할 수 있다. 

속성값을 살펴보면, 

- `origins`
    - 허용된  출처, 이 값은 pre-flight 응답과 실제 응답 모두에 access-control-allow-origin헤더에 배치된다. 
    
- `allowedHeaders`
    - 실제 요청 중에 사용할 수 있는 요청 헤더 목록이다. pre-flight의 응답 헤더인 access-control-allow-header에 값이 사용된다.
           
- `allowCredential`
    - 브라우저가 요청과 관련된 쿠키를 포함해야 되는지 여부를 결정한다.
    - 이 값이 true이면, pre-flight 응답에는 값이 true로 설정된 access-control-allow-credentials 헤더가 포함된다.


```java
@CrossOrigin(origin="*", allowedHeaders = "*")
@Controller 
public class MainController {
	@GetMapping(path = "/")
	public String main(Model model) {
		return "main"; 
	}
}
``` 

#### CorsFilter 사용하기   

서블릿 필터 인터페이스를 이용하여 개발되었다. 웹 서버의 모든 리소스의 요청을 가로채서 Cross domain request인지 체크하여 실제 요청 페이지에 전달하기전에 적절한 CORS 정책과 해더들을 적용한다.

- Access-Control-Allow-Origin
    - 도메인 간 요청을 할 수 있는 권한이 부여된 도메인을 지정한다.
     
- Access-Control-Allow-Credentials
    - 도메인 간 요청에 credential 권한이 있는지 없는지 지정한다.
     
- Access-Control-Expose-Headers
    - 노출하기에 안전한 헤더를 나타낸다.
     
- Access-Control-Max-Age
    - pre-flighted 요청이 얼마만큼의 시간동안 캐시되는지
     
- Access-Control-Allow-Methods
    - 리소스에 접근할 때 메소드가 허용되는지
     
- Access-Control-Allow-Headers
    - 어떤 헤더 필드 네임이 실제 요청에서 사용할 수 있는지 가리킨다.

```java
@Component
public class SimpleCorsFilter implements Filter {

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT, PATCH");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
        chain.doFilter(req, res);
    }

    @Override
    public void init(FilterConfig filterConfig) {
    }

    @Override
    public void destroy() {
    }
}
```

## 정리 

CORS 에러를 클라이언트에서 해결할 수 있는 방법이 있는지 몰랐다. 서버에서만 허용이 가능한 것인줄만 알았는데, 브라우저에서 컨트롤하는 것이었다니! 
정확한 동작 방식을 알고 나니 사용한 코드도 더 잘 이해된다. 🏃🏽‍♀️🏃🏽‍♀️
