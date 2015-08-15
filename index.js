var express = require('express');
var app = express();
var sendgrid  = require('sendgrid')('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');
var path = require('path');

function getPath(filename)
{
   return path.join(__dirname, '/public', filename)
}

app.get('/', function (req, res) {
    res.sendFile(getPath('index.html'));
});

app.get('/map', function (req, res) {
    res.sendFile(getPath('google.html'));
});

app.get('/sendgrid', function (req, res) {
    var payload   = {
        to      : 'stjohnzack@yahoo.com',
        from    : 'truedanubian@gmail.com',
        subject : 'Saying Hi',
        text    : 'This is my first email through SendGrid'
    }
    console.log(payload);

    sendgrid.send(payload, function(err, json) {
        if (err) { console.error(err); }
        console.log(json);
        res.send(json);
    });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});