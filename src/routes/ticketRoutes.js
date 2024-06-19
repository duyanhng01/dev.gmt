// src/routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const supportTicketController = require('../controllers/users/supportControllers');

router.get('/tickets', supportTicketController.getAllTickets);
router.post('/tickets', supportTicketController.createTicket);

module.exports = router;
