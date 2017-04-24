const fs = require('fs');

const express = require('express');
const hbs = require('hbs');

var app = express();

// Configuring app

// app.use((req, res, next) => res.render('maintenance.hbs'));

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) =>{
    var now = new Date().toString();
    var log = `[${now}] ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('logs/server.log', log + '\n', (error) => { if (error) console.log('Cant write to log') });
    next();
});

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

// Routes

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my web site'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

// Listening

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", () => {
    console.log('Server is up.')
});