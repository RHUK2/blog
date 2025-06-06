#!/bin/bash

# color
NOCOLOR="\033[0m"
RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
BLUE="\033[0;34m"

# variable
rootPath=../../
appPath=./apps/feedback

echo "---------- START BUILD PROCESS ----------"
echo -en "${YELLOW}[INPUT]${NOCOLOR} Want to get started? [y/n]: "
read -r answer
if [ "$answer" != "y" ] && [ "$answer" != "Y" ]; then
    exit 1
fi

echo "---------- FIND ENV FILE ----------"
env=$(find . -maxdepth 1 -type f -name "*.env*")
if [ -z "$env" ]; then
    echo ""
    echo -e "${RED}[ERROR]${NOCOLOR} Don't find env file"
    exit 1
else
    echo -e "${GREEN}[INFO]${NOCOLOR} Detect env file"
fi

echo "---------- INPUT BRANCH ----------"
echo -en "${YELLOW}[INPUT]${NOCOLOR} Enter the branch name to import from origin: "
read -r branch
if [ -z "$branch" ]; then
    echo ""
    echo -e "${RED}[ERROR]${NOCOLOR} Please input branch name"
    exit 1
fi

echo "---------- PULL PROCESS ----------"
echo -e "${GREEN}[INFO]${NOCOLOR}remote repository"
if ! git fetch origin; then
    echo -e "${RED}[ERROR]${NOCOLOR} Fetch remote repository"
    exit 1
fi

echo -e "${GREEN}[INFO]${NOCOLOR} Clean up remote branch"
if ! git remote prune origin; then
    echo -e "${RED}[ERROR]${NOCOLOR} Clean up remote branch"
    exit 1
fi

echo -e "${GREEN}[INFO]${NOCOLOR} Switch ${branch:-master}"
if ! git switch "${branch:-master}"; then
    echo -e "${RED}[ERROR]${NOCOLOR} Switch ${branch:-master}"
    exit 1
fi

echo -e "${GREEN}[INFO]${NOCOLOR} Merge origin/${branch:-master}"
if ! git merge "origin/${branch:-master}"; then
    echo -e "${RED}[ERROR]${NOCOLOR} Merge origin/${branch:-master}"
    exit 1
fi

echo "---------- PACKAGE INSTALL ----------"
# because monorepo
cd $rootPath || exit 1
echo -e "${BLUE}[PATH]${NOCOLOR} $PWD"

echo -e "${GREEN}[INFO]${NOCOLOR} npm ci"
if ! npm ci; then
    echo -e "${RED}[ERROR]${NOCOLOR} npm ci"
    exit 1
fi

cd $appPath || exit 1
echo -e "${BLUE}[PATH]${NOCOLOR} $PWD"

echo "---------- BACKUP PROCESS ----------"
if [ ! -e backup ]; then
    mkdir backup
fi

if [ -e .next ]; then
    datetime=$(date +%Y%m%d_%H%M%S)
    mkdir "./backup/$datetime"
    cp -r .next "backup/$datetime/.next"
    echo -e "${GREEN}[INFO]${NOCOLOR} Complete backup"
fi

if [ -e backup ]; then
    cd backup || exit 1
    echo -e "${BLUE}[PATH]${NOCOLOR} $PWD"

    fileCount=$(find . -mindepth 1 -maxdepth 1 -type d | wc -l)

    if [ "$fileCount" -ge 5 ]; then
        excluded_folders=$(find . -mindepth 1 -maxdepth 1 -type d | sort -r | awk 'NR>5 {print}')

        for folder in $excluded_folders; do
            rm -r "$folder"
            echo -e "${GREEN}[INFO]${NOCOLOR} Delete old backup($folder)"
        done
    else
        echo -e "${GREEN}[INFO]${NOCOLOR} There are no old backup to delete."
    fi

    cd .. || exit 1
    echo -e "${BLUE}[PATH]${NOCOLOR} $PWD"
fi

echo "---------- MAKE BUILD ----------"
