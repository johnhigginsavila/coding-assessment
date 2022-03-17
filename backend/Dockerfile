FROM node:14.16.1

ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

RUN npm install

RUN npm i sqlite3

RUN npm run test

RUN npm run migrate:ups && npm run seed:ups

EXPOSE 8010
CMD [ "npm", "start" ]