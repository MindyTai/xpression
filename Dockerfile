FROM node:19.0.1

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g nodemon

CMD [ "node", "./src/index.js" ]
