// src/controllers/users/authControllers.js
const axios = require('axios');
require('dotenv').config();

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const deviceId = req.headers['user-agent'];

        console.log('Received login request');
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Device ID:', deviceId);

        // Validate input
        if (!username || !password) {
            console.log('Missing username or password');
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Make API request
        console.log('Sending login request to external API');
        const response = await axios.post('https://api-v2.gamota.com/game/login', null, {
            params: {
                username,
                password,
                device_id: deviceId,
                api_key: process.env.GAMOTA_API_KEY
            }
        });

        console.log('Received response from external API');
        console.log('Response status:', response.status);
        console.log('Response data:', response.data);

        // Handle response
        if (response.status === 200 && response.data && response.data.data) {
            const { access_token } = response.data.data;

            console.log('Login successful, setting session data');
            // Store user data in session
            req.session.userData = {
                access_token,
                username
            };
            console.log('Session data set:', req.session.userData);
            // Redirect to the ticket submission page
            console.log('Redirecting to submit_ticket');
            return res.redirect('submit_ticket');
        } else {
            console.log('Authentication failed');
            return res.status(401).json({ error: 'Authentication failed' });
        }
    } catch (error) {
        console.error('Login error:', error.message);

        // Handle specific axios errors
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error('Response error data:', error.response.data);
            return res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response received:', error.request);
            return res.status(500).json({ error: 'No response from authentication server' });
        } else {
            // Something happened in setting up the request
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};

// const checkAndRefreshToken = (token) => {
//     if (!token) {
//         return null;
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const { username, deviceId } = decoded;
//         const { token: newToken, expiryDate: newExpiryDate } = generateToken(username, deviceId);

//         return { newToken, newExpiryDate };
//     } catch (error) {
//         console.error('Token verification error:', error.message);
//         return null;
//     }
// };

// exports.verifyToken = (req, res, next) => {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(403).json({ error: 'No valid token provided' });
//     }

//     const refreshedToken = checkAndRefreshToken(token);
    
//     if (!refreshedToken) {
//         return res.status(403).json({ error: 'Invalid or expired token' });
//     }

//     jwt.verify(refreshedToken.newToken, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ error: 'Failed to authenticate token' });
//         }

//         req.user = decoded;
//         res.cookie('token', refreshedToken.newToken, { httpOnly: true, secure: true, maxAge: 60 * 60 * 1000 }); // Refresh cookie
//         next();
//     });
// };

// exports.refreshToken = (req, res) => {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(403).json({ error: 'No valid token provided' });
//     }

//     const refreshedToken = checkAndRefreshToken(token);

//     if (!refreshedToken) {
//         return res.status(403).json({ error: 'Invalid or expired token' });
//     }

//     const { newToken, newExpiryDate } = refreshedToken;
//     res.cookie('token', newToken, { httpOnly: true, secure: true, maxAge: 60 * 60 * 1000 }); // Refresh cookie
//     return res.status(200).json({ token: newToken, expiryDate: newExpiryDate });
// };
exports.googleLoginCallback = async (req, res) => {
    try {
        const accessToken = req.user.accessToken;

        
        const response = await axios.post('https://api-v2.gamota.com/game/login_google', null, {
            params: {
                google_access_token: accessToken,
                api_key: process.env.GAMOTA_API_KEY
            }
        });
console.log(response);
       
        if (response.status === 200 && response.data) {
        
            if (response.data.data) {
                const { access_token } = response.data.data;

            } else {
             
                return res.status(401).json({ error: 'Authentication failed' });
            }
        } else {
     
            return res.status(401).json({ error: 'Authentication failed' });
        }
    } catch (error) {
        console.error('Login error:', error.message);

        if (error.response) {
            console.error('Error Response Data:', error.response.data);
            console.error('Error Response Status:', error.response.status);
            console.error('Error Response Headers:', error.response.headers);

            if (error.response.status === 404) {
                return res.status(404).json({ error: 'API endpoint not found' });
            } else {
             
                return res.status(error.response.status).json({ error: error.response.data.message || 'An error occurred' });
            }
        } else {
            // If it's an internal server error or network error
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};
// exports.facebookLoginCallback = async (req, res) => {
//     try {
//         const accessToken = req.user.accessToken;
//         const response = await axios.post('https://api-v2.gamota.com/game/login_facebook', null, {
//             params: {
//                 facebook_access_token: accessToken,
//                 api_key: process.env.GAMOTA_API_KEY
//             }
//         });
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
exports.logout = (req, res) => {
    // Xóa thông tin người dùng khỏi session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Failed to logout');
        } else {
            res.redirect('/');
        }
    });
}


