const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./src/users/routes/users');
const indexRouter = require('./src/users/routes/index');
const checkSession = require('./src/users/middleware/sessionMiddleware');
const config =require('./src/users/config/monggo')
dotenv.config();
mongoose.connect(config.mongoURI)
.then(() => console.log('Đã kết nối đến MongoDB'))
.catch(err => console.error('Lỗi kết nối đến MongoDB:', err));

const app = express();

// Middleware

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
   
}));

// View engine setup (assuming you're using EJS)
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

// Routes
app.get('/admin', (req, res) => {
    res.render('admin/index');
});
app.use(checkSession);
app.use('/', usersRouter);
app.use('/', indexRouter);
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
