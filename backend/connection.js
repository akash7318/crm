const mongoose = require('mongoose');

return mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => console.log('Connected!'))
    .catch((err) => console.log(err));

