const express = require('express');
const { createPost, getPosts } = require('../controllers/posts.controller');
const router = express.Router();  

router.post("/create-post", createPost)
router.get("/create-post", getPosts)

module.exports = router;