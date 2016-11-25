var express = require('express');
var app = express();

//var verify_token = "";

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    //console.log('test request');
    response.send('this is testbot server');
    //response.render('pages/index');
    if (request.query['hub.verify_token'] == 'verify_token')
        {
            res.send(request.query['hub.challenge']);
        }
    response.send('Error , wrong validation');
});

app.get('/webhook', function(req, res) {
    
    response.send('this is testbot server');
    /*var events = req.body.entry[0].messaging;
    for (i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.message && event.message.text) {
            sendMessage(event.sender.id, {text: "Echo: " + event.message.text});
        }
    }
    res.sendStatus(200);*/
   //response.send(cool()); 
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// generic function sending messages
function sendMessage(recipientId, message) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: recipientId},
            message: message,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};

