#!/bin/bash

#remove everything from admin and client
rm -R -f /var/www/poloTMS/admin/*
rm -R -f /var/www/poloTMS/webapp/*
rm -R -f /var/www/poloTMS/api/*
rm -R -f /etc/nginx/sites-enabled/nginx.config
rm -R -f /etc/nginx/sites-enabled/poloTMS.nginx.config
