const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();

// PATHS
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// HANDLEBARS CONFIG
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// STATIC DIR
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bob'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'secret',
        name: 'Brandon'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'bobz'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please enter an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        console.log(error)
        if (error) {
            return res.send({ error });
        } 

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404 Error',
        error: 'Help article not found',
        name: 'Brandon'  
    });
});

app.get('*', (req, res) => {
    res.render('404',{
        title: "404 Error",
        error: "Page not found.",
        name: 'Brandon'
    });
});

app.listen(3000, () => {
    console.log('server started')
});