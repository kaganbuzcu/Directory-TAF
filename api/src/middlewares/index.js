const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

export default (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));
};
