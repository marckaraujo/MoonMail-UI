# [MoonMail](https://github.com/microapps/MoonMail) UI

[![Build Status](https://travis-ci.org/microapps/MoonMail.svg?branch=master)](https://travis-ci.org/microapps/MoonMail)
[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/microapps/MoonMail.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fmicroapps%2FMoonMail%2F)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/microapps/MoonMail/master/LICENSE)
[![Gitter](https://badges.gitter.im/microapps/MoonMail.svg)](https://gitter.im/microapps/MoonMail?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)


Send email marketing campaigns with [Amazon SES](https://aws.amazon.com/ses/). Let [Amazon Lambda](https://aws.amazon.com/lambda/) compose email by email and literaly scale it to infinite.  Use this [React powered frontend](https://microapps.github.io/MoonMail-UI/) to shoot your email marketing campaigns with your AWS/SES credentials. We're assuming that:

  -  You have set up the [Serverless](https://serverless.com/) project as described in the [documentation](https://github.com/microapps/MoonMail#getting-started)
  - You are using a SES endpoint that has production access (not sandbox mode)
  - You have created a recipients list and added some recipients to it through the API

## EC2 - Port 80
 
 
 sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
 
 Launch Node.js on port 3000. Requests to port 80 will get mapped to port 3000.
 
 You should also edit your /etc/rc.local file and add that line minus the sudo. That will add the redirect when the machine boots up. You don't need sudo in /etc/rc.local because the commands there are run as root when the system boots.
 
 # Nodejs in AWS EC2
 
 http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html
 
 # AWS Code Deploy Agent
 
 http://docs.aws.amazon.com/codedeploy/latest/userguide/how-to-run-agent-install.html
 
 # AWS Code Deploy Tutorial
 
 http://www.knowarth.com/aws-code-deploy-with-git/
 
 # WebPack Global
 
 npm install webpack -g
