'use strict';
//var express = require('express'),
var bodyParser = require('body-parser');
//app = express.createServer();
var fs = require('fs');
var cors = require('cors');


module.exports = function (app) {
    var heroList = require('../controllers/heroesListController');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    //app.use(cors());

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header( "Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });
    
    //hero routes
    app.route('/heroes')
        .get(heroList.list_all_heroes)
        .post(heroList.create_a_hero);
        //.post(heroList.insert_Hero_list);

    app.route('/heroes/:heroId')
        .get(heroList.read_a_hero)
        .put(heroList.update_a_hero)
        .delete(heroList.delete_a_hero);  

    app.get('/greeting', function(req, res) {
        res.send("Hello Wo");
    });

    app.post('/upload', function (req, res) {
        console.log(req.body);
        var filePath = 'C:/Users/xbbl3g2/Desktop/filefolder/' + req.body.filename;
        console.log('filepath ',filePath);
        fs.writeFile(filePath, req.body, function () {
            res.end();
        });
        res.end();

    });

};