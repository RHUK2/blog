---
folderName: linux_pm2
title: PM2 프로세스 관리
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
