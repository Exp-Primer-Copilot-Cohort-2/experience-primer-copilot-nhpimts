// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
// Create comments array
let comments = [];
// Use body parser
app.use(bodyParser.json());
// Get comments from file
fs.readFile('comments.json', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    comments = JSON.parse(data);
  }
});
// GET /comments
app.get('/comments', (req, res) => {
  res.json(comments);
});
// POST /comments
app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
    if (err) {
      console.log(err);
    } else {
      res.json(newComment);
    }
  });
});
// Start server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
// Run server with node comments.js
// Test server with curl
// curl http://localhost:3000/comments
// curl -X POST -H "Content-Type: application/json" -d '{"name":"Alice","message":"Hello"}' http://localhost:3000/comments
// curl http://localhost:3000/comments
// Check comments.json file
// cat comments.json
// Stop server with Ctrl+C