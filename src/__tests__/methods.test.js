const { mockA } = require('../__mocks__/directoriesSizes')
const { keys } = Object
console.log = () => {}
const ENV = process.env.testEnv

const {
  search,
  getDiskUsage,
  getTotalDiskUsage,
  sortByFileSize,
  getByteSize
} = require('../methods')

describe('Search Tests', () => {
  if (!ENV) {
    it('should provide all the node_modules in the current dir', () => {
      const directories = search()

      expect(directories).toEqual([
        './node_modules',
        './src/__mocks__/node_modules'
      ])
    })
  }

  it('should get the disk usage of each node_module directory', () => {
    const directories = search()
    const diskUsages = getDiskUsage(directories)

    expect(keys(diskUsages[0])).toEqual([
      'size',
      'metric',
      'nmPath',
      'raw',
      'bytes'
    ])
    expect(directories[0]).toEqual(diskUsages[0].nmPath)
    expect(diskUsages[0].metric).toEqual('M')
    // expect(diskUsages[1].metric).toEqual('K')
    // expect(diskUsages[1].size).toEqual(4)
  })

  it('should get the total amout of disk usage of all NMs | mock', () => {
    const total = getTotalDiskUsage(mockA)
    expect(total).toEqual({ size: 1.61, metric: 'G' })
  })

  it('should sort the files from larger to smaller files', () => {
    const result = sortByFileSize(mockA)
    let passed = true
    for (var i = 1; i < result.length; i++) {
      const current = result[i].bytes
      const prev = result[i - 1].bytes
      if (current > prev) {
        passed = false
        break
      }
    }
    expect(passed).toEqual(true)
  })
})

describe('Utils', () => {
  describe('getByteSize', () => {
    it('should get size in bytes | KB', () => {
      const result = getByteSize({ size: 2, metric: 'K' })
      expect(result).toEqual(2048)
    })
    it('should get size in bytes | MB', () => {
      const result = getByteSize({ size: 2, metric: 'M' })
      expect(result).toEqual(2097152)
    })
    it('should get size in bytes | GB', () => {
      const result = getByteSize({ size: 2, metric: 'G' })
      expect(result).toEqual(2147483648)
    })
    it('should get size in bytes | TB', () => {
      const result = getByteSize({ size: 2, metric: 'T' })
      expect(result).toEqual(2199023255552)
    })
    it('should get size in bytes | B', () => {
      const result = getByteSize({ size: 2, metric: 'B' })
      expect(result).toEqual(2)
    })
  })
})
