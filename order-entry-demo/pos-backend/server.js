const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Sample items data
const items = [
  { id: 1, name: 'Bacon Burger', price: 8.63, category: 'Food', imageUrl: 'path-to-image' },
  { id: 2, name: 'Cheese Burger', price: 8.05, category: 'Food', imageUrl: 'path-to-image' },
  { id: 3, name: 'Chicken Curry Sandwich', price: 3.45, category: 'Food', imageUrl: 'path-to-image' }
];

// API endpoint to fetch items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Add new item (POST request)
app.post('/api/items', (req, res) => {
  const newItem = req.body;
  items.push({ id: items.length + 1, ...newItem });
  res.status(201).json(newItem);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
