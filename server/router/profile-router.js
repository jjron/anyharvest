'use strict';

const fs = require('fs');
const del = require('del');
const path = require('path');
const AWS = require('aws-sdk');
const multer = require('multer');
const Router = require('express').Router;
const createError = require('http-errors');
const Profile = require('../model/profile.js');
const jsonParser = require('body-parser').json();
const bearerAuth = require('../lib/bearer-auth.js');
const profileRouter = module.exports = new Router();
const debug = require('debug')('anyharvest:profile-router');

AWS.config.setPromisesDependency(require('bluebird'));

const s3 = new AWS.S3();
const dataDir = `${__dirname}/../data`;
const upload = multer({dest: dataDir});

function s3Promise(params){
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, s3data) => {
      if (err) return reject(err);
      resolve (s3data);
    });
  });
}

profileRouter.post('/api/profiles', bearerAuth, jsonParser, function(req, res, next){
  debug('POST /api/profiles');



  console.log('req.user is', req.user);

  new Profile({
    userName: req.user.username,
    email: req.user.email,
    zipCode: req.body.zipCode,
    userID: req.user._id.toString(),
  })
  .save()
  .then(profile => {
    res.json(profile);
  })
  .catch(next);
});

profileRouter.put('/api/profiles/:id/profilepic', bearerAuth, upload.single('file'), function(req, res, next){
  debug('PUT /api/profiles/:id/profilepic');
  if(!req.file)
    return next(createError(400, 'no file'));
  console.log('profile id:', req.params.id);
  Profile.findById(req.params.id)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(profile => {
    console.log('profile', profile);
    if(profile.userID.toString() !== req.user._id.toString()) {
      return Promise.reject(createError(401, 'User not authorized'));
    }
    return s3Promise({
      ACL: 'public-read',
      Bucket: process.env.AWS_BUCKET,
      Key: `${req.file.filename}${path.extname(req.file.originalname)}`,
      Body: fs.createReadStream(req.file.path),
    });
  })
  .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(500, err.message)))
  .then(s3data => {
    del([`${dataDir}/*`]);
    var photoData = {
      imageKey: s3data.Key,
      photoURI: s3data.Location,
    };
    Profile.findOneAndUpdate({userID: req.user._id.toString(), _id:req.params.id}, photoData, {new: true})
    .then(profile => res.json(profile))
    .catch(() => next(createError(404, 'no profile found')))
    .catch(next);
  })
  .catch(err => {
    del([`${dataDir}/*`]);
    next(err);
  });
});

profileRouter.get('/api/profiles/me', bearerAuth, function(req, res, next) {
  Profile.findOne({userName: req.user.username})
  .then(profile => res.json(profile))
  .catch(next);
});

profileRouter.get('/api/profiles/:id', function(req, res, next) {
  debug('GET /api/profiles/:id');
  Profile.findById(req.params.id)
  .then(profile => res.json(profile))
  .catch(() => next(createError(404, 'that profile does not was not found')));
});

profileRouter.put('/api/profiles/:id', bearerAuth, jsonParser, function(req, res, next) {
  debug('PUT /api/profiles/:id');
  Profile.findOneAndUpdate({userID: req.user._id.toString(), _id:req.params.id}, req.body, {new: true})
  .then(profile => res.json(profile))
  .catch(() => next(createError(404, 'no profile found')))
  .catch(next);
});
