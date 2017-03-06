'use strict';


const createError = require('http-errors');
const debug = require('debug')('olayers:profile-router');
const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Profile = require('../model/profile.js');
const bearerAuth = require('../lib/bearer-auth.js');
const profileRouter = module.exports = new Router();

profileRouter.post('/api/profiles', bearerAuth, jsonParser, function(req, res, next){
  debug('POST /api/profiles');
  if(!req.body.userName)
    return next(createError(400, 'requires userName'));

  new Profile({
    userName: req.body.userName,
    email: req.body.email,
    profilePic: req.body.profilePic,
    listings: req.body.listing,
    zipCode: req.body.zipCode,
    userID: req.user._id.toString(),
  })
  .save()
  .then(profile => {
    res.json(profile);
  })
  .catch( err => {
    console.log('some random string', err);
    next();
  });
});

profileRouter.get('/api/profiles/:id', function(req, res, next) {
  debug('GET /api.profiles/:id');
  Profile.findById(req.params.id)
.then(profile => res.json(profile))
.catch(() => next(createError(404, 'that profile does not was not found')));
});

profileRouter.put('/api/profiles/:id', bearerAuth, jsonParser, function(req, res, next) {
  debug('PUT /api/profiles/:id');
  Profile.findOneAndUpdate({userID: req.user._id.toString(), _id:req.params.id}, req.body, {new: true})
  .then(profile => req.json(profile))
  .catch(() => next(createError(404, 'no profile found')))
  .catch(next);
});
