#!/bin/sh
cat <<EOF
Dashkiosk image:

Example config to be put in /source/config.json:

{
    "environment": "production",
    "chromecast": { "enabled": true,
    "receiver": "http://10.42.10.109:9400/receiver"
     },
    "db": {
        "username": "dashkiosk",
        "password": "dashkiosk",
        "database": "dashkiosk",
        "options": {
            "host": "127.0.0.1",
            "dialect": "sqlite"
        }
    },
    "log": { "level": "debug"}
}


Exposed ports:
 9400    Default web server port.

Volumes:
 /source                Bind this volume to the dashkiosk source.

Example:

 docker run -p 9400:9400 -v DASHKIOSK:/source --net=host dashkiosk /sbin/my_init -- /usr/local/bin/run-dashkiosk.sh

EOF
