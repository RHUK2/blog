---
updatedAt: 2024-02-23
directory: Cheatsheet
fileName: Docker_Cheat_Sheet
title: Docker Cheat Sheet
description: 자주 사용하는 Docker 명령어 정리
---

# Docker Cheat Sheet

- [Docker Cheat Sheet](#docker-cheat-sheet)
  - [용어](#용어)
  - [명령어](#명령어)

## 용어

| 용어                 | 설명                                                                                                                                                                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 이미지 (Image)       | Docker에서 실행할 수 있는 애플리케이션과 그 실행에 필요한 모든 것을 포함하는 패키지입니다. 이미지는 읽기 전용이며 컨테이너를 실행하는 데 사용됩니다. Dockerfile을 사용하여 정의하거나 이미지 레지스트리에서 가져올 수 있습니다.                                                |
| 컨테이너 (Container) | 이미지의 실행 가능한 인스턴스입니다. 컨테이너는 격리된 환경에서 애플리케이션을 실행하는 데 사용됩니다. 이미지를 기반으로 생성되며, 애플리케이션 실행을 위해 필요한 파일 시스템, 환경 변수, 네트워크 및 실행 옵션 등을 가지고 있습니다.                                         |
| 레이어 (Layer)       | Docker 이미지는 여러 개의 읽기 전용 레이어로 구성됩니다. 각 레이어는 파일 시스템 변경 사항을 포함하고 있으며 이러한 변경 사항은 기본 레이어로부터만 유도됩니다. 레이어는 효율적인 이미지 공유와 버전 관리를 가능하게 합니다.                                                   |
| Docker 레지스트리    | Docker 이미지를 저장하고 검색할 수 있는 중앙 저장소입니다. 공개 Docker Hub 레지스트리 외에도 개인이나 조직에서 자체적으로 운영하는 레지스트리를 사용할 수 있습니다. Docker Hub는 공개 이미지를 호스팅하는 데 가장 널리 사용되는 레지스트리 중 하나입니다.                      |
| Dockerfile           | Docker 이미지를 빌드하는 데 사용되는 텍스트 파일입니다. Dockerfile은 Docker 컨테이너가 어떻게 작동해야 하는지를 정의합니다. 각 명령은 새로운 레이어를 추가하며, 이를 통해 이미지를 구성하고 구성 요소를 설치하고 애플리케이션을 설정할 수 있습니다.                            |
| Docker 엔진          | Docker의 핵심 구성 요소로서, 컨테이너화된 애플리케이션을 생성하고 실행하기 위한 오픈 소스 플랫폼입니다. Docker 엔진은 Docker 데몬과 Docker 클라이언트로 구성되어 있으며, 컨테이너의 관리, 이미지 빌드, 네트워크 설정 등의 작업을 수행합니다.                                   |
| Docker 클라이언트    | Docker를 사용하여 Docker 엔진과 상호 작용하는 데 사용되는 명령 줄 도구입니다. Docker 클라이언트는 사용자가 Docker 데몬을 제어하고 컨테이너를 실행하고 관리할 수 있는 인터페이스를 제공합니다.                                                                                  |
| Docker 데몬          | Docker 엔진의 백그라운드 프로세스로서, 컨테이너 생성, 이미지 빌드, 네트워킹 및 데이터 볼륨 관리 등의 작업을 수행합니다. Docker 데몬은 Docker API를 통해 클라이언트와 통신하고, 호스트 시스템의 리소스를 관리하여 컨테이너화된 환경을 관리합니다.                               |
| Docker 호스트        | Docker 엔진이 실행되는 머신 또는 가상 머신입니다. Docker 호스트는 컨테이너가 실행되는 물리적 또는 가상화된 환경을 제공합니다. Docker 호스트는 Docker 엔진을 설치하고 실행하는 호스트 시스템이며, 하드웨어 또는 가상화 소프트웨어를 통해 리소스를 관리합니다.                   |
| 볼륨 (Volume)        | Docker 컨테이너에서 데이터를 저장하고 컨테이너 간에 데이터를 공유하기 위한 방법입니다. 볼륨은 호스트 파일 시스템이나 다른 컨테이너에서 마운트될 수 있습니다. 볼륨을 사용하면 데이터의 영속성과 공유성을 보장할 수 있으며, 컨테이너의 파일 시스템과 분리된 저장소를 제공합니다. |

## 명령어

| 명령어                                          | 설명                                                   |
| ----------------------------------------------- | ------------------------------------------------------ |
| `docker pull IMAGE_NAME`                        | 이미지 다운로드                                        |
| `docker build -t TAG_NAME .`                    | Dockerfile로부터 이미지 빌드                           |
| `docker images`                                 | 로컬에 저장된 이미지 목록 보기                         |
| `docker run IMAGE_NAME`                         | 이미지를 기반으로 컨테이너 실행                        |
| `docker ps`                                     | 실행 중인 컨테이너 목록 보기                           |
| `docker ps -a`                                  | 모든 컨테이너 목록 보기                                |
| `docker exec -it CONTAINER_ID COMMAND`          | 실행 중인 컨테이너에 명령어 실행                       |
| `docker stop CONTAINER_ID`                      | 실행 중인 컨테이너 중지                                |
| `docker rm CONTAINER_ID`                        | 컨테이너 삭제                                          |
| `docker rmi IMAGE_NAME`                         | 이미지 삭제                                            |
| `docker-compose up`                             | docker-compose.yml 파일을 사용하여 서비스 실행         |
| `docker-compose down`                           | docker-compose.yml 파일을 사용하여 서비스 중지         |
| `docker-compose restart`                        | docker-compose.yml 파일을 사용하여 서비스 재시작       |
| `docker-compose logs`                           | 서비스 로그 출력                                       |
| `docker-compose exec CONTAINER_NAME COMMAND`    | 서비스 내부에서 명령어 실행                            |
| `docker network ls`                             | Docker 네트워크 목록 보기                              |
| `docker volume ls`                              | Docker 볼륨 목록 보기                                  |
| `docker stats`                                  | 모든 컨테이너의 리소스 사용량 및 통계 보기             |
| `docker system prune`                           | 사용되지 않는 컨테이너, 이미지, 볼륨, 네트워크 등 정리 |
| `docker inspect CONTAINER_ID`                   | 컨테이너 상세 정보 조회                                |
| `docker-compose build`                          | docker-compose.yml 파일을 사용하여 서비스 빌드         |
| `docker-compose pause SERVICE_NAME`             | 서비스 일시 중지                                       |
| `docker-compose unpause SERVICE_NAME`           | 일시 중지된 서비스 재개                                |
| `docker-compose scale SERVICE_NAME=NUM`         | 서비스의 인스턴스 수 조정                              |
| `docker-compose pull`                           | docker-compose.yml에 정의된 이미지 다운로드            |
| `docker-compose exec -T CONTAINER_NAME COMMAND` | 명령어를 실행하고 터미널 상호작용 없이 결과 출력       |
