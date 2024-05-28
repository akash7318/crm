require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./connection')

const login = require('./routes/login');
const users = require('./routes/users');
const designations = require('./routes/designations');
const states = require('./routes/states');
const partyTypes = require('./routes/partyTypes');
const companyProfiles = require('./routes/companyProfiles');

// uncomment the line below to use the logReqRes function
const { logReqRes } = require('./middlewares');

const app = express();
app.use(express.json());
app.use(cors());

// Uncomment the following line if you want to use a logging function
app.use(logReqRes());

app.use('/api/login', login);
app.use('/api/users', users);
app.use('/api/designations', designations);
app.use('/api/states', states);
app.use('/api/partyTypes', partyTypes);
app.use('/api/companyProfiles', companyProfiles);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});