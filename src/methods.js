// Dependencies
const { execSync } = require('child_process');

// Exports
exports.nmHunter = nmHunter;

/**************************\
 ** ---- All Methods --- **
\**************************/

function search () {
  console.log()
  console.log('Searching for node_modules... 🔦')
  const output = execSync('find . -name node_modules -type d').toString()
  const lines = output.split('\n')
  
  const filteredDirectories = lines.filter(line => (
    line.split('node_modules').filter(w => w).length === 1
  ))
  return filteredDirectories;
}

function getDiskUsage (filteredDirectories) {
  console.log('Working... this might take some minutes ⏱')
  const filteredDirectoriesSizes = filteredDirectories
    .map(dir => (
      execSync(`du -hs ${dir.replace(' ', '\\ ')}`)
        .toString()
        .split('\n')
        .join(''))
    )
  return filteredDirectoriesSizes
}

function prettyPrintResults(filteredDirectoriesSizes) {
  console.log()
  console.log('⚡️ Found!')
  console.log('-------------')
  filteredDirectoriesSizes.map(dir => {
    const size = dir.split('\t').filter(w => w)[0]
    const MBsize = Number(size.split('M')[0])
    const GBsize = Number(size.split('G')[0])
    if (MBsize > 100 || GBsize > 0) {
      console.log('⚠️', dir)
    } else
      console.log('✅', dir)
  })
  console.log()
}

function nmHunter () {
  const directories = search()
  const direcotiesSizes = getDiskUsage(directories)
  prettyPrintResults(direcotiesSizes)
}