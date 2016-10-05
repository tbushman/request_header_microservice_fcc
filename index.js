var express = require('express');
var path = require('path');
var url = require('url');
var bodyParser = require('body-parser');
var http = require('http');
var useragent = require('express-useragent');
//var requestIp = require('request-ip');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(useragent.express());
//app.enable('trust proxy');
app.set('trust proxy', true);
app.get('/', function (req, res) { 
	var clientIp = req.ip;
	var language = req.headers['accept-language'].split(',')[0];
	console.log(language)
	//requestIp.getClientIp(req); 
	//req.headers['X-Forwarded-For'];
	//JSON.stringify(req.headers['X-Forwarded-For'])
	//JSON.stringify(req.ip)
	//JSON.stringify(req.headers['x-real-ip'])
	//JSON.stringify(req.connection.remoteAddress);
	//JSON.stringify(req.headers) || req.connection.remoteAddress;
	console.log(clientIp)
	//
	var userAgentInfo = req.useragent;
	var os = userAgentInfo.os;
	var osV = userAgentInfo.version;
	var hardware = userAgentInfo.platform;
	var sys = ''+hardware+'; '+os+'; '+osV+'';
	var resp = {
		ip: clientIp,
		lang: language,
		sys: sys
	}
	
	res.render('index', {
		title: 'FCC Request Header Microservice',
		response: formatInfo(resp)
	});
});

function formatInfo(resp){
	
	return JSON.stringify(resp);
}


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
