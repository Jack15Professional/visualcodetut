const express = require('express');
const debug = require('debug')('app:adminRouter');
const {MongoClient} = require('mongodb');

const adminRouter = express.Router();
const sessions = require('../data/sessions.json');

adminRouter.route('/').get((req, res)=>{
    const url = '';
    const dbName = 'globomantics';

    (async function mongo(){
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to the mongo DB');

            const db = client.db(dbName);

            const response = await db.collection('sessions').insertMany(sessions);
            res.json(response);
        } catch (error) {
            debug(error.stack);
        }
    }())
});

module.exports = adminRouter;