1. SCM commit
2. send web hook to jenkins
3. jenkins execute grooby script in scm repository(jenkinsfile)
4. ci(build, lint, test)
5. send build files to live server
6. start server(무중단 배포)

7. docker-compose로 jenkins 설치
8. volume 연결 후 secret key 얻기, network bridge port 8080:8080
9. jenkins 접근 계정 생성
10. jenkins 기본 설정, 플러그인 추가
11. 파이프라인 아이템 추가
12. 빌드 트리거 scm commit으로 추가
13. pipe line with scm 선택
14. scm 연결(credentials 함께), 브랜치 설정
15. scm webhook 설정
16. 로컬에서 테스트 시 ngrok으로 임시 도메인 받아서 테스트
17. 파이프라인 작성
