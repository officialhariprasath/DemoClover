const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/menuDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const Item = mongoose.model('Item', itemSchema);

// API to fetch all items
app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// API to add an item
app.post('/api/items', async (req, res) => {
  const { name, price } = req.body;
  const newItem = new Item({ name, price });
  await newItem.save();
  res.json(newItem);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
