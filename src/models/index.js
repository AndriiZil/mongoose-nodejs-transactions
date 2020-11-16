const mongoose = require('mongoose');

const User = require('./User');
const Catalog = require('./Catalog');

const { error } = require('dotenv').config();

if (error) {
    throw new Error('.env file is required');
}

module.exports = {
    connect: async () => {
        try {
            mongoose.set('debug', true);

            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            });
            console.log('DB Connected');
        } catch (err) {
            console.log(err);
        }
    },
    db: {
        user: User,
        catalog: Catalog
    }
}