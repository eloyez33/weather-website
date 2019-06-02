const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const app = express()
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs') // hbs for dynamic pages
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static files location
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Eloy Sanchez'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Eloy Sanchez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Eloy Sanchez',
        message: 'Te hueeleeeeeee'
    })
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, place_name} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location: place_name,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 help',
        name: 'Eloy Sanchez',
        errorMessage: 'Help article not found'
    })    
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Eloy Sanchez',
        errorMessage: 'Page not found'
    })    
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

