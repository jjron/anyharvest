'use strict';

const fs = require('fs');
const del = require('del');
const path = require('path');
const AWS = require('aws-sdk');
const multer = require('multer');
const {Router} = require('express');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('anyharvest:listing-router');

const Profile = require('../model/profile.js');
const Listing = require('../model/listing.js');
const bearerAuth = require('../lib/bearer-auth.js');
const listingRouter = module.exports = new Router();

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

listingRouter.post('/api/profile/:profileID/listings', bearerAuth, jsonParser, function(req, res, next){
  debug('POST api/listings');
  if(!req.body.product || !req.body.desc || !req.body.zipCode)
    return next(createError(400, 'missing required values'));

  let tempProfile, tempListing;
  Profile.findById(req.params.profileID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(profile => {
    return profile ? Promise.resolve(profile) : Promise.reject(createError(404, 'no profile'));
  })
  .then(profile => {
    tempProfile = profile;
    return new Listing({
      product: req.body.product,
      desc: req.body.desc,
      price: req.body.price,
      zipCode: req.body.zipCode,
      photoID: req.body.photoID,
      userID: req.user._id.toString(),
    }).save();
  })
  .then(listing => {
    tempListing = listing;
    tempProfile.listings.push(listing._id);
    return tempProfile.save();
  })
  .then(() => res.json(tempListing))
  .catch(next);
});

//route for finding a user's listings (does not need auth)
listingRouter.get('/api/listings/:id', function(req, res, next){
  debug('GET /api/listings/:id');
  Listing.findById(req.params.id)
  .then(listing => res.json(listing))
  .catch(() => next(createError(404, 'not found')));
});

// route for finding your own listings
listingRouter.get('/api/listings/me/mylistings', bearerAuth, function(req, res, next){
  debug('GET /api/listings/me/mylistings');
  Listing.find({
    userID: req.user._id.toString(),
  })
  .then(listing => res.json(listing))
  .catch(() => next(createError(404, 'didn\'t find the listing')));
});

// route for getting everyone's listings
listingRouter.get('/api/listings', function(req, res, next) {
  debug('GET /api/listings');
  Listing.find({})
  .then(listings => res.json(listings))
  .catch(next);
});

//route for editing your own listings
listingRouter.put('/api/listings/me/mylistings/:id', bearerAuth, jsonParser, function(req, res, next){
  debug('PUT /api/listings/me/mylistings/:id');
  Listing.findOneAndUpdate({userID: req.user._id.toString(), _id: req.params.id}, req.body, {new: true})
  .then(listing => res.json(listing))
  .catch(() => next(createError(404, 'didn\'t find the listing')))
  .catch(next); //double check this potential 400 error
});

listingRouter.put('/api/listings/:id/listingpic', bearerAuth, upload.single('file'), function(req, res, next){
  debug('PUT /api/listings/:id/listingpic');
  if(!req.file)
    return next(createError(400, 'no file'));
  console.log('listing id:', req.params.id);
  Listing.findById(req.params.id)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(listing => {
    console.log('listing', listing);
    if(listing.userID.toString() !== req.user._id.toString()) {
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
    Listing.findOneAndUpdate({userID: req.user._id.toString(), _id:req.params.id}, photoData, {new: true})
    .then(listing => res.json(listing))
    .catch(() => next(createError(404, 'no listing found')))
    .catch(next);
  })
  .catch(err => {
    del([`${dataDir}/*`]);
    next(err);
  });
});
