'use strict'

const express = require('express')
const cors = require('cors')
const app = express()

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const rateLimit = require('express-rate-limit')

app.use(cors());
app.options('*', cors());

app.set('trust proxy', 1);

const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again after 5 minutes'
})

module.exports = (db) => {
  app.use('/public', apiLimiter, express.static('public'));
  app.use('/api', jsonParser, require('./api')(db));
  return app;
}
