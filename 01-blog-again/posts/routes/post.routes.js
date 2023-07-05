const express = require('express');
const { randomBytes } = require('crypto');

const router = express.Router();

const posts = {};

router.get('/posts', (req, res) => {
	res.send(posts);

});

router.post('/posts', (req, res) => {
	const id = randomBytes(4).toString('hex');
	const { title } = req.body;

	posts[id] = {
		id,
		title
	};

	res.status(201).send(posts[id]);
});


module.exports = router;