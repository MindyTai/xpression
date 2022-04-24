const bcrypt = require('bcrypt')
const SALT_ROUNDS = 4

const generateHashedPassword = async(password) => {
    const ghashedPassword = password.length ? await bcrypt.hash(password, SALT_ROUNDS): ""
    
    return ghashedPassword
}

module.exports = generateHashedPassword
