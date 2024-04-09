const express = require('express');
const mongoose = require('mongoose')
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json()); //middleware ==> parsing for application/json

//MONGO DB connection
app.use('/api/user', require('./routes/user'));

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Could not connect to MongoDB...', err.message);
    process.exit(1);
  }
}

connectDB();

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
