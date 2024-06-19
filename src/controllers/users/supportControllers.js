// src/controllers/supportTicketController.js
const SupportTicket = require('../../models/submit_ticket');

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find();
    res.json(tickets);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.createTicket = async (req, res) => {
  try {
    const { error_type, topic, phone_number, email, game, server, character, description, attachment } = req.body;
    const newTicket = new SupportTicket({
      error_type,
      topic,
      phone_number,
      email,
      game,
      server,
      character,
      description,
      attachment
    });
    await newTicket.save();
    res.status(201).send('Ticket Created');
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
