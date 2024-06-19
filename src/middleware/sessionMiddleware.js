// sessionMiddleware.js

// Import các module cần thiết
const express = require('express');
const router = express.Router();
const session = require('express-session');

// Middleware để kiểm tra session
const checkSession = (req, res, next) => {
    // Kiểm tra xem session đã tồn tại hay chưa
    if (req.session && req.session.userData) {
        // Nếu đã có session.userData tồn tại, đưa dữ liệu xuống view
        res.locals.userData = req.session.userData;
        console.log(req.session.userData); // Optional: Log userData for debugging
        next(); // Chuyển tiếp sang middleware hoặc route tiếp theo
    } else {
        res.redirect('/login'); // Nếu không có session, chuyển hướng về trang đăng nhập
    }
};

module.exports = checkSession;
