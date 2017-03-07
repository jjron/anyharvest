'use strict';

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('anyharvest:index');

let app = module.exports = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(morgan(process.env.LOG_FORMAT));
console.log('asdf', process.env.LOG_FORMAT, process.env.PORT);

app.use(require('./router/auth-router.js'));
app.use(require('./router/profile-router.js'));
app.use(require('./router/listing-router.js'));

app.use(express.static(`${__dirname}/../build`));
app.get('*', (req, res) => res.redirect('/'));

app.use((err, req, res, next) => {
  debug('error middleware');
  console.error(err.message);
  console.log('err:', err);
  if(err.status) return res.sendStatus(err.status);
  if(err.name === 'ValidationError') return res.sendStatus(400);
  if(err.name === 'MongoError' && err.code == '11000')
    return res.sendStatus(409);
  res.sendStatus(500);
  next();
});
