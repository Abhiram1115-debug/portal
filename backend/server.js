// Import core packages
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Import path for static file serving

// Import routes
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');

// Initialize express app
const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing form data

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  ssl: true, 
  tlsAllowInvalidCertificates: true
})
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Lost and Found Portal Backend is Running 🚀');
});

// Error handling (optional good practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
