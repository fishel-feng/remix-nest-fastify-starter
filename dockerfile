FROM node:latest

LABEL author="Fishel Feng"

RUN npm install pnpm -g

WORKDIR /opt/app
COPY . /opt/app
RUN pnpm install

RUN pnpm build

EXPOSE 3000

CMD [ "pnpm", "start:prod" ]
