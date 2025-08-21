---
folderName: aws_s3
updatedAt: 2025-08-21
title: S3
tag: aws
isPublished: false
---

# S3

## ListObjectsV2Command

Contents
CommonPrefixes
Prefix
Delimeter

## 파일 시스템

폴더 구조 시뮬레이션: S3는 전통적인 파일 시스템과 달리 실제 폴더 구조가 없습니다.
객체 이름(키)이 documents/report.pdf와 같이 /로 구분될 뿐입니다.
Delimiter를 사용하면 S3는 이 /를 기준으로 하위 폴더처럼 보이는 객체들을 묶어서 반환합니다.
