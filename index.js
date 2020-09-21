const express = require('express');
//import express from 'express';
const app = express();

// app.get creates a Route Handler. '/' is the "Route"
app.get('/', (req, res) => {
  res.send({
    hi: 'there',
  });
});

// set up dynamic port binding and tell Node which port to listen to.
const PORT = process.env.PORT || 5000; // 5000 is the backup default for dev
app.listen(PORT);
