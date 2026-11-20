const enquiryLimiter = require("../middleware/rateLimit.middleware");
const express = require('express')
const{createContact}= require('../controllers/contact.controller')

const router = express.Router();
 

router.post("/", enquiryLimiter, createContact);

module.exports=router;