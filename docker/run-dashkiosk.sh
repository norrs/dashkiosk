#!/bin/sh

cd ${DK_DIR:-/source}

npm install
grunt
cd dist
npm install --production

cd dist
node server.js --environment production --configuration ../config.json

