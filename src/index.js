const express = require('express');
const app = express();
require('dotenv').config();
const { errorHandler } = require('./utils/errorHandler');

const authRoutes = require('./routes/authRoutes');

const port = process.env.PORT;


app.use(express.json());

app.use('/auth', authRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});