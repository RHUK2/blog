#!/bin/bash

folderName=$(pwd | rev | cut -d'/' -f1 | rev)-deploy

if [ -e .next ]; then
    rm -rf "./$folderName"
    rsync -a --exclude="backup" ./ ./"$folderName"
    touch ./"$folderName"/service.txt
    echo "true,
서비스 점검 중 입니다.
0000년 00월 00일 00:00 - 00:00" >./"$folderName"/service.txt
    echo "🔥  Complete copy 🔥"
fi

isActive=$(pm2 list | grep "checker360-web")

# update or host
if [ -n "$isActive" ]; then
    pm2 reload checker360-web
else
    pm2 delete checker360-web
    cd ./"$folderName" && pm2 start "npm run start" --name checker360-web
fi

echo "🔥  END 🔥"
