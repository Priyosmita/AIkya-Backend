const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const postRoutes = require('./routes/postRoutes');
const chatRoutes = require('./routes/chatRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const fileUpload = require('express-fileupload');

const app = express();

// Middleware for JSON parsing
app.use(express.json());

app.use(fileUpload())

// Connect to the database
connectDB();

// Route middleware
app.use('/api', userRoutes);
app.use('/api', projectRoutes);
app.use('/api', postRoutes);
app.use('/api', chatRoutes);
app.use('/api', campaignRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
