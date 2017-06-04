FROM mhart/alpine-node:6

WORKDIR /src
COPY . .

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python

RUN npm i -g yarn && yarn install && yarn run build

EXPOSE 3000

CMD node server.js
