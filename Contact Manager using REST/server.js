const express = require('express');
const { listenerCount } = require('process');
const dotenc = require('dotenv').config();
const errorHandler = require('./middlewares/errorHandler');
const connectDb = require('./config/dbConnection');

connectDb();
const app = express();
const port = process.env.PORT || 4000;

app.use(errorHandler);
app.use(express.json()); // This will help to parse the json obejcts
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/user",require("./routes/userRoutes"));

app.listen(port, () => {
    console.log(`Server is running on  ${port}`);
})