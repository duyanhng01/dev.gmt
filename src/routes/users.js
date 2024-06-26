const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/users/authControllers');

router.get('/login', (req, res) => {
  res.render('users/login');
});
router.post('/login', authControllers.login);
router.get('/logout', authControllers.logout);


module.exports = router;
