const { padding } = require('../methods');

describe('methods', () => {
  describe('padding', () => {
    it('should provide padding', () => {
      const result = padding('hola');
      expect(result).toBe('    hola  ');
    });

    it('should not pad the string', () => {
      const result = padding('hey how are you');
      expect(result).toBe('hey how are you ');
    });
  });
});
