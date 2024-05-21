---
updatedAt: 2024-04-21
directory: Cheatsheet
fileName: WSL_Cheat_Sheet
title: WSL Cheat Sheet
description: ✅
---

# WSL

- [명령어](#명령어)
- [WSL 외부 호스트 연결하기](#wsl-외부-호스트-연결하기)

## 명령어

```sh
# To list installed distributions
wsl -l
wsl --list

# To list installed distributions along with its running status and wsl config being 1 or 2
wsl -l --verbose
wsl -l -v

# To run a specific distro
wsl -d distro_name
wsl --distribution distro_name

# To terminate/shutdown a specific distro
wsl -t distro_name_to_shutdown
wsl --terminate distro_name_to_shutdown

# To shutdown all disstros
wsl --shutdown

# Set specific distro as default
wsl -s my_default_distro
wsl --set-default my_default_distro

# To EXPORT a running distro as image
wsl --export distro_name_to_export windows_path\tar_file_name.tar

# To IMPORT an image as distro
wsl --import new_distro_name install_location_windows_path tar_file_name.tar --version wsl-version-1-or-2
wsl --import Ubuntu-20 D:\VMs\WSL\Ubuntu-20\ Ubuntu-20.04.tar --version 2 # Setting my secondary HDD as storate loc for new distro

# To UNREGISTER (also removes the its file storage) a distro
wsl --unregister distro_name_that_delete

# To run a WSL distro as the specified user.
wsl -u username -d distroname
wsl -u root -d Ubuntu-20.04

# To change the default user for a distribution
distributionName config --default-user Username
ubuntu config --default-user my_default_username
ubuntu2004.exe config --default-user johndoe # When you have Ubuntu 20.04 version installed from the Microsoft Store
```

## WSL 외부 호스트 연결하기

- 관리자권한으로 PowerShell 실행
- 방화벽 인바우드 규칙 설정(포트 허용) 및 wsl2 portproxy 작업 자동화 스크립트 복붙

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

- 설정 해제

```sh
netsh interface portproxy show v4tov4
netsh interface portproxy reset ipv4 // 설정 삭제
#Remove Firewall Exception Rules
iex "Remove-NetFireWallRule -DisplayName 'WSL 2 Firewall Unlock' ";
#브라우저 캐시 비우기도 같이 해주자
```
