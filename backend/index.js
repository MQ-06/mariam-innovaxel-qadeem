require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const urlRoutes = require('./routes/urlRoutes');
const cors = require('cors'); 

const app = express();
app.use(cors());

app.use(bodyParser.json()); 
app.use('/api', urlRoutes); 


const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://mariamqadeem121:4rs1QPwF5B1v3xZE@cluster0.jcjr7rx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});