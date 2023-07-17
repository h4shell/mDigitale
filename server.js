const express = require('express')
const session = require('express-session');
const routesLogin = require('./routes/routeLogin');
const routesMenu = require('./routes/routeMenu');
const routesRegister = require('./routes/routeRegister');
const routesLogout = require('./routes/routeLogout');
const path = require('path')
const bodyParser = require('body-parser');

const app = express()


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

// Dichiarazione del motore di template EJS
app.set('view engine', 'ejs');

// Servire i file statici dalla cartella public
app.use(express.static(path.join(path.resolve(), 'public')));

app.use(session({
    secret: 'password',
    resave: false,
    saveUninitialized: true
  }));

app.use('/login', routesLogin)
app.use('/menu', routesMenu)
app.use('/register', routesRegister)
app.use('/logout', routesLogout)

app.listen(3000, () => {
    console.info("Server started..")
})