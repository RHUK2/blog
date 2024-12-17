#!/bin/bash

# color
NOCOLOR="\033[0m"
GREEN="\033[0;32m"

echo "---------- MAKE DEPLOY ----------"
if [ -e build ]; then
    rm -r output
    mv build output
fi
echo -e "${GREEN}[INFO]${NOCOLOR} Complete Deploy"

echo "---------- END BUILD PROCESS ----------"
