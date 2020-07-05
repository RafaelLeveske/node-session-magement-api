const express = require('express');

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

module.exports = routes;
