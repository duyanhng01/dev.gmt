const express = require('express');
const passport = require('passport');
const authControllers = require('../controllers/users/authControllers');
const router = express.Router();

router.post('/login', authControllers.login) ;
router.get('/logout', authControllers.logout);


// Route for initiating Google OAuth authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route that Google will redirect to after authentication
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/submit_ticket');
  }
);


router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/submit_ticket');
  }
);
router.get('/profile', (req, res) => {
  if (!req.user) {
    // Handle cases where user is not authenticated
    res.redirect('/login'); // Redirect to login page or handle as appropriate
  } else {
    // Render profile page with user data
    res.render('users/submit_ticket', { user: req.user }); // Pass req.user to the view
  }
});
router.post('/logout', authControllers.logout);
module.exports = router;
