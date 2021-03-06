const Todos = require('../models/todoModel');
const bodyParser = require('body-parser');

module.exports = app => {

    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.get('/api/todos/:uname', function(req, res) {
        
        const { uname } = req.params;
        Todos.find({ username: req.params.uname }, (err, todos) => {
            if (err) throw err;
            
            res.send(todos);
        });
        
    });
    
    app.get('/api/todo/:id', (req, res) => {
       
       Todos.findById({ _id: req.params.id }, (err, todo) => {
           if (err) throw err;
           
           res.send(todo);
       });
        
    });
    
    app.post('/api/todo', (req, res) => {
        
        if (req.body.id) {
            Todos.findByIdAndUpdate(req.body.id, { todo: req.body.todo, isDone: req.body.isDone, hasAttachment: req.body.hasAttachment }, function(err, todo) {
                if (err) throw err;
                
                res.send('Success');
            });
        }
        
        else {
           
           var newTodo = Todos({
               username: 'test',
               todo: req.body.todo,
               isDone: req.body.isDone,
               hasAttachment: req.body.hasAttachment
           });
           newTodo.save((err) => {
               if (err) throw err;
               res.send('Success');
           });
            
        }
        
    });
    
    app.delete('/api/todo', (req, res) => {
        
        Todos.findByIdAndRemove(req.body.id, (err) => {
            if (err) throw err;
            res.send('Success');
        })
        
    });
};