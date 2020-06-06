const express= require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api/places', placesRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error;

})

app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An error occurred'});
})

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server is running on port " + port);
});
