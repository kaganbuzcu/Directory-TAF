const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

export default (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('dev'));
};
