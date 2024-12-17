#!/bin/bash

# color
NOCOLOR="\033[0m"
GREEN="\033[0;32m"
BLUE="\033[0;34m"

# variable
folderName=$(pwd | rev | cut -d'/' -f1 | rev)-deploy
pm2Name=feedback-web

echo "---------- MAKE DEPLOY ----------"
if [ -e .next ]; then
    rm -rf "./$folderName"
    mkdir ./"$folderName"
    rsync -a ./.next ./"$folderName"
    rsync -a ./public ./"$folderName"
    rsync -a ./i18n.json ./"$folderName"
    rsync -a ./.env.local ./"$folderName"
    rsync -a ./service.txt ./"$folderName"
    rsync -a ./package.json ./"$folderName"
    rsync -a ./next.config.js ./"$folderName"
fi
echo -e "${GREEN}[INFO]${NOCOLOR} Complete Deploy"

isActive=$(pm2 list | grep "$pm2Name")

if [ -n "$isActive" ]; then
    echo -e "${GREEN}[INFO]${NOCOLOR} Update "
    pm2 reload $pm2Name
else
    echo -e "${GREEN}[INFO]${NOCOLOR} Host "
    pm2 delete $pm2Name
    cd ./"$folderName" || exit 1
    echo -e "${BLUE}[PATH]${NOCOLOR} $PWD"
    pm2 start "npm run start" --name $pm2Name
fi

echo "---------- END BUILD PROCESS ----------"
