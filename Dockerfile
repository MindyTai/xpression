FROM node:19.2.0

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g nodemon

CMD [ "node", "./src/index.js" ]
