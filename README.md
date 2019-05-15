<img src="https://user-images.githubusercontent.com/1423657/55069501-8348c400-5084-11e9-9931-fefe0f9874a7.png" width=200/>

# hepsub-voipmonitor
HEP Pub-Sub Client for OSS Voipmonitor Sniffer

## What?

HOMER as a User Interface to VoipMonitor? That's almost right! This project implements a simple, dummy NodeJS API on top of the VoipMonitor database and offers insecure hooks to it through the HEP Pub-Sub chain interacting with the HOMER User Interface.

## Usage
A docker container including API + VoipMonitor Sniffer is provided for convenience and testing.
```
docker-compose up -d
docker run --name voipmonitor --cap-add=NET_ADMIN --network=host -d sipcapture/hepsub-voipmonitor
```

## Node API
See `/app` folder
