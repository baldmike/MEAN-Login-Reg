const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public/dist')));

app.use(passport.initialize());
app.use(passport.session());

require('./server/config/passport')(passport);

require('./server/config/mongoose.js');

const routes = require('./server/config/routes.js')
routes(app)

app.use('/api/users', routes)

app.listen(port, () => {
    console.log('You got the Whole Wide World listening on port: ' + port)
})