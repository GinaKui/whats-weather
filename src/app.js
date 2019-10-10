const path = require('path');
const express = require('express');
const hbs = require('hbs');

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
  if(req.query.location) {
    return res.send({
      error: 'location is required'
    });
  }
  res.send('some weather infor');
});

app.get('/about', (req, res) => {
  res.send('this is the about page');
});

app.get('/help', (req, res) => {
  res.send('this is the help page');
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found'
  });
});

app.listen(PORT, () => {
  console.log(`whats-weather server starts on ${PORT}`);
});