#!/bin/bash

folderName=$(pwd | rev | cut -d'/' -f1 | rev)-deploy
pm2Name=checker360-web
notice="true,
서비스 점검 중 입니다.
0000년 00월 00일 00:00 - 00:00"

if [ -e .next ]; then
    rm -rf "./$folderName"
    mkdir ./"$folderName"
    rsync -a ./.next ./"$folderName"
    rsync -a ./public ./"$folderName"
    rsync -a ./i18n.json ./"$folderName"
    rsync -a ./package.json ./"$folderName"
    touch ./"$folderName"/service.txt
    echo "$notice" >./"$folderName"/service.txt
    echo "🔥  Complete copy 🔥"
fi

isActive=$(pm2 list | grep "$pm2Name")

# update or host
if [ -n "$isActive" ]; then
    pm2 reload $pm2Name
else
    pm2 delete $pm2Name
    cd ./"$folderName" && pm2 start "npm run start" --name $pm2Name
fi

echo "🔥  END 🔥"
