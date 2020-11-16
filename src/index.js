const express = require('express');
const logger = require('morgan');
const { startSession } = require('mongoose')

const { db, connect } = require('./models');

const app = express();

app.use(logger('dev'));

connect().catch(console.log);

app.get('/', (req, res) => res.send('ok'));

app.post('/create', async (req, res) => {
    let session;

    try {
        session = await startSession(); // creating a session
        await session.startTransaction(); // starting transaction

        await db.user.create([{ name: 'Andrii', age: 35 }], { session }); // pass session
        await db.catalog.create([{ title: 'Example', description: 'description' }], { session }); // pass session

        // New objects for creating in Db should be wrapped in array

        await session.commitTransaction(); // commit transaction
        session.endSession(); // end current session

        res.send('Success');

    } catch (err) {
        await session.abortTransaction(); // rollback changes in Db if error
        session.endSession(); // end session

        console.log(err);
        res.send('Error');
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
