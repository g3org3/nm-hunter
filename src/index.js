#! /usr/bin/env node

const program = require('commander')
const { version } = require('../package.json')
const { nmHunter } = require('./methods')

program.version(version).option('-v, --version', 'output the version number')
program.parse(process.argv)

// Search for node_modules
nmHunter()

// catch ctrl+c event and exit normally
process.on('SIGINT', function () {
  console.log(' Exiting gracefully ...')
})
