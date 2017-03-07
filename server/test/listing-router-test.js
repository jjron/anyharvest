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

describe('testing post-router', function() {
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

  describe('testing POST /api/profile/:profileID/listings', function() {
    beforeEach(userMock.bind(this));
    beforeEach(profileMock.bind(this));
    it('should respond with a post', done => {
      superagent.post(`${baseURL}/api/profile/${this.tempProfile._id.toString()}/listings`)
      .send({
        product: 'peas',
        desc: 'so green',
        zipCode: '55555',
      })
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.product).to.equal('peas');
        expect(res.body.desc).to.equal('so green');
        expect(res.body.zipCode).to.equal('55555');
        expect(res.body.active).to.equal(false);
        expect(res.body.userID).to.equal(this.tempUser._id.toString());
        done();
      })
      .catch(done);
    });

    it('should respond with a 400 bad request', done => {
      superagent.post(`${baseURL}/api/profile/${this.tempProfile._id.toString()}/listings`)
      .send({})
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(400);
        done();
      })
      .catch(done);
    });

    it('should respond with a 401 unauthorized', done => {
      superagent.post(`${baseURL}/api/profile/${this.tempProfile._id.toString()}/listings`)
      .send({
        product: 'peas',
        desc: 'so green',
        zipCode: '55555',
      })
      .set('Authorization', 'Bearer badtoken')
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(401);
        done();
      })
      .catch(done);
    });

    it('should respond with a 404 not found', done => {
      superagent.post(`${baseURL}/api/lists`)
      .send({
        product: 'peas',
        desc: 'so green',
        zipCode: '55555',
      })
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });

  describe('testing GET /api/listings/me/mylistings', function() {
    beforeEach(userMock.bind(this));
    beforeEach(profileMock.bind(this));
    beforeEach(listingMock.bind(this));
    it('should respond with user\'s listings', done => {
      superagent.get(`${baseURL}/api/listings/me/mylistings`)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.instanceof(Array);
        expect(res.body[0].product).to.equal(this.tempListing.product);
        expect(res.body[0].desc).to.equal(this.tempListing.desc);
        expect(res.body[0].zipCode).to.equal(this.tempListing.zipCode);
        expect(res.body[0].active).to.equal(this.tempListing.active);
        expect(res.body[0].userID).to.equal(this.tempUser._id.toString());
        done();
      })
      .catch(done);
    });

    it('should respond with 401 unauthorized', done => {
      superagent.get(`${baseURL}/api/listings/me/mylistings`)
      .set('Authorization', `Bearer badtoken`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(401);
        done();
      })
      .catch(done);
    });

    // bad endpoints are caught by app.get(*) in index.js
    it('should respond with 302 found', done => {
      superagent.get(`${baseURL}/api/listings/me/hacktheplanet`)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(302);
        done();
      })
      .catch(done);
    });
  });

  describe('testing GET /api/listings/:id', function() {
    beforeEach(userMock.bind(this));
    beforeEach(profileMock.bind(this));
    beforeEach(listingMock.bind(this));

    it('should respond with a listing', done => {
      superagent.get(`${baseURL}/api/listings/${this.tempListing._id.toString()}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.product).to.equal(this.tempListing.product);
        expect(res.body.desc).to.equal(this.tempListing.desc);
        expect(res.body.active).to.equal(this.tempListing.active);
        expect(res.body.zipCode).to.equal(this.tempListing.zipCode);
        expect(res.body.userID).to.equal(this.tempUser._id.toString());
        done();
      })
      .catch(done);
    });

    it('should respond with 302 listing not found', done => {
      superagent.get(`${baseURL}/api/listings/hacktheplanet`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });

  describe('testing GET /api/listings', function() {
    beforeEach(userMock.bind(this));
    beforeEach(profileMock.bind(this));
    beforeEach(listingMock.bind(this));

    it('should respond with all the listings', done => {
      superagent.get(`${baseURL}/api/listings`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.instanceof(Array);
        done();
      })
      .catch(done);
    });

    it('should respond with 302 found', done => {
      superagent.get(`${baseURL}/api/po`)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(302);
        done();
      })
      .catch(done);
    });
  });

  describe('testing PUT /api/listings/me/mylistings/:id', function() {
    beforeEach(userMock.bind(this));
    beforeEach(profileMock.bind(this));
    beforeEach(listingMock.bind(this));

    it('should respond with an updated post', done => {
      superagent.put(`${baseURL}/api/listings/me/mylistings/${this.tempListing._id.toString()}`)
      .send({desc: 'the peas are so green', zipCode: '88888'})
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.product).to.equal(this.tempListing.product);
        expect(res.body.desc).to.equal('the peas are so green');
        expect(res.body.active).to.equal(this.tempListing.active);
        expect(res.body.zipCode).to.equal('88888');
        expect(res.body.userID).to.equal(this.tempUser._id.toString());
        done();
      })
      .catch(done);
    });

    it('should respond with a 400 bad request', done => {
      superagent.put(`${baseURL}/api/listings/me/mylistings/${this.tempListing._id.toString()}`)
      .send('will not update')
      .set('Authorization', `Bearer ${this.tempToken}`)
      .set('Content-type', 'application/json')
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(400);
        done();
      })
      .catch(done);
    });

    it('should respond with a 401 unauthorized', done => {
      superagent.put(`${baseURL}/api/listings/me/mylistings/${this.tempListing._id.toString()}`)
      .send({desc: 'updated desc'})
      .set('Authorization', `Bearer badtoken`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(401);
        done();
      })
      .catch(done);
    });

    it('should respond with a 404 not found', done => {
      superagent.put(`${baseURL}/api/listings/me/mylistings/hacktheplanet`)
      .send({desc: 'updated description'})
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
  describe('testing PUT /api/listings/:id/listingpic', function() {
    beforeEach(userMock.bind(this));
    beforeEach(profileMock.bind(this));
    beforeEach(listingMock.bind(this));
    it('should upload a listing pic', done => {
      let url = `${baseURL}/api/listings/${this.tempListing._id.toString()}/listingpic`;
      superagent.put(url)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .attach('file', `${__dirname}/../../assets/logo_assets/leaf.png`)
      .then(res => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch(done);
    });
    it('should upload a listing pic', done => {
      let url = `${baseURL}/api/listings/${this.tempListing._id.toString()}/listingpic`;
      superagent.put(url)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .attach('file', ``)
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(400);
        done();
      })
      .catch(done);
    });
    it('should respond with 401', done => {
      let url = `${baseURL}/api/listings/${this.tempListing._id.toString()}/listingpic`;
      superagent.put(url)
      .set('Authorization', `Bearer badtoken`)
      .attach('file', `${__dirname}/../../assets/logo_assets/leaf.png`)
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(401);
        done();
      })
      .catch(done);
    });
    it('should return a 404 when profile not found', (done) => {
      let url = `${baseURL}/api/listings/${this.tempListing._id.toString()}/profilepuck`;
      superagent.put(url)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .attach('file', `${__dirname}/../../assets/logo_assets/leaf.png`)
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
});
