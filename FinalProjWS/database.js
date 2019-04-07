const mongodb = require ('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID; 
const username = 'user';
const password = 'password';
const dbHost = 'localhost';
const dbPort = 27017;
const dbName = 'wsp';
const clothCollectionName = 'clothes';

const dbURL = `mongodb://${username}:${password}@${dbHost}:${dbPort}?authSource=${dbName}`;

let dbclient;

function startDBandApp(app, PORT) {
    MongoClient.connect(dbURL, {poolSize: 20, useNewUrlParser: true})
        .then(client => {
            dbclient = client;
            app.locals.client = client;
            app.locals.wspDB = client.db(dbName);
            app.locals.clothCollection = app.locals.wspDB.collection(clothCollectionName);
            app.listen(PORT, () => {
                console.log(`Server is running at ${PORT}`);
            })
        })
        .catch(err => {
            console.log('DB connection error: ', err)
        })
}

process.on('SIGINT', () => {
    dbclient.close();
    console.log('db connection closed by SIGINT')
    process.exit();
})

module.exports.startDBandApp = startDBandApp;
module.exports.ObjectID = ObjectID;