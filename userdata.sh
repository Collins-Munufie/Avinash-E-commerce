#!/bin/bash
set -e

apt-get update -y
apt-get upgrade -y

# Install Docker
apt-get install -y docker.io
systemctl enable docker
systemctl start docker

# Install Docker Compose plugin
apt-get install -y docker-compose-plugin

# Install Nginx
apt-get install -y nginx
systemctl enable nginx
systemctl start nginx

# Install Git
apt-get install -y git

# Allow ubuntu user to run docker
usermod -aG docker ubuntu