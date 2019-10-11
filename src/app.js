const path = require('path');
const express = require('express');
const hbs = require('hbs');
const parseGeo = require('./utils/parseGeo');
const forecast = require('./utils/forecast');

const app = express();
const PORT = process.env.PORT || 3000;

//set up the server 
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));
app.use(express.static( path.join(__dirname, '../public') ));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather Forecast',
    author: 'Gina Kui'
  })
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    });
  }
/**
 * @todo try to get out of callback hell
 */
  parseGeo(req.query.address, (error, { latitude, longitude, location } = {}) => {
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
      });
    });
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Gina Kui'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'About Me',
    name: 'Gina Kui',
    helpText: 'some help text'
  });
});

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
    title: 'About Me',
    name: 'Gina Kui',
    errorMessage: 'Help content not found'
  });
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Gina Kui',
    errorMessage: 'Page not found'
  });
});

app.listen(PORT, () => {
  console.log(`whats-weather server starts on ${PORT}`);
});