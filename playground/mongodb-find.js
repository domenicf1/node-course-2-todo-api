//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongo db server');
    }
    console.log('Connected to Mongo DB server');
    const db = client.db('Todos');

    // db.collection('Todos').insertOne({
    //     text: 'Something else to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert Todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Todos').find().count().then((count)=>{
    //     console.log('Todos');
    //     //console.log(JSON.stringify(docs, undefined, 2));
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to retrieve docs', err);
    // });

    db.collection('Users').find({name:'Domenic'}).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2));
        //console.log(`Users count: ${count}`);
    }, (err) => {
        console.log('Unable to retrieve docs', err);
    });

    client.close();
});