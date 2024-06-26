



const checkSession = (req, res, next) => {
    if (req.session && req.session.userData) {
        res.locals.user = req.session.userData;
        console.log(req.session.userData); 
        next(); 
    } else {
        res.redirect('/'); 
    }
};

module.exports = checkSession;
