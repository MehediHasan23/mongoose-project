const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./route')


// initialize app 
const app = express();


// middleware 
app.use(express.json());
require('dotenv').config();
app.use('/users', userRoute);



// db connect

async function myDb() {
  try {
    await mongoose.connect(process.env.URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    console.log('db connected');
  } catch (error) {
    console.log(error);
  }
}

app.listen(process.env.PORT || 3000, () => {
  myDb()
  console.log(`server is running on port: 3000`);
})