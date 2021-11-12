const express = require('express');
const sessions = require('../data/sessions.json');
const sessionsRouter = express.Router();

const debug = require('debug')('app:sessionsRouter');
const {MongoClient, ObjectId} = require('mongodb');
const config = require('../config/config');



sessionsRouter.route('/').get((req, res) => {

    const url = config.mongoAtlas;
    const dbName = 'globomantics';

    (async function mongo(){
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to the mongo DB');

            const db = client.db(dbName);

            const sessions = await db.collection('sessions').find().toArray();
            res.render('sessions', { sessions })
        } catch (error) {
            debug(error.stack);
        }
    }())
});

sessionsRouter.route('/:id').get((req, res) => { 
    const id = req.params.id;
    debug('Got id: ' + id);
    const url = config.mongoAtlas;
    const dbName = 'globomantics';

    (async function mongo(){
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to the mongo DB');

            const db = client.db(dbName);

            const session = await db.collection('sessions').findOne({_id: new ObjectId(id)});
            res.render('session', {
                session,
            }) 
        } catch (error) {
            debug(error.stack);
        }
    }())


});

module.exports = sessionsRouter;