// Dependencies
const { execSync } = require('child_process')
const prettyMs = require('pretty-ms')

// Exports
exports.nmHunter = nmHunter
exports.search = search
exports.getDiskUsage = getDiskUsage
exports.getTotalDiskUsage = getTotalDiskUsage

/** ************************\
 ** ---- All Methods --- **
 \**************************/

function replaceAll (target, search, replacement) {
  return target.replace(new RegExp(search, 'g'), replacement)
}

function search () {
  console.log()
  console.log('Searching for node_modules... 🔦')
  const output = execSync('find . -name node_modules -type d').toString()
  const lines = output.split('\n')

  const filteredDirectories = lines.filter(
    line => line.split('node_modules').filter(w => w).length === 1
  )
  return filteredDirectories
}

function getDiskUsage (filteredDirectories) {
  console.log(
    `Found(${
      filteredDirectories.length
    })... Now getting disk usage, this might take some minutes ⏱`
  )
  const filteredDirectoriesSizes = filteredDirectories
    .map(dir =>
      execSync(`du -hs ${replaceAll(dir, ' ', '\\ ')}`)
        .toString()
        .split('\n')
        .join('')
    )
    .map(line => {
      // e.g. 134M\t./node_modules
      const nmPath = line.split('\t')[1]
      const sizeStr = line.split('\t')[0]
      const size = Number(sizeStr.substr(0, sizeStr.length - 1))
      const metric = sizeStr.substr(sizeStr.length - 1)
      return { size, metric, nmPath, raw: line }
    })
  return filteredDirectoriesSizes
}

function getTotalDiskUsage (filteredDirectoriesSizes) {
  let size = filteredDirectoriesSizes
    .map(dir => {
      let byteSize = dir.size
      switch (dir.metric) {
        case 'K':
          byteSize *= 1024
          break
        case 'M':
          byteSize *= 1024 * 1024
          break
        case 'G':
          byteSize *= 1024 * 1024 * 1024
          break
      }
      return byteSize
    })
    .reduce((sum, size) => sum + size, 0)

  let metric = 'B'
  if (size > 1024) {
    metric = 'K'
    size /= 1024
  }
  if (size > 1024) {
    metric = 'M'
    size /= 1024
  }
  if (size > 1024) {
    metric = 'G'
    size /= 1024
  }
  return { size: floor(size), metric }
}

function floor (n) {
  return Math.floor(n * 100) / 100
}

function prettyPrintResults (filteredDirectoriesSizes) {
  const { size, metric } = getTotalDiskUsage(filteredDirectoriesSizes)
  console.log()
  console.log('⚡️ Found!')
  console.log('-------------')
  filteredDirectoriesSizes.map(dir => {
    const { size, metric, raw } = dir
    let alert = false
    switch (metric) {
      case 'M':
        alert = size > 99
        break
      case 'G':
        alert = true
        break
    }
    console.log(alert ? '⚠️' : '✅', raw)
  })
  console.log()
  console.log(`total used: ${size}${metric}`)
}

function nmHunter () {
  const start = new Date()
  const directories = search()
  const direcotiesSizes = getDiskUsage(directories)
  prettyPrintResults(direcotiesSizes)
  const end = new Date()
  const duration = prettyMs(end - start, { verbose: true })
  console.log(`   it took: ${duration}`)
  console.log()
}
