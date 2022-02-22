FROM alpine:3.15

WORKDIR /usr/app2

COPY package.json ./
COPY yarn.lock ./

RUN set -eux \
    & apk add \
        --no-cache \
        nodejs \
        yarn

RUN yarn install

COPY . .

EXPOSE 3001

CMD ["yarn", "start:dev"]