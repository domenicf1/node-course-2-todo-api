const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongo db server');
    }
    console.log('Connected to Mongo DB server');
    const db = client.db('Todos');


    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b3bb47858ce951cbf2161d8')
    }, {
            $set: {
                name: 'Domenic'
            },
            $inc: {
                age: 1
            }
        },
        {
            returnOriginal: false
        }).then((result) => {
            console.log(result);
        });


    client.close();
});