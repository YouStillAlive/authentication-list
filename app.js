require('dotenv').config();

const express = require('express');
const sequalize = require('./db.js');
const model = require('./models/User.js');
const cors = require('cors');
const errorHandler = require('./middleware/errorHendling.js')
const PORT = process.env.PORT || 3500;
const app = express();
const router = require('./routes/index.js')

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

const start = async () => {
    try {
        await sequalize.authenticate();
        await sequalize.sync();
        app.listen(PORT, () => {
            console.log('App listen on port ' + PORT);
        });
    } catch (e) {
        console.log(e);
    }
}

start();