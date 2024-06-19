const express = require('express');
const axios = require('axios');
const session = require('express-session');
const app = express();

// Middleware cho session
app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: true
}));

// Route để login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
      const { username, password } = req.body;
        const deviceId = req.headers['user-agent'];

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

      const response = await axios.post('https://api-v2.gamota.com/game/login', null, {
        params: {
            username,
            password,
            device_id: deviceId,
            api_key: process.env.GAMOTA_API_KEY
        }
    });

        const userInfo = response.data;
        req.session.user = userInfo; // Lưu thông tin user vào session
        res.json({ success: true, userInfo });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Login failed', error: error.message });
    }
});

// Middleware kiểm tra user session
app.use((req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;
        next();
    } else {
        res.redirect('/login');
    }
});

// Route cho trang chủ
app.get('/', (req, res) => {
    if (res.locals.user) {
        res.send(`<h1>Welcome, ${res.locals.user.username}</h1><a href="/logout">Logout</a>`);
    } else {
        res.send('<h1>Welcome, Guest</h1><a href="/login">Login</a>');
    }
});

// Route để logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Route cho trang login
app.get('/login', (req, res) => {
    res.send('<form method="post" action="/login"><input type="text" name="username" placeholder="Username"/><input type="password" name="password" placeholder="Password"/><button type="submit">Login</button></form>');
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
