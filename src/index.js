#! /usr/bin/env node

const program = require('commander')
const { version } = require('../package.json')
const { nmHunter } = require('./methods')

program.version(version).option('-v, --version', 'output the version number')
program.option('-s, --sort', 'sort the node_modules in ASC')
program.option('-w --warning', 'only display node_modules above 99M')
program.parse(process.argv)

// Search for node_modules
nmHunter({ warning: program.warning, sort: program.sort })

// catch ctrl+c event and exit normally
process.on('SIGINT', function () {
  console.log(' Exiting gracefully ...')
})
