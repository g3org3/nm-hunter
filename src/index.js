#! /usr/bin/env node

require('util.promisify').shim()
require('array-includes').shim()

const program = require('commander')
const { version } = require('../package.json')
const { nmHunter } = require('./methods')

program.version(version).option('-v, --version', 'output the version number')
program.option('-s, --sort', 'sort the node_modules in ASC')
program.option('-w --warning', 'only display node_modules above 99M')
program.parse(process.argv)

// Search for node_modules
nmHunter({ warning: program.warning, sort: program.sort })
