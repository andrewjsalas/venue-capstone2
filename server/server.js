const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const PORT = process.env.PORT || 8000;

// mongoose
//     .connect(process.env.DATABASE_URL)
//     .then(() => app.listen(PORT))
//     .then(() => 
//         console.log(`Connect to database and listening at PORT ${PORT}`)
//     )
//     .catch((err) => console.log(err));

mongoose.connect("mongodb://localhost:27017/venue_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to database'))
    .catch(console.error);

const Posts = require('./models/Posts');


app.listen(3001, () => console.log("Server started on port 3001"));