const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        console.log('✅ Database configuration init.');

        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('✅ Database connected.');

    } catch (error) {
        console.log(`❌ Error connecting to the database. Description: ${error}`);
        throw new Error(`❌ Error connecting to the database. Description: ${error}`);
    }
}

module.exports = dbConnection;