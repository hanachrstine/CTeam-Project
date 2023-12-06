const handler = require('../handler/handler');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: handler.homeHandler,
  },
  {
    method: 'GET',
    path: '/about',
    handler: handler.aboutHandler,
  },
  {
    method: 'GET',
    path: '/login',
    handler: handler.loginHandler,
  },
  {
    method: 'GET',
    path: '/dashboard',
    handler: handler.dashboardHandler,
  },
];
