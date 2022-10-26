const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

//Define paths form Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials');
console.log(publicDirectoryPath);

const app = express();

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

//Setup static directory for static files
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather APP',
        name: 'Halisson Durães'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Halisson Durães',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Leite de capivaris, leite de mula manquis sem cabeça.',
        title: 'Help',
        name: 'Halisson Durães'
    });
});

app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        return res.send({
            error: 'You must provide a address to search!'
        });
    }

    const {address} = req.query;

    geocode(address, (error, {latitude, longitude, location}={}) => {
        if(error){
            return res.send({
                error: 'Error Geocode: ' + error
            });
        }
    
        weather(latitude, longitude, (error, weatherData) => {
            if(error){
                return res.send({
                    error: 'Error Weather: ' + error
                });
            }
            console.log('Location:', location);    
            console.log(weatherData);
            
            res.send({
                search: address,
                location,
                forecast: weatherData
            });
        });
    });
});

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query);

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Not Found Page',
        name: 'Halisson Durães',
        errorMessage: 'Help article not found!'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Not Found Page',
        name: 'Halisson Durães',
        errorMessage: 'Sorry! Page not found.'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});