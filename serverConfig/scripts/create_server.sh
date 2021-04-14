#Setting up vim editor
sudo vim ~/.vimrc
#paste the content in there
syntax on
set mouse=a
set number
:wq

# setting up the codeAgent 
EC2_AVAIL_ZONE=`curl -s http://169.254.169.254/latest/meta-data/placement/availability-zone`
EC2_REGION="`echo \"$EC2_AVAIL_ZONE\" | sed 's/[a-z]$//'`"
sudo apt install
sudo apt update
sudo apt upgrade -y
sudo apt install ruby -y
sudo apt install wget -y
mkdir downloads && cd downloads
sudo wget https://aws-codedeploy-$EC2_REGION.s3.$EC2_REGION.amazonaws.com/latest/install
sudo chmod +x ./install
sudo ./install auto
sudo service codedeploy-agent status

# setting up nginx
sudo apt install nginx -y
sudo rm /etc/nginx/sites-enabled/default
sudo service nginx start
sudo service nginx status
cd /var/www
sudo rm -R html
sudo mkdir poloTMS
cd armat
sudo mkdir api admin webapp config

# install wordpress related libraries
sudo apt install php -y 
sudo systemctl disable apache2
sudo systemctl stop apache2
sudo apt install php-mysql php-gd php-common php-mbstring php-curl php-cli -y
sudo apt install php-fpm -y
sudo vi /etc/php/7.2/fpm/php.ini  
    # change these lines 
        upload_max_filesize 
        post_max_size
    :wq
sudo systemctl restart php7.2-fpm

# install wordpress
cd /home/ubuntu/downloads
sudo wget https://wordpress.org/latest.tar.gz
sudo tar -xvf latest.tar.gz
sudo mv wordpress/* /var/www/explainitdoctorly/blog
cd /var/www/explainitdoctorly
sudo chown www-data:www-data -R blog
sudo rm -f index.html index.damian.php

# Installing the database
sudo apt install mariadb-server -y
sudo systemctl start mariadb
sudo systemctl enable mariadb
sudo mysql_secure_installation
    #Answer Yes to all questions
    #Enter password ( the same one used by the setup process for secure db)	

# setting up the database
sudo mysql -u root -p
    #Enter password ( the same one used by the setup process for secure db)	
Create database EID_blog;
create user 'blog_user'@'localhost' identified by '!EIDEachbase1!';
grant all privileges on EID_blog.* to 'blog_user'@'localhost';
flush privileges;
exit;

#installing node
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install n -g
sudo n lts
PATH="$PATH"
sudo npm install pm2 -g


#install node
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
# nvm --version  # check the version
# nvm install node # installs the nodejs
# nvm use 10.16.3
# npm install pm2 -g



#letsencript certificates
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
0 12 * * * /usr/bin/certbot renew --quiet # for cron job scheduling for the automatic updates 

sudo certbot --nginx -d wellnessdaisy.eachbase.com # test certificates
# sudo certbot --nginx -d polotms.com -d www.polotms.com # live certificates



# sudo add-apt-repository ppa:certbot/certbot     #install certbot
# sudo apt install python-certbot-nginx   #install certbot nginx package
