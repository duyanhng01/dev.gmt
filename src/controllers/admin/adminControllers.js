
const FAQ = require('../../models/FAQ');

const adminController = {
    getAllFAQs: async (req, res) => {
        try {
            const faqs = await FAQ.find();
            res.render('admin/faqs/index', { faqs });
        } catch (err) {
            console.error(err);
            res.status(500).send('Lỗi khi lấy danh sách FAQs');
        }
    },

    createFAQForm: (req, res) => {
        res.render('admin/faqs/new');
    },

    createFAQ: async (req, res) => {
        try {
            await FAQ.create(req.body);
            res.redirect('/admin/faqs');
        } catch (err) {
            console.error(err);
            res.status(500).send('Lỗi khi tạo mới FAQ');
        }
    },

    deleteFAQ: async (req, res) => {
        try {
            await FAQ.findByIdAndDelete(req.params.id);
            res.redirect('/admin/faqs');
        } catch (err) {
            console.error(err);
            res.status(500).send('Lỗi khi xóa FAQ');
        }
    }
};

module.exports = adminController;
