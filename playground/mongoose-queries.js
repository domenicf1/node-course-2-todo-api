const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//var id = '5b45531c0f6b51a4ccb348721';

// if(!ObjectID.isValid(id)){
//     return console.log('ID not valid');
// }

// // Todo.find({
// //     _id: id
// // }).then((todos)=>{
// //     console.log('Todos', todos);
// // });

// // Todo.findOne({
// //     _id: id
// // }).then((todo)=>{
// //     console.log('Todo', todo);
// // });

// Todo.findById(id).then((todo)=>{
//     if(!todo){
//         return console.log('ID not found');
//     }
//     console.log('Todo By ID', todo);
// }).catch((e) => console.log(e));

var id = '5b440797fe68eb4a0c3fa876';
User.findById(id).then((user)=>{
        if(!user){
            return console.log('User ID not found');
        }
        console.log('User By ID', user);
    }).catch((e) => console.log(e));
