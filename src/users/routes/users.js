const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');
const keepLogin =  require('../middleware/keepLoginMiddleware');

router.get('/login', keepLogin , (req, res) => {
  res.render('users/login');
});
router.post('/login', authControllers.login );
router.get('/logout', authControllers.logout);


module.exports = router;
