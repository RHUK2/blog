---
folderName: aws_iam
title: IAM
tag: aws
isPublished: false
---

# IAM

- [개요](#개요)
- [주요 구성 요소](#주요-구성-요소)
  - [User](#user)
  - [Group](#group)
  - [Role](#role)
  - [Policy](#policy)
- [Policy 구조](#policy-구조)
- [정책 유형](#정책-유형)
- [인증 수단](#인증-수단)
  - [콘솔 로그인](#콘솔-로그인)
  - [프로그래밍 방식 액세스](#프로그래밍-방식-액세스)
- [최소 권한 원칙](#최소-권한-원칙)
- [STS와 AssumeRole](#sts와-assumerole)

## 개요

IAM (Identity and Access Management)은 AWS 리소스에 대한 접근을 제어하는 서비스다.

- 누가(Who), 어떤 리소스에(What), 어떤 작업을(How) 수행할 수 있는지를 정의
- AWS 계정 내 사람, 애플리케이션, 서비스에 권한을 부여하고 관리
- 글로벌 서비스로 리전 구분 없이 동일하게 적용

## 주요 구성 요소

### User

개별 사람 또는 서비스에 해당하는 자격증명이다.

- 콘솔 로그인용 ID/PW와 프로그래밍 방식용 액세스 키를 발급받을 수 있음
- 자체적으로 정책을 직접 연결하거나 그룹을 통해 권한을 부여받음
- Root 계정 대신 IAM User를 생성하여 사용하는 것을 권장

### Group

User의 집합이다.

- 그룹에 정책을 연결하면 속한 모든 User에 일괄 적용
- 그룹은 중첩 불가 (그룹 안에 그룹을 포함할 수 없음)
- 사용자가 여러 그룹에 동시에 속할 수 있음

역할 기반 그룹 예시:

| 그룹명       | 연결 정책             | 설명             |
| ------------ | --------------------- | ---------------- |
| `Developers` | `AmazonS3FullAccess`  | S3 전체 권한     |
| `DBAdmins`   | `AmazonRDSFullAccess` | RDS 전체 권한    |
| `Viewers`    | `ReadOnlyAccess`      | 전체 리소스 읽기 |

### Role

사람이 아닌 서비스 또는 리소스에 임시로 부여하는 자격증명이다.

- EC2, Lambda, ECS 등의 AWS 서비스가 다른 서비스에 접근할 때 사용
- 고정 액세스 키 대신 임시 자격증명을 발급받아 사용하므로 보안상 더 안전
- 신뢰 정책(Trust Policy)을 통해 어떤 엔티티가 해당 Role을 맡을(assume) 수 있는지 정의
- 교차 계정 접근, AWS 서비스 간 연동, 외부 IdP 연동(SAML, OIDC) 등에 활용

### Policy

User, Group, Role에 연결하는 JSON 형태의 권한 정의서다.

- 어떤 AWS 서비스의 어떤 작업을 허용 또는 거부할지를 명시
- 하나의 Policy를 여러 엔티티에 재사용 가능
- 명시적 거부(Deny)는 허용(Allow)보다 항상 우선

## Policy 구조

Policy는 하나 이상의 Statement로 구성된 JSON 문서다.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowS3ReadOnly",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": ["arn:aws:s3:::my-bucket", "arn:aws:s3:::my-bucket/*"],
      "Condition": {
        "StringEquals": {
          "aws:RequestedRegion": "ap-northeast-2"
        }
      }
    }
  ]
}
```

주요 필드:

| 필드        | 설명                                                               |
| ----------- | ------------------------------------------------------------------ |
| `Version`   | 정책 언어 버전. `"2012-10-17"` 고정                                |
| `Sid`       | Statement 식별자. 선택 항목                                        |
| `Effect`    | `Allow` 또는 `Deny`                                                |
| `Action`    | 허용/거부할 AWS API 작업. `*`로 와일드카드 지정 가능               |
| `Resource`  | 대상 AWS 리소스의 ARN. `*`은 전체 리소스를 의미                    |
| `Condition` | 정책이 적용되는 조건. IP, 리전, MFA 여부 등을 기준으로 세분화 가능 |

## 정책 유형

| 유형                                 | 관리 주체 | 특징                                                    |
| ------------------------------------ | --------- | ------------------------------------------------------- |
| AWS 관리형 정책 (AWS Managed Policy) | AWS       | AWS가 미리 만들어둔 정책. 업데이트는 AWS가 자동 관리    |
| 고객 관리형 정책 (Customer Managed)  | 사용자    | 직접 생성·수정·재사용 가능. 세밀한 권한 제어에 적합     |
| 인라인 정책 (Inline Policy)          | 사용자    | 특정 User/Group/Role에 직접 삽입. 재사용 불가, 1:1 관계 |

- AWS 관리형 정책: `AdministratorAccess`, `ReadOnlyAccess`, `AmazonS3FullAccess` 등
- 고객 관리형 정책: 사용자가 콘솔 또는 CLI로 직접 정의하여 여러 엔티티에 연결
- 인라인 정책: 해당 엔티티와 함께 삭제됨. 재사용이 필요 없는 예외적 상황에만 사용 권장

## 인증 수단

### 콘솔 로그인

AWS 관리 콘솔에 웹 브라우저로 접근하는 방식이다.

- IAM User: `계정 ID(또는 별칭) + 사용자 이름 + 비밀번호`로 로그인
- Root 계정: 이메일 + 비밀번호로 로그인
- MFA (Multi-Factor Authentication): OTP 기기, 가상 인증 앱 등을 추가 인증 수단으로 설정 가능. 보안 강화를 위해 활성화 권장

### 프로그래밍 방식 액세스

CLI, SDK, API를 통해 AWS 리소스에 접근하는 방식이다.

- `Access Key ID`와 `Secret Access Key` 쌍으로 구성
- Secret Access Key는 최초 발급 시에만 확인 가능. 분실 시 재발급 필요
- 액세스 키는 코드에 하드코딩하지 않고 환경 변수 또는 `~/.aws/credentials` 파일로 관리

```sh
# AWS CLI에 자격증명 설정
aws configure

# AWS Access Key ID:     AKIAIOSFODNN7EXAMPLE
# AWS Secret Access Key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
# Default region name:   ap-northeast-2
# Default output format: json
```

프로파일을 여러 개 등록하여 계정 또는 환경별로 전환할 수 있다.

```sh
# 특정 프로파일 등록
aws configure --profile production

# 특정 프로파일로 명령 실행
aws s3 ls --profile production

# 환경 변수로 프로파일 지정
export AWS_PROFILE=production
```

## 최소 권한 원칙

최소 권한 원칙(Least Privilege)은 작업에 필요한 권한만 최소한으로 부여하는 보안 원칙이다.

- `AdministratorAccess`나 `*` 와일드카드를 남용하지 않는다
- 초기에는 제한적 권한으로 시작하고 필요 시 점진적으로 확장
- AWS IAM Access Analyzer를 활용하면 실제로 사용된 권한만 추려 정책을 최소화할 수 있음
- 미사용 User, Role, 액세스 키는 주기적으로 점검하여 비활성화 또는 삭제

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::my-bucket/public/*"
    }
  ]
}
```

위처럼 특정 버킷의 특정 경로에 대해 읽기 작업만 허용하는 방식이 최소 권한 원칙을 따른 예시다.

## STS와 AssumeRole

STS (Security Token Service)는 임시 자격증명을 발급하는 AWS 서비스다.

- 고정 액세스 키 없이 단기 유효 토큰을 발급받아 AWS 리소스에 접근
- 임시 자격증명은 `Access Key ID`, `Secret Access Key`, `Session Token`의 3가지로 구성
- 유효 기간은 기본 1시간이며 최대 12시간까지 설정 가능

`AssumeRole`은 특정 Role의 권한을 임시로 획득하는 STS API 동작이다.

```sh
# 다른 계정의 Role을 임시로 맡기
aws sts assume-role \
  --role-arn "arn:aws:iam::123456789012:role/CrossAccountRole" \
  --role-session-name "my-session"

# 반환값: AccessKeyId, SecretAccessKey, SessionToken, Expiration
```

주요 활용 시나리오:

| 시나리오             | 설명                                                              |
| -------------------- | ----------------------------------------------------------------- |
| 교차 계정 접근       | A 계정의 서비스가 B 계정 리소스에 접근할 때 Role을 assume         |
| EC2/Lambda 권한 부여 | 서비스가 직접 Role을 assume하여 액세스 키 없이 다른 서비스에 접근 |
| 외부 IdP 연동        | SAML 또는 OIDC를 통해 외부 사용자에게 임시 AWS 접근 권한 부여     |

EC2 인스턴스에 Role을 연결하면 인스턴스 메타데이터 엔드포인트를 통해 자동으로 임시 자격증명을 받아 SDK가 사용한다.

```ts
// EC2에 Role이 연결된 경우, 자격증명 없이 SDK 초기화 가능
// SDK가 자동으로 인스턴스 메타데이터에서 임시 자격증명을 조회
import { S3Client } from '@aws-sdk/client-s3';

const client = new S3Client({ region: 'ap-northeast-2' });
```
