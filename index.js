var express = require('express');
var path = require('path');
var useragent = require('express-useragent');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(useragent.express());
//this is necessary before using express (req.ip):
app.set('trust proxy', true);
app.get('/', function (req, res) { 
	var clientIp = req.ip;
	var language = req.headers['accept-language'].split(',')[0];
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
