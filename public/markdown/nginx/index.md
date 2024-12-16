---
folderName: nginx
updatedAt:
title: nginx
tag: nginx
isPublished:
---

좋습니다! Nginx는 경량의 고성능 HTTP 서버이자 역방향 프록시(reverse proxy)로, 전 세계에서 널리 사용됩니다. 이 튜토리얼에서는 Nginx의 기본적인 설정과 사용법에 대해 단계별로 설명드리겠습니다.

1. Nginx 설치하기
   Ubuntu/Debian 환경
   sudo apt update
   sudo apt install nginx -y
   CentOS/Red Hat 환경
   sudo yum install epel-release -y
   sudo yum install nginx -y
   MacOS (Homebrew 사용 시)
   brew install nginx
   설치가 완료되었다면, Nginx를 시작하고 상태를 확인합니다:

sudo systemctl start nginx # Nginx 시작
sudo systemctl enable nginx # 부팅 시 자동 실행
sudo systemctl status nginx # 상태 확인 2. Nginx 기본 파일 구조
Nginx의 기본 설정 파일은 주로 다음 위치에 있습니다:

/etc/nginx/: Nginx 설정 파일 디렉토리
nginx.conf: 전체 Nginx의 메인 설정 파일
sites-available/: 가상 호스트 설정 파일을 저장
sites-enabled/: 활성화된 가상 호스트 설정 파일들의 링크
conf.d/: 추가 설정 파일
/var/www/: 웹사이트의 기본 웹 파일이 저장되는 디렉토리 3. 기본 설정 및 서비스 테스트
Nginx가 실행되고 있는지 확인
Nginx를 설치한 뒤 브라우저에서 서버의 IP로 접속하여 기본 페이지가 표시되는지 확인합니다:

URL: http://<Your_Server_IP>
기본 페이지(Welcome to Nginx!)가 보이면, Nginx 웹 서버가 성공적으로 작동 중이라는 의미입니다.

4. 간단한 정적 웹사이트 설정
   정적 콘텐츠를 제공하려면, Nginx의 설정 파일을 수정해야 합니다.

(1) 정적 파일 준비 웹 서버 루트 디렉토리를 설정합니다. 기본적으로 /var/www/html/ 경로가 사용됩니다. 여기 디렉토리 안에 HTML 파일을 생성하세요:

sudo mkdir -p /var/www/my_website
echo "<h1>Hello from Nginx</h1>" | sudo tee /var/www/my_website/index.html
(2) 가상 호스트 설정 기본 구성 파일을 수정하거나 새 파일을 생성해야 합니다. 예를 들어, /etc/nginx/sites-available/my_website 파일을 작성합니다:

sudo nano /etc/nginx/sites-available/my_website
내용은 아래와 같이 작성:

server {
listen 80;
server_name your_domain_or_ip;

    root /var/www/my_website;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

}
설정을 저장한 후 링크를 생성해 활성화합니다:

sudo ln -s /etc/nginx/sites-available/my_website /etc/nginx/sites-enabled/
(3) 설정 파일 검증 및 적용 설정을 테스트하고 적용합니다:

sudo nginx -t # 설정 파일 문법 확인
sudo systemctl reload nginx # Nginx 재시작
(4) 브라우저에서 확인 서버 IP 또는 도메인 이름으로 접속하여, 설정한 HTML 파일(index.html)이 잘 보이는지 확인하세요.

5. 역방향 프록시 (Reverse Proxy) 설정
   Nginx는 역방향 프록시로 사용할 때 강력한 성능을 발휘합니다. 예컨대, 백엔드 애플리케이션 서버(예: Node.js)로 요청을 전달하도록 설정할 수 있습니다.

예: 백엔드 서버에 프록시 요청 전달

server {
listen 80;
server_name your_domain_or_ip;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

}
위 설정에서는, 3000번 포트에서 실행되고 있는 백엔드 Node.js 애플리케이션에 요청을 전달합니다.

설정을 완료한 후 반드시 Nginx를 다시 로드하세요:

sudo nginx -t
sudo systemctl reload nginx 6. HTTPS 및 SSL 인증서 설정 (Let's Encrypt 사용)
HTTPS를 설정하려면, SSL 인증서가 필요합니다. 무료 SSL 인증서를 발급받기 위해 Let's Encrypt를 사용할 수 있습니다.

(1) Certbot 설치 Ubuntu 기준:

sudo apt install certbot python3-certbot-nginx -y
(2) SSL 인증서 발급

sudo certbot --nginx -d your_domain -d www.your_domain
위 명령을 실행하면 자동으로 SSL 설정이 적용되고, Nginx가 재시작됩니다.

(3) SSL 갱신 자동화 Certbot으로 발급한 SSL 인증서는 90일 동안 유효합니다. 이를 자동으로 갱신하려면 cron 또는 시스템 타이머를 설정합니다:

sudo certbot renew --dry-run 7. 로그 관리
Nginx는 기본적으로 요청 및 에러 로그를 기록합니다:

접근 로그: /var/log/nginx/access.log
에러 로그: /var/log/nginx/error.log
로그를 확인하려면 다음 명령을 사용합니다:

tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
참고 명령어
Nginx 시작/중지/재시작

sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx
sudo systemctl reload nginx # 설정 변경 후 재로딩(다운 타임 없음)
설정 테스트

sudo nginx -t
캐시 제거

sudo nginx -s reload
이것으로 Nginx의 기본 설정 및 사용법에 대한 간단한 튜토리얼이 완료되었습니다. 추가적인 질문이 있다면 언제든지 물어보세요! 😊
