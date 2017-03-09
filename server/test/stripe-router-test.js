'use strict';

const {expect} = require ('chai');
const superagent = require('superagent');
const User = require('../model/user.js');
const Profile = require('../model/profile.js');
const Listing = require('../model/listing.js');
const userMock = require('./lib/user-mock.js');
const profileMock = require('./lib/profile-mock.js');
const listingMock = require('./lib/listing-mock.js');
const serverControl = require('./lib/server-control.js');
const baseURL = process.env.API_URL;

describe('testing stripe-router', function() {
  before(serverControl.start);
  after(serverControl.stop);
  afterEach(done => {
    Promise.all([
      Listing.remove({}),
      User.remove({}),
      Profile.remove({}),
    ])
    .then(() => done())
    .catch(done);
  });

  describe('testing POST /api/charge/:listingID', function() {
    beforeEach(userMock.bind(this));
    beforeEach(profileMock.bind(this));
    beforeEach(listingMock.bind(this));
    it.only('should respond with a charge object', done => {
      superagent.post(`${baseURL}/api/charge/${this.tempListing._id.toString()}`)
      .send({
        exp_month: 11,
        exp_year: 2017,
        number: '4242 4242 4242 4242',
        cvc: 731,
      })
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.object).to.equal('charge');
        done();
      })
      .catch(done);
    });
  });

});
