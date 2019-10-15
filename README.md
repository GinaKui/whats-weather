# whats-weather

a web server providing weather information, built by Node.js and Express.js  
deployed by Heroku at https://whats-weather.herokuapp.com

- weather forecast data: [Dark Sky API](https://darksky.net/dev/docs)
- geocoding: [mapbox API](https://docs.mapbox.com/api/search/#endpoints)

## setup at local machine
a .env file with the following environment variables are required at project root.  
```bash
DARKSKY_KEY=
MAPBOX_TOKEN=
```
register at the api provider to get the access token  
