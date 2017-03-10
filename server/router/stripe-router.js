'use strict';

const {Router} = require('express');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('anyharvest:stripe-router');
const stripe = require('stripe')('sk_test_Pg2fM1vgjK3dQLrT9MrcNHco');

const Listing = require('../model/listing.js');
const bearerAuth = require('../lib/bearer-auth.js');

const stripeRouter = module.exports = new Router;

stripeRouter.post('/api/charge/:listingID', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST /api/charge/:listingID');
  let tempListing;
  // Create a new customer and then a new charge for that customer:
  Listing.findById(req.params.listingID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(listing => {
    tempListing = listing;
  });

  stripe.customers.create({
    email: req.user.email,
  })
  .then(customer => {
    return stripe.customers.createSource(customer.id, {
      source: {
        object: 'card',
        exp_month: req.body.exp_month,// num
        exp_year: req.body.exp_year,// num
        number: req.body.number,// str
        cvc: req.body.cvc,// num
      },
    });
  })
  .then(source => {
    return stripe.charges.create({
      amount: tempListing.price,
      currency: 'usd',
      customer: source.customer,
    });
  })
  .then(charge => {
    // New charge created on a new customer
    console.log('charge success!', charge);
    res.json(charge);
  })
  .catch(err => {
    // Deal with an error
    next(err);
  });
});
