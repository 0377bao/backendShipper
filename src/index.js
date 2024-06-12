const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Sử dụng middleware cors
app.use(cors());
// Middleware to set CORS headers
app.use(
    cors({
        origin: ['http://localhost:3000', 'http://localhost:3002'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    }),
);
// config duong dan mac dinh cho cac file tinh
app.use(express.static(path.join(__dirname, 'public')));
// Parser data from tag form
app.use(express.urlencoded({ extended: true }));
// use cookies parser
app.use(cookieParser());
// parser json from client
app.use(bodyParser.json());
// Router init
routes(app);

// Connect to DB
mongoose
    .connect(process.env.MONGO_DB)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
