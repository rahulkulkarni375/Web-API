//Base URL  :  localhost:5000/api/contacts  -> For contacts

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactControllers')

router.route("/").get(contactController.getContacts).post(contactController.createContact);

router.route("/:id").get(contactController.getContact).put(contactController.updateContact).delete(contactController.deleteContact);

module.exports = router;