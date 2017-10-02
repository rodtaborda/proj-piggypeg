var mongoose = require('mongoose');
var express = require('express');

app = express();

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var server = app.listen(3000);
console.log('Servidor Express iniciado na porta %s', server.address().port);

mongoose.connect('mongodb://test-rodrigo:123456@ds155424.mlab.com:55424/teste-rodrigo');
//mongoose.connect('mongodb://localhost/piggypeg');

var userSchema = new mongoose.Schema({

    name: {type: String, required:true},       
    lastName: {type: String, required:true},
    birthday: {type: String, required:true},
    address: {type: String, required:true},
    cpf: {type: String, required:true},
    telefone: {type: String, required:true},
})


app.post('/users', function (req, res, next) {
    var User = mongoose.model('Users', userSchema);
    var newuser = new User({ name: req.body.name, lastName: req.body.lastName, birthday: req.body.birthday, address: req.body.address, cpf: req.body.cpf, telefone: req.body.telefone });
    newuser.save(function (err) {
        if (err) {
           res.status(500).json({ error: err.message });
           res.end();
           return;
        }else{
        
          res.status(200).json(newuser);
          res.end();

        }
       
    });

});





