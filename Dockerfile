FROM node:18.8.0

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g nodemon

CMD [ "node", "./src/index.js" ]
