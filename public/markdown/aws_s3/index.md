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

S3 버킷과 로컬 폴더 간에 파일을 동기화하는 명령어

```sh
aws s3 sync s3://your-bucket-name/remote-folder-path ./local-folder-path
```
