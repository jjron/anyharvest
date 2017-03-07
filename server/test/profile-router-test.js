'use strict';

const {expect} = require ('chai');
const superagent = require('superagent');
const Profile = require('../model/profile.js');
const User = require('../model/user.js');
const profileMock = require('./lib/profile-mock.js');
const userMock = require('./lib/user-mock.js');
const serverControl = require('./lib/server-control.js');
const baseURL = process.env.API_URL;

describe('testing profile-router', function () {
  before(serverControl.start);
  after(serverControl.stop);
  afterEach(done => {
    Promise.all([
      User.remove({}),
      Profile.remove({}),
    ])
    .then(() => done())
    .catch(done);
  });

  describe('testing POST /api/profiles', function () {
    before(userMock.bind(this));
    it('should respond with a profile', (done) => {
      superagent.post(`${baseURL}/api/profiles`)
      .send({
        userName: 'farmerjohn',
        email: 'farmerjohn@farmersonly.com',
        zipCode: '98116',
      })
      .set('authorization',`Bearer ${this.tempToken}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.userName).to.equal('farmerjohn');
        expect(res.body.zipCode).to.equal('98116');
        expect(!!res.body.userID).to.equal(true);
        done();
      })
      .catch(done);
    });

    it('should return a 400 when there is no username', (done) => {
      superagent.post(`${baseURL}/api/profiles`)
      .send({
        zipCode: '98116',
        email: 'farmerjohn@farmersonly.com',
      })
      .set('authorization', `Bearer ${this.tempToken}`)
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(400);
        done();
      })
      .catch(done);
    });
  });

  describe('testing GET /api/profiles/:id', function() {
    beforeEach(userMock.bind(this));
    beforeEach(profileMock.bind(this));

    it('should respond with a profile', (done) => {
      let url = `${baseURL}/api/profiles/${this.tempProfile._id.toString()}`;
      superagent.get(url)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.email).to.equal('farmerjohn@farmersonly.com');
        expect(res.body.userName).to.equal('farmerjohn');
        expect(res.body.zipCode).to.equal('98116');
        expect(!!res.body.userID).to.equal(true);
        done();
      })
      .catch(done);
    });

    it('should return a 404 when profile not found', (done) => {
      let url = `${baseURL}/api/profiles/hackID`;
      superagent.get(url)
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });

  describe('testing PUT /api/profiles/:id/profilepic', function() {
    beforeEach(userMock.bind(this));
    beforeEach(profileMock.bind(this));
    it('should upload a profile pic', done => {
      let url = `${baseURL}/api/profiles/${this.tempProfile._id.toString()}/profilepic`;
      superagent.put(url)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .attach('file', `${__dirname}/../../assets/logo_assets/leaf.png`)
      .then(res => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch(done);
    });
  });
});
