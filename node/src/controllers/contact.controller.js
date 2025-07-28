const Contact = require("../models/Contact");

// Thêm liên hệ
exports.addContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const contact = new Contact({ name, email, phone, subject, message });
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Lấy danh sách liên hệ
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ sentAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật trạng thái đã đọc của liên hệ
exports.updateContact = async (req, res) => {
    try {
      const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body, // cập nhật trường bất kỳ, ví dụ { isRead: true }
        { new: true }
      );
      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }
      res.json(contact);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

// Lấy chi tiết liên hệ
exports.getContactById = async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) return res.status(404).json({ error: "Not found" });
      res.json(contact);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };