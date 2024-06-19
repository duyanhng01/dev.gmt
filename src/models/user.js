// // user.js
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     device_id: { type: String, required: true },
//     googleId: String // Add field to store Google ID
// });

// // Define a static method on the schema to find a user by username
// userSchema.statics.findUserByUsername = function(username) {
//     return this.findOne({ username: username });
// };

// // Define a static method on the schema to find a user by Google ID
// userSchema.statics.findUserByGoogleId = function(googleId) {
//     return this.findOne({ googleId: googleId });
// };

// // Define a static method on the schema to create a new user
// userSchema.statics.createUser = function(userData) {
//     // Check if Google login data is provided
//     if (userData.googleId) {
//         // If Google login data is provided, create user with Google ID
//         return this.create({
//             username: userData.username,
//             device_id: userData.deviceId,
//             googleId: userData.googleId
//         });
//     } else {
//         // If Google login data is not provided, create user with username, password, and device ID
//         return this.create(userData);
//     }
// };

// const UserModel = mongoose.model('User', userSchema);

// module.exports = UserModel;
