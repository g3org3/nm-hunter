#! /usr/bin/env node

const program = require('commander')
const { version } = require('../package.json')
const { nmHunter } = require('./methods')

program.version(version).option('-v, --version', 'output the version number')
program.option('-s, --sort', 'sort the node_modules in ASC')
program.parse(process.argv)

// Search for node_modules
nmHunter({ sort: program.sort })

// catch ctrl+c event and exit normally
process.on('SIGINT', function () {
  console.log(' Exiting gracefully ...')
})
