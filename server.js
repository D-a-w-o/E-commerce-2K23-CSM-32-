const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Status Route
app.get('/', (req, res) => {
  res.send('Sprint 2: E-Commerce Catalog API is running successfully!');
});

// Categories Fetch karne ka Route
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Database se categories laane mein masla hua." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});