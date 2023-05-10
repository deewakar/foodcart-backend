const express = require('express');
const app = express();

// keep secrets in .env file and load from there
require('dotenv').config();

const mongoDB = require('./db');
const port = 5000;

mongoDB();


// allow response to be shared to any IP that connects to the API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use('/api', require("./routes/getAll")); 
app.use('/api', require("./routes/auth")); 

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
