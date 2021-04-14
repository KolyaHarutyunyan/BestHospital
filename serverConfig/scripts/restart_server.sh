#!/bin/bash
# restart the nginx server
sudo service restart nginx
# log the status 
service nginx status

# updating the .env file
# cd /var/www/armat/api
# npm install
# sudo cp ../config/.env ./constants/

# node restartsudo 
cd /var/www/poloTMS/api
sudo pm2 restart poloTMS