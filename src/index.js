const express = require('express')
const crypto = require('crypto')
const session = require('express-session')
const connectToMongo = require('./db/mongoose')
const path = require('path');
const app = express()

const startConnectToMongo = async () => {
  const port = process.env.PORT || 3000

  try {
      await connectToMongo();
      app.listen(port, () => {
          console.log(`Server is running on port ${port}.`);
      });
  } catch (error) {
      console.log(error);
  }   
}

startConnectToMongo()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: crypto.randomBytes(20).toString("hex"),
    name: 'user',
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000
      }
  }))
