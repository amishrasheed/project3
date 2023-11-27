require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors()); 
app.use(express.json()); 
app.use('/images', express.static('images'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to the MongoDB database.');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});


const productRoutes = require('./routes'); 
app.use(productRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  


  