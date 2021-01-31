FROM node:lts-stretch-slim

# Working Directory
WORKDIR /naruto_api

# Add PACKAGE.JSON and YARN.LOCK
COPY ["yarn.lock", "package.json", "./"]

# Install dependencies for project
RUN yarn install

EXPOSE 3000

ADD . ./

CMD ["yarn", "start"]