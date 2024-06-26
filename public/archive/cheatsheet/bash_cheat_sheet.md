---
updatedAt: 2024-04-21
directory: cheatsheet
fileName: bash_cheat_sheet
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
- [glob pattern](#glob-pattern)
- [세미콜론( ; )](#세미콜론--)
- [버티컬바( | )](#버티컬바--)
- [더블 버티컬바( || )](#더블-버티컬바--)
- [엠퍼센트( \& )](#엠퍼센트--)
- [더블 엠퍼센트( \&\& )](#더블-엠퍼센트--)
- [sort](#sort)
- [awk](#awk)
- [alias](#alias)
- [유저/그룹 관리](#유저그룹-관리)
  - [유저](#유저)
  - [그룹](#그룹)
  - [파일/폴더 유저/그룹 변경](#파일폴더-유저그룹-변경)
  - [유저/그룹 정보 경로](#유저그룹-정보-경로)
- [ngrok](#ngrok)
- [방화벽](#방화벽)
  - [1. `ufw` 설치 및 활성화](#1-ufw-설치-및-활성화)
  - [2. 방화벽 상태 확인](#2-방화벽-상태-확인)
  - [3. 기본 정책 설정](#3-기본-정책-설정)
  - [4. 규칙 추가 및 제거](#4-규칙-추가-및-제거)
    - [포트 열기](#포트-열기)
    - [포트 차단](#포트-차단)
    - [서비스 이름으로 허용](#서비스-이름으로-허용)
  - [5. 규칙 삭제](#5-규칙-삭제)
  - [6. 특정 IP 주소 허용 및 차단](#6-특정-ip-주소-허용-및-차단)
  - [7. 로그 설정](#7-로그-설정)
  - [8. 비활성화](#8-비활성화)

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
wc -l foo.txt             # number of row
wc -w foo.txt             # number of word
wc -c foo.txt             # number of bytes
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

---

## glob pattern

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

## 세미콜론( ; )

앞의 명령어의 성공여부와 상관없이, 단순하게 앞의 명령어부터 차례대로 실행한다.

```sh
mkdir foo; cd foo; # foo 폴더 생성 후 foo 폴더로 이동
```

## 버티컬바( | )

앞의 명령어의 실행결과를 뒤의 명령어로 넘겨준다.

```sh
ls -a | grep "foo" # 현재 폴더의 목록 정보를 넘겨주고 grep 명령어로 test 문자를 탐색한다.
```

## 더블 버티컬바( || )

앞의 명령어가 성공하면 뒤의 명령어를 실행하지 않고, 실패하면 뒤의 명령어를 실행한다.

```sh
rm foo.txt || sudo rm foo.txt # 권한 문제로 삭제에 실패하면, root 권한으로 삭제한다.
```

## 엠퍼센트( & )

앞의 명령어를 백그라운드에서 실행한 후 즉시 뒤의 명령어를 실행한다.

```sh
mkdir foo & cd foo # test 폴더 이동을 백그라운드로 실행하면서 폴더가 생기기도 전에 test로 이동하려고 해서 실패한다.
```

## 더블 엠퍼센트( && )

앞의 명령어가 성공하면 뒤의 명령어를 실행하고, 실패하면 뒤의 명령어를 실행하지 않는다.

```sh
sudo apt update && sudo apt upgrade -y # 패키지 업데이트의 성공하면 패키지를 업그레이드한다.
```

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

## 유저/그룹 관리

```bash
whoami # 현재 유저 확인
sudo su # root 권한 쉘 열기
sudo cat foo.txt # root 권한으로 명령어 실행
exit # 유저 변경 전 사용자로 돌아가거나 쉘 종료
```

### 유저

```bash
sudo adduser foo # 유저 생성
sudo userdel -r foo # 유저 삭제
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

```bash
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

```bash
sudo chown foo foo.txt # foo.txt 파일의 유저를 foo로 변경
sudo chown -R foo baz # baz 디렉토리와 하위 파일 모두 유저를 foo로 변경
sudo chown foo:bar foo.txt # foo.txt 파일의 유저와 그룹을 foo와 bar로 변경
sudo chgrp bar foo.txt # foo.txt 파일의 그룹을 bar로 변경, 일반 사용자는 자신이 속한 그룹으로만 변경이 가능하다.
```

### 유저/그룹 정보 경로

```bash
cat /etc/passwd # 유저 정보(사용자이름:암호:사용자ID:그룹ID:추가정보:홈디렉토리:쉘)
cat /etc/group # 유저 그룹 정보
cat /etc/shadow # 비밀번호 정보
cd /etc/skel # /home 디렉토리 안에 유저 폴더에 추가될 파일 및 폴더
```

## ngrok

ngrok은 개발자가 로컬 서버를 인터넷에 노출할 수 있도록 임시 URL을 제공해주는 도구다. 이는 웹훅 테스트, 클라이언트 데모 시연 등에 유용하다.

사용 전에 공식 홈페이지에 계정을 생성해서 로그인 후에 인증 과정을 거쳐야한다.

```bash
ngrok http 3000
```

## 방화벽

리눅스(우분투)에서 방화벽을 설정하고 제어하는 가장 일반적인 방법은 `ufw` (Uncomplicated Firewall)입니다. `ufw`는 iptables를 간단하게 관리할 수 있게 해주는 도구입니다. `ufw`를 사용하면 기본적인 방화벽 설정을 쉽게 수행할 수 있습니다.

### 1. `ufw` 설치 및 활성화

`ufw`는 대부분의 우분투 배포판에 기본적으로 설치되어 있지만, 설치되어 있지 않은 경우 다음 명령어를 사용하여 설치할 수 있습니다.

```bash
sudo apt-get update
sudo apt-get install ufw
```

설치 후, `ufw`를 활성화하려면 다음 명령어를 사용합니다.

```bash
sudo ufw enable
```

### 2. 방화벽 상태 확인

현재 방화벽 상태를 확인하려면 다음 명령어를 사용합니다.

```bash
sudo ufw status
```

### 3. 기본 정책 설정

기본 정책을 설정하여 들어오는 트래픽을 차단하고 나가는 트래픽을 허용할 수 있습니다. 다음 명령어를 사용하여 기본 정책을 설정할 수 있습니다.

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

### 4. 규칙 추가 및 제거

특정 포트나 서비스에 대한 규칙을 추가하고 제거하는 방법을 설명합니다.

#### 포트 열기

예를 들어, SSH(포트 22)를 허용하려면 다음 명령어를 사용합니다.

```bash
sudo ufw allow 22/tcp
```

HTTP(포트 80)를 허용하려면 다음과 같이 입력합니다.

```bash
sudo ufw allow 80/tcp
```

HTTPS(포트 443)를 허용하려면 다음과 같이 입력합니다.

```bash
sudo ufw allow 443/tcp
```

#### 포트 차단

특정 포트를 차단하려면 `allow` 대신 `deny`를 사용합니다. 예를 들어, 포트 22를 차단하려면 다음과 같습니다.

```bash
sudo ufw deny 22/tcp
```

#### 서비스 이름으로 허용

서비스 이름을 사용하여 허용할 수도 있습니다. 예를 들어, OpenSSH 서비스를 허용하려면 다음과 같이 입력합니다.

```bash
sudo ufw allow OpenSSH
```

### 5. 규칙 삭제

규칙을 삭제하려면 `delete` 명령을 사용합니다. 예를 들어, 포트 22에 대한 허용 규칙을 삭제하려면 다음과 같습니다.

```bash
sudo ufw delete allow 22/tcp
```

### 6. 특정 IP 주소 허용 및 차단

특정 IP 주소에서 들어오는 연결을 허용하려면 다음과 같이 입력합니다.

```bash
sudo ufw allow from 192.168.1.100
```

특정 IP 주소에서 들어오는 연결을 특정 포트에 대해서만 허용하려면 다음과 같이 입력합니다.

```bash
sudo ufw allow from 192.168.1.100 to any port 22
```

특정 IP 주소를 차단하려면 다음과 같이 입력합니다.

```bash
sudo ufw deny from 192.168.1.100
```

### 7. 로그 설정

방화벽 로그를 활성화하여 어떤 트래픽이 차단되었는지 확인할 수 있습니다. 로그를 활성화하려면 다음과 같이 입력합니다.

```bash
sudo ufw logging on
```

로그를 확인하려면 `/var/log/ufw.log` 파일을 확인할 수 있습니다.

### 8. 비활성화

방화벽을 비활성화하려면 다음 명령어를 사용합니다.

```bash
sudo ufw disable
```

이러한 명령어들을 사용하여 우분투에서 방화벽을 설정하고 관리할 수 있습니다. `ufw`는 간단하면서도 강력한 방화벽 관리 도구로, 기본적인 방화벽 설정을 손쉽게 수행할 수 있습니다.
