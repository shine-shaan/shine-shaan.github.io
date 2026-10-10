---
title: nginx 재시작을 위한 두 가지 방법
excerpt: nginx 재시작 시 편리함을 위한 방법, 무중단을 위한 방법을 소개한다.
layout: single
category: software
tags:
  - nginx
  - process
date: 2026-10-10 12:00:00 +09:00
---

## nginx 기능

nginx는 주로 정적 파일을 서버에서 반환하기 위한 용도, 서버의 특정 로컬 경로와 외부 접속 경로를 라우팅하는 용도로 사용한다.

nginx를 이용해 특정 경로 별 반환하는 컨텐츠를 구분하거나 도메인 별 컨텐츠 구분 등 기능을 구현할 수 있다.

일반적으로 nginx를 이용한 라우팅은 http, https를 지원하며 각각 지정 포트 80, 443을 기본으로 사용한다.

## systemd를 이용한 자동 실행 예약

nginx의 기능이 외부 접속에 대한 최초 컨텐츠 반환이므로, 대부분의 서비스에서 nginx 장애는 서비스 표시 불가 또는 통신 단절 등의 치명적인 문제로 이어진다.

systemd의 재시작 조건을 활성하면 nginx가 오류로 종료되는 등 상황에서 신속하게 프로세스를 다시 실행해 서비스 장애 시간을 최소화 할 수 있다.

```
# systemd에 등록된 서비스 예시

## 서비스에 대한 설명과 다른 systemd 서비스 또는 커널 상태와 연관된 실행 순서
[Unit]
Description=My Custom Application Service
After=network.target ## 사전 실행되어야 하는 서비스 (만약 이 서비스가 도커 컨테이너를 실행한다면, docker 가 사전 실행되어야 함)

## 서비스의 실행 유형과 실행 권한, 실행 명령어, 재시작 조
[Service]
Type=forking ## simple, forking
PIDFile=/run/nginx.pid
User=root
WorkingDirectory=/path/to/nginx
ExecStart=/usr/sbin/nginx
ExecStop=/usr/sbin/nginx -s quit
Restart=on-failure ## on-failure, always

## 서버 부팅 시 실행하기 위한 조건
[Install]
WantedBy=multi-user.target ## 일반적 부팅 환경은 multi-user (접속 시 유저 이름과 비밀번호 입력 환경)
```

## nginx를 재시작하는 경우

nginx config를 변경하거나, nginx 버전 변경 등의 동작을 위해 사용자가 수동으로 nginx를 재시작 하는 경우가 있다.

nginx config 변경은 nginx -s reload 명령어로 수행할 수 있다.

```
# nginx 명령어를 이용한 관리

nginx -s stop ## nginx 프로세스 즉시 종료
nginx -s quit ## nginx 프로세스를 현재 수행중인 요청 반환 후 종료
nginx -s reload ## nginx config 등 설정파일 다시 적용
nginx -s reopen ## nginx log 파일을 다시 열어 작성 (로그 초기화)

```

nginx 명령어로 수행할 수 없는 nginx 버전 변경 등 상황에서는 직접 프로세스를 재시작하는 방법을 사용한다.

### systemd에 등록된 정보로 재시작

nginx 서비스가 systemd에 등록되어 있는 경우 한 줄의 명령어로 nginx를 재시작 할 수 있다.

```
# 자동 재실행 방법
systemctl restart nginx ## 자동으로 서비스 종료 후 시작

# 단계별 실행 방법
systemctl stop nginx ## 서비스 종료 (systemd에 등록한 서비스 명세 중 'ExecStop' 명령이 실행됨, 해당 구문이 없다면 프로세스 kill이 실행됨)
systemctl start nginx ## 서비스 시작 (systemd에 등록한 서비스 명세 중 'ExecStart' 명령이 실행됨)
```

### process kill을 이용한 복제 프로세스 실행 후 이전 프로세스 종료로 재시작

nginx 서비스를 위의 systemd를 이용해 재실행하는 경우 프로세스가 종료된 뒤 실행되어 요청을 처리할 수 있는 상태가 되기까지 외부 요청에 응답할 수 없는 중단 시간이 발생한다.

서비스의 중단 시간이 치명적인 경우 무중단 프로세스 교체 방식을 사용한다.

이 방식은 nginx 내부에 구현된 커스텀 kill signal을 이용하며, 기존 실행된 프로세스 외에 병렬로 새로운 프로세스 실행 후 상태가 정상인 경우 기존 프로세스를 종료한다.

프로세스가 동시에 2개 존재하는 상태에서는 외부 요청이 분산되어 각 프로세스가 처리하며, 기존 프로세스 종료 시 새로운 프로세스에 모든 요청이 전달되므로 서비스 중단이 발생하지 않는다.

```
# 기존 실행중인 nginx의 마스터 프로세스 id를 알고 있어야 함
# 기존 실행중인 프로세스와 동일한 config를 가진 새로운 프로세스를 실행하므로 별도 설정 변경이 필요하지 않다.
# 만약 nginx 실행 파일을 변경하는 경우 kill 명령 실행 이전에 새로운 실행파일을 기존 실행파일 위치로 대치해야 한다.

kill -USR2 <old PID> # 새로운 실행파일을 기존 프로세스와 함께 실행 (기존 설정 적용), 기존 프로세스와 새로운 프로세스가 함께 트래픽을 처리
## ps 명령으로 nginx 마스터 프로세스가 기존에 알고 있는 <old PID> 외에 추가로 실행된 것을 확인해야 함

kill -WINCH <old PID> # 기존 프로세스 중단, 새로운 프로세스만 트래픽 처리 (마스터 프로세스는 실행중이지만, 요청을 처리하는 워커 프로세스가 종료되어 요청을 처리할 수 없는 상태가 됨)
## ps 명령으로 <old PID> 를 가리키는 워커 프로세스가 0개가 되고, 새로운 프로세스를 가리키는 워커 프로세스만 실행중인 것을 확인해야 함

kill -QUIT <old PID> # 기존 프로세스 종료, 새로운 프로세스만 남게 됨 (기존 프로세스는 현재 처리중인 요청 반환 후 종료)
## ps 명령으로 새로운 프로세스만 실행중인 것을 확인해야 함

## 실행파일 변경으로 nginx 버전이 바뀐 경우, /proc/<new PID>/fd/0 -v 실행
## 실행 결과로 출력되는 nginx 버전이 의도한 것과 동일한 경우 성공, 이전 버전으로 출력된다면 실행 파일 위치를 다시 확인 후 앞선 작업 재실행

```

앞선 작업을 실행하는 중 오류가 발생해 작업 이전 상태로 복구하는 경우 아래 명령을 사용한다.

```
kill -HUP <old PID>
ps -ef |grep nginx # old PID 동작 확인 (master, worker 모두 동작해야 함)
kil -WINCH <new PID>
kill -QUIT <new PID>

```
