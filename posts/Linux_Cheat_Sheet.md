# Linux Cheat Sheet

- [Linux Cheat Sheet](#linux-cheat-sheet)
  - [echo](#echo)
  - [read](#read)
  - [exit](#exit)
  - [env](#env)
  - [pwd](#pwd)
  - [cd](#cd)
  - [ls](#ls)
  - [find](#find)
  - [wc](#wc)
  - [sort](#sort)
  - [awk](#awk)
  - [cp](#cp)
  - [mv](#mv)
  - [touch](#touch)
  - [mkdir](#mkdir)
  - [rm](#rm)
  - [cat](#cat)
  - [head](#head)
  - [tail](#tail)
  - [sed](#sed)
  - [clear](#clear)
  - [grep](#grep)
  - [date](#date)
  - [alias](#alias)
  - [curl](#curl)
  - [ps](#ps)
  - [top](#top)
  - [netstat](#netstat)
  - [lsof](#lsof)
  - [kill](#kill)
  - [apt](#apt)
  - [gunzip](#gunzip)
  - [gzip](#gzip)
  - [tar](#tar)
  - [세미콜론( ; )](#세미콜론--)
  - [버티컬바( | )](#버티컬바--)
  - [더블 버티컬바( || )](#더블-버티컬바--)
  - [엠퍼센트( \& )](#엠퍼센트--)
  - [더블 엠퍼센트( \&\& )](#더블-엠퍼센트--)

## echo

문자열을 출력해준다.

```sh
echo "string"
echo "$HOME"
echo -n # 자동으로 붙는 개행문자 제거
```

## read

사용자 입력을 받아서 처리한다.

```sh
read <변수명>
read -r # Escape 문자를 해석하지 않고 그대로 유지
```

## exit

현재 스크립트를 종료시킨다.

```sh
exit 0 # 정상 종료
exit 1 # 비정상 종료
```

## env

환경변수 목록을 출력해준다.

```sh
env
```

## pwd

현재 위치한 디렉토리 정보를 출력해준다.

```sh
pwd
```

## cd

경로 이동 시 사용된다.

```sh
cd .. # 상위 폴더로 이동
cd <절대 경로> # 절대 경로로 이동
cd <상대 경로> # 상대 경로로 이동
```

## ls

현재 디렉토리의 목록을 확인할 때 사용된다.

```sh
ls
ls -a # 현재 디렉토리의 숨겨진 목록까지 출력
ls -l # 현재 디렉토리 목록을 자세한 정보와 함께 출력
```

## find

## wc

## sort

## awk

## cp

폴더 및 파일을 복사할 때 사용된다.

```sh
cp <대상 파일 경로> <복사 파일 경로>
cp -r <대상 폴더 경로> <복사 폴더 경로>
```

## mv

폴더 및 파일의 이름을 변경할 때 사용된다.
폴더 및 파일을 이동시킬 때 사용된다.

```sh
mv <대상 파일 및 폴더 경로> <변경 파일 및 폴더 경로>
```

## touch

파일을 생성할 때 사용한다.

```sh
touch <파일 경로>
```

## mkdir

폴더를 생성할 때 사용한다.

```sh
mkdir <폴더 경로>
```

## rm

파일 및 폴더를 삭제할 때 사용된다.

```sh
rm <파일 경로> # 파일 삭제
rm -r <폴더 경로> # 폴더 삭제
rm -f # 강제 삭제 옵션
```

## cat

파일을 열어 내용을 확인할 때 사용한다.

```sh
cat <파일 경로>
cat <파일 경로> | more # 파일 내용이 길 경우 화면을 내려가면서 확인할 수 있다.
cat test1.txt test2.txt > test3.txt # 파일들을 합쳐 새로운 파일을 만든다.
cat test1.txt >> test2.txt # test2.txt 파일 뒤에 test1.txt 내용을 덧붙인다.
```

## head

파일을 열어 앞 줄의 내용을 확인하고 싶을 때 사용한다.

```sh
head -n <파일 경로> # 파일의 맨 앞부터 n줄을 보여준다.
```

## tail

파일을 열어 뒷 줄의 내용을 확인하고 싶을 때 사용한다.

```sh
tail -n <파일 경로> # 파일의 맨 뒤부터 n줄을 보여준다.
```

## sed

파일을 열어 일정 범위의 내용을 확인하고 싶을 때 사용한다.

```sh
sed -n '20, 30p' test.txt # 20줄에서 30줄까지 출력
sed -n '20, \$p' test.txt # 20줄부터 마지막까지 출력
```

## clear

더러워진 콘솔 창을 정리할 때 사용한다.

```sh
clear
```

## grep

정규표현식의 패턴 매칭 방식으로 특정 문자열을 찾아주는 명령어다.
다중 명령어인 버티컬바 `|`와 자주 사용된다.

```sh
cat test.txt | grep "string" # test.txt 파일 내용을 열고 <string>을 찾는다.
cat test.txt | grep -i "string" # 대소문자 구분을 하지 않고 찾는다.
cat test.txt | grep -n "string" # 라인 번호를 출력한다.
cat test.txt | grep -v "string" # 입력한 패턴이 포함되지 않은 문자열을 출력한다.
```

## date

## alias

자주 사용하는 명령에 별명을 붙여서 편하게 사용할 때 사용한다.

```sh
alias # 별명 리스트 출력
alias <별명>='명령' # 별명을 가진 명령 생성
unalias <별명> # 명령 삭제
```

## curl

웹에 요청을 보낼 때 사용하는 명령어로 나는 "call URL"로 외웠다.

```sh
curl <url>
```

## ps

프로세스 목록과 상태를 확인할 때 사용하는 명령어이다.
커널 프로세스를 제외한 모든 목록을 보여주는 `-e` 옵션과 풀 포맷으로 보여주는 `-f` 옵션을 주로 같이 사용한다.

```sh
ps -ef
```

## top

프로세스 목록과 상태를 확인할 때 사용하는 명령어이다.
`-n <숫자>` 옵션을 통해 상태 기록 인터벌을 설정한다. `-b` 옵션으로 인터벌마다 변경되는 기록을 화면에 기록한다.

```sh
top -b -n 1
```

## netstat

네트워크 목록과 상태를 확인할 때 사용하는 명령어이다.
리눅스에 `net-tools`가 설치되어 있어야 한다.
`-n`은 포트 넘버, `-t`는 tcp, `-l`은 리스닝 상태, `-p`는 PID를 나타내는 옵션이다.

```sh
netstat -ntlp
```

## lsof

열려있는 모든 파일과, 그 파일들을 열고 있는 프로세스들의 목록을 출력한다.

```sh
lsof -t # PID 출력
lsof -i # PORT 출력
lsof -i:<number> # 해당 number PORT 출력
```

## kill

실행 중인 프로세스를 강제 종료할 때 사용된다.

```sh
kill -9 <PID>
```

## apt

APT는 "Advanced Packaging Tool"의 약자로 우분투와 같은 리눅스 배포판의 시초인 데비안의 패키지 시스템을 일컫는 말이다. 이 APT를 준수해 패키지를 설치하고 제거하는 등의 용도로 만들어진 툴들이 `apt-get`, `apt-cache` 등이 있다. 이러한 툴들에는 너무 많은 기능을 포함하고 있어 자주 사용하는 기능만 뽑아내고 터미널 설명의 가독성을 부여한 도구가 `apt`이다. 특별한 경우가 아니면 `apt`를 쓴다.

```sh
apt update
apt upgrade
apt install
apt uninstall
```

## gunzip

gzip(.gz)의 확장자를 가진 파일의 압축을 해제할 때 사용한다.

```sh
gunzip test.gz
```

## gzip

하나의 파일을 압축할 때 사용한다.

```sh
gzip <파일명>
```

## tar

하나 이상의 파일을 압축하거나 압축을 풀 때 사용한다.

```sh
tar -zxvf test.tar.gz # 압축 해제
tar -zcvf output.tar.gz <파일명1> <파일명2> ... # 파일 압축
tar -zcvf output.tar.gz <폴더명> # 폴더 압축

# -z archive with gzip : gzip과 함께 사용할 때
# -x extract : 압축 해제
# -c create new archive : 새로운 압축을 만들 때
# -v verbose : 진행과정을 화면에 출력
# -f read from or write to file : 파일을 읽거나 쓸 때
```

## 세미콜론( ; )

앞의 명령어의 성공여부와 상관없이, 단순하게 앞의 명령어부터 차례대로 실행한다.

```sh
mkdir test; cd test; # test 폴더 생성 후 test 폴더로 이동
```

## 버티컬바( | )

앞의 명령어의 실행결과를 뒤의 명령어로 넘겨준다.

```sh
ls -a | grep test # 현재 폴더의 목록 정보를 넘겨주고 grep 명령어로 test 문자를 탐색한다.
```

## 더블 버티컬바( || )

앞의 명령어가 성공하면 뒤의 명령어를 실행하지 않고, 실패하면 뒤의 명령어를 실행한다.

```sh
rm test.txt || sudo rm test.txt # 권한 문제로 삭제에 실패하면, root 권한으로 삭제한다.
```

## 엠퍼센트( & )

앞의 명령어를 백그라운드에서 실행한 후 즉시 뒤의 명령어를 실행한다.

```sh
mkdir test & cd test # test 폴더 이동을 백그라운드로 실행하면서 폴더가 생기기도 전에 test로 이동하려고 해서 실패한다.
```

## 더블 엠퍼센트( && )

앞의 명령어가 성공하면 뒤의 명령어를 실행하고, 실패하면 뒤의 명령어를 실행하지 않는다.

```sh
sudo apt update && sudo apt upgrade -y # 패키지 업데이트의 성공하면 패키지를 업그레이드한다.
```
