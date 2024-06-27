const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios'); 
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./src/config/passport'); // Ensure this is the correct path to your passport config
const authRoutes = require('./src/routes/authRoutes');
const ticket = require('./src/routes/ticket');
const authControllers = require('./src/controllers/users/authControllers');
const sessionMiddleware = require('./src/middleware/sessionMiddleware');
const checkSession = require('./src/middleware/sessionMiddleware'); // Assuming sessionMiddleware.js is in the same directory

// Example route that requires session authentication



require('dotenv').config(); // Load environment variables
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));


app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// const session = require('express-session');

app.use(session({
    secret: '12312',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Use true if you're serving over HTTPS
}));
app.use((req, res, next) => {
    res.locals.user = req.session.userData || null;
    next();
});
app.get('/', (req, res) => {
    res.render('users/index');
});

const requireLogin = (req, res, next) => {
    if (req.session.userData) {
        next(); // User is logged in, proceed to next middleware
    } else {
        res.redirect('/login'); // Redirect to login page if not logged in
    }
};
app.get('/login', (req, res) => {
    res.render('users/login');
});

app.get('/submit_ticket', async (req, res) => {
    try {
        const response = await axios.get('https://nap.gamota.com/games/support/list-game');
        const games = response.data.data;
        // var gameID = game_id;
        res.render('users/submit_ticket', { games });
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);   
        res.status(500).send('Đã xảy ra lỗi khi lấy dữ liệu từ API.');
    }
});

app.get('/submit_ticket', (req, res) => {
    if (req.session.userData) {
        res.render('submit_ticket'); // Ensure you have submit_ticket.ejs file in your views folder
    } else {
        res.redirect('/login');
    }
});

app.use('/submit_ticket', ticket);
app.use('/', authRoutes);

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid'); // Adjust the cookie name if different
        res.redirect('/');
    });
});

mongoose.connect('mongodb://localhost:27017/mydatabase')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
