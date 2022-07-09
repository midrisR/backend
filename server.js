const express = require('express');
const app = express();
const colors = require('colors');
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const article = require('./routes/article');
const guest = require('./routes/guest');
const comment = require('./routes/comment');
const unsplash = require('./routes/unsplash');
const image = require('./routes/image');
const Auth = require('./routes/user');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/article', article);
app.use('/api/guest', guest);
app.use('/api/comment', comment);
app.use('/unsplash', unsplash);
app.use('/api/image', image);
app.use('/api/user', Auth);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
