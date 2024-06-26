const express = require('express');
const router = express.Router();

// Định nghĩa route cho trang chủ
router.get('/', (req, res) => {
    res.render('users/index', { user: req.session.userData });
});

module.exports = router;
