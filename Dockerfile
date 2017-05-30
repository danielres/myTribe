FROM mhart/alpine-node:6

WORKDIR /src
ADD . .

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python

# If you need npm, don't use a base tag

# npm install for low-memory environments:
# RUN apk update && apk add bash
# RUN /bin/bash npm-f3-install.sh production --silent
# RUN /bin/bash npm-f3-install.sh development --silent

RUN apk add --no-cache bash git openssh

RUN git status
RUN git fetch --all
RUN git reset --hard origin/master
RUN git status

RUN npm i -g yarn && yarn install && yarn run build

EXPOSE 3000

CMD node server.js
