FROM mhart/alpine-node:6

WORKDIR /src
ADD . .
# COPY npm-f3-install.sh npm-f3-install.sh

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python

# If you need npm, don't use a base tag


# fix insufficient RAM on Digitalocean 512mb (Ubuntu only):
# RUN echo '==='
# RUN df -h
# RUN echo '---'
# RUN sudo fallocate -l 1G /swapfile
# RUN sudo chmod 600 /swapfile
# RUN sudo mkswap /swapfile
# RUN sudo swapon /swapfile
# RUN sudo swapon --show
# RUN free -h
# persit swap:
# RUN sudo cp /etc/fstab /etc/fstab.bak
# RUN echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
# RUN echo '==='



# npm install for low-memory environments:
RUN apk update && apk add bash
RUN /bin/bash npm-f3-install.sh --silent

RUN ls node_modules/.bin
RUN node_modules/.bin/react-scripts build

EXPOSE 3000

CMD node server.js
