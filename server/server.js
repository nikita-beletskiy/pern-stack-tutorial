require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());

// Get All Restaurants
app.get('/api/v1/restaurants', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', data: { restaurants: ['mcdonalds, wendys'] } });
});

// Get One Restaurant
app.get('/api/v1/restaurants/:id', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', data: { restaurant: 'mcdonalds' } });
});

// Create a Restaurant
app.post('/api/v1/restaurants', (req, res) => {
  res
    .status(201)
    .json({ status: 'success', data: { restaurant: req.body.name } });
});

// Update a Restaurant
app.put('/api/v1/restaurants/:id', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', data: { restaurant: req.body.name } });
});

// Delete a Restaurant
app.delete('/api/v1/restaurants/:id', (req, res) => {
  res.status(204).json({ status: 'success' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
