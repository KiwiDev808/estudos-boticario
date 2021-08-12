FROM node:14 
WORKDIR /app

COPY package*.json ./
RUN npm install --only=prod
COPY ./dist ./
COPY .env ./

EXPOSE 3003

CMD ["node", "./src/server.js"]

 