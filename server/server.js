
require('dotenv').config();
const express = require('express');
const db = require('./db/index');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Get all restaurants
app.get('/api/v1/restaurants', async (req, res) => {
  try {
  const results = await db.query('SELECT * FROM restaurants');
  res.status(200).json({
    status: 'success',
    results: results.rowCount,
    data: {
      restaurants: results.rows
    }
  })
  } catch(err) {
    console.log(err.message);
  }
});

app.get('/api/v1/restaurants/:id', async (req,res) => {
  try {
    const id = req.params.id;
    const results = await db.query('SELECT * FROM restaurants WHERE id = $1', [id]);
    res.status(200).json({
      status: 'success',
      data: {
        restaurant: results.rows[0]
      }
      
    })
  } catch(err) {
    console.log(err.message);
  }
})

app.post('/api/v1/restaurants', async (req,res) => {
  try {
    const { name, location, price_range } = req.body;
    const newRestaurant = await db.query('INSERT INTO restaurants(name, location, price_range) VALUES($1, $2, $3) RETURNING *', [name, location, price_range]);
    res.status(200).json({
      status: 'success',
      data: {
        restaurant: newRestaurant.rows[0]
      }
    })
  } catch(err) {
    console.log(err.message);
  }
})

app.put('/api/v1/restaurants/:id', async (req,res) => {
  try {
    const id = req.params.id;
    const { name, location, price_range } = req.body;
    const updatedRestaurant = await db.query('UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *', [name, location, price_range, id]);
    res.status(200).json({
      status: 'success',
      data: {
        restaurant: updatedRestaurant.rows[0]
      }
    })
  } catch (err) {
    console.log(err.message);
  }
})

app.delete('/api/v1/restaurants/:id', async (req,res) => {
  try {
    const id = req.params.id;
    const deletedRestaurant = await db.query('DELETE FROM restaurants WHERE id = $1 RETURNING *', [id]);
    res.status(200).json({
      status: 'success',
      data: {
        restaurant: deletedRestaurant.rows[0]
      }
    })
  } catch (err) {
    console.log(err.message);
  }
})

const port = process.env.PORT || 2021;
app.listen(port, () => {
  console.log(`Port is listeneing on port ${port}`);
});