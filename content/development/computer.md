+++
category = Development
comments = true
date = "20180831"
draft = false
showpagemeta = true
showcomments = false
slug = ""

title = "컴퓨터의 작동원리"
description = "컴퓨터의 작동원리"
front = 'true'
+++

# 무엇이 컴퓨터를 컴퓨터로 만들까

모든 컴퓨터는 공통적으로 4 가지를 가지고 있다.

input, storage, processing, output
정보를 입수하고, 정보를 저장하고, 처리한 다음 결과를 출력한다.

프로세서는 메모리에 대한 정보를 취하고, 그것을 조작하거나 변경한다.
사용하는 알고리즘은 일련의 명령일 뿐이다. 그런 다음 프로세스 정보를 보낸다. 다시 메모리에 저장된다.

# 이진수와 데이터

컴퓨터는 1 과 0 으로 동작한다.
wires and circuits carry all the information in a computer

하나의 wire 는 on off / yes no/ true false / 0 1 을 표현할 수 있다.

with more bits you can represent more complex information

32 wires store from 0 to over 4billion

text, images, sounds 는 어떻게 0 과 1 로 변환될까?

- text

A -> 1
B -> 2
C -> 3

- images
  사진은 여러개의 픽셀로 이루어져있고 각각의 픽셀에는 color 가 있으며 이 color 는 숫자로 이루어져 있다.

- sounds
  일련의 vigration 으로 이루어져 있다.

# 회로와 논리

input 을 처리하기 위해서는 input
input process 위해서는 컴퓨터가 입력 signals 를 수정하고 결합해야 한다.

AND MAND XOR OR 회로

소형 컴퓨터가 더 빠른 이유?
회로가 작을수록 전기 신호가 이동해야 하는 거리가 짧다.

# cpu, 메모리, 입출력

입력을 받으면(input) -> 이진수로 저장하고 이 정보를 저장할 메모리가 있다.(중앙처리장치/cpu) 여기서 모든 계산이 완료된다. -> 출력장치는 정보를 받아서 실체 출력으로 변환한다.

키보드 키 B 를 누르면 문자를 이진수로 변환한다.
input B -> 01000010 변환
memory(cpu) the cpu caculates how to display
cpu 는 메모리로부터 단계별 명령을 요청하고, B 를 그리는 법을 알려준다. cpu 가 이 명령을 실행한다. 결과를 픽셀로 메모리에 저장한다.
이진수로 화면에 전송된다.

너무 빨라서 즉각적으로 일어나는 것 처럼 느껴지지만, 각 문자를 표시하려면 컴퓨터가 수천 번 실행된다.

# 하드웨어와 소프트 웨어

중앙처리장치 또는 cpu

math and logic / send and receive

cpu 가 명령을 받는다. 특정 작업을 수행하는 데 사용할 회로를 알려준다.
바이너리 명령은 메모리에 저장되고 cpu 는 순차적으로 그것들을 가져와서 실행한다.

프로그래밍 언어를 사용하면 명령을 입력할 수 있다.

소프트웨어가 cpu 에게 무엇을 해야하는 지 알려준다.

operating system 운영체제
소프트웨어를 관리하는 마스터 프로그램이다.

운영체제는 특별한 능력을 가진 프로그램이다.
컴퓨터의 다른 소프트웨어를 제어할 수 있다.
프로그램을 설치할 수 있고, 프로그램이 언제 실행되는지 결정한다.
중앙처리장치, 해당프로그램 여부, 컴퓨터의 입력 및 출력 장치에 액세스 할 수 있습니다.
프로그램 사이를 빠르게 전환한다.(많은 프로그램이 사용되고 있을 경우)
