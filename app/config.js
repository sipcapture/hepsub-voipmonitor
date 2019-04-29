var config = {
  backend: 'http://localhost:9080/api/v3/agent/subscribe',
  service: {
	"uuid": Math.random().toString(36).substring(7),
	"host":"PUBLIC_IP_HERE",
	"port": 18088,
	"protocol": "http",
	"path": "/get",
	"type": "cdr",
	"ttl": 300,
	"node": "voipmonitor",
	"gid": 10
  },
  debug: true,
  database: {
	'host' : '127.0.0.1',
	'user' : 'root',
	'password' : 'testme',
	'database' : 'voipmonitor'
  }
};

module.exports = config;
