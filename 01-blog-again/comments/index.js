const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const commentsRouter = require('./routes/comments.routes');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(commentsRouter);

app.listen(4001, () => {
	console.log('Listening on 4001');
});