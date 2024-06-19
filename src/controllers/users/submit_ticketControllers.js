const SupportTicket = require('../../models/submit_ticket');

// Controller actions

// Đây là một ví dụ cập nhật trong controller
exports.submitTicketPage = (req, res) => {
    // Kiểm tra nếu có session.userData, gán vào res.locals.userData
    if (req.session && req.session.userData) {
        res.locals.userData = req.session.userData;
    }

    // Render view 'submit_ticket' và truyền userData xuống view
    res.render('users/submit_ticket', { title: 'Submit Ticket' });
};
