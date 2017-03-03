'use strict';

const {expect} = require('chai');

describe('testing test', function() {
  it('should pass', (done) => {
    expect(true).to.equal(true);
    done();
  });
});
