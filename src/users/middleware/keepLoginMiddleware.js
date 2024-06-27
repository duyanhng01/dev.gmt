const keepLogin = (req, res, next) => {
    if (req.session && req.session.userData) {
        return res.redirect('/'); 
    }
    next();
};
module.exports = keepLogin;