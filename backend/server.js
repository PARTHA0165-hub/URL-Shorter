const express = require('express');
const mongoose = require('mongoose');
const logger = require('./middlewares/logger');
const shortUrlRoutes = require('./routes/shortUrlRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/', shortUrlRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/urlShortener')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
