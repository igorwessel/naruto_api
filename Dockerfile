FROM node:lts-stretch-slim

# Create APP Folder
RUN mkdir /naruto_api

# Working Directory
WORKDIR /naruto_api

# Add PACKAGE.JSON and YARN.LOCK
ADD package.json /naruto_api/
ADD yarn.lock /naruto_api/

# Install dependencies for project
RUN yarn

ADD . /naruto_api/

EXPOSE 8000