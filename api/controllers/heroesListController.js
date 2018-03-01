'use strict';

var mongoose = require('mongoose'),
    Hero = mongoose.model('Heroes');

exports.list_all_heroes = function (req, res) {
    console.log('listing heroes '+req.query);
    mongoose.connect('mongodb://172.24.76.43:27017/Herodb');
    if((req.query.id != undefined) || (req.query.name != undefined)) {
        console.log(req.query.name);
        console.log(req.query.id);
        Hero.findOne({'name':{$regex : "*"+req.query.name+".*"}}, function (err, hero) {
            if (err) {
                return res.send(err);
            }
            res.json(hero);
        });
    } else {
        console.log('in else');
        Hero.find({}, function (err, hero) {
            if(err) 
                return res.send(err);
            res.json(hero);
        });
    }
    mongoose.connection.close();
};

exports.create_a_hero = function (req, res) {
    mongoose.connect('mongodb://172.24.76.43:27017/Herodb');
    var new_hero = new Hero(req.body);
    new_hero.save(function(err, hero) {
        if(err) 
            return res.send(err);
        res.json(hero);
    });
    mongoose.connection.close();
};

exports.insert_Hero_list = function (req, res) {
    mongoose.connect('mongodb://172.24.76.43:27017/Herodb');
    var multipleHero = req.body;
    async.eachSeries(multipleHero, function(hero) {
        Hero.save(multipleHero);
    }, function() {
        if (err) return console.log(err);
        done();
    });
    mongoose.connection.close();
};

function callback(err, hero) {
    if (err) {
        // TODO: handle error
    } else {
        res.send(hero.length);
    }
}

exports.read_a_hero = function (req, res) {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://172.24.76.43:27017/Herodb');
    //Hero.findById(req.params.heroId, function (err, hero) {
    Hero.findOne({'id':req.params.heroId}, function(err, hero) {
         if(err) 
            return res.send(err);
        res.json(hero);
    });
    mongoose.connection.close();
};

exports.update_a_hero = function(req, res) {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://172.24.76.43:27017/Herodb');
  Hero.findOneAndUpdate({id: req.params.heroId}, req.body, {new: true}, function(err, hero) {
    if (err)
      return res.send(err);
    res.json(hero);
  });
  mongoose.connection.close();
};

exports.delete_a_hero = function(req, res) {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://172.24.76.43:27017/Herodb');
    Hero.remove({
        _id: req.params.heroId
    }, function(err, hero) {
        if (err){
            console.log("erroorrrr");
            return res.send(err);
        }
        //res.send({ message: 'Hero successfully deleted' });
        
    });
    mongoose.connection.close();
};