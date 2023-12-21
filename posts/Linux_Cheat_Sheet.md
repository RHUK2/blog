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
  - [Bash Cheat Sheet](#bash-cheat-sheet)
  - [Command History](#command-history)
  - [Navigating Directories](#navigating-directories)
  - [Creating Directories](#creating-directories)
  - [Moving Directories](#moving-directories)
  - [Deleting Directories](#deleting-directories)
  - [Creating Files](#creating-files)
  - [Standard Output, Standard Error and Standard Input](#standard-output-standard-error-and-standard-input)
  - [Moving Files](#moving-files)
  - [Deleting Files](#deleting-files)
  - [Reading Files](#reading-files)
  - [File Permissions](#file-permissions)
  - [Finding Files](#finding-files)
  - [Find in Files](#find-in-files)
    - [Replace in Files](#replace-in-files)
  - [Symbolic Links](#symbolic-links)
  - [Compressing Files](#compressing-files)
    - [zip](#zip)
    - [gzip](#gzip-1)
    - [tar -c](#tar--c)
  - [Decompressing Files](#decompressing-files)
    - [unzip](#unzip)
    - [gunzip](#gunzip-1)
    - [tar -x](#tar--x)
  - [Disk Usage](#disk-usage)
  - [Memory Usage](#memory-usage)
  - [Packages](#packages)
  - [Shutdown and Reboot](#shutdown-and-reboot)
  - [Identifying Processes](#identifying-processes)
  - [Process Priority](#process-priority)
  - [Killing Processes](#killing-processes)
  - [Date \& Time](#date--time)
  - [Scheduled Tasks](#scheduled-tasks)
  - [HTTP Requests](#http-requests)
  - [Network Troubleshooting](#network-troubleshooting)
  - [DNS](#dns)
  - [Hardware](#hardware)
  - [Terminal Multiplexers](#terminal-multiplexers)
  - [Secure Shell Protocol (SSH)](#secure-shell-protocol-ssh)
  - [Secure Copy](#secure-copy)
  - [Bash Profile](#bash-profile)
  - [Bash Script](#bash-script)
    - [Variables](#variables)
    - [Environment Variables](#environment-variables)
    - [Functions](#functions)
    - [Exit Codes](#exit-codes)
    - [Conditional Statements](#conditional-statements)
      - [Boolean Operators](#boolean-operators)
      - [Numeric Operators](#numeric-operators)
      - [String Operators](#string-operators)
      - [If Statements](#if-statements)
      - [Inline If Statements](#inline-if-statements)
      - [While Loops](#while-loops)
      - [For Loops](#for-loops)
      - [Case Statements](#case-statements)
  - [글로브 패턴](#글로브-패턴)

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

여러 옵션을 통해 파일 또는 폴더를 찾을 때 사용한다.

```sh
find <경로> <옵션> <표현식>
find -name "string" # 주어진 문자열로 필터링한다.
find -iname "string" # 주어진 문자열로 대소문자 구별없이 필터링한다.
find -type f # 지정한 파일 유형(파일)으로 필터링한다.
find -type d # 지정한 파일 유형(폴더)으로 필터링한다.
find -empty # 빈 파일 또는 빈 폴더를 필터링한다.
find -maxdepth 1 # 최대한 주어진 정수값 만큼의 깊이까지 필터링한다.
find -mindepth 1 # 최소한 주어진 정수값의 깊이까지 필터링한다.
find -prune # 찾은 결과 중 디렉터리가 해당될 때 그 디렉터리 이름만 필터링한다.
```

## wc

텍스트에서 단어 수, 행 수, 바이트 수를 출력해준다.

```sh
wc -l # 행 개수
wc -w # 단어 개수
wc -c # 바이트 수
```

## sort

텍스트를 행 단위로 정렬할 때 사용한다.

```sh
sort -r # 내림차순
sort -f # 대소문자를 구분하지 않음
```

## awk

리눅스의 SQL문이라 불리며, 텍스트 내용을 테이블로 인지하여 원하는 데이터를 사용자 입맛에 맞게 출력할 수 있다.

```sh
awk <옵션> "pattern { action }" <파일명>
```

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

## Bash Cheat Sheet

A cheat sheet for bash commands.

## Command History

```bash
!!            # Run the last command

touch foo.sh
chmod +x !$   # !$ is the last argument of the last command i.e. foo.sh
```

## Navigating Directories

```bash
pwd                       # Print current directory path
ls                        # List directories
ls -a|--all               # List directories including hidden
ls -l                     # List directories in long form
ls -l -h|--human-readable # List directories in long form with human readable sizes
ls -t                     # List directories by modification time, newest first
stat foo.txt              # List size, created and modified timestamps for a file
stat foo                  # List size, created and modified timestamps for a directory
tree                      # List directory and file tree
tree -a                   # List directory and file tree including hidden
tree -d                   # List directory tree
cd foo                    # Go to foo sub-directory
cd                        # Go to home directory
cd ~                      # Go to home directory
cd -                      # Go to last directory
pushd foo                 # Go to foo sub-directory and add previous directory to stack
popd                      # Go back to directory in stack saved by `pushd`
```

## Creating Directories

```bash
mkdir foo                        # Create a directory
mkdir foo bar                    # Create multiple directories
mkdir -p|--parents foo/bar       # Create nested directory
mkdir -p|--parents {foo,bar}/baz # Create multiple nested directories

mktemp -d|--directory            # Create a temporary directory
```

## Moving Directories

```bash
cp -R|--recursive foo bar                               # Copy directory
mv foo bar                                              # Move directory

rsync -z|--compress -v|--verbose /foo /bar              # Copy directory, overwrites destination
rsync -a|--archive -z|--compress -v|--verbose /foo /bar # Copy directory, without overwriting destination
rsync -avz /foo username@hostname:/bar                  # Copy local directory to remote directory
rsync -avz username@hostname:/foo /bar                  # Copy remote directory to local directory
```

## Deleting Directories

```bash
rmdir foo                        # Delete empty directory
rm -r|--recursive foo            # Delete directory including contents
rm -r|--recursive -f|--force foo # Delete directory including contents, ignore nonexistent files and never prompt
```

## Creating Files

```bash
touch foo.txt          # Create file or update existing files modified timestamp
touch foo.txt bar.txt  # Create multiple files
touch {foo,bar}.txt    # Create multiple files
touch test{1..3}       # Create test1, test2 and test3 files
touch test{a..c}       # Create testa, testb and testc files

mktemp                 # Create a temporary file
```

## Standard Output, Standard Error and Standard Input

```bash
echo "foo" > bar.txt       # Overwrite file with content
echo "foo" >> bar.txt      # Append to file with content

ls exists 1> stdout.txt    # Redirect the standard output to a file
ls noexist 2> stderror.txt # Redirect the standard error output to a file
ls 2>&1 > out.txt          # Redirect standard output and error to a file
ls > /dev/null             # Discard standard output and error

read foo                   # Read from standard input and write to the variable foo
```

## Moving Files

```bash
cp foo.txt bar.txt                                # Copy file
mv foo.txt bar.txt                                # Move file

rsync -z|--compress -v|--verbose /foo.txt /bar    # Copy file quickly if not changed
rsync z|--compress -v|--verbose /foo.txt /bar.txt # Copy and rename file quickly if not changed
```

## Deleting Files

```bash
rm foo.txt            # Delete file
rm -f|--force foo.txt # Delete file, ignore nonexistent files and never prompt
```

## Reading Files

```bash
cat foo.txt            # Print all contents
less foo.txt           # Print some contents at a time (g - go to top of file, SHIFT+g, go to bottom of file, /foo to search for 'foo')
head foo.txt           # Print top 10 lines of file
tail foo.txt           # Print bottom 10 lines of file
open foo.txt           # Open file in the default editor
wc foo.txt             # List number of lines words and characters in the file
```

## File Permissions

| #   | Permission              | rwx | Binary |
| --- | ----------------------- | --- | ------ |
| 7   | read, write and execute | rwx | 111    |
| 6   | read and write          | rw- | 110    |
| 5   | read and execute        | r-x | 101    |
| 4   | read only               | r-- | 100    |
| 3   | write and execute       | -wx | 011    |
| 2   | write only              | -w- | 010    |
| 1   | execute only            | --x | 001    |
| 0   | none                    | --- | 000    |

For a directory, execute means you can enter a directory.

| User | Group | Others | Description                                                                                          |
| ---- | ----- | ------ | ---------------------------------------------------------------------------------------------------- |
| 6    | 4     | 4      | User can read and write, everyone else can read (Default file permissions)                           |
| 7    | 5     | 5      | User can read, write and execute, everyone else can read and execute (Default directory permissions) |

- u - User
- g - Group
- o - Others
- a - All of the above

```bash
ls -l /foo.sh            # List file permissions
chmod +100 foo.sh        # Add 1 to the user permission
chmod -100 foo.sh        # Subtract 1 from the user permission
chmod u+x foo.sh         # Give the user execute permission
chmod g+x foo.sh         # Give the group execute permission
chmod u-x,g-x foo.sh     # Take away the user and group execute permission
chmod u+x,g+x,o+x foo.sh # Give everybody execute permission
chmod a+x foo.sh         # Give everybody execute permission
chmod +x foo.sh          # Give everybody execute permission
```

## Finding Files

Find binary files for a command.

```bash
type wget                                  # Find the binary
which wget                                 # Find the binary
whereis wget                               # Find the binary, source, and manual page files
```

`locate` uses an index and is fast.

```bash
updatedb                                   # Update the index

locate foo.txt                             # Find a file
locate --ignore-case                       # Find a file and ignore case
locate f*.txt                              # Find a text file starting with 'f'
```

`find` doesn't use an index and is slow.

```bash
find /path -name foo.txt                   # Find a file
find /path -iname foo.txt                  # Find a file with case insensitive search
find /path -name "*.txt"                   # Find all text files
find /path -name foo.txt -delete           # Find a file and delete it
find /path -name "*.png" -exec pngquant {} # Find all .png files and execute pngquant on it
find /path -type f -name foo.txt           # Find a file
find /path -type d -name foo               # Find a directory
find /path -type l -name foo.txt           # Find a symbolic link
find /path -type f -mtime +30              # Find files that haven't been modified in 30 days
find /path -type f -mtime +30 -delete      # Delete files that haven't been modified in 30 days
```

## Find in Files

```bash
grep 'foo' /bar.txt                         # Search for 'foo' in file 'bar.txt'
grep 'foo' /bar -r|--recursive              # Search for 'foo' in directory 'bar'
grep 'foo' /bar -R|--dereference-recursive  # Search for 'foo' in directory 'bar' and follow symbolic links
grep 'foo' /bar -l|--files-with-matches     # Show only files that match
grep 'foo' /bar -L|--files-without-match    # Show only files that don't match
grep 'Foo' /bar -i|--ignore-case            # Case insensitive search
grep 'foo' /bar -x|--line-regexp            # Match the entire line
grep 'foo' /bar -C|--context 1              # Add N line of context above and below each search result
grep 'foo' /bar -v|--invert-match           # Show only lines that don't match
grep 'foo' /bar -c|--count                  # Count the number lines that match
grep 'foo' /bar -n|--line-number            # Add line numbers
grep 'foo' /bar --colour                    # Add colour to output
grep 'foo\|bar' /baz -R                     # Search for 'foo' or 'bar' in directory 'baz'
grep --extended-regexp|-E 'foo|bar' /baz -R # Use regular expressions
egrep 'foo|bar' /baz -R                     # Use regular expressions
```

### Replace in Files

```bash
sed 's/fox/bear/g' foo.txt               # Replace fox with bear in foo.txt and output to console
sed 's/fox/bear/gi' foo.txt              # Replace fox (case insensitive) with bear in foo.txt and output to console
sed 's/red fox/blue bear/g' foo.txt      # Replace red with blue and fox with bear in foo.txt and output to console
sed 's/fox/bear/g' foo.txt > bar.txt     # Replace fox with bear in foo.txt and save in bar.txt
sed 's/fox/bear/g' foo.txt -i|--in-place # Replace fox with bear and overwrite foo.txt
```

## Symbolic Links

```bash
ln -s|--symbolic foo bar            # Create a link 'bar' to the 'foo' folder
ln -s|--symbolic -f|--force foo bar # Overwrite an existing symbolic link 'bar'
ls -l                               # Show where symbolic links are pointing
```

## Compressing Files

### zip

Compresses one or more files into \*.zip files.

```bash
zip foo.zip /bar.txt                # Compress bar.txt into foo.zip
zip foo.zip /bar.txt /baz.txt       # Compress bar.txt and baz.txt into foo.zip
zip foo.zip /{bar,baz}.txt          # Compress bar.txt and baz.txt into foo.zip
zip -r|--recurse-paths foo.zip /bar # Compress directory bar into foo.zip
```

### gzip

Compresses a single file into \*.gz files.

```bash
gzip /bar.txt foo.gz           # Compress bar.txt into foo.gz and then delete bar.txt
gzip -k|--keep /bar.txt foo.gz # Compress bar.txt into foo.gz
```

### tar -c

Compresses (optionally) and combines one or more files into a single _.tar, _.tar.gz, _.tpz or _.tgz file.

```bash
tar -c|--create -z|--gzip -f|--file=foo.tgz /bar.txt /baz.txt # Compress bar.txt and baz.txt into foo.tgz
tar -c|--create -z|--gzip -f|--file=foo.tgz /{bar,baz}.txt    # Compress bar.txt and baz.txt into foo.tgz
tar -c|--create -z|--gzip -f|--file=foo.tgz /bar              # Compress directory bar into foo.tgz
```

## Decompressing Files

### unzip

```bash
unzip foo.zip          # Unzip foo.zip into current directory
```

### gunzip

```bash
gunzip foo.gz           # Unzip foo.gz into current directory and delete foo.gz
gunzip -k|--keep foo.gz # Unzip foo.gz into current directory
```

### tar -x

```bash
tar -x|--extract -z|--gzip -f|--file=foo.tar.gz # Un-compress foo.tar.gz into current directory
tar -x|--extract -f|--file=foo.tar              # Un-combine foo.tar into current directory
```

## Disk Usage

```bash
df                     # List disks, size, used and available space
df -h|--human-readable # List disks, size, used and available space in a human readable format

du                     # List current directory, subdirectories and file sizes
du /foo/bar            # List specified directory, subdirectories and file sizes
du -h|--human-readable # List current directory, subdirectories and file sizes in a human readable format
du -d|--max-depth      # List current directory, subdirectories and file sizes within the max depth
du -d 0                # List current directory size
```

## Memory Usage

```bash
free                   # Show memory usage
free -h|--human        # Show human readable memory usage
free -h|--human --si   # Show human readable memory usage in power of 1000 instead of 1024
free -s|--seconds 5    # Show memory usage and update continuously every five seconds
```

## Packages

```bash
apt update                   # Refreshes repository index
apt search wget              # Search for a package
apt show wget                # List information about the wget package
apt list --all-versions wget # List all versions of the package
apt install wget             # Install the latest version of the wget package
apt install wget=1.2.3       # Install a specific version of the wget package
apt remove wget              # Removes the wget package
apt upgrade                  # Upgrades all upgradable packages
```

## Shutdown and Reboot

```bash
shutdown                     # Shutdown in 1 minute
shutdown now "Cya later"     # Immediately shut down
shutdown +5 "Cya later"      # Shutdown in 5 minutes

shutdown --reboot            # Reboot in 1 minute
shutdown -r now "Cya later"  # Immediately reboot
shutdown -r +5 "Cya later"   # Reboot in 5 minutes

shutdown -c                  # Cancel a shutdown or reboot

reboot                       # Reboot now
reboot -f                    # Force a reboot
```

## Identifying Processes

```bash
top                    # List all processes interactively
htop                   # List all processes interactively
ps all                 # List all processes
pidof foo              # Return the PID of all foo processes

CTRL+Z                 # Suspend a process running in the foreground
bg                     # Resume a suspended process and run in the background
fg                     # Bring the last background process to the foreground
fg 1                   # Bring the background process with the PID to the foreground

sleep 30 &             # Sleep for 30 seconds and move the process into the background
jobs                   # List all background jobs
jobs -p                # List all background jobs with their PID

lsof                   # List all open files and the process using them
lsof -itcp:4000        # Return the process listening on port 4000
```

## Process Priority

Process priorities go from -20 (highest) to 19 (lowest).

```bash
nice -n -20 foo        # Change process priority by name
renice 20 PID          # Change process priority by PID
ps -o ni PID           # Return the process priority of PID
```

## Killing Processes

```bash
CTRL+C                 # Kill a process running in the foreground
kill PID               # Shut down process by PID gracefully. Sends TERM signal.
kill -9 PID            # Force shut down of process by PID. Sends SIGKILL signal.
pkill foo              # Shut down process by name gracefully. Sends TERM signal.
pkill -9 foo           # force shut down process by name. Sends SIGKILL signal.
killall foo            # Kill all process with the specified name gracefully.
```

## Date & Time

```bash
date                   # Print the date and time
date --iso-8601        # Print the ISO8601 date
date --iso-8601=ns     # Print the ISO8601 date and time

time tree              # Time how long the tree command takes to execute
```

## Scheduled Tasks

```pre
   *      *         *         *           *
Minute, Hour, Day of month, Month, Day of the week
```

```bash
crontab -l                 # List cron tab
crontab -e                 # Edit cron tab in Vim
crontab /path/crontab      # Load cron tab from a file
crontab -l > /path/crontab # Save cron tab to a file

* * * * * foo              # Run foo every minute
*/15 * * * * foo           # Run foo every 15 minutes
0 * * * * foo              # Run foo every hour
15 6 * * * foo             # Run foo daily at 6:15 AM
44 4 * * 5 foo             # Run foo every Friday at 4:44 AM
0 0 1 * * foo              # Run foo at midnight on the first of the month
0 0 1 1 * foo              # Run foo at midnight on the first of the year

at -l                      # List scheduled tasks
at -c 1                    # Show task with ID 1
at -r 1                    # Remove task with ID 1
at now + 2 minutes         # Create a task in Vim to execute in 2 minutes
at 12:34 PM next month     # Create a task in Vim to execute at 12:34 PM next month
at tomorrow                # Create a task in Vim to execute tomorrow
```

## HTTP Requests

```bash
curl https://example.com                               # Return response body
curl -i|--include https://example.com                  # Include status code and HTTP headers
curl -L|--location https://example.com                 # Follow redirects
curl -o|--remote-name foo.txt https://example.com      # Output to a text file
curl -H|--header "User-Agent: Foo" https://example.com # Add a HTTP header
curl -X|--request POST -H "Content-Type: application/json" -d|--data '{"foo":"bar"}' https://example.com # POST JSON
curl -X POST -H --data-urlencode foo="bar" http://example.com                           # POST URL Form Encoded

wget https://example.com/file.txt .                            # Download a file to the current directory
wget -O|--output-document foo.txt https://example.com/file.txt # Output to a file with the specified name
```

## Network Troubleshooting

```bash
ping example.com            # Send multiple ping requests using the ICMP protocol
ping -c 10 -i 5 example.com # Make 10 attempts, 5 seconds apart

ip addr                     # List IP addresses on the system
ip route show               # Show IP addresses to router

netstat -i|--interfaces     # List all network interfaces and in/out usage
netstat -l|--listening      # List all open ports

traceroute example.com      # List all servers the network traffic goes through

mtr -w|--report-wide example.com                                    # Continually list all servers the network traffic goes through
mtr -r|--report -w|--report-wide -c|--report-cycles 100 example.com # Output a report that lists network traffic 100 times

nmap 0.0.0.0                # Scan for the 1000 most common open ports on localhost
nmap 0.0.0.0 -p1-65535      # Scan for open ports on localhost between 1 and 65535
nmap 192.168.4.3            # Scan for the 1000 most common open ports on a remote IP address
nmap -sP 192.168.1.1/24     # Discover all machines on the network by ping'ing them
```

## DNS

```bash
host example.com            # Show the IPv4 and IPv6 addresses

dig example.com             # Show complete DNS information

cat /etc/resolv.conf        # resolv.conf lists nameservers
```

## Hardware

```bash
lsusb                  # List USB devices
lspci                  # List PCI hardware
lshw                   # List all hardware
```

## Terminal Multiplexers

Start multiple terminal sessions. Active sessions persist reboots. `tmux` is more modern than `screen`.

```bash
tmux             # Start a new session (CTRL-b + d to detach)
tmux ls          # List all sessions
tmux attach -t 0 # Reattach to a session

screen           # Start a new session (CTRL-a + d to detach)
screen -ls       # List all sessions
screen -R 31166  # Reattach to a session

exit             # Exit a session
```

## Secure Shell Protocol (SSH)

```bash
ssh hostname                 # Connect to hostname using your current user name over the default SSH port 22
ssh -i foo.pem hostname      # Connect to hostname using the identity file
ssh user@hostname            # Connect to hostname using the user over the default SSH port 22
ssh user@hostname -p 8765    # Connect to hostname using the user over a custom port
ssh ssh://user@hostname:8765 # Connect to hostname using the user over a custom port
```

Set default user and port in `~/.ssh/config`, so you can just enter the name next time:

```bash
$ cat ~/.ssh/config
Host name
  User foo
  Hostname 127.0.0.1
  Port 8765
$ ssh name
```

## Secure Copy

```bash
scp foo.txt ubuntu@hostname:/home/ubuntu # Copy foo.txt into the specified remote directory
```

## Bash Profile

- bash - `.bashrc`
- zsh - `.zshrc`

```bash
# Always run ls after cd
function cd {
  builtin cd "$@" && ls
}

# Prompt user before overwriting any files
alias cp='cp --interactive'
alias mv='mv --interactive'
alias rm='rm --interactive'

# Always show disk usage in a human readable format
alias df='df -h'
alias du='du -h'
```

## Bash Script

### Variables

```bash
#!/bin/bash

foo=123                # Initialize variable foo with 123
declare -i foo=123     # Initialize an integer foo with 123
declare -r foo=123     # Initialize readonly variable foo with 123
echo $foo              # Print variable foo
echo ${foo}_'bar'      # Print variable foo followed by _bar
echo ${foo:-'default'} # Print variable foo if it exists otherwise print default

export foo             # Make foo available to child processes
unset foo              # Make foo unavailable to child processes
```

### Environment Variables

```bash
#!/bin/bash

env            # List all environment variables
echo $PATH     # Print PATH environment variable
export FOO=Bar # Set an environment variable
```

### Functions

```bash
#!/bin/bash

greet() {
  local world = "World"
  echo "$1 $world"
  return "$1 $world"
}
greet "Hello"
greeting=$(greet "Hello")
```

### Exit Codes

```bash
#!/bin/bash

exit 0   # Exit the script successfully
exit 1   # Exit the script unsuccessfully
echo $?  # Print the last exit code
```

### Conditional Statements

#### Boolean Operators

- `$foo` - Is true
- `!$foo` - Is false

#### Numeric Operators

- `-eq` - Equals
- `-ne` - Not equals
- `-gt` - Greater than
- `-ge` - Greater than or equal to
- `-lt` - Less than
- `-le` - Less than or equal to
- `-e` foo.txt - Check file exists
- `-z` foo - Check if variable exists

#### String Operators

- `=` - Equals
- `==` - Equals
- `-z` - Is null
- `-n` - Is not null
- `<` - Is less than in ASCII alphabetical order
- `>` - Is greater than in ASCII alphabetical order

#### If Statements

```bash
#!/bin/bash

if [[$foo = 'bar']]; then
  echo 'one'
elif [[$foo = 'bar']] || [[$foo = 'baz']]; then
  echo 'two'
elif [[$foo = 'ban']] && [[$USER = 'bat']]; then
  echo 'three'
else
  echo 'four'
fi
```

#### Inline If Statements

```bash
#!/bin/bash

[[ $USER = 'rehan' ]] && echo 'yes' || echo 'no'
```

#### While Loops

```bash
#!/bin/bash

declare -i counter
counter=10
while [$counter -gt 2]; do
  echo The counter is $counter
  counter=counter-1
done
```

#### For Loops

```bash
#!/bin/bash

for i in {0..10..2}
  do
    echo "Index: $i"
  done

for filename in file1 file2 file3
  do
    echo "Content: " >> $filename
  done

for filename in *;
  do
    echo "Content: " >> $filename
  done
```

#### Case Statements

```bash
#!/bin/bash

echo "What's the weather like tomorrow?"
read weather

case $weather in
  sunny | warm ) echo "Nice weather: " $weather
  ;;
  cloudy | cool ) echo "Not bad weather: " $weather
  ;;
  rainy | cold ) echo "Terrible weather: " $weather
  ;;
  * ) echo "Don't understand"
  ;;
esac
```

## 글로브 패턴

\* (별표): 0개 이상의 임의의 문자와 일치합니다. 디렉터리 구분 기호를 포함하지 않습니다.

예: \*.txt는 모든 확장자가 '.txt'인 파일과 일치합니다.
? (물음표): 정확히 한 개의 임의의 문자와 일치합니다.

예: file?.txt는 'file1.txt', 'fileA.txt' 등과 일치하지만 'file.txt'와 일치하지 않습니다.
[...]: 괄호 안에 있는 문자 중 하나와 일치합니다.

예: [abc]는 'a', 'b', 'c' 중 하나와 일치합니다.
예: [0-9]는 0부터 9까지의 숫자 중 하나와 일치합니다.
[!...]: 괄호 안에 있는 문자를 제외한 다른 문자와 일치합니다.

예: file[!0-9].txt는 'fileA.txt', 'fileX.txt' 등과 일치하지만 'file1.txt'와 일치하지 않습니다.
\*\*: 임의의 디렉터리와 그 하위 디렉터리를 재귀적으로 일치시킵니다. 디렉터리 구분 기호를 포함합니다.

예: dir/\*_/_.txt는 'dir' 디렉터리와 그 하위 모든 디렉터리에서 확장자가 '.txt'인 파일과 일치합니다.
{pattern1,pattern2,...}: 괄호 안에 나열된 여러 패턴 중 하나와 일치합니다.

예: file{.txt,.md}는 'file.txt' 또는 'file.md'와 일치합니다.
