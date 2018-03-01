var express = require('express'),
    app = express(),
    port = process.env.PORT || 4000,
    //mongoose = require('mongoose'),
    Hero = require('./api/models/heroesListModel'),
    bodyParser = require('body-parser');

var cors = require('cors');
app.use(cors()); 
//app.use(express.static(path.join(__dirname, '../')));
//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://172.24.76.43:27017/Herodb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(function(req, res) {
//   res.status(404).send({url: req.originalUrl + ' not found'})
// });

var routes = require('./api/routes/heroesListRoutes');
routes(app); 

app.listen(port);

console.log('HeroesList API server started on',port);