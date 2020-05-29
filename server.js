const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const placesRoutes = require('./routes/places-routes');

const app = express();

app.use(placesRoutes);

app.listen(5000);