기본 쉘 변경 이슈

sudo vi /etc/pam.d/chsh

required -> sufficient

chsh -s $(which zsh)

터미널 세션 종료 후 재접속

uninsatll vscode server from host.
