FROM node:12.14.1

WORKDIR /usr/src/server/

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE 8081

CMD [ "nodemon", "server" ]