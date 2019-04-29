#!/bin/bash

HOMER_IP="${HOMER_IP:-127.0.0.1}"
HOMER_PORT="${HOMER_PORT:-9080}"
PUBLIC_IP="${PUBLIC_IP:-127.0.0.1}"
PUBLIC_PORT="${PUBLIC_PORT:-18088}"

sed -i "s/localhost/$HOMER_IP/g" /app/config.js
sed -i "s/9080/$HOMER_PORT/g" /app/config.js
sed -i "s/PUBLIC_IP_HERE/$PUBLIC_IP/g" /app/config.js
sed -i "s/18088/$PUBLIC_PORT/g" /app/config.js

mysqld_safe --skip-grant-tables &

while !(mysqladmin ping -h 127.0.0.1)
do
   sleep 2
   echo "waiting for mysql ..."
done

echo "Launching API... "
cd /app
pm2 start voipmonitor.js --watch

while !(voipmonitor -R -S -k --config-file=/etc/voipmonitor.conf)
do
   sleep 5
   echo "relaunching voipmonitor ..."
done

exec "$@"

