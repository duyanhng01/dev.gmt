const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const axios = require('axios');
require('dotenv').config();
const LocalStrategy = require('passport-local').Strategy;
const { findUserByUsername, validatePassword } = require('../models/user');

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = findUserByUsername(username);
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!validatePassword(user, password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // console.log('Google Access Token:', accessToken);
        profile.accessToken = accessToken;
        return done(null, profile);
    } catch (error) {
        console.error('Google Authentication Error:', error);
        return done(error, null);
    }
}));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'photos', 'email']
}, (accessToken, refreshToken, profile, done)=> {
    try {
        // console.log('Facebook Access Token:', accessToken);
        profile.accessToken = accessToken;
        return done(null, profile);
    } catch (error) {
        console.error('Facebook Authentication Error:', error);
        return done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
