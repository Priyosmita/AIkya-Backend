const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());


// MongoDB connection
mongoose.connect('mongodb+srv://daspriyosmita2003:Taehyung@aikya.brjaaza.mongodb.net/?retryWrites=true&w=majority&appName=AIkya', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Import routes
const profileRoutes = require('./routes/profile');
const projectRoutes = require('./routes/project');


app.use('/api/profile', profileRoutes);
app.use('/api/project', projectRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});