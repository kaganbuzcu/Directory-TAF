const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

export default (app) => {
  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(morgan('dev'));
};
