const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const port = 8000;
const uri = process.env.ATLAS_URI;

const app = express();
app.use(cors());
app.use(express.json())

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('CUSTOM MESSAGE: successfully connected to atlas');
});

app.use('/user', require('./routes/user'));
app.use('/exercise', require('./routes/exercise')); 

app.get('/test', (req, res) => {
    res.send('dunkey bong')
})

app.listen(port, () => {
    console.log(`CUSTOM MESSAGE: server started on port ${port}`);
})