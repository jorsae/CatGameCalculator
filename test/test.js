var classes = require('../src/js/classes/floor');

describe('Test', () => {
    it('should succeed', (done) => {
        const mayhem = new classes.Floor("Mayhem", 4, null);
        console.log(mayhem.name);  
      setTimeout(done, 1000);
    });
  });