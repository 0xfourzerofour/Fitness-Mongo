Deployment for this site was implemented by setting up an Amazon Ec2 intance and creating a github action to then make a build of the applicaiton whenever there is a push to the master branch on git. 

NGNIX was used to act as a reverse proxy between the
frontend routes and the '/api' routes.

### LINUX SERVER dependencies

`pm2`
`nginx`
`node`
`git`

## USAGE

1. Create an AWS EC2 instance and make sure you have HTTP, HTTPS, SHH connections turned on.

2. ssh into the server using you private key.

3. install server dependencies

`curl https://gist.githubusercontent.com/cornflourblue/f0abd30f47d96d6ff127fe8a9e5bbd9f/raw/e3047c9dc3ce8b796e7354c92d2c47ce61981d2f/setup-nodejs-mongodb-production-server-on-ubuntu-1804.sh | sudo bash`

4. Create github action runner and execute the runner setup in home directory

5. run pm2 server

`cd GroupAss-3100/backend && sudo pm2 start server`

7. configure NGNIX

`sudo rm /etc/nginx/sites-available/default`
`sudo nano /etc/nginx/sites-available/default`

Use nano or vim to configure NGINX reverse proxy like below.

```
server {
  listen 80 default_server;
  server_name _;

  # react app & front-end files
  location / {
    root /home/ubuntu/actionrunner/project/GroupAss-COMP3100/front/build;
    try_files $uri /index.html;
  }

  # node api reverse proxy
  location /api/ {
    proxy_pass http://localhost:5000;
  }
}
```



**Link of the deployed website**
