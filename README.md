# Test server connection
<!-- ssh -i "ARM-MAIN-KEY.pem" -o IdentitiesOnly=yes ubuntu@ec2-54-153-103-205.us-west-1.compute.amazonaws.com
ssh -i "ARM-MAIN-KEY.pem" -o IdentitiesOnly=yes ubuntu@armat.eachbase.com -->

# Live Server connection
<!-- ssh -i "ARM-MAIN-KEY.pem" -o IdentitiesOnly=yes ubuntu@armat.org -->

# remove the key when the server machine changes
ssh-keygen -R polotms.eachbase.com 

# Creating a server
1. Launch a new server
2. Install all depenencies and configure the server from the commands found in scripts/create_server.sh
3. Create the folder structure
4. Create AMI 
5. Create template

# Launching a new server
1. Login to the machine
2. Create the .env file
3. Connect the pipeline to the machine
4. Push the changes
5. Start the pm2 server with root user
6. Configure pm2 startup
8. Run the certificate generation script
9. Modify the nginx.config and push it again


# MongoDB Atlas database user
1. test: username: wellnessdaisy-mongo, password: !WELEachbase1!