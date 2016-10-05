var express = require('express');
var path = require('path');
var url = require('url');
var bodyParser = require('body-parser');
var http = require('http');
var useragent = require('express-useragent');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(useragent.express());


app.get('/', function (req, res) { //regexp checks if at least one char in path
	var userAgentInfo = req.useragent;
	res.render('index', {
		title: 'FCC Request Header Microservice',
		response: formatInfo(userAgentInfo)
	});
});

function formatInfo(userAgentInfo){
	
	return JSON.stringify(userAgentInfo);
}


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
