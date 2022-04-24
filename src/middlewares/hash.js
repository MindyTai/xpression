const generateHashedPassword = require('../utils/generateHashedPassword')

const hash = async(req, res, next) => {
    const { password } = req.body
    const validPassword = await generateHashedPassword(password)

    req.body.password = validPassword

    next();
  }

module.exports = hash
