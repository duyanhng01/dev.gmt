
// const checkSession = (req, res, next) => {
//     if (req.session && req.session.userData) {
//         res.locals.user = req.session.userData;
//         next(); 
//     } else {
//         if (req.path === '/' || req.path === '/login')  {
//             next(); 
//         } else {
//             return res.status(403).redirect('/login');
//         }
//     }
// };

// module.exports = checkSession;
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