const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const postRouter = require('./routes/postRoutes');
const router = require('./routes/userRoutes');

const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/user', router);
app.use('/api/post', postRouter);

mongoose.connect("mongodb://127.0.0.1:27017/venue_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to database'))
.catch(console.error);


app.listen(3001, () => console.log("Server started on port 3001"));

