const express = require('express')
const session = require('express-session');
const routesLogin = require('./routes/routeLogin');
const routesMenu = require('./routes/routeMenu');
const routesRegister = require('./routes/routeRegister');
const routesLogout = require('./routes/routeLogout');
const routesRemove = require('./routes/routeRemove');
const path = require('path')
const bodyParser = require('body-parser');

const app = express()

// Dichiarazione del motore di template EJS
app.set('view engine', 'ejs');

app.use(express.static('uploads'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// express-session

app.use(session({
    secret: 'password',
    resave: false,
    saveUninitialized: true
  }));

// Servo i file statici che si trovano su public
app.use(express.static(path.join(path.resolve(), 'public')));

app.use(session({
    secret: 'password',
    resave: false,
    saveUninitialized: true
  }));

// Carico le root su express

app.use('/login', routesLogin)
app.use('/menu', routesMenu)
app.use('/register', routesRegister)
app.use('/logout', routesLogout)
app.use('/remove', routesRemove)

app.listen(3000, () => {
    console.info("Server started..")
})