const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result)=> {
//     console.log(result);
// });

Todo.findByIdAndRemove('5b522fc1e60d86d41b70459c').then((todo)=>{
    console.log(todo);
});