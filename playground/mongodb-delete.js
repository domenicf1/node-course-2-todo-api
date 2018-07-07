const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongo db server');
    }
    console.log('Connected to Mongo DB server');
    const db = client.db('Todos');

    // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
    //     console.log(result);
    //     //console.log(JSON.stringify(docs, undefined, 2));
    //     //console.log(`Users count: ${count}`);
    // });

    // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
    //      console.log(result);
    // });

    //     db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //         console.log(result);
    //    });

    // db.collection('Users').findOneAndDelete({ _id: new ObjectID('5b3e798a1f046e2ff462d24e') }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').deleteMany({ name: 'Domenic' }).then((result) => {
        console.log(result);
    });

    client.close();
});