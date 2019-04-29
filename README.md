# hepsub-voipmonitor
HEP Pub-Sub Client for OSS Voipmonitor Sniffer

This project implements a simple, dummy NodeJS API on top of the VoipMonitor database and offers insecure hooks to it through the HEP Pub-Sub chain.

## Usage
```
docker-compose up -d
docker run --name voipmonitor --cap-add=NET_ADMIN --network=host -d sipcapture/hepsub-voipmonitor
```

## Node API
See `/app` folder
