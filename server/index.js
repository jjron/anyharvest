'use strict';

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const firebase = require('firebase');
const admin = require('firebase-admin');
const debug = require('debug')('anyharvest:index');

firebase.initializeApp({
  apiKey: process.env.FIREBASE_WEB_API_KEY,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
});

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CERT)),
  databaseURL: `${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
});

let app = module.exports = express();

app.use(cors());
app.use(morgan(process.env.LOG_FORMAT));

app.use(require('./router/auth-router.js'));
app.use(require('./router/page-router.js'));

app.use(express.static(`${__dirname}/../build`));
app.get('*', (req, res) => res.redirect('/'));

app.use((err, req, res, next) => {
  debug('error middleware');
  console.error(err.message);
  if(err.status)
    return res.sendStatus(err.status);
  res.sendStatus(500);
  next();
});
