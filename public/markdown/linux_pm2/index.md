---
folderName: linux_pm2
title: PM2
tag: linux
isPublished: true
---

# PM2 프로세스 관리

- [PM2 개요](#pm2-개요)
- [주요 명령어](#주요-명령어)
- [클러스터 모드(Cluster Mode)](#클러스터-모드cluster-mode)
- [무중단 배포](#무중단-배포)
- [설정 파일(ecosystem.config.js)](#설정-파일ecosystemconfigjs)
- [로그 관리](#로그-관리)
- [시스템 시작 시 자동 실행](#시스템-시작-시-자동-실행)
- [nohup vs PM2](#nohup-vs-pm2)
- [백그라운드 프로세스 vs 데몬 프로세스](#백그라운드-프로세스-vs-데몬-프로세스)

## PM2 개요

PM2(Process Manager 2)는 Node.js 애플리케이션을 위한 프로세스 관리 도구다.

- 애플리케이션이 예기치 않게 종료되면 자동으로 재시작함.
- 클러스터 모드를 통해 멀티 코어 CPU를 활용한 수평 확장이 가능함.
- 프로세스 상태 모니터링, 로그 관리, 무중단 배포 기능을 제공함.

```sh
npm install -g pm2
```

## 주요 명령어

```sh
pm2 start app.js             # 애플리케이션 실행
pm2 start app.js --name api  # 이름을 지정하여 실행
pm2 list                     # 실행 중인 프로세스 목록 확인
pm2 show api                 # 특정 프로세스 상세 정보 확인
pm2 stop api                 # 프로세스 정지
pm2 restart api              # 프로세스 재시작 (다운타임 발생)
pm2 reload api               # 프로세스 무중단 재시작
pm2 delete api               # 프로세스 목록에서 제거
pm2 monit                    # 실시간 CPU/메모리 모니터링
```

## 클러스터 모드(Cluster Mode)

Node.js는 단일 스레드로 동작하므로 기본적으로 하나의 CPU 코어만 사용한다. 클러스터 모드는 Node.js 내장 `cluster` 모듈을 활용하여 CPU 코어 수만큼 프로세스를 생성함.

```sh
pm2 start app.js -i max  # CPU 코어 수만큼 인스턴스 생성
pm2 start app.js -i 4    # 4개의 인스턴스 생성
pm2 scale api 8          # 실행 중인 프로세스를 8개로 조정
```

- 각 인스턴스는 독립된 프로세스로 실행되며 PM2가 로드 밸런싱을 담당함.
- 인스턴스 간 메모리는 공유되지 않으므로 상태 공유가 필요한 경우 Redis 등 외부 저장소를 사용해야 함.

## 무중단 배포

서버 애플리케이션은 코드 변경 시 프로세스 재시작이 필수적이다.

| 명령어 | 동작 방식 | 다운타임 |
| --- | --- | --- |
| `pm2 restart` | 모든 프로세스를 즉시 종료 후 재시작 | 발생 |
| `pm2 reload` | 프로세스를 하나씩 순차적으로 교체 | 없음 |

`reload`는 클러스터 모드에서만 완전한 무중단이 보장된다. fork 모드에서는 `restart`와 동일하게 동작함.

## 설정 파일(ecosystem.config.js)

여러 환경(개발/운영)이나 여러 애플리케이션을 코드로 관리할 때 사용하는 설정 파일이다.

```js
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'api',
      script: './dist/server.js',
      instances: 'max',      // 클러스터 모드
      exec_mode: 'cluster',
      watch: false,
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 8080,
      },
    },
  ],
}
```

```sh
pm2 start ecosystem.config.js                   # 기본 환경으로 실행
pm2 start ecosystem.config.js --env production  # 운영 환경으로 실행
```

## 로그 관리

PM2는 각 프로세스의 표준 출력과 에러 로그를 파일로 저장함.

```sh
pm2 logs              # 전체 프로세스 로그 실시간 확인
pm2 logs api          # 특정 프로세스 로그 확인
pm2 logs --lines 100  # 최근 100줄 출력
pm2 flush             # 저장된 로그 파일 초기화
```

- 기본 로그 경로: `~/.pm2/logs/{name}-out.log`(표준 출력), `~/.pm2/logs/{name}-error.log`(에러).
- `ecosystem.config.js`에서 `log_file`, `error_file` 옵션으로 경로를 변경할 수 있음.
- 로그 로테이션이 필요한 경우 `pm2-logrotate` 모듈을 사용함.

```sh
pm2 install pm2-logrotate
```

## 시스템 시작 시 자동 실행

서버 재부팅 후에도 PM2가 자동으로 시작되도록 설정한다.

```sh
pm2 startup   # 현재 OS에 맞는 자동 실행 명령어 출력 및 등록
pm2 save      # 현재 실행 중인 프로세스 목록을 저장
pm2 resurrect # 저장된 프로세스 목록을 복원
```

`pm2 startup` 실행 후 출력되는 명령어를 복사하여 실행하면 OS의 init 시스템(systemd 등)에 PM2가 등록됨.

## nohup vs PM2

`nohup`은 터미널 세션이 종료되어도 프로세스를 계속 실행하도록 보장하는 유닉스 명령어다. 별도의 데몬이나 관리자 없이 간단하게 사용할 수 있지만, 프로세스 관리 기능은 거의 없다.

```sh
nohup node app.js &
# 출력은 nohup.out 파일에 기록됨
# 종료 시 PID를 직접 찾아 kill 해야 함
```

| 기능 | `nohup` | PM2 |
| --- | --- | --- |
| 프로세스 재시작 | 불가능 (수동 재실행) | 가능 (자동 재시작, 크래시 복구) |
| 로그 관리 | `nohup.out`에 단순 저장 | 파일 분리/모니터링/로테이션 |
| 상태 모니터링 | 없음 (수동 `ps` 사용) | `pm2 list`, `pm2 monit` 등 |
| 재부팅 후 유지 | 불가능 | `pm2 startup`으로 설정 가능 |
| 리소스 사용 | 매우 적음 | PM2 데몬이 추가 리소스 사용 |
| 클러스터/로드밸런싱 | 없음 | 지원 |

단순히 터미널을 닫아도 프로세스를 유지하고 싶을 때는 `nohup`이 적합하다. Node.js 서버처럼 지속적인 운영과 모니터링이 필요한 경우에는 PM2가 적합하다.

## 백그라운드 프로세스 vs 데몬 프로세스

두 개념 모두 사용자 인터페이스와 직접 연관되지 않는다는 점에서 유사해 보이지만, 터미널과의 관계에서 차이가 있다.

백그라운드 프로세스(Background Process):

- 명령어 끝에 `&`를 붙여 실행하는 방식으로, 터미널 세션과 연결된 상태로 동작함.
- 터미널이 닫히면 함께 종료된다.

```sh
node app.js &
```

데몬 프로세스(Daemon Process):

- 부모 프로세스(터미널)와 완전히 분리되어 독립적으로 동작하는 프로세스다.
- 시스템 부팅 시 시작되거나 특정 서비스가 필요할 때 시작되며, 시스템 종료 시까지 유지됨.
- 관례적으로 이름 끝에 `d`를 붙임 (`sshd`, `httpd`, `crond` 등).

| 구분 | 백그라운드 프로세스 | 데몬 프로세스 |
| --- | --- | --- |
| 터미널 연결 | 연결됨 | 완전히 분리됨 |
| 시작 방식 | 사용자 명령으로 직접 시작 | 시스템 부팅 시 자동 시작 |
| 종료 조건 | 터미널 세션 종료 시 함께 종료 | 시스템 종료 또는 명시적 종료 시만 종료 |
| 목적 | 배치 작업, 스크립트 실행 | 웹 서버, 네트워크 서비스 등 지속 서비스 |

모든 데몬은 백그라운드에서 실행되지만, 모든 백그라운드 프로세스가 데몬 프로세스는 아니다. PM2는 데몬 방식으로 동작하므로 터미널과의 연결 없이도 프로세스를 지속적으로 관리한다.
