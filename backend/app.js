const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const loginRouter = require('./controllers/login');
const adminRouter = require('./controllers/admin');
const portfolioRouter = require('./controllers/portfolios');

const mongoose = require('mongoose')
mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(result => {
    console.log("Uspješno spajanje na bazu!");
  }).catch(error => {
    console.log("Greška pri spajanju:\n", error.message);
  })

app.use(cors());
app.use(express.json());
app.use('/api/user', loginRouter);
app.use('/api/admin', adminRouter);
app.use('/api/portfolio',portfolioRouter);


module.exports = app
