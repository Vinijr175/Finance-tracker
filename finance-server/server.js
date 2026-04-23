const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors()); 
app.use(express.json()); 

app.get('/api/transactions', (req, res) => {
  if (!fs.existsSync(DATA_FILE)) return res.json([]);
  const content = fs.readFileSync(DATA_FILE);
  res.json(JSON.parse(content));
});

app.post('/api/transactions', (req, res) => {
  const transactions = fs.existsSync(DATA_FILE) 
    ? JSON.parse(fs.readFileSync(DATA_FILE)) 
    : [];
  
  const newTransaction = req.body;
  transactions.unshift(newTransaction);
  
  fs.writeFileSync(DATA_FILE, JSON.stringify(transactions, null, 2));
  console.log(" Data saved to data.json!"); 
  res.status(201).json(newTransaction);
});


app.delete('/api/transactions/:id', (req, res) => {
  let transactions = JSON.parse(fs.readFileSync(DATA_FILE));
  const { id } = req.params;
  transactions = transactions.filter(t => t.id !== id);
  fs.writeFileSync(DATA_FILE, JSON.stringify(transactions, null, 2));
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
