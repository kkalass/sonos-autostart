#!/bin/bash

cd `dirname $0`

LOGFILE=sonos-autostart.log

echo -e "\n*******\n Starting Sonos Autostart service `date`\n********\n" >> $LOGFILE

npm start >> $LOGFILE
