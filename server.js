const express = require('express');
const cors = require("cors");
const allRoutes = require('./controllers');

const sequelize = require('./config/connection');

// Sets up the Express App
// =============================================================
const app = express();
//DEVELOP MODE
// app.use(cors());
//PROD MODE
app.use(cors({
    origin:"*"
}));
const PORT = process.env.PORT || 3001;
// Requiring our models for syncing
const { User } = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/',allRoutes);

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});