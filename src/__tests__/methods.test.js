const { search } = require('../methods')

describe('Search Tests', () => {
  it('should provide all the node_modules in the current dir', () => {
    const directories = search()
    expect(directories.length).toEqual(1)
    expect(directories).toEqual(['./node_modules'])
  })
})
