
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Root endpoint - welcome message
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Health Check API',
    status: 'running'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});