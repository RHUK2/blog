---
title: WSL_external_host
directory: Cheatsheet
---

# WSL external host

- 관리자권한으로 PowerShell 실행
- 방화벽 인바우드 규칙 설정(포트 허용) 및 wsl2 portproxy 작업 자동화 스크립트 복붙

스크립트 설정

```sh
$remoteport = bash.exe -c "ifconfig eth0 | grep 'inet '"
$found = $remoteport -match '\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}';

if( $found ){
$remoteport = $matches[0];
} else{
echo "The Script Exited, the ip address of WSL 2 cannot be found";
exit;
}

#[Ports]

#All the ports you want to forward separated by coma
# $ports=@(80,443,10000,3000,5000);
$ports=@(3000);

#[Static ip]
#You can change the addr to your ip config to listen to a specific address
$addr='0.0.0.0';
$ports_a = $ports -join ",";

#Remove Firewall Exception Rules
iex "Remove-NetFireWallRule -DisplayName 'WSL 2 Firewall Unlock' ";

#adding Exception Rules for inbound and outbound Rules
iex "New-NetFireWallRule -DisplayName 'WSL 2 Firewall Unlock' -Direction Outbound -LocalPort $ports_a -Action Allow -Protocol TCP";
iex "New-NetFireWallRule -DisplayName 'WSL 2 Firewall Unlock' -Direction Inbound -LocalPort $ports_a -Action Allow -Protocol TCP";

for( $i = 0; $i -lt $ports.length; $i++ ){
  $port = $ports[$i];
iex "netsh interface portproxy delete v4tov4 listenport=$port listenaddress=$addr";
iex "netsh interface portproxy add v4tov4 listenport=$port listenaddress=$addr connectport=$port connectaddress=$remoteport";
}
```

설정 해제

```sh
netsh interface portproxy show v4tov4
netsh interface portproxy reset ipv4 // 설정 삭제
#Remove Firewall Exception Rules
iex "Remove-NetFireWallRule -DisplayName 'WSL 2 Firewall Unlock' ";
#브라우저 캐시 비우기도 같이 해주자
```
