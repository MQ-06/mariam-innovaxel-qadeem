const mongoose = require('mongoose');
const express = require('express');

const MONGO_URI = "mongodb+srv://mariamqadeem121:4rs1QPwF5B1v3xZE@cluster0.jcjr7rx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  });

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});