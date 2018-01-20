const { search, getDiskUsage } = require('../methods')
const { keys } = Object
console.log = () => {}

describe('Search Tests', () => {
  it('should provide all the node_modules in the current dir', () => {
    const directories = search()

    expect(directories.length).toEqual(2)
    expect(directories).toEqual([
      './node_modules',
      './src/__mocks__/node_modules'
    ])
  })

  it('should get the disk usage of each node_module directory', () => {
    const directories = search()
    const diskUsages = getDiskUsage(directories)

    expect(diskUsages.length).toEqual(2)
    expect(keys(diskUsages[0])).toEqual(['size', 'metric', 'nmPath', 'raw'])
    expect(directories[0]).toEqual(diskUsages[0].nmPath)
    expect(diskUsages[0].metric).toEqual('M')
    expect(diskUsages[1].metric).toEqual('B')
    expect(diskUsages[1].size).toEqual(0)
  })
})
