#!/bin/bash
cd ~/slip-bot
git pull origin main
npm install
pm2 restart slip-bot
echo "we ball"