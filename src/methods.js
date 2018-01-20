// Dependencies
const { execSync } = require('child_process')

// Exports
exports.nmHunter = nmHunter
exports.search = search
exports.getDiskUsage = getDiskUsage

/** ************************\
 ** ---- All Methods --- **
 \**************************/

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
  console.log('Working... this might take some minutes ⏱')
  const filteredDirectoriesSizes = filteredDirectories
    .map(dir =>
      execSync(`du -hs ${dir.replace(' ', '\\ ')}`)
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

function prettyPrintResults (filteredDirectoriesSizes) {
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
}

function nmHunter () {
  const directories = search()
  const direcotiesSizes = getDiskUsage(directories)
  prettyPrintResults(direcotiesSizes)
}
