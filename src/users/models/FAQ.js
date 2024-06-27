// models/FAQ.js

const mongoose = require('mongoose');

// Định nghĩa schema cho FAQ
const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Tạo model từ schema và export nó
const FAQ = mongoose.model('FAQ', faqSchema);

module.exports = FAQ;
