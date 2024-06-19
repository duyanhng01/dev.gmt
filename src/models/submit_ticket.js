// Define a model for Support Ticket
const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
    error_type: { type: String, required: true },
    topic: { type: String, required: true },
    phone_number: { type: String, required: true },
    email: { type: String, required: true },
    game: { type: String, required: true },
    server: { type: String, required: true },
    character: { type: String, required: true },
    description: { type: String, required: true },
    attachment: { type: String } 
});

const SupportTicket = mongoose.model('SupportTicket', supportTicketSchema);

module.exports = SupportTicket;
