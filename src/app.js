const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model')
const { getProfile } = require('./middleware/getProfile')
const contractRoute = require('./routes/contractRoutes')
const jobRoute = require('./routes/jobRoutes')
const balanceRoute = require('./routes/balanceRoutes')
const adminRoutes = require('./routes/adminRoutes')


const app = express();
app.use(bodyParser.json());

// we can register the getProfile middleware here globally as well 
// app.use(getProfile)

app.set('sequelize', sequelize)
app.set('models', sequelize.models)
app.use('/contracts', getProfile, contractRoute)
app.use('/jobs', getProfile, jobRoute)
app.use('/balances', getProfile, balanceRoute)
app.use('/admin', getProfile, adminRoutes)

module.exports = app;