---
updatedAt: 2024-04-21
directory: Cheatsheet
fileName: Bash_Cheat_Sheet
title: Bash Cheat Sheet
description: ✅
---

# Bash Cheat Sheet

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
- [위 내용에 없는 것들](#위-내용에-없는-것들)
  - [glob pattern](#glob-pattern)
  - [세미콜론( ; )](#세미콜론--)
  - [버티컬바( | )](#버티컬바--)
  - [더블 버티컬바( || )](#더블-버티컬바--)
  - [엠퍼센트( \& )](#엠퍼센트--)
  - [더블 엠퍼센트( \&\& )](#더블-엠퍼센트--)
  - [wc](#wc)
  - [sort](#sort)
  - [awk](#awk)
  - [alias](#alias)
  - [nslookup](#nslookup)
- [리눅스 계정 제어하기](#리눅스-계정-제어하기)
  - [su vs sudo](#su-vs-sudo)
  - [whoami](#whoami)
  - [exit](#exit)
- [리눅스 사용자 관리하기](#리눅스-사용자-관리하기)
  - [adduser 명령어로 사용자 추가하기](#adduser-명령어로-사용자-추가하기)
  - [사용자 정보 확인하기](#사용자-정보-확인하기)
  - [userdel 명령어로 사용자 삭제하기](#userdel-명령어로-사용자-삭제하기)
- [리눅스 그룹 관리하기](#리눅스-그룹-관리하기)
  - [사용자 그룹 확인 groups 명령어](#사용자-그룹-확인-groups-명령어)
  - [그룹 만들기 groupadd 명령어](#그룹-만들기-groupadd-명령어)
  - [그룹 삭제 groupdel 명령어](#그룹-삭제-groupdel-명령어)
  - [그룹 관리 gpasswd 명령어](#그룹-관리-gpasswd-명령어)
  - [다른 그룹 로그인 newgrp 명령어](#다른-그룹-로그인-newgrp-명령어)
- [리눅스 권한 관리하기](#리눅스-권한-관리하기)
  - [파일, 폴더 권한 확인하기 ls -l 명령어](#파일-폴더-권한-확인하기-ls--l-명령어)
  - [파일, 폴더 권한 변경하기 chmod 명령어](#파일-폴더-권한-변경하기-chmod-명령어)
  - [파일, 폴더 소유권 변경하기 chown 명령어(루트 사용자만 가능)](#파일-폴더-소유권-변경하기-chown-명령어루트-사용자만-가능)
  - [주요 기능](#주요-기능)
  - [사용 예](#사용-예)
  - [실용적인 사용 예](#실용적인-사용-예)

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

## 위 내용에 없는 것들

### glob pattern

- `*`: 0개 이상의 임의의 문자와 일치한다. 디렉터리 구분 기호를 포함하지 않는다.

  - `*.txt`는 확장자가 '.txt'인 모든 파일과 일치합니다.

- `?`: 정확히 한 개의 임의의 문자와 일치한다.

  - `file?.txt`는 'file1.txt', 'fileA.txt' 등과 일치하지만 'file.txt'와 일치하지 않는다.

- `[...]`: 괄호 안에 있는 문자 중 하나와 일치한다.

  - `[abc]`는 'a', 'b', 'c' 중 하나와 일치한다.
  - `[0-9]`는 '0'부터 '9'까지의 숫자 중 하나와 일치한다.

- `[!...]`: 괄호 안에 있는 문자를 제외한 다른 문자와 일치한다.

  - `file[!0-9].txt`는 'fileA.txt', 'fileX.txt' 등과 일치하지만 'file1.txt'와 일치하지 않는다.

- `**`: 임의의 디렉터리와 그 하위 디렉터리를 재귀적으로 일치시킨다. 디렉터리 구분 기호를 포함한다.

  - `dir/**/*.txt`는 'dir' 디렉터리와 그 하위 모든 디렉터리에서 확장자가 '.txt'인 파일과 일치한다.

- `{pattern1,pattern2,...}`: 괄호 안에 나열된 여러 패턴 중 하나와 일치한다.
  - `file{.txt,.md}`는 'file.txt' 또는 'file.md'와 일치한다.

### 세미콜론( ; )

앞의 명령어의 성공여부와 상관없이, 단순하게 앞의 명령어부터 차례대로 실행한다.

```sh
mkdir test; cd test; # test 폴더 생성 후 test 폴더로 이동
```

### 버티컬바( | )

앞의 명령어의 실행결과를 뒤의 명령어로 넘겨준다.

```sh
ls -a | grep test # 현재 폴더의 목록 정보를 넘겨주고 grep 명령어로 test 문자를 탐색한다.
```

### 더블 버티컬바( || )

앞의 명령어가 성공하면 뒤의 명령어를 실행하지 않고, 실패하면 뒤의 명령어를 실행한다.

```sh
rm test.txt || sudo rm test.txt # 권한 문제로 삭제에 실패하면, root 권한으로 삭제한다.
```

### 엠퍼센트( & )

앞의 명령어를 백그라운드에서 실행한 후 즉시 뒤의 명령어를 실행한다.

```sh
mkdir test & cd test # test 폴더 이동을 백그라운드로 실행하면서 폴더가 생기기도 전에 test로 이동하려고 해서 실패한다.
```

### 더블 엠퍼센트( && )

앞의 명령어가 성공하면 뒤의 명령어를 실행하고, 실패하면 뒤의 명령어를 실행하지 않는다.

```sh
sudo apt update && sudo apt upgrade -y # 패키지 업데이트의 성공하면 패키지를 업그레이드한다.
```

### wc

텍스트에서 단어 수, 행 수, 바이트 수를 출력해준다.

```sh
wc -l # 행 개수
wc -w # 단어 개수
wc -c # 바이트 수
```

### sort

텍스트를 행 단위로 정렬할 때 사용한다.

```sh
sort -r # 내림차순
sort -f # 대소문자를 구분하지 않음
```

### awk

리눅스의 SQL문이라 불리며, 텍스트 내용을 테이블로 인지하여 원하는 데이터를 사용자 입맛에 맞게 출력할 수 있다.

```sh
awk <옵션> "pattern { action }" <상대 경로 | 절대 경로>
```

### alias

자주 사용하는 명령에 별명을 붙여서 편하게 사용할 때 사용한다.

```sh
alias # 별명 리스트 출력
alias <별명>='명령' # 별명을 가진 명령 생성
unalias <별명> # 명령 삭제
```

### nslookup

DNS(Domain Name System) 정보를 조회하는 데 사용된다.

```sh
nslookup <도메인 주소> # 도메인에 해당하는 IP 반환
nslookup <IP 주소> # IP에 해당하는 도메인 반환
```

---

## 리눅스 계정 제어하기

---

리눅스(Linux)에서 특정 명령을 실행하거나, 특정 파일에 접근하기 위해서 때로는 루트 권한이 필요한 경우가 있습니다. 이러한 경우에 사용하게 되는 `su`, `sudo` 명령어들과 각 명령어들의 차이점, 현재 계정을 확인하는 `whoami` 명령어와 계정 전환 후 다시 이전 계정으로 돌아가게 하는 `exit` 명령어들에 관한 내용입니다.

### su vs sudo

일반 사용자가 루트 권한을 사용하기 위해서는 `su`(Switch User) 혹은 `sudo`(SuperUser DO) 명령어를 사용하면 됩니다.

📌 `su` 명령어
Switch User에서 알 수 있듯이, 현재 계정을 로그아웃하지 않고 다른 계정으로 전환하는 명령어 입니다.

```bash
$ su # root 계정으로 이동
$ su - # root 계정의 환경 변수를 가져오며 이동
$ su <유저 이름> # 유저 계정으로 이동
$ su - <유저 이름> # 유저 계정의 환경 변수를 가져오며 이동
```

`su` 명령어를 실행하게 되면 `root` 사용자의 비밀번호를 물어봅니다. 여기서 `-` 의 유무의 차이가 있습니다.

`su` 와 `su -` 는 둘 다 루트 계정으로 전환하는 것을 의미하지만, `su`는 `root` 계정의 환경 변수를 가져오지 않고, 현재 계정의 환경 변수를 사용하게 되는 차이점이 있습니다.

`su -`로 로그인을 하게 되면 기본 `/root` 디렉토리로 이동하게 됩니다.

📌 `sudo` 명령어
SuperUser DO 에서 알 수 있듯이, 슈퍼 유저로 무언가를 수행한다는 의미를 가지고 있는 명령어 입니다. 현재 계정에서 단순히 `root`의 권한 만을 빌리는 것입니다.

```bash
$ sudo <명령어>
```

`sudo` 명령어를 실행하게 되면 `root` 권한으로 명령어를 실행하게 됩니다. 즉, 하나의 명령에 대하여 일시적으로 `root` 권한을 사용하는 것을 말합니다. 실행하기 전 현재 사용자의 비밀번호를 물어봅니다.

### whoami

현재 사용자를 확인하는 명령어 입니다.

### exit

전환 전 계정으로 돌아가는 명령어 입니다.

sudo는 cd와 같이 사용할 수 없습니다. 이는 sudo가 새로운 쉘을 실행하는 것이 아니기 때문에, cd 명령은 원래의 셸에 영향을 미치지 않기 때문입니다. 대신, sudo -s나 sudo su를 사용하여 루트 쉘을 열고 그 안에서 cd 명령을 사용하면 됩니다.

루트 권한으로 쉘 열기
루트 쉘 열기:

bash
코드 복사
sudo -s
또는

bash
코드 복사
sudo su
루트 쉘에서 디렉토리 이동:

bash
코드 복사
cd /var/lib/docker/volumes/jenkins-home/\_data
이렇게 하면 루트 권한으로 원하는 디렉토리에 접근할 수 있습니다.

예시:
sudo -s 명령을 사용하여 루트 쉘 열기:

bash
코드 복사
sudo -s
루트 쉘에서 디렉토리로 이동:

bash
코드 복사
cd /var/lib/docker/volumes/jenkins-home/\_data
작업 완료 후 루트 쉘 종료:

bash
코드 복사
exit
이 방법을 사용하면 권한 문제 없이 Docker 볼륨에 접근할 수 있습니다.

추가 팁: 특정 명령만 루트 권한으로 실행하기
만약 특정 명령만 루트 권한으로 실행하고 싶다면 sudo를 사용하여 명령을 실행할 수 있습니다. 예를 들어, ls 명령을 사용하여 디렉토리 내용을 확인하려면:

bash
코드 복사
sudo ls /var/lib/docker/volumes/jenkins-home/\_data
이 명령은 해당 디렉토리의 내용을 루트 권한으로 출력합니다.

결론
루트 권한으로 디렉토리에 접근하기 위해 sudo -s나 sudo su를 사용하여 루트 쉘을 열고, 그 안에서 cd 명령을 사용하는 것이 가장 효율적인 방법입니다. 이렇게 하면 권한 문제를 해결하고 필요한 작업을 수행할 수 있습니다.

---

## 리눅스 사용자 관리하기

---

리눅스(Linux)는 멀티유저(다중사용자) 운영체제이기 때문에 많은 사람들이 한 컴퓨터를 사용할 수 있습니다. 사용자가 많기 때문에 운영체제 관리자가 사용자들을 관리할 필요가 있습니다.

### adduser 명령어로 사용자 추가하기

```bash
$ sudo adduser <유저 이름>
```

위와 같이 명령어를 입력하면 리눅스 사용자를 추가할 수 있습니다.

`adduser` 명령어를 실행하면 다음과 같은 실행흐름을 가집니다.

🕐 사용자 추가하기
🕑 그룹 추가하기
🕒 그룹 안에 사용자 추가하기
🕓 `/home` 디렉토리 안에 사용자 폴더 추가
🕔 `/etc/skel` 디렉토리 안에 파일 및 폴더를 `/home` 디렉토리 안에 새로 추가된 사용자 폴더에 복사
🕕 사용자 패스워드 설정
🕖 기타 정보 설정
![](https://images.velog.io/images/gusdnr814/post/ed299d5b-c41e-422c-9339-a030f7cbb732/image.png)

### 사용자 정보 확인하기

```bash
$ cat /etc/passwd # 사용자 정보
$ cat /etc/group # 사용자 그룹 정보
$ cat /etc/shadow # 비밀번호 정보
$ cd /etc/skel # /home 디렉토리 안에 사용자 폴더에 추가될 파일 및 폴더
```

`cat /etc/passwd`로 사용자 정보 파일을 열면 사용자 정보가 나열되어 있습니다.

📌 출력 결과 - 사용자이름:암호:사용자ID:그룹ID:추가정보:홈디렉토리:쉘

### userdel 명령어로 사용자 삭제하기

```bash
$ sudo userdel -r <유저 이름>
```

위와 같이 명령어를 입력하면 리눅스 사용자를 삭제할 수 있습니다. 유저와 관련된 모든 내용을 삭제하기 위해 `userdel` 명령어 `-r` 옵션을 사용합니다.

---

## 리눅스 그룹 관리하기

---

리눅스(Linux)에서는 사용자, 그룹, 기타 사용자로 구분하여 권한 관리를 하게 됩니다. 새로운 사용자를 만들면 보통 사용자와 같은 이름으로 그룹을 만들어 설정합니다.

### 사용자 그룹 확인 groups 명령어

```bash
$ groups <유저 이름> # <유저 이름> : <그룹 이름> ...
```

사용자가 포함된 그룹을 나열합니다. 한 사용자가 여러 그룹에 소속될 수 있습니다.

### 그룹 만들기 groupadd 명령어

```bash
$ sudo groupadd <그룹 이름>
```

새로운 그룹을 하나 만듭니다. 생성한 그룹은 `/etc/group` 파일에서 확인 가능합니다.

### 그룹 삭제 groupdel 명령어

```bash
$ sudo groupdel <그룹 이름>
```

그룹을 삭제합니다.

### 그룹 관리 gpasswd 명령어

```bash
$ sudo gpasswd <그룹 이름>
```

그룹의 암호를 설정합니다. 이 암호는 그룹에 포함되지 않는 사용자가 그룹으로 로그인하기 위해서 사용됩니다.

```bash
$ sudo gpasswd -r <그룹 이름>
```

그룹의 암호를 제거합니다.

```bash
$ sudo gpasswd -A <유저 이름> <그룹 이름>
```

사용자를 그룹 관리자로 설정합니다.

```bash
$ sudo gpasswd -a <유저 이름> <그룹 이름>
```

사용자를 그룹에 포함시킵니다.

```bash
$ sudo gpasswd -d <유저 이름> <그룹 이름>
```

사용자를 그룹에서 제외시킵니다.

### 다른 그룹 로그인 newgrp 명령어

```bash
$ newgrp <그룹 이름>
```

파일을 생성하는 등 작업한 내용이 로그인한 그룹명으로 기록됩니다.

---

## 리눅스 권한 관리하기

---

리눅스(Linux)는 하나의 컴퓨터를 여러 사람이 사용할 수 있는 멀티유저 운영체제(OS)이기 때문에 권한 관리가 매우 중요합니다. 파일과 디렉토리의 권한을 변경하고 소유권을 변경하는 방법을 알아보겠습니다. 보안에 중요한 내용이기 때문에 정확하게 이해하고 넘어가는 것이 좋습니다.

### 파일, 폴더 권한 확인하기 ls -l 명령어

`ls -l`명령을 사용하여 파일, 폴더 리스트를 출력하면 권한(퍼미션, 허가권)을 확인할 수 있습니다.

```bash
$ -rwxr-xr-x 1 user group 5720 Jul  3 20:06 a.out
$ -rw-r--r-- 1 user group  722 Jul  2 21:12 crontab.bak
$ -rw-r--r-- 1 user group   52 Jul  2 21:10 test.c
```

📌 출력 결과 - 파일 종류 및 권한(퍼미션):링크수:사용자(소유자):그룹:파일크기:수정시간:파일이름

### 파일, 폴더 권한 변경하기 chmod 명령어

파일 및 폴더에 권한 변경 시 사용됩니다. `$ ls -l`로 목록을 보면 파일 권한이 `-rwxr-xr-x`와 같은 형태로 표시됩니다. 맨 앞이 `-`인 경우는 파일, `d`인 경우는 폴더입니다. 나머지 문자들은 아래 이미지와 같은 역할을 합니다.
![](https://velog.velcdn.com/images/gusdnr814/post/cfca032a-9f46-4b8d-b750-7a8fc1f1b8eb/image.png)
이는 8진법을 통해 쉽게 권한을 변경할 수 있습니다.

```bash
$ chmod 777 <파일명> # -rwxrwxrwx
$ chmod 755 <폴더명> # drwxr-xr-x
```

### 파일, 폴더 소유권 변경하기 chown 명령어(루트 사용자만 가능)

리눅스 `chmod` 명령어는 파일, 디렉토리의 권한(퍼미션, 허가권)을 변경하는 역할을 합니다. 반면 `chown` 명령을 사용하면 파일, 디렉토리의 사용자, 그룹을 변경할 수 있습니다. 쉽게 말해 파일의 소유권을 변경하는 것입니다.

```bash
$ sudo chown <유저 이름> <파일 및 폴더 이름>
```

`chown` 명령으로 파일 및 폴더의 사용자를 유저 이름으로 변경한다.

```bash
$ sudo chown -R <유저 이름> <파일 및 폴더 이름>
```

`-R` 옵션을 사용하면 디렉토리와 그 안에 들어있는 모든 파일의 사용자를 변경한다.

```bash
$ sudo chgrp  <그룹 이름> <파일 및 폴더 이름>
```

`chgrp` 명령으로 파일 및 폴더의 그룹을 그룹 이름으로 변경한다. 일반 사용자는 자신이 속한 그룹으로만 변경이 가능하다.

```bash
$ sudo chown <유저 이름>:<그룹 이름> <파일 및 폴더 이름>
```

`chown` 명령으로 파일 및 폴더의 사용자와 그룹을 동시에 변경한다.

ngrok은 개발자가 로컬 서버를 인터넷에 노출할 수 있도록 돕는 도구입니다. ngrok을 사용하면 로컬 환경에서 개발 중인 애플리케이션을 외부에서 접근할 수 있는 임시 URL을 통해 쉽게 공유할 수 있습니다. 이는 웹훅 테스트, 데모, 클라이언트 피드백 수집 등에 유용합니다.

### 주요 기능

1. **로컬 서버를 인터넷에 노출**: ngrok은 로컬 서버의 포트를 지정된 서브도메인으로 터널링하여 외부에서 접근 가능하게 만듭니다.
2. **HTTPS 지원**: ngrok은 자동으로 HTTPS를 지원하여 보안 연결을 제공합니다.
3. **사용자 지정 서브도메인 및 도메인**: 유료 플랜에서는 사용자 지정 서브도메인 및 도메인을 사용할 수 있습니다.
4. **트래픽 검토 및 재전송**: 대시보드를 통해 요청 및 응답을 실시간으로 모니터링하고 재전송할 수 있습니다.
5. **비밀번호 보호**: 터널에 비밀번호를 설정하여 인증된 사용자만 접근할 수 있도록 할 수 있습니다.
6. **네트워크 프로토콜 지원**: HTTP뿐만 아니라 TCP, TLS 등의 프로토콜도 지원합니다.

### 사용 예

1. **설치 및 실행**

ngrok은 다양한 플랫폼에서 사용할 수 있습니다. 먼저, [ngrok 공식 웹사이트](https://ngrok.com/)에서 다운로드하고 설치합니다.

2. **로컬 서버에 대한 터널 열기**

터널을 열기 위해 ngrok 명령어를 사용합니다. 예를 들어, 로컬 서버가 포트 8080에서 실행 중인 경우:

```bash
ngrok http 8080
```

이 명령을 실행하면 다음과 같은 출력이 나타납니다:

```
ngrok by @inconshreveable                                       (Ctrl+C to quit)

Session Status                online
Account                       Your Account Name (Plan: Free)
Version                       2.3.40
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://randomsubdomain.ngrok.io -> http://localhost:8080
Forwarding                    https://randomsubdomain.ngrok.io -> http://localhost:8080

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

여기서 `http://randomsubdomain.ngrok.io`와 `https://randomsubdomain.ngrok.io`는 외부에서 접근할 수 있는 URL입니다.

3. **웹 인터페이스 사용**

ngrok은 로컬에서 실행되는 대시보드를 제공합니다. `http://127.0.0.1:4040`에 접속하여 현재 터널의 트래픽을 모니터링하고, 요청 및 응답을 확인할 수 있습니다.

### 실용적인 사용 예

- **웹훅 테스트**: 외부 서비스의 웹훅을 로컬에서 테스트할 때 유용합니다. 예를 들어, GitHub 웹훅을 설정하여 로컬 서버에서 처리할 수 있습니다.
- **클라이언트 데모**: 개발 중인 기능을 클라이언트에게 실시간으로 보여줄 수 있습니다.
- **원격 디버깅**: 팀원이나 다른 개발자가 로컬 서버에 접근하여 디버깅을 도와줄 수 있습니다.
- **IoT 장치 연결**: 로컬 서버에서 실행되는 애플리케이션을 IoT 장치와 연결할 때 사용할 수 있습니다.

ngrok은 로컬 개발 환경을 외부와 손쉽게 연결할 수 있는 매우 유용한 도구입니다. 이를 통해 개발자는 다양한 네트워킹 문제를 간단하게 해결할 수 있습니다.
