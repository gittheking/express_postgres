const express        = require('express');
const logger         = require('morgan');
const path           = require('path');
const methodOverride = require('method-override');
const bodyParser     = require('body-parser');
const userRoute      = require('./routes/user');
const homeRoute      = require('./routes/home');
const app            = express();
const port           = process.env.PORT || 3000;

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(methodOverride('_method'));

app.use('/', homeRoute);
app.use('/user', userRoute);

app.listen(port, () => {
  console.log('Server is listening on port ', port);
})
