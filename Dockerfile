FROM debian:9
MAINTAINER L. Mangani <lorenzo.mangani@gmail.com>

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update \
 && apt-get install -y build-essential git default-libmysqlclient-dev libvorbis-dev libpcap-dev unixodbc-dev libsnappy-dev libcurl4-openssl-dev libssh-dev libjson-c-dev librrd-dev liblzo2-dev liblzma-dev libglib2.0-dev libxml2-dev libpng-dev libgcrypt-dev libfftw3-dev libgoogle-perftools-dev gnutls-dev \
 && apt-get install -y mariadb-server curl \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

RUN cd /usr/src \
 && git clone https://github.com/voipmonitor/sniffer \
 && cd sniffer \
 && ./configure \
 && make \
 && make install

RUN cd /usr/src \
 && cd sniffer \
 && cp config/voipmonitor.conf /etc/ \
 && mkdir -p /dev/shm/voipmonitor

ENV VERSION 1091082768

COPY ./app /app
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
 && apt-get install -y nodejs \
 && cd /app && npm install

COPY ./voipmonitor.conf /etc/voipmonitor.conf

COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

