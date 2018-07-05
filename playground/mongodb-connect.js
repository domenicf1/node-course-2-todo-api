const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
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

    db.collection('Users').insertOne({
        name: 'Domenic',
        age: 41,
        location: 'Hopewell Junction'
    }, (err, result) => {
        if(err){
            return console.log('Unable to insert Users', err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();
});