const express = require('express');
const { randomBytes } = require('crypto');

const router = express.Router();

const commentsByPostId = {};

router.get('/posts/:id/comments', (req, res) => {
	res.send(commentsByPostId[req.params.id] || []);
});

router.post('/posts/:id/comments', (req, res) => {
	const commentId = randomBytes(4).toString('hex');
	const { content } = req.body;

	const comments = commentsByPostId[req.params.id] || [];

	comments.push({ id: commentId, content });

	commentsByPostId[req.params.id] = comments;

	res.status(201).send(comments);
});


module.exports = router;