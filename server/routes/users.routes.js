const express = require('express');

const { createUser, loginUser, getUsers } = require('../controllers/users.controller');
const router = express.Router();  

router.post("/registro-user", createUser)
router.post("/login-user", loginUser)
router.get("/login-user", getUsers)

module.exports = router;