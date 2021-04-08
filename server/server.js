require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// Get All Restaurants
app.get('/api/v1/restaurants', async (req, res) => {
  const restaurants = await db.query('SELECT * FROM restaurants');

  res.status(200).json({
    status: 'success',
    results: restaurants.rowCount,
    data: { restaurants: restaurants.rows }
  });
});

// Get One Restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
  const restaurant = await db.query('SELECT * FROM restaurants WHERE id = $1', [
    req.params.id
  ]);

  const reviews = await db.query(
    'SELECT * FROM reviews WHERE restaurant_id =$1',
    [req.params.id]
  );

  res.status(200).json({
    status: 'success',
    data: { restaurant: { ...restaurant.rows[0], reviews: reviews.rows } }
  });
});

// Create a Restaurant
app.post('/api/v1/restaurants', async (req, res) => {
  const response = await db.query(
    'INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *',
    [req.body.name, req.body.location, req.body.price_range]
  );

  res
    .status(201)
    .json({ status: 'success', data: { restaurant: response.rows[0] } });
});

// Update a Restaurant
app.put('/api/v1/restaurants/:id', async (req, res) => {
  const response = await db.query(
    'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *',
    [req.body.name, req.body.location, req.body.price_range, req.params.id]
  );

  res
    .status(200)
    .json({ status: 'success', data: { restaurant: response.rows[0] } });
});

// Delete a Restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) => {
  await db.query('DELETE FROM restaurants WHERE id = $1', [req.params.id]);

  res.status(204).send({});
});

// Add a Review
app.post('/api/v1/restaurants/:id/add-review', async (req, res) => {
  const response = await db.query(
    'INSERT INTO reviews (restaurant_id, name, content, rating) VALUES ($1, $2, $3, $4) RETURNING *',
    [req.params.id, req.body.name, req.body.review, req.body.rating]
  );

  res
    .status(201)
    .json({ status: 'success', data: { review: response.rows[0] } });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
