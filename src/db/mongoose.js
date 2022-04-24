const mongoose = require('mongoose')

const connectToMongo = async () => {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/task-manager-api`);  
        console.log('Connected to database')
    } catch (error) {
        console.log('Fail to connect database')
    }
    
    return mongoose
}

module.exports = connectToMongo
