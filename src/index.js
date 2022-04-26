const express = require('express')
const crypto = require('crypto')
const session = require('express-session')
const connectToMongo = require('./db/mongoose')
const userRouter = require('./routers/user')
const pageRouter = require('./routers/page')
const path = require('path')
const helmet = require('helmet')
const dotenv = require('dotenv')

dotenv.config({ path: `${__dirname}/env/.env.${process.env.NODE_ENV}` })

const app = express()
const startConnectToMongo = async () => {
  const port = process.env.PORT

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

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
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
app.use(userRouter)
app.use(pageRouter)
app.use(helmet())
