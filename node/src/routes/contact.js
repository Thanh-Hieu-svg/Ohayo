const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");

router.post("/", contactController.addContact);
router.get("/", contactController.getContacts);

router.patch("/:id", contactController.updateContact);
router.get("/:id", contactController.getContactById);

module.exports = router;