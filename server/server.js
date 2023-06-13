const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS
const allowedOrigins = [
    'http://localhost:3001', 
    'https://venue-music-blog.onrender.com',
]
app.use(cors({
    origin: allowedOrigins,
}));

app.use('/api/user', userRouter);
app.use('/api/post', postRouter);

const mongoURI = process.env.MongoDB_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => console.log('Connected to database'))
    .catch(console.error);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server started on port ${port}`));

