'use strict';

process.env.PORT=3000;
process.env.LOG_FORMAT='dev';
process.env.API_URL='http://localhost:3000';
process.env.MONGODB_URI='mongodb://localhost/test';
process.env.APP_SECRET='thomasStillUsesTooManyEmojis';
process.env.AWS_BUCKET='thiscanbeanything';
process.env.AWS_ACCESS_KEY_ID='thisalsocanbeanything';
process.env.AWS_SECRET_ACCESS_KEY='thisshouldbecool';

require('./aws-mocks.js');
