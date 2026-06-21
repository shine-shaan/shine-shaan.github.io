---
title: 쿠버네티스 서비스의 외부 노출
excerpt: 노드 IP가 노출된 로컬 쿠버네티스 환경에서 어떻게 각 요청이 쿠버네티스 Cluster IP로 연결될까?
layout: single
category: software
tags:
  - kubernetes
  - network
date: 2026-06-21 12:00:00 +09:00
---

## 클러스터 구성

클러스터는 쿠버네티스 환경을 구성하는 네트워크 중 가장 큰 단위를 말한다.

노드라고 부르는 개별 서버들의 합집합이 클러스터(K8s pool)이며, 쿠버네티스 안에서 실행되는 각 Pod의 자원 총량은 클러스터 자원을 넘을 수 없다.

클러스터는 여러 노드를 연결해 하나의 네트워크를 형성하며, 논리적으로 로컬 네트워크와 같이 각 Pod가 소통할 수 있도록 한다.

예) Service(서비스, svc)라는 개념으로 묶인 Pod 간에 통신할 때, 외부 네트워크라면 고유한 IP 또는 도메인을 이용해 호출해야 하는 과정을 K8s 네트워크 안의 고유한 Service 이름으로 호출할 수 있다.

### Pod

Pod는 K8s 안에서 사용하는 가상 환경 단위이다.

하나의 Pod 당 하나의 가상환경을 가지고, 이미지를 실행한다.

이미지는 docker에서도 사용하는데, 사전 구성된 실행 명령어와 실행 파일을 가진 채 배포할 수 있는 파일을 말한다.

개별 Pod는 고유한 ID를 가지고 클러스터 안에서 실행된다. _{svc name}-{Pod ID}_


### svc

svc는 여러 개의 Pod를 하나의 단위로 묶어 사용할 수 있도록 하는 개념적 집합체다.

svc는 같은 목적으로 실행된 여러 Pod를 논리적으로 포함하며, svc 이름으로 수신된 요청을 하위 Pod들이 자원을 효율적으로 사용할 수 있도록 로드밸런싱 한다.


## 노드 IP와 클러스터 IP

노드 IP는 각 하드웨어가 가지는 외부 IP를 말한다.

다만 K8s 안에서 각 하드웨어 서버를 **노드**라고 부르기 때문에 노드 IP라는 이름으로 표현한다.

Cluster IP는 K8s 네트워크 내의 svc가 가지는 고유한 가상 IP를 말한다. 

이 IP는 노드 IP와는 다르고, 클러스터 내부 자원에 접속하기 위해서 사용한다.

노드 IP만으로는 별도의 포트포워딩 없이 클러스터 내부 자원에 접속할 수 없다.


## 클러스터 내부로 요청 전달

클러스터 내부 자원인 svc 호출을 위해서는 클러스터 IP를 이용한 호출이 필요하다.

다만, 클러스터 IP는 외부 IP가 아니기 때문에 로컬 네트워크가 아닌 환경에서 호출할 때 제약이 생긴다.

이 문제를 해결하기 위해서 외부 IP를 가진 노드를 이용해 요청을 수신하고, 클러스터로 전달하는 과정이 필요하다.

아래 설명되는 iptables를 이용해 노드로 수신된 요청을 클러스터로 전달하게 되는데, PREROUTING 과정을 통해 요청의 목적지가 클러스터 내부 Pod IP로 변환된다.

PREROUTING 과정에서 요청의 목적지가 변환되면, iptables의 FORWARD 과정을 거쳐 Pod로 요청이 전달된다.

### iptables

iptables는 커널 수준에서 사전 정의된 IP로 보내거나 받는 요청을 조율할 수 있다.

iptables는 규칙을 저장해 어떤 IP를 목적지로 하는 요청에 어떤 조율을 할지 정의하며, 실제 요청을 가공하는 작업은 netfilter가 수행한다.

iptables로 지정할 수 있는 규칙은 __[ACCEPT, DROP, REJECT, LOG]__ 등이 있으며, 규칙을 적용하는 대상을 구분하는 종류는 __[PREROUTING, INPUT, FORWARD, OUTPUT, POSTROUTING]__, 작업을 구분하는 종류는 __[filter, nat, mangle, raw]__ 이 있다.

iptables 규칙과 별개로, INPUT 단계에서 호스트로 전달된 요청의 port를 호스트가 허용하지 않는 경우 요청은 거절된다.

````markdown
ACCEPT : 패킷 통과 허용, 요청에 대한 응답 정상 반환
DROP : 패킷 폐기, 송신 클라이언트는 폐기 사실을 모른 채 응답을 대기하게 됨
REJECT : 패킷 거부, 송신 클라이언트는 거부 사실을 반환받음
LOG : 패킷 기록, 별도의 작업 없이 해당 패킷을 syslog에 기록함

PREROUTING : 네트워크 도착 즉시 실행됨, 목적지 주소를 바꾸는 용도로 사용
INPUT : 최종 목적지가 현재 서버인 경우 실행됨, 응답을 변환하거나 송신 클라이언트 필터 등에 사용
FORWARD : 목적지가 현재 서버가 아니며 다른 서버로 전달되는 경우 실행됨, 서버를 거치는 요청을 기록하는 용도에 사용
OUTPUT : 현재 서버에서 바깥 네트워크로 송신되는 요청에 실행됨, IP 블랙리스트 호출을 거절하거나 요청 전송 전 정보를 변환하는 용도에 사용
POSTROUTING : 네트워크 작업이 완료된 후 반환되는 시점에 실행됨, 응답 정보 변환하는 용도에 사용

filter : 패킷 허용, 거부, 폐기 등을 결정
nat : IP, 포트 주소 변환
mangle : 패킷 헤더의 정보 변환
raw : 별다른 작업이 없는 순수 요청
````

iptables로 처리되는 요청은 아래와 같은 순서를 거친다.

````markdown
외부 -> 내부
- raw(PREROUTING) -> mangle(PREROUTING) -> nat(PREROUTING)
  a. mangle(INPUT) -> filter(INPUT) : 현재 서버가 목적지인 경우
  b. mangle(FORWARD) -> filter(FORWARD) -> mangle(POSTROUTING) -> nat(POSTROUTING) : 서버를 거쳐 다른 목적지로 전송하는 경우

내부 -> 외부
- raw(OUTPUT) -> mangle(OUTPUT) -> nat(OUTPUT) -> filter(OUTPUT) -> mangle(POSTROUTING) -> nat(POSTROUTING)
````
