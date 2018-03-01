'use strict';

exports.greeting = function (req, res) {
    if(req != undefined) {
        console.log('request- ',req);
        return res.send('Hello to gree');
    } else {
        console.log('in else');
        return res.send('error');
    }
    res.send('out of greeting');
};