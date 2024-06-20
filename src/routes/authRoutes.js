const express = require('express');
const passport = require('passport');
const authControllers = require('../controllers/users/authControllers');
const router = express.Router();
const checkSession = require('../middleware/sessionMiddleware')

// Route for local login
router.post('/login', authControllers.login);

// Route for logout
router.get('/logout', authControllers.logout);

// Middleware to protect routes that require authentication
const protectedRoute = (req, res, next) => {
  if (req.session.userData) {
      res.locals.userData = req.session.userData; // Make userData available to views
      next();
  } else {
      res.redirect('/'); // Redirect to home page if user is not authenticated
  }
};

// Route for initiating Google OAuth authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route that Google will redirect to after authentication
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/submit_ticket'); // Redirect to submit_ticket upon successful Google OAuth authentication
  }
);

// Route for initiating Facebook OAuth authentication
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Route that Facebook will redirect to after authentication
router.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/submit_ticket'); // Redirect to submit_ticket upon successful Facebook OAuth authentication
  }
);

// Protected route for user profile
router.get('/', protectedRoute, (req, res) => {
    // Render profile page with user data
    res.render('users/submit_ticket', { userData: res.locals.userData }); // Pass userData to the view
});

// Route for logout (POST method)
router.post('/logout', authControllers.logout);

module.exports = router;
