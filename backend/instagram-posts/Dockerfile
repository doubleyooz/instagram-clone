FROM alpine:3.15

WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./

RUN set -eux \
    & apk add \
        --no-cache \
        nodejs \
        yarn

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start:dev"]