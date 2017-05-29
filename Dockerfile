FROM mhart/alpine-node:6

WORKDIR /src
ADD . .

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python

# If you need npm, don't use a base tag


# fix incufficient RAM on Digitalocean 512mb:
RUN echo '==='
RUN df -h
RUN echo '---'
RUN sudo fallocate -l 1G /swapfile
RUN sudo chmod 600 /swapfile
RUN sudo mkswap /swapfile
RUN sudo swapon /swapfile
RUN sudo swapon --show
RUN free -h
# RUN sudo cp /etc/fstab /etc/fstab.bak
# RUN echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
RUN echo '==='



RUN npm install
RUN npm run build

EXPOSE 3000

CMD node server.js
