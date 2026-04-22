---
folderName: linux_docker
title: Docker
tag: linux
isPublished: true
---

# Docker 컨테이너 기술

- [Docker 아키텍처](#docker-아키텍처)
- [Dockerfile 작성 및 이미지 빌드](#dockerfile-작성-및-이미지-빌드)
- [이미지 레이어 구조 및 최적화](#이미지-레이어-구조-및-최적화)
  - [레이어 캐싱(Layer Caching)](#레이어-캐싱layer-caching)
  - [멀티 스테이지 빌드(Multi-stage Build)](#멀티-스테이지-빌드multi-stage-build)
- [주요 명령어 가이드](#주요-명령어-가이드)
  - [이미지 및 레지스트리 관리](#이미지-및-레지스트리-관리)
  - [컨테이너 실행 및 관리](#컨테이너-실행-및-관리)
  - [네트워크 및 볼륨 관리](#네트워크-및-볼륨-관리)
- [Docker Compose를 활용한 서비스 오케스트레이션](#docker-compose를-활용한-서비스-오케스트레이션)

## Docker 아키텍처

![img](images/docker_architecture.webp)

- Docker는 클라이언트-서버 구조를 가짐.
- Docker 클라이언트는 Docker 데몬(Docker Daemon)과 통신하여 컨테이너를 빌드, 실행 및 배포함.

## Dockerfile 작성 및 이미지 빌드

Dockerfile은 이미지를 생성하기 위한 명령어 집합이 담긴 텍스트 파일임.

```dockerfile
# 베이스 이미지 지정
FROM node:20-alpine

# 작업 디렉터리 설정
WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# 실행 명령어 지정
CMD ["npm", "start"]
```

## 이미지 레이어 구조 및 최적화

Docker 이미지는 읽기 전용 레이어(Read-only Layer)들이 쌓인 구조임. Dockerfile의 각 명령어(`FROM`, `RUN`, `COPY`, `ADD`)는 새로운 레이어를 생성함.

### 레이어 캐싱(Layer Caching)

- 빌드 시 변경되지 않은 이전 레이어는 재사용하여 빌드 속도를 높임.
- 자주 변경되는 파일(`COPY . .`)은 Dockerfile 하단에 배치하여 상단 레이어의 캐시를 최대한 활용하는 것이 좋음.

### 멀티 스테이지 빌드(Multi-stage Build)

빌드 환경과 실행 환경을 분리하여 최종 이미지 크기를 최소화하는 기법임.

```dockerfile
# 1단계: 빌드 스테이지
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm run build

# 2단계: 실행 스테이지 (경량화 이미지 사용)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
```

- 이미지 경량화 팁:
  - `alpine` 계열의 작은 베이스 이미지를 사용함.
  - 여러 `RUN` 명령어를 `&&`로 연결하여 레이어 수를 줄임.
  - `.dockerignore` 파일을 사용하여 불필요한 파일이 이미지에 포함되지 않도록 함.
  - 극단적으로 경량화할 경우 `FROM scratch`를 사용함. 어떠한 파일 시스템도 포함하지 않은 완전히 빈 이미지이며, 대부분의 OS 베이스 이미지가 이를 시작점으로 작성됨.

## 주요 명령어 가이드

### 이미지 및 레지스트리 관리

```sh
docker build -t app:v1 . # 이미지 빌드
docker images            # 로컬 이미지 목록 확인
docker rmi app:v1        # 이미지 삭제
docker pull nginx        # 레지스트리에서 이미지 가져오기
docker push my/app:v1    # 레지스트리에 이미지 업로드
```

### 컨테이너 실행 및 관리

```sh
docker run -d -p 80:80 --name web nginx # 배경에서 실행 및 포트 바인딩
docker ps                               # 실행 중인 컨테이너 확인
docker stop web                         # 컨테이너 정지
docker rm -f web                        # 컨테이너 강제 삭제
docker logs -f web                      # 컨테이너 로그 실시간 확인
docker exec -it web sh                  # 실행 중인 컨테이너 접속
```

### 네트워크 및 볼륨 관리

- 네트워크: 컨테이너 간 또는 외부와의 통신을 정의함.
- 볼륨: 컨테이너가 삭제되어도 데이터를 유지하기 위해 호스트 경로와 연결함.

```sh
docker network create my-net            # 사용자 정의 네트워크 생성
docker volume create my-data            # 데이터 볼륨 생성
docker run -v my-data:/data nginx       # 볼륨 마운트하여 실행
```

## Docker Compose를 활용한 서비스 오케스트레이션

여러 개의 컨테이너를 하나의 서비스 단위로 묶어 관리할 때 사용함. `docker-compose.yml` 파일에 서비스 구성을 정의함.

```sh
docker compose up -d    # 정의된 모든 서비스 실행
docker compose down     # 서비스 정지 및 관련 자원 삭제
docker compose logs -f  # 전체 서비스 로그 확인
```
