const request = require('request');
require('dotenv').config();
/**
 * (err, {latitude, longitude, location}) to the call back
 * @param {string} address 
 * @param {function} callback 
 */
const parseGeo = (address, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=' + process.env.MAPBOX_TOKEN + '&limit=1';

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to location services!', undefined);
		} else if (!body.features || body.features.length === 0) {
			callback('Unable to find location. Try another search.', undefined);
		} else {          
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name
			});
		}
	})
}

module.exports = parseGeo;