FROM node:20-alpine3.19

WORKDIR /api-gateway

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]