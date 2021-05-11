스프링 프레임워크의 특징을 알아보자

스프링 프레임워크의 특징 IOC, AOP 를 알아본다.

# IOC

Inversion of Control의 약자로 제어의 역전

제어의 역전이란 무엇일까?

일반적으로 지금까지 프로그램은 객체 결정 및 생성 -> 의존성 객체 생성 -> 객체 내의 메소드를 호출하는 작업을 반복했다. 

이는 각 객체들이 프로그램의 흐름을 결정하고 각 객체를 구성하는 작업에 직접적으로 참여한 것이다. 

모든 작업을 사용자가 제어하는 구조이다. 

IOC 원칙. 
IOC 는 의존성 주입 dependency injection(DI)라고도 알려져있다. 


# AOP

AOP Aspect Oriented Programming이란 관점 지향 프로그래밍이다.

OOP는 객체지향 원칙에 따라 관심사가 같은 데이터를 한 곳에 모아 분리하고 낮은 결합도를 갖게 하며 독립적이고 유연한 모듈로 캡슐화하는 것을 일컫는다. 

하지만 이러한 과정 중 중복된 코드들이 많아지고 가독성, 확장성, 유지보수성을 떨어 뜨린다. 
이러한 문제를 보안하기 위해 나온 것이 AOP이다. 

AOP에서는 핵심 기능과 공통 기능을 분리시켜 핵심 로직에 영향을 끼치지 않게 공통 기능을 끼워 넣는 개발형태이며, 이렇게 개발함에 따라 무분별하게 중복되는 코드를 한 곳에 모아 중복되는 코드를 제거할 수 있어지고 공통 기능을 한 곳에 보관함으로써 공통 기능 하나의 수정으로 모든 핵심 기능들의 공통 기능을 수정할 수 있어 효율적이 유지보수가 가능하며 재활용성이 극대화된다. 
