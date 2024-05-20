#!/bin/bash

if [ -e build ]; then
    rm -r output
    mv build output
    echo "🔥  Change output 🔥"
fi

echo "🔥  END 🔥"
