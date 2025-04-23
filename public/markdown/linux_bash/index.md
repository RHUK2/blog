---
folderName: linux_bash
updatedAt: 2024-10-10
title: Bash
tag: linux
isPublished: true
---

# Bash

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
  - [gzip](#gzip)
  - [tar -c](#tar--c)
- [Decompressing Files](#decompressing-files)
  - [unzip](#unzip)
  - [gunzip](#gunzip)
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
- [sort](#sort)
- [awk](#awk)
- [alias](#alias)
- [ngrok](#ngrok)
- [\> /dev/null \>2$1](#-devnull-21)
- [process](#process)
  - [1. **현재 세션에서 실행된 프로세스 확인**](#1-현재-세션에서-실행된-프로세스-확인)
- [공인 IP 확인](#공인-ip-확인)
- [glob pattern](#glob-pattern)
- [다중 명령어 처리](#다중-명령어-처리)
- [유저/그룹 관리](#유저그룹-관리)
  - [유저](#유저)
  - [그룹](#그룹)
  - [파일/폴더 유저/그룹 변경](#파일폴더-유저그룹-변경)
  - [유저/그룹 정보 경로](#유저그룹-정보-경로)
- [echo "$PATH" | tr ':' '\\n'](#echo-path--tr--n)
- [source 명령어는 스크립트 파일을 수정한 후에 수정된 값을 바로 적용하기 위해 사용하는 명령어](#source-명령어는-스크립트-파일을-수정한-후에-수정된-값을-바로-적용하기-위해-사용하는-명령어)

## Command History

```sh
!!            # Run the last command

touch foo.sh
chmod +x !$   # !$ is the last argument of the last command i.e. foo.sh
```

## Navigating Directories

```sh
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

```sh
mkdir foo                        # Create a directory
mkdir foo bar                    # Create multiple directories
mkdir -p|--parents foo/bar       # Create nested directory
mkdir -p|--parents {foo,bar}/baz # Create multiple nested directories

mktemp -d|--directory            # Create a temporary directory
```

## Moving Directories

```sh
cp -R|--recursive foo bar                               # Copy directory
mv foo bar                                              # Move directory

rsync -z|--compress -v|--verbose /foo /bar              # Copy directory, overwrites destination
rsync -a|--archive -z|--compress -v|--verbose /foo /bar # Copy directory, without overwriting destination
rsync -avz /foo username@hostname:/bar                  # Copy local directory to remote directory
rsync -avz username@hostname:/foo /bar                  # Copy remote directory to local directory
```

## Deleting Directories

```sh
rmdir foo                        # Delete empty directory
rm -r|--recursive foo            # Delete directory including contents
rm -r|--recursive -f|--force foo # Delete directory including contents, ignore nonexistent files and never prompt
```

## Creating Files

```sh
touch foo.txt          # Create file or update existing files modified timestamp
touch foo.txt bar.txt  # Create multiple files
touch {foo,bar}.txt    # Create multiple files
touch test{1..3}       # Create test1, test2 and test3 files
touch test{a..c}       # Create testa, testb and testc files

mktemp                 # Create a temporary file
```

## Standard Output, Standard Error and Standard Input

```sh
echo "foo" > bar.txt       # Overwrite file with content
echo "foo" >> bar.txt      # Append to file with content

ls exists 1> stdout.txt    # Redirect the standard output to a file
ls noexist 2> stderror.txt # Redirect the standard error output to a file
ls 2>&1 > out.txt          # Redirect standard output and error to a file
ls > /dev/null             # Discard standard output and error

read foo                   # Read from standard input and write to the variable foo
```

## Moving Files

```sh
cp foo.txt bar.txt                                # Copy file
mv foo.txt bar.txt                                # Move file

rsync -z|--compress -v|--verbose /foo.txt /bar    # Copy file quickly if not changed
rsync z|--compress -v|--verbose /foo.txt /bar.txt # Copy and rename file quickly if not changed
```

## Deleting Files

```sh
rm foo.txt            # Delete file
rm -f|--force foo.txt # Delete file, ignore nonexistent files and never prompt
```

## Reading Files

```sh
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

```sh
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

```sh
type wget                                  # Find the binary
which wget                                 # Find the binary
whereis wget                               # Find the binary, source, and manual page files
```

`locate` uses an index and is fast.

```sh
updatedb                                   # Update the index

locate foo.txt                             # Find a file
locate --ignore-case                       # Find a file and ignore case
locate f*.txt                              # Find a text file starting with 'f'
```

`find` doesn't use an index and is slow.

```sh
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

```sh
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

```sh
sed 's/fox/bear/g' foo.txt               # Replace fox with bear in foo.txt and output to console
sed 's/fox/bear/gi' foo.txt              # Replace fox (case insensitive) with bear in foo.txt and output to console
sed 's/red fox/blue bear/g' foo.txt      # Replace red with blue and fox with bear in foo.txt and output to console
sed 's/fox/bear/g' foo.txt > bar.txt     # Replace fox with bear in foo.txt and save in bar.txt
sed 's/fox/bear/g' foo.txt -i|--in-place # Replace fox with bear and overwrite foo.txt
```

## Symbolic Links

```sh
ln -s|--symbolic foo bar            # Create a link 'bar' to the 'foo' folder
ln -s|--symbolic -f|--force foo bar # Overwrite an existing symbolic link 'bar'
ls -l                               # Show where symbolic links are pointing
```

## Compressing Files

### zip

Compresses one or more files into \*.zip files.

```sh
zip foo.zip /bar.txt                # Compress bar.txt into foo.zip
zip foo.zip /bar.txt /baz.txt       # Compress bar.txt and baz.txt into foo.zip
zip foo.zip /{bar,baz}.txt          # Compress bar.txt and baz.txt into foo.zip
zip -r|--recurse-paths foo.zip /bar # Compress directory bar into foo.zip
```

### gzip

Compresses a single file into \*.gz files.

```sh
gzip /bar.txt foo.gz           # Compress bar.txt into foo.gz and then delete bar.txt
gzip -k|--keep /bar.txt foo.gz # Compress bar.txt into foo.gz
```

### tar -c

Compresses (optionally) and combines one or more files into a single _.tar, _.tar.gz, _.tpz or _.tgz file.

```sh
tar -c|--create -z|--gzip -f|--file=foo.tgz /bar.txt /baz.txt # Compress bar.txt and baz.txt into foo.tgz
tar -c|--create -z|--gzip -f|--file=foo.tgz /{bar,baz}.txt    # Compress bar.txt and baz.txt into foo.tgz
tar -c|--create -z|--gzip -f|--file=foo.tgz /bar              # Compress directory bar into foo.tgz
```

## Decompressing Files

### unzip

```sh
unzip foo.zip          # Unzip foo.zip into current directory
```

### gunzip

```sh
gunzip foo.gz           # Unzip foo.gz into current directory and delete foo.gz
gunzip -k|--keep foo.gz # Unzip foo.gz into current directory
```

### tar -x

```sh
tar -x|--extract -z|--gzip -f|--file=foo.tar.gz # Un-compress foo.tar.gz into current directory
tar -x|--extract -f|--file=foo.tar              # Un-combine foo.tar into current directory
```

## Disk Usage

```sh
df                     # List disks, size, used and available space
df -h|--human-readable # List disks, size, used and available space in a human readable format

du                     # List current directory, subdirectories and file sizes
du /foo/bar            # List specified directory, subdirectories and file sizes
du -h|--human-readable # List current directory, subdirectories and file sizes in a human readable format
du -d|--max-depth      # List current directory, subdirectories and file sizes within the max depth
du -d 0                # List current directory size
```

## Memory Usage

```sh
free                   # Show memory usage
free -h|--human        # Show human readable memory usage
free -h|--human --si   # Show human readable memory usage in power of 1000 instead of 1024
free -s|--seconds 5    # Show memory usage and update continuously every five seconds
```

## Packages

```sh
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

```sh
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

```sh
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

```sh
nice -n -20 foo        # Change process priority by name
renice 20 PID          # Change process priority by PID
ps -o ni PID           # Return the process priority of PID
```

## Killing Processes

```sh
CTRL+C                 # Kill a process running in the foreground
kill PID               # Shut down process by PID gracefully. Sends TERM signal.
kill -9 PID            # Force shut down of process by PID. Sends SIGKILL signal.
pkill foo              # Shut down process by name gracefully. Sends TERM signal.
pkill -9 foo           # force shut down process by name. Sends SIGKILL signal.
killall foo            # Kill all process with the specified name gracefully.
```

## Date & Time

```sh
date                   # Print the date and time
date --iso-8601        # Print the ISO8601 date
date --iso-8601=ns     # Print the ISO8601 date and time

time tree              # Time how long the tree command takes to execute
```

## Scheduled Tasks

```text
   *      *         *         *           *
Minute, Hour, Day of month, Month, Day of the week
```

```sh
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

```sh
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

```sh
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

```sh
host example.com            # Show the IPv4 and IPv6 addresses

dig example.com             # Show complete DNS information

cat /etc/resolv.conf        # resolv.conf lists nameservers
```

## Hardware

```sh
lsusb                  # List USB devices
lspci                  # List PCI hardware
lshw                   # List all hardware
```

## Terminal Multiplexers

Start multiple terminal sessions. Active sessions persist reboots. `tmux` is more modern than `screen`.

```sh
tmux             # Start a new session (CTRL-b + d to detach)
tmux ls          # List all sessions
tmux attach -t 0 # Reattach to a session

screen           # Start a new session (CTRL-a + d to detach)
screen -ls       # List all sessions
screen -R 31166  # Reattach to a session

exit             # Exit a session
```

## Secure Shell Protocol (SSH)

```sh
ssh hostname                 # Connect to hostname using your current user name over the default SSH port 22
ssh -i foo.pem hostname      # Connect to hostname using the identity file
ssh user@hostname            # Connect to hostname using the user over the default SSH port 22
ssh user@hostname -p 8765    # Connect to hostname using the user over a custom port
ssh ssh://user@hostname:8765 # Connect to hostname using the user over a custom port
```

Set default user and port in `~/.ssh/config`, so you can just enter the name next time:

```sh
$ cat ~/.ssh/config
Host name
  User foo
  Hostname 127.0.0.1
  Port 8765
$ ssh name
```

## Secure Copy

```sh
scp foo.txt ubuntu@hostname:/home/ubuntu # Copy foo.txt into the specified remote directory
```

## Bash Profile

- bash - `.bashrc`
- zsh - `.zshrc`

```sh
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

```sh
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

```sh
#!/bin/bash

env            # List all environment variables
echo $PATH     # Print PATH environment variable
export FOO=Bar # Set an environment variable
```

### Functions

```sh
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

```sh
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

```sh
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

```sh
#!/bin/bash

[[ $USER = 'rehan' ]] && echo 'yes' || echo 'no'
```

#### While Loops

```sh
#!/bin/bash

declare -i counter
counter=10
while [$counter -gt 2]; do
  echo The counter is $counter
  counter=counter-1
done
```

#### For Loops

```sh
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

```sh
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

---

## sort

텍스트를 행 단위로 정렬할 때 사용한다.

```sh
sort -r foo.txt # 내림차순
sort -f foo.txt # 대소문자를 구분하지 않음
```

## awk

리눅스의 SQL문이라 불리며, 텍스트 내용을 테이블로 인지하여 원하는 데이터를 사용자 입맛에 맞게 출력할 수 있다.

- pattern: 각 줄에서 일치시키고자 하는 패턴 (선택적)
- action: 패턴이 일치하는 줄에 대해 수행할 작업

```sh
awk <옵션> "pattern { action }" foo.txt # 문법
awk -F, '{ print }' foo.txt # 구분자로 쉼표(,) 사용 ex) -F- -F/ -F; -F' -F"
awk '{ sum += $2 } END { print "Total:", sum }' foo.txt # 2번째 열 값을 모두 더해서 출력
awk '/ERROR/ { print }' foo.txt # ERROR가 포함된 모든 행 출력
awk '$3 > 50 { print NR, NF, $1, $2, $3 }' foo.txt # 3번째 열 값이 50보다 크면 행 번호, 행의 컬럼 수, 1번째 열, 2번째 열, 3번째 열 출력
```

## alias

자주 사용하는 명령에 별명을 붙여서 편하게 사용할 때 사용한다.

```sh
alias # 별명 리스트 출력
alias foo='ls -lah' # 별명을 가진 명령 생성
unalias foo # 명령 삭제
```

## ngrok

ngrok은 개발자가 로컬 서버를 인터넷에 노출할 수 있도록 임시 URL을 제공해주는 도구다. 이는 웹훅 테스트, 클라이언트 데모 시연 등에 유용하다.

사용 전에 공식 홈페이지에 계정을 생성해서 로그인 후에 인증 과정을 거쳐야한다.

```sh
ngrok http 3000
```

## > /dev/null >2$1

## process

네, 원격 서버에서 실행 중인 프로세스 중에서 본인의 터미널 세션(즉, 현재 사용자가 직접 실행하거나 해당 세션과 관련된)에서 실행된 프로세스만 확인할 수 있는 방법이 있습니다. 리눅스나 유닉스 기반 시스템에서는 사용자의 세션과 관련된 정보를 `ps` 명령어로 확인할 수 있습니다. 다음은 몇 가지 주요 방법입니다.

---

### 1. **현재 세션에서 실행된 프로세스 확인**

```sh
ps -u $(whoami)
```

- 현재 터미널 세션의 TTY 이름 확인:

  ```sh
  tty
  ```

  예: `/dev/pts/2`

- 해당 TTY와 관련된 프로세스 확인:

  ```sh
  ps -t pts/2
  ```

  ```sh
  ps -ef | grep $(whoami)
  ```

- 현재 세션의 부모 프로세스 ID(PPID)와 관련된 프로세스 확인:

  ```sh
  ps --forest
  ```

- 현재 세션의 Bash PID 확인:

  ```sh
  echo $$
  ```

- 해당 PID를 기준으로 자식 프로세스 확인:
  ```sh
  ps --ppid <PID>
  ```

**확인 방법:**

- 터미널에서 `w` 명령을 사용하여 현재 활성 세션을 확인할 수 있습니다.
- 세션이 남아 있다면, 기본 쉘 변경 확인을 위해 모든 로그인 세션이 종료되었는지 반드시 확인해야 합니다.

```sh
w
```

출력 예시:

```
user    pts/0   2023-10-11 14:00 (192.168.0.1)
user    pts/1   2023-10-11 14:05 (192.168.0.2)
user    pts/2   2023-10-11 14:10 (192.168.0.3)
```

여기서 본인의 `pts` 세션이 여전히 남아 있다면 해당 세션은 끊긴 것이 아닙니다.

- `sleep` 상태는 세션이 종료된 상태가 아니며, 잔존하는 프로세스가 있는 것으로 간주됩니다. 이 경우 기본 쉘 변경 사항이 반영되지 않으므로 세션이 완전히 종료되었는지 확인해야 합니다.

- 모든 vscode를 끄고 다시 켜야 로그아웃이 완료됨

## 공인 IP 확인

```sh
curl ifconfig.me
```

## glob pattern

| 패턴 기호 | 설명                                                            | 예시                                                    |
| --------- | --------------------------------------------------------------- | ------------------------------------------------------- |
| `*`       | 0개 이상의 문자를 의미 (디렉토리 구분자는 제외)                 | `*.txt` → 모든 `.txt` 파일                              |
| `?`       | 정확히 1개의 문자와 일치 (디렉토리 구분자는 제외)               | `?.txt` → `a.txt`, `b.txt`                              |
| `[abc]`   | 대괄호 안의 문자 중 하나와 일치                                 | `file[abc].txt` → `filea.txt`, `fileb.txt`, `filec.txt` |
| `[a-z]`   | 대괄호 안의 문자 범위 중 하나와 일치                            | `file[a-z].txt` → `filea.txt`, `fileb.txt`              |
| `[^abc]`  | 대괄호 안의 문자 외의 문자와 일치                               | `file[^a].txt` → `fileb.txt`, `filec.txt`               |
| `[!abc]`  | `[^abc]`와 동일                                                 | `file[!a].txt` → `fileb.txt`, `filec.txt`               |
| `**`      | 모든 디렉토리 또는 0개 이상의 디렉토리를 의미 (재귀적으로 탐색) | `**/*.txt` → 모든 하위 디렉토리의 `.txt` 파일           |

## 다중 명령어 처리

| 구분            | 기호      | 설명                                                                     | 예시              |
| --------------- | --------- | ------------------------------------------------------------------------ | ----------------- |
| 순차 실행       | `;`       | 각 명령어를 순차적으로 실행하며, 앞의 명령이 실패해도 다음 명령을 실행함 | `cmd1; cmd2`      |
| 논리 AND        | `&&`      | 앞의 명령어가 성공한 경우에만 뒤의 명령어를 실행함                       | `cmd1 && cmd2`    |
| 논리 OR         | `\|\|`    | 앞의 명령어가 실패한 경우에만 뒤의 명령어를 실행함                       | `cmd1 \|\| cmd2`  |
| 백그라운드 실행 | `&`       | 명령어를 백그라운드에서 실행하고, 바로 프롬프트로 돌아감                 | `cmd1 &`          |
| 파이프          | `\|`      | 앞의 명령어 출력 결과를 뒤의 명령어 입력으로 전달함                      | `cmd1 \| cmd2`    |
| 명령 그룹화     | `{ }`     | 여러 명령어를 하나의 그룹으로 묶어 실행 (마지막에 세미콜론 필요)         | `{ cmd1; cmd2; }` |
| 서브쉘          | `( )`     | 여러 명령어를 서브쉘에서 실행하여 별도의 환경에서 실행됨                 | `(cmd1; cmd2)`    |
| 명령 치환       | `` ` ` `` | 명령어의 출력을 다른 명령어의 입력으로 사용                              | `` echo `ls` ``   |

## 유저/그룹 관리

### 유저

```sh
whoami # 현재 유저 확인
sudo su # root 사용자로 로그인(root 환경변수)
sudo -s # root 사용자로 로그인(사용자 환경변수)
sudo cat foo.txt # root 권한으로 명령어 실행
sudo adduser foo # 유저 생성
sudo userdel -r foo # 유저 삭제
exit # 유저 변경 전 사용자로 돌아가거나 쉘 종료
```

`adduser` 명령어를 실행하면 다음과 같은 실행흐름을 가진다.

1. 사용자 추가하기
2. 그룹 추가하기
3. 그룹 안에 사용자 추가하기
4. `/home` 디렉토리 안에 사용자 폴더 추가
5. `/etc/skel` 디렉토리 안에 파일 및 폴더를 `/home` 디렉토리 안에 새로 추가된 사용자 폴더에 복사
6. 사용자 패스워드 설정
7. 기타 정보 설정

### 그룹

```sh
sudo groupadd bar # 그룹 생성
sudo groupdel bar # 그룹 삭제
sudo gpasswd bar # 그룹 암호 설정, 이 암호는 그룹에 포함되지 않는 사용자가 그룹으로 로그인하기 위해서 사용된다.
sudo gpasswd -r bar # 그룹 암호 제거
sudo gpasswd -A foo bar # 유저를 그룹 관리자로 설정
sudo gpasswd -a foo bar # 유저를 그룹에 포함
sudo gpasswd -d foo bar # 유저를 그룹에서 제외
groups foo # 유저가 포함된 그룹을 나열, 한 사용자가 여러 그룹에 소속될 수 있다.
```

### 파일/폴더 유저/그룹 변경

```sh
sudo chown foo foo.txt # foo.txt 파일의 유저를 foo로 변경
sudo chown -R foo baz # baz 디렉토리와 하위 파일 모두 유저를 foo로 변경
sudo chown foo:bar foo.txt # foo.txt 파일의 유저와 그룹을 foo와 bar로 변경
sudo chgrp bar foo.txt # foo.txt 파일의 그룹을 bar로 변경, 일반 사용자는 자신이 속한 그룹으로만 변경이 가능하다.
```

### 유저/그룹 정보 경로

```sh
cat /etc/passwd # 유저 정보(사용자이름:암호:사용자ID:그룹ID:추가정보:홈디렉토리:쉘)
cat /etc/group # 유저 그룹 정보
cat /etc/shadow # 비밀번호 정보
cd /etc/skel # /home 디렉토리 안에 유저 폴더에 추가될 파일 및 폴더
```

## echo "$PATH" | tr ':' '\n'

## source 명령어는 스크립트 파일을 수정한 후에 수정된 값을 바로 적용하기 위해 사용하는 명령어
