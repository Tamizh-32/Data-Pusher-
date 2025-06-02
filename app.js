// app.js
require('dotenv').config(); 

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./models');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/account', require('./routes/accountRoutes'));
app.use('/destination', require('./routes/destinationRoutes'));
app.use('/server', require('./routes/dataHandlerRoutes'));

// Server
const port = process.env.PORT || 3000; 
sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Server running on port: ${port}`));
});
