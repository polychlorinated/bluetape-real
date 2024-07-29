const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const organizationRoute = require('./organization.route');
const projectRoute = require('./project.route');
const epicRoute = require('./epic.route');
const issueRoute = require('./issue.route');
const commentRoute = require('./comment.route');
const notificationRoute = require('./notification.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/organization',
    route: organizationRoute,
  },
  {
    path: '/project',
    route: projectRoute,
  },
  {
    path: '/epic',
    route: epicRoute,
  },
  {
    path: '/issue',
    route: issueRoute,
  },
  {
    path: '/comment',
    route: commentRoute,
  },
  {
    path: '/notification',
    route: notificationRoute,
  },
  // Add other routes here
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
