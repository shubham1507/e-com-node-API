require("express-async-errors");
const helmet = require("helmet");
const express = require("express");
const app = express();

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./startup/inititateLogging')();
require('./startup/initiateRoutes')(app);
require('./startup/initiateDB')();

app.use(helmet());
app.use(express.static('uploads'))

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening on port ${port}..`);
});

if(process.env.NODE_ENV==="production"){
  console.log('Production Environment')
  app.use(express.static("client/build"))
}