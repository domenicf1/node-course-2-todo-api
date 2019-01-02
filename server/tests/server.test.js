const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

var {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);


describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test Todo Text';

        request(app)
        .post('/todos')
        .set('x-auth', users[0].tokens[0].token)
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }

            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        });
    });
    it('should not create a new todo with invalid data', (done) => {
        
        request(app)
        .post('/todos')
        .set('x-auth', users[0].tokens[0].token)
        .send({})
        .expect(400)
        .end((err, res) => {
            if(err){
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });
});

describe('GET /todos', () =>{
    it('should return all todos', (done) =>{
        request(app)
        .get('/todos')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(1);
        })
        .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should not return todo doc created by another user', (done) => {
        request(app)
        .get(`/todos/${todos[1]._id.toHexString()}`)
        .set('x-auth', users[0].tokens[0].token)
        .expect(404)
        .end(done);
    });

    it('should return a 404 when object id not found', (done) => {
        request(app)
        .get(`/todos/${new ObjectID().toHexString()}`)
        .set('x-auth', users[0].tokens[0].token)
        .expect(404)
        .end(done);
    });

    it('should return a 404 when invalid object id is used', (done) => {
        request(app)
        .get(`/todos/123`)
        .set('x-auth', users[0].tokens[0].token)
        .expect(404)
        .end(done);
    });
});

describe('Delete /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString()
        request(app)
        .delete(`/todos/${hexId}`)
        .set('x-auth', users[1].tokens[0].token)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }

            Todo.findById(hexId).then((todo) => {
                expect(todo).toNotExist;
                done();
            }).catch((e) => done(e));
        });
    });

    it('should not remove a todo created by another user', (done) => {
        var hexId = todos[0]._id.toHexString()
        request(app)
        .delete(`/todos/${hexId}`)
        .set('x-auth', users[1].tokens[0].token)
        .expect(404)
        .end((err, res) => {
            if(err){
                return done(err);
            }

            Todo.findById(hexId).then((todo) => {
                expect(todo).toExist;
                done();
            }).catch((e) => done(e));
        });
    });

    it('should return a 404 when object id not found', (done) => {
        request(app)
        .delete(`/todos/${new ObjectID().toHexString()}`)
        .set('x-auth', users[1].tokens[0].token)
        .expect(404)
        .end(done);
    });

    it('should return a 404 when invalid object id is used', (done) => {
        request(app)
        .delete(`/todos/123`)
        .set('x-auth', users[1].tokens[0].token)
        .expect(404)
        .end(done);
    });
});

describe('Patch /todos/:id', () => {
    it('should update the todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var text = 'First Todo Update Test';
        request(app)
        .patch(`/todos/${hexId}`)
        .set('x-auth', users[0].tokens[0].token)
        .send({
            text, 
            completed: true
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(typeof res.body.todo.completedAt).toBe('number');
        })
        .end(done);
    });

    it('should not update a todo created by another user', (done) => {
        var hexId = todos[0]._id.toHexString();
        var text = 'First Todo Update Test';
        request(app)
        .patch(`/todos/${hexId}`)
        .set('x-auth', users[1].tokens[0].token)
        .send({
            text, 
            completed: true
        })
        .expect(404)
        .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
        var hexId = todos[1]._id.toHexString();
        var text = 'SecondTodoUpdateTest!!';
        request(app)
        .patch(`/todos/${hexId}`)
        .set('x-auth', users[1].tokens[0].token)
        .send({
            text, 
            completed: false
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toNotExist;
        })
        .end(done);
    });
});

describe('Get /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
        .get('/users/me')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
            expect(res.body._id).toBe(users[0]._id.toHexString());
            expect(res.body.email).toBe(users[0].email);
        })
        .end(done);
    });
    it('should return 401 if not authenticated', (done) => {
        request(app)
        .get('/users/me')
        .expect(401)
        .expect((res) => {
            expect(res.body).toEqual({});
        })
        .end(done);
    });
});

describe('Post /user', () => {
    it('should create a user', (done) => {
        var email = 'example@example.com';
        var password = '123mnb!';

        request(app)
        .post('/user')
        .send({email, password})
        .expect(200)
        .expect((res) => {
            expect(res.headers['x-auth']).toExist;
            expect(res.body._id).toExist;
            expect(res.body.email).toBe(email);
        })
        .end((err) => {
            if(err){
                return done(err);
            }
            User.findOne({email}).then((user) => {
                expect(user).toExist;
                expect(user.password).not.toBe(password);
                done();
            }).catch((e) => {
                done(e);
            });
        });

    });
    it('should return validation errors if request invalid', (done) => {
        var email = 'bob';
        var password = '123';

        request(app)
        .post('/user')
        .send({email, password})
        .expect(400)
        .end(done);
    });
    it('should not create user if email in use', (done) => {
        var email = 'bob@example.com';
        var password = '123mnb!';

        request(app)
        .post('/user')
        .send({email, password})
        .expect(400)
        .end(done);
    });
});

describe('POST /users/login', () => {
    it('should login user and return valid token', (done) => {
        request(app)
        .post('/users/login')
        .send({
            email: users[1].email, 
            password: users[1].password})
        .expect(200)
        .expect((res) => {
            expect(res.headers['x-auth']).toExist;
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }
            User.findById(users[1]._id).then((user) => {
                expect(user.tokens[1]).toMatchObject({
                    access: 'auth',
                    token: res.headers['x-auth']
                });
                done();
            }).catch((e) => {
                done(e);
            });
        });

    });
    it('should reject invalid login', (done) => {
        request(app)
        .post('/users/login')
        .send({
            email: users[1].email, 
            password: 'garbage'})
        .expect(400)
        .expect((res) => {
            expect(res.headers['x-auth']).toNotExist;
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }
            User.findById(users[1]._id).then((user) => {
                expect(user.tokens.length).toBe(1);
                done();
            }).catch((e) => {
                done(e);
            });
        });
    });
});

describe('DELETE /users/me/token', () => {
    it('should remove auth token on logout', (done) => {
        request(app)
        .delete('/users/me/token')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .end((err) => {
            if(err){
                return done(err);
            }
            User.findById(users[0]._id).then((user) => {
                expect(user.tokens.length).toBe(0);
                done();
            }).catch((e) => {
                done(e);
            });
        });
    });
});
