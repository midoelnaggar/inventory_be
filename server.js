const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
console.log(cors());
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const itemsRouter = require('./routes/items');
const receivesRouter = require('./routes/receives');
const deliveriesRouter = require('./routes/deliveries');

app.use('/items', itemsRouter);
app.use('/receives', receivesRouter);
app.use('/deliveries', deliveriesRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    
});