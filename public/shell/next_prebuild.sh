#!/bin/bash

echo "⚠️  WARNING ⚠️"
echo "You want to try to build and deploy."

# check 1
echo -n "Is everything ready? [y/n] "
read -r answer
if [ "$answer" != "y" ] && [ "$answer" != "Y" ]; then
    exit 1
fi

# check 2
echo -n "Are you sure? [y/n] "
read -r answer
if [ "$answer" != "y" ] && [ "$answer" != "Y" ]; then
    exit 1
fi

# find environment file
env=$(find . -maxdepth 1 -type f -name "*.env.*")
if [ -z "$env" ]; then
    echo ""
    echo "⚠️  Don't find env file ⚠️"
    exit 1
else
    echo "🔥  Detect env file 🔥"
fi

# input branch name
echo -n "Enter the branch name to import from origin: "
read -r branch
if [ -z "$branch" ]; then
    echo ""
    echo "⚠️  Please input branch name ⚠️"
    exit 1
fi

# create backup folder
if [ ! -e backup ]; then
    mkdir backup
    echo "🔥  Make backup directory 🔥"
fi

# .next folder(build file) backup
if [ -e .next ]; then
    datetime=$(date +%Y%m%d_%H%M%S)
    cp -r .next backup/"$datetime"
    echo "🔥  Complete backup 🔥"
fi

# delete old backup
if [ -e backup ]; then
    cd backup || exit 1

    fileCount=$(find . -mindepth 1 -maxdepth 1 -type d | wc -l)

    if [ "$fileCount" -ge 5 ]; then
        excluded_folders=$(find . -mindepth 1 -maxdepth 1 -type d | sort -r | awk 'NR>5 {print}')

        for folder in $excluded_folders; do
            rm -r "$folder"
            echo "🔥  Delete $folder 🔥"
        done
    else
        echo "🔥  There are no folders to delete. 🔥"
    fi

    cd ..
fi

echo "🔥  Fetch remote repository 🔥"
if ! git fetch origin; then
    exit 1
fi

echo "🔥  Clean up remote branch 🔥"
if ! git remote prune origin; then
    exit 1
fi

echo "🔥  Switch ${branch:-master} 🔥"
if ! git switch "${branch:-master}"; then
    exit 1
fi

echo "🔥  Merge origin/${branch:-master} 🔥"
if ! git merge "origin/${branch:-master}"; then
    exit 1
fi

echo "🔥  npm Install 🔥"

# because monorepo case
cd ../../ && npm install && cd ./apps/feedback || exit 1

echo "🔥  npm run build 🔥"
