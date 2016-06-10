
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.use(express.static('.'));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/api/users', function (req, res) {
    res.send(msgs);
    res.end();
});

app.post('/api/sendMessage/:userId', function (req, res) {
    msgs.filter((msg) => {
       if (msg.from.id == req.params.userId) {
           msg.history.push({'owner': true, 'text': req.body.text});
       }
    });
    sendMessageByBot(req.params.userId, req.body.text);
    res.end();
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

var TelegramBot = require('node-telegram-bot-api');
 
var token = '232909685:AAGJBKWWK3aZfv8GaRZ4Q9tQcdmEaDSmQ5w';
var botOptions = {
    polling: true
};
var bot = new TelegramBot(token, botOptions);

var msgs = [];
 
bot.getMe().then(function(me)
{
    console.log('Hello! My name is %s!', me.first_name);
    console.log('My id is %s.', me.id);
    console.log('And my username is @%s.', me.username);
});
 
bot.on('text', function(msg)
{
    var messageChatId = msg.chat.id;
    var messageText = msg.text;
    var messageDate = msg.date;
    var messageUsr = msg.from.username;

    if (messageText === '/start') {
        sendMessageByBot(messageChatId, 'Salom, ' + messageUsr);
        sendMessageByBot(messageChatId, 'Men chat botman, tanishganimdan xursandman!');
        msg.history = [];
        msgs.push(msg);
    }

    if (messageText === '/say') {
        sendMessageByBot(messageChatId, 'Hello World!');
    }
    msgs.filter((msgg) => {
        if (msgg.from.id == msg.from.id) {
            msgg.history.push({'owner': false, 'text': msg.text});
        }
    });
    console.log(msg);
});
 
function sendMessageByBot(aChatId, aMessage)
{
    bot.sendMessage(aChatId, aMessage, { caption: 'I\'m a cute bot!' });
}