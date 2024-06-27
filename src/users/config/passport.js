// <<<<<<< HEAD
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const axios = require('axios');
// require('dotenv').config();
// const LocalStrategy = require('passport-local').Strategy;
// const { findUserByUsername, validatePassword } = require('../models/user');

// // passport.use(new LocalStrategy(
// //     async (username, password, done) => {
   
// //         const deviceId = req.headers['user-agent'];

// //         if (!username || !password) {
// //             return res.status(400).json({ error: 'Username and password are required' });
// //         }
// //         try {
// //             const response = await axios.post(GAMOTA_API_KEY, {
// //                 username,
// //                 password,
// //                 device_id: deviceId
// //             });

// //             if (response.data.success) {
// //                 const user = response.data.user;
// //                 return done(null, user);
// //             } else {
// //                 return done(null, false, { message: response.data.message });
// //             }
// //         } catch (err) {
// //             return done(err);
// //         }
// //     }
// // ));



// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: process.env.GOOGLE_CALLBACK_URL
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         // console.log('Google Access Token:', accessToken);
//         profile.accessToken = accessToken;
//         return done(null, profile);
//     } catch (error) {
//         console.error('Google Authentication Error:', error);
//         return done(error, null);
//     }
// }));

// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: process.env.FACEBOOK_CALLBACK_URL,
//     profileFields: ['id', 'displayName', 'photos', 'email']
// }, (accessToken, refreshToken, profile, done)=> {
//     try {
//         // console.log('Facebook Access Token:', accessToken);
//         profile.accessToken = accessToken;
//         return done(null, profile);
//     } catch (error) {
//         console.error('Facebook Authentication Error:', error);
//         return done(error, null);
//     }
// }));

// passport.serializeUser((user, done) => {
//     done(null, user);
// });

// passport.deserializeUser((user, done) => {
//     done(null, user);
// });

// module.exports = passport;
// =======
// >>>>>>> 27103cf91d3020222640d04c4fc85048ee2a2dda
