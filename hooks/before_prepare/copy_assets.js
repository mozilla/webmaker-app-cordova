#!/usr/bin/env node

var fs = require('fs-extra');
fs.copySync('./node_modules/webmaker/build', './www');
fs.copySync('./assets/res', './www/res');
