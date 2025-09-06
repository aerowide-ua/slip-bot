#!/bin/bash
cd ~/slip-bot
git reset --hard
git pull
npm install
pm2 restart slip-bot
echo "we ball"
cd ../