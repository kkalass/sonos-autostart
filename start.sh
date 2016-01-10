#!/bin/bash
cd `dirname $0`
echo -e "\n*******\n Starting Sonos api `date`\n********\n" >> sonos-http-api.log

npm start >> sonos-http-api.log
