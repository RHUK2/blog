---
folderName: aws_s3
title: S3
tag: aws
isPublished: true
---

# S3

- [액세스 제어 (Access Control)](#액세스-제어-access-control)
  - [IAM (Identity and Access Management) - "사용자 신분증"](#iam-identity-and-access-management---사용자-신분증)
  - [버킷 정책 (Bucket Policy) - "버킷의 문지기"](#버킷-정책-bucket-policy---버킷의-문지기)
  - [ACL (Access Control List) - "개별 파일의 꼬리표"](#acl-access-control-list---개별-파일의-꼬리표)
  - [퍼블릭 액세스 차단 (Block Public Access, BPA) - "2중 잠금장치"](#퍼블릭-액세스-차단-block-public-access-bpa---2중-잠금장치)
- [액세스 지점 (Access Points)](#액세스-지점-access-points)
- [폴더 개념](#폴더-개념)
- [`GetObjectCommand`](#getobjectcommand)
- [`ListObjectsV2Command`](#listobjectsv2command)
- [AWS CLI](#aws-cli)
  - [버킷 관리](#버킷-관리)
  - [파일 업로드 • 다운로드 • 복사](#파일-업로드--다운로드--복사)
  - [파일 이동 • 삭제](#파일-이동--삭제)
  - [동기화 (sync)](#동기화-sync)
  - [버킷 정책 • 설정](#버킷-정책--설정)
  - [버전 관리 (Versioning)](#버전-관리-versioning)
  - [Presigned URL 생성](#presigned-url-생성)
  - [스토리지 클래스 변경](#스토리지-클래스-변경)

## 액세스 제어 (Access Control)

### IAM (Identity and Access Management) - "사용자 신분증"

가장 권장되는 방식

- 개념: AWS 리소스에 접근 가능한 '사용자(User)'나 '역할(Role)'을 생성하고 권한 부여
- 구조: IAM User 생성 → Access Key 발급 → Policy(권한) 연결
- 장점: 버킷을 퍼블릭하게 열지 않아도, 키를 가진 서버만 안전하게 접근 가능

### 버킷 정책 (Bucket Policy) - "버킷의 문지기"

버킷 전체에 적용되는 JSON 형태의 규칙

- 용도: 특정 IP 허용, 퍼블릭 읽기 허용(정적 웹 호스팅), CloudFront 연동 등

### ACL (Access Control List) - "개별 파일의 꼬리표"

- 상태: Legacy 방식. 최근에는 비활성화(Bucket Owner Enforced) 권장
- 단점: 파일마다 권한을 관리해야 하므로 복잡하며 보안 사고 위험 높음

### 퍼블릭 액세스 차단 (Block Public Access, BPA) - "2중 잠금장치"

실수로 버킷을 공개하는 사고를 방지하기 위한 최상위 안전장치. 버킷 정책이나 ACL보다 우선순위 높음

퍼블릭 액세스 차단 4가지 옵션 (모두 True 권장):

1. 새 ACL 차단: 향후 ACL을 통한 파일 공개 시도 차단
2. 임의의 ACL 차단: 기존 ACL로 공개된 파일이 있어도 무시하고 차단
3. 새 퍼블릭 정책 차단: 버킷 정책에 "모두에게 공개" 내용 저장 불가
4. 임의의 퍼블릭 정책 차단: 기존 "모두에게 공개" 정책 무시 및 차단

## 액세스 지점 (Access Points)

기본적으로 S3 버킷은 하나의 주소와 정책을 가짐. 여러 팀이 거대한 버킷을 공유하여 정책 관리가 복잡해질 때 액세스 지점 사용

- 버킷: 거대한 창고 건물 하나
- 버킷 정책: 정문 경비실의 출입 명부. (인원 증가 시 관리 난해)
- 액세스 지점: 건물 옆에 뚫어놓은 '재무팀 전용 쪽문', '개발팀 전용 쪽문'

사용 이유:

1. 정책 분리: `Finance-AP`(재무팀)에는 재무 폴더 권한만, `Dev-AP`(개발팀)에는 로그 폴더 권한만 부여하여 관리 분리
2. 네트워크 제한: 특정 액세스 지점은 VPC(내부망)에서만 접근 가능하도록 제한 가능

## 폴더 개념

S3는 전통적인 파일 시스템과 달리 실제 폴더 구조가 없는 객체 스토리지이다

## `GetObjectCommand`

특정 객체(파일) 하나를 가져오는 명령어

- 기능: 버킷 이름과 객체 키(Key)를 제공하여 파일의 내용(Body)과 메타데이터를 조회
- 사용 예시: 사용자가 특정 이미지를 요청했을 때 해당 이미지 데이터를 스트림 형태로 받아옴

```ts
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

const client = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
});

const command = new GetObjectCommand({
  Bucket: 'my-bucket',
  Key: 'images/profile.jpg',
});

try {
  const response = await client.send(command);
  // response.Body는 ReadableStream 형태 (Node.js)
  const str = await response.Body?.transformToString();
  console.log(str);
} catch (err) {
  console.error(err);
}
```

## `ListObjectsV2Command`

버킷 내의 객체 목록을 조회하는 명령어

- 주요 파라미터:
  - `Prefix`: 특정 접두사(폴더 경로)로 시작하는 객체만 필터링하여 조회. (예: `images/`로 시작하는 파일만 검색)
  - `Delimiter`: 폴더 구조를 시뮬레이션하기 위한 구분자. 보통 `/`를 사용하며, 이를 기준으로 하위 폴더처럼 보이는 객체들을 그룹화함
- 반환 값:
  - `Contents`: 실제 파일(객체)들의 메타데이터 리스트
  - `CommonPrefixes`: `Delimiter` 기준으로 묶인 '폴더'들의 리스트

```ts
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const client = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
});

const command = new ListObjectsV2Command({
  Bucket: 'my-bucket',
  Prefix: 'images/', // 'images/' 폴더 내의 파일만 조회
  Delimiter: '/', // 폴더 구조 시뮬레이션
  MaxKeys: 10, // 한 번에 가져올 최대 개수
});

try {
  const response = await client.send(command);

  // 파일 목록
  response.Contents?.forEach((item) => {
    console.log(`File: ${item.Key}`);
  });

  // 하위 폴더 목록
  response.CommonPrefixes?.forEach((prefix) => {
    console.log(`Folder: ${prefix.Prefix}`);
  });
} catch (err) {
  console.error(err);
}
```

## AWS CLI

AWS CLI에서 S3를 다루는 명령어는 크게 `aws s3`(고수준 명령어)와 `aws s3api`(저수준 API)로 나뉜다.

- `aws s3`: cp, mv, sync 등 사람이 직접 쓰기 편한 고수준 래퍼
- `aws s3api`: 버킷 정책, 태깅, 버전 관리 등 세밀한 제어가 필요할 때 사용하는 저수준 API

### 버킷 관리

```sh
# 버킷 목록 조회
aws s3 ls

# 버킷 내 파일 목록 조회 (재귀)
aws s3 ls s3://my-bucket --recursive

# 특정 prefix(폴더) 내 파일만 조회
aws s3 ls s3://my-bucket/images/

# 버킷 생성 (리전 지정)
aws s3 mb s3://my-bucket --region ap-northeast-2

# 버킷 삭제 (비어 있어야 함)
aws s3 rb s3://my-bucket

# 버킷 내 모든 파일 포함 강제 삭제
aws s3 rb s3://my-bucket --force
```

### 파일 업로드 • 다운로드 • 복사

```sh
# 로컬 파일 → S3 업로드
aws s3 cp ./local-file.txt s3://my-bucket/remote-file.txt

# S3 파일 → 로컬 다운로드
aws s3 cp s3://my-bucket/remote-file.txt ./local-file.txt

# S3 버킷 간 파일 복사
aws s3 cp s3://source-bucket/file.txt s3://dest-bucket/file.txt

# 폴더 전체 업로드 (재귀)
aws s3 cp ./local-folder s3://my-bucket/remote-folder --recursive

# 특정 확장자만 업로드
aws s3 cp ./dist s3://my-bucket/dist --recursive --exclude "*" --include "*.js"

# Content-Type 및 Cache-Control 헤더 지정
aws s3 cp ./index.html s3://my-bucket/index.html \
  --content-type "text/html" \
  --cache-control "no-cache"
```

### 파일 이동 • 삭제

```sh
# 파일 이동 (= 복사 후 원본 삭제)
aws s3 mv s3://my-bucket/old-path.txt s3://my-bucket/new-path.txt

# 단일 파일 삭제
aws s3 rm s3://my-bucket/file.txt

# 특정 prefix 내 파일 전체 삭제
aws s3 rm s3://my-bucket/logs/ --recursive

# 특정 확장자만 삭제
aws s3 rm s3://my-bucket/tmp/ --recursive --exclude "*" --include "*.log"
```

### 동기화 (sync)

로컬과 S3 간 변경된 파일만 전송한다. 소스에 없는 파일은 기본적으로 삭제하지 않는다.

```sh
# 로컬 → S3 동기화
aws s3 sync ./dist s3://my-bucket/dist

# S3 → 로컬 동기화
aws s3 sync s3://my-bucket/dist ./dist

# 소스에 없는 파일을 대상에서도 삭제
aws s3 sync ./dist s3://my-bucket/dist --delete

# 특정 파일 제외하고 동기화
aws s3 sync ./dist s3://my-bucket/dist --exclude "*.map"

# 정적 사이트 배포 예시: HTML은 캐시 없이, 나머지 에셋은 장기 캐시
aws s3 sync ./dist s3://my-bucket \
  --exclude "*" --include "*.html" \
  --cache-control "no-cache, no-store" --delete

aws s3 sync ./dist s3://my-bucket \
  --exclude "*.html" \
  --cache-control "public, max-age=31536000, immutable"
```

### 버킷 정책 • 설정

```sh
# 버킷 정책 조회
aws s3api get-bucket-policy --bucket my-bucket

# 버킷 정책 적용
aws s3api put-bucket-policy --bucket my-bucket --policy file://policy.json

# 버킷 정책 삭제
aws s3api delete-bucket-policy --bucket my-bucket

# 퍼블릭 액세스 차단 설정 조회
aws s3api get-public-access-block --bucket my-bucket

# 퍼블릭 액세스 전체 차단
aws s3api put-public-access-block --bucket my-bucket \
  --public-access-block-configuration \
  "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

# CORS 설정 조회
aws s3api get-bucket-cors --bucket my-bucket

# CORS 설정 적용
aws s3api put-bucket-cors --bucket my-bucket --cors-configuration file://cors.json
```

### 버전 관리 (Versioning)

```sh
# 버전 관리 상태 조회
aws s3api get-bucket-versioning --bucket my-bucket

# 버전 관리 활성화
aws s3api put-bucket-versioning --bucket my-bucket \
  --versioning-configuration Status=Enabled

# 특정 객체의 모든 버전 목록 조회
aws s3api list-object-versions --bucket my-bucket --prefix images/photo.jpg

# 특정 버전의 파일 다운로드
aws s3api get-object --bucket my-bucket \
  --key images/photo.jpg \
  --version-id "abc123VersionId" \
  ./photo-old.jpg

# 특정 버전 삭제
aws s3api delete-object --bucket my-bucket \
  --key images/photo.jpg \
  --version-id "abc123VersionId"
```

### Presigned URL 생성

서명된 임시 URL로, 인증 없이 파일에 일정 시간만 접근할 수 있게 한다.

```sh
# 1시간(3600초) 유효한 다운로드 URL 생성
aws s3 presign s3://my-bucket/private/report.pdf --expires-in 3600
```

### 스토리지 클래스 변경

```sh
# 업로드 시 스토리지 클래스 지정
aws s3 cp ./archive.zip s3://my-bucket/archive.zip \
  --storage-class GLACIER

# 기존 객체의 스토리지 클래스 변경 (자기 자신으로 복사)
aws s3 cp s3://my-bucket/archive.zip s3://my-bucket/archive.zip \
  --storage-class STANDARD_IA
```

주요 스토리지 클래스:

| 클래스         | 용도                                        |
| -------------- | ------------------------------------------- |
| `STANDARD`     | 기본값. 자주 접근하는 데이터                |
| `STANDARD_IA`  | 접근 빈도가 낮은 데이터. 검색 비용 발생     |
| `GLACIER`      | 장기 아카이빙. 복원에 수 분~수 시간 소요    |
| `DEEP_ARCHIVE` | 최저 비용 아카이빙. 복원에 최대 12시간 소요 |
