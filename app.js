const fs = require('fs');
const express = require('express');
const app = express();
const blessings = require('./blessings.json');

try {
	var counter = require('./counter.json');
} catch(e) {
	console.error('No counter db stored');
	var counter = {
		Apps: {}
	};
	saveCounter();
}

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res, err){
	return res.status(200).json(counter);
});

app.get('/:name', function(req, res, err){
	for(var app in counter.Apps){
		if(app === req.params.name){
			return res.status(200).json(counter.Apps[app]);
		} else if (counter.Apps[app].name === req.params.name) {
			return res.status(200).json(counter.Apps[app]);
		}
	}
	return res.status(404).json({error:{message:'Application not found'}});
});

app.post('/', function(req, res, err){
	if(!req.body.app_id){
		return res.sendStatus(400);
	}
	if(counter.Apps[req.body.app_id]){
		counter.Apps[req.body.app_id].counter++;
	} else {
		counter.Apps[req.body.app_id] = {};
		counter.Apps[req.body.app_id].counter = 1;
	}

	if(req.body.name && !counter.Apps[req.body.app_id].name){
		counter.Apps[req.body.app_id].name = req.body.name;
	}
	saveCounter();
	return res.status(200).send(blessings[Math.floor(Math.random() * blessings.length)]);
});

function saveCounter(){
	if(this.locked === true){
		this.queue = true;
	}
	this.locked = true;
	fs.writeFile('./counter.json', JSON.stringify(counter), (err) => {
		if(err){
			console.error('Could not save DB');
		} else {
			console.log('DB saved');
		}
		this.locked = false;
		if(this.queue){
			saveCounter();
		}
	});
}

app.listen(6162, function(){
	console.log('Server listening on port', 6162);
});