#!/bin/bash
# restart the nginx server
sudo service restart nginx
# log the status 
# service nginx status

# node restartsudo 
cd /var/www/wellnessdaisy/api
sudo pm2 restart wellnessdaisy