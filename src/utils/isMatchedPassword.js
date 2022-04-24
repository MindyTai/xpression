const bcrypt = require('bcrypt')

const isMatchedPassword = async(password, user) => {
    return password ?? await bcrypt.compare(password, user.password)
}

module.exports = isMatchedPassword
