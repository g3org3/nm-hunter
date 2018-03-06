const prettyBytes = require('pretty-bytes')
const prettyMs = require('pretty-ms')
const path = require('path')
const utils = require('./utils')
const ora = require('ora')

const spinner = ora('Hunting wild node_modules')
let fullSize = 0
const checkFile = file =>
  utils.lstat(file).then(stats => {
    if (stats.isDirectory()) {
      if (file.includes('node_modules')) {
        return utils.du(file, { disk: true }).then(size => {
          fullSize += size
          spinner.text = 'Hunting wild node_modules: ' + prettyBytes(fullSize)
          return { file, size }
        })
      } else {
        return search(file)
      }
    } else {
      return []
    }
  })

const search = directory => {
  return utils.readdir(directory).then(files =>
    files.reduce(
      (chain, file) =>
        chain.then(directories => {
          const fullPath = path.resolve(directory, file)
          return checkFile(fullPath).then(directories.concat.bind(directories))
        }),
      Promise.resolve([])
    )
  )
}

const padding = str => {
  const padSize = 9
  if (str.length <= padSize) {
    return new Array(padSize - str.length).join(' ') + str + '  '
  } else {
    return str + ' '
  }
}

const prettyPrintResults = (directories, warning) => {
  console.log()
  console.log('⚡️ Found!')
  console.log('-------------')
  directories.map(({ file, size }) => {
    let alert = 99 * 1024 * 1024 < size
    if (!warning || alert) {
      console.log(alert ? '⚠️' : '✅', `${padding(prettyBytes(size))}${file}`)
    }
  })
  console.log()
  console.log(`total used: ${prettyBytes(fullSize)}`)
}

const sortByFileSize = directories =>
  directories.sort((a, b) => b.size - a.size)

function nmHunter ({ warning, sort }) {
  const start = new Date()
  spinner.start()
  search(process.cwd())
    .then(directories => {
      spinner.clear()
      spinner.stop()
      prettyPrintResults(
        sort ? sortByFileSize(directories) : directories,
        warning
      )
      const end = new Date()
      const duration = prettyMs(end - start, { verbose: true })
      console.log(`   it took: ${duration}`)
      console.log()
    })
    .catch(console.log)
}

exports.nmHunter = nmHunter
exports.search = search
