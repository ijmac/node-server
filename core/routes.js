/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default app => {

  // Add headers
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });

  // Insert routes below
  app.use('/api/categories', require('./api/category'));
  app.use('/api/v2/products', require('./api/v2/product'));
  app.use('/api/products', require('./api/product'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth').default);

  app.route('/uploads/:fileName')
    .get((req, res) => {
      console.log(app.get('appPath'));
      res.sendFile(path.resolve(`${app.get('appPath')}/uploads/${req.param.fileName}`));
    });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
    console.log(app.get('appPath'));
      res.sendFile(path.resolve(`${app.get('appPath')}/core/views/404.html`));
    });
}
