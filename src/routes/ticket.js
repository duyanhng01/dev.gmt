const express = require('express');
const router = express.Router();
const supportTicketController = require('../controllers/users/submit_ticketControllers');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 
const axios = require('axios');

// // Routes
// router.get('/submit_ticket', supportTicketController.showForm);
// router.post('/submit_ticket', upload.single('attachment'), supportTicketController.submitTicket);

// module.exports = router;
router.get('/', async (req, res) => {
    try {
   
        const response = await axios.get('https://nap.gamota.com/games/support/list-game');
        const games = response.data.data;

        // Render file submit_ticket.ejs và truyền dữ liệu của games vào
        res.render('users/submit_ticket', { games });
    } catch (error) {
        console.error('Lỗi khi gọi API:', error); // In ra lỗi chi tiết để xác định nguyên nhân
        res.status(500).send('Đã xảy ra lỗi khi lấy dữ liệu từ API.');
    }
});

module.exports = router;