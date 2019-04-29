#!/bin/bash

mysqld_safe --skip-grant-tables &

while !(mysqladmin ping -h 127.0.0.1)
do
   sleep 2
   echo "waiting for mysql ..."
done

while !(voipmonitor -R -S -k --config-file=/etc/voipmonitor.conf)
do
   sleep 5
   echo "relaunching voipmonitor ..."
done

exec "$@"

