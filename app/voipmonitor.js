/*
 * Barebone API for VoipMonitor Sniffer
 * HEP-PUBSUB Interface Controller
 * (C) 2018 QXIP BV
 */

try {
  var config = require('./config.js');
} catch(e) { console.log('Missing config!',e); process.exit(1); }

var express = require('express');
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());

var find = require('find');
var port = config.service.port;
var storage = "/var/spool/voipmonitor";

// DB SETTINGS
if (config.database) {
  var mysql = require('mysql');
  var connection = mysql.createConnection(config.database);
  try {
    connection.connect();
    if (config.debug) console.log('DB Connected!');
  } catch(e) { console.log(e); }

}

// API SETTINGS
app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   next();
});

/*
app.get('/get/:id', function (req, res) {
  res.send(req.params)
})
*/

app.post('/get/:id', function (req, res) {
  var data = { params: req.params, body: req.body }
  console.log('NEW API REQ', data);
  if (data.params.id == 'cdr' && connection){
	if (config.debug) console.log('NEW SEEKING CDR:',data.body.callid);
	var q = 'SELECT * FROM cdr WHERE ID IN (SELECT cdr_id FROM cdr_next WHERE fbasename= "'+data.body.callid+'")';
	connection.query(q, function (error, results, fields) {
	  if (error) {
            res.send([])
          } else {
	    results.forEach(function(result){ result.callid = data.body.callid });
	    // if (config.debug) console.log('DB LOOKUP: ', results);
            res.send(results);
	  }
	})
  } else if (data.params.id == 'rtp' && data.body.callid){
	if (config.debug) console.log('NEW SEEKING PCAP RTP FILE:',data.body);
	if (data.body.callid[0]) data.body.callid = data.body.callid[0];
	if (data.body.format[0]) data.body.format = data.body.format[0];
	if (data.body.format) { data.body.callid += '.' + data.body.format; }
	find.file(data.body.callid, storage, function(files) {
	  console.log('FILES',files);
	  if (files.length > 0) {
		files.forEach(function(file){
		  if (file.includes('SIP')) { files.sip = file; }
		  if (file.includes('RTP')) { files.rtp = file; }
		});
		if (config.debug) console.log(files);
		res.setHeader('Content-Transfer-Encoding', 'binary');
		res.setHeader('Content-Type', 'application/octet-stream');
 	  	res.download(files[0], data.body.file);
	  } else {
		res.send({});
	  }
	})
  }

})

app.get('/rtpdownload/:characters?', function (req, res) {
  if (req.params.characters == 'readindex.cgi'){
	if (config.debug) console.log('SEEKING INDEX FILE:',req.query);
	find.file(req.query.file+'.pcap', storage, function(files) {
	  if (files.length > 0) {
		if (config.debug) console.log(files);
		var q = 'SELECT * FROM cdr WHERE ID IN (SELECT cdr_id FROM cdr_next WHERE fbasename= "'+req.query.file+'")';
		connection.query(q, function (error, results, fields) {
		  if (error) { res.send({}) }
		  else {
			  results.forEach(function(res){ res.callid = req.query.file });
			  // if (config.debug) console.log('DB LOOKUP: ', results);
			  res.send(results||[]);
		  }
		});
	  } else {
		res.send({});
          }
	})
  } else if (req.params.characters == 'index.cgi'){
	if (config.debug) console.log('SEEKING AUDIO FILE:',req.query);
	find.file(req.query.file, storage, function(files) {
	  if (files.length > 0 ) {
		if (config.debug) console.log(files);
 	  	res.download(files[0], req.query.file);
		// res.status(200).end();
	  } else {
		res.send({});
	  }
	})
  } else if (req.params.characters == 'getpcap.cgi'){
	if (config.debug) console.log('SEEKING PCAP RTP FILE:',req.query);
	find.file(req.query.file, storage, function(files) {
	  if (files.length > 0) {
		files.forEach(function(file){
		  if (file.includes('SIP')) { files.sip = file; }
		  if (file.includes('RTP')) { files.rtp = file; }
		});
		if (config.debug) console.log(files);
		res.setHeader('Content-Transfer-Encoding', 'binary');
		res.setHeader('Content-Type', 'application/octet-stream');
 	  	res.download(files[0], req.query.file);
		// res.status(200).end();
	  } else {
		res.send({});
	  }
	})
  } else if (req.params.characters == 'getsip.cgi'){
	if (config.debug) console.log('SEEKING PCAP SIP FILE:',req.query);
	find.file(req.query.file, storage, function(files) {
	  if (files.length > 1) {
		if (config.debug) console.log(files);
		res.setHeader('Content-Transfer-Encoding', 'binary');
		res.setHeader('Content-Type', 'application/octet-stream');
 	  	res.download(files[1], req.query.file);
		// res.status(200).end();
	  } else {
		res.send({});
	  }
	})
  } else {
  	res.send(req.query)
  }
})

app.listen(port, () => console.log('API Server started',port))


// HEP PUBSUB Hooks

var req = require('req-fast');
var api = config.backend;
const uuidv1 = require('uuid/v1');
var uuid = uuidv1();
var ttl = config.service.ttl;

var publish = function(){
    var settings = config.service;
    settings.uuid = uuid;
    req({
      method: 'POST',
      url: api,
      dataType: 'JSON',
      data: settings
    }, (err, res) => {
      if (err) {
        if (config.debug) console.log('REGISTER API ERROR', err.message)
      } 
      if (config.debug) console.log('REGISTER API',res.body.status)
    })
}

/* REGISTER SERVICE w/ TTL REFRESH */
if (ttl) {
	publish();
	/* REGISTER LOOP */
	setInterval(function() {
	   publish()
	}, (.9 * ttl)*1000 );
}

/* END */
