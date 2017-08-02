#!/bin/bash
sudo rsync -avh ./www/ ./firebase/public/ --delete
cd firebase
sudo firebase deploy
