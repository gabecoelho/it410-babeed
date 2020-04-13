FROM node:lts-alpine
WORKDIR /usr/src/client
COPY package*.json ./
RUN npm install --silent
COPY . .
EXPOSE 8080
CMD ["npm", "run", "serve"]