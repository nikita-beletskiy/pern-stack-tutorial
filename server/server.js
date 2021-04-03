require('dotenv').config();
const express = require('express');
const db = require('./db');

const app = express();

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

  res
    .status(200)
    .json({ status: 'success', data: { restaurant: restaurant.rows[0] } });
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

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
