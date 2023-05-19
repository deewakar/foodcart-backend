const express = require('express');
const app = express();

// keep secrets in .env file and load from there
require('dotenv').config();

const mongoDB = require('./db');
const port = process.env.PORT;

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
app.use('/api', require("./routes/setOrder")); 
app.use('/api', require("./routes/getOrder")); 
app.use('/api', require("./routes/getRecommendations")); 
app.use('/api', require("./routes/getPopular")); 
app.use('/api', require("./routes/auth")); 

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`listening on port ${port}...`)
})
