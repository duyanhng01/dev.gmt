// src/controllers/users/authControllers.js

const axios = require('axios');

require('dotenv').config();



exports.login = async (req, res) => {
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

        if (response.status === 200 && response.data && response.data.data) {
            const { access_token, user_id, email  } = response.data.data;

            req.session.userData = {
                access_token: access_token,
                username: username,
                user_id: user_id,
                email: email

            };
            console.log('Session userData:', req.session.userData);
            return res.redirect('/');
            // return res.status(200).json({ message: 'Login successful' });
        } else {
            return res.status(401).json({ error: 'Authentication failed' });
        }
    } catch (error) {
        console.error('Login error:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.logout = (req, res) => {
    
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Failed to logout');
        } else {
            res.redirect('/login');
        }
    });
}

