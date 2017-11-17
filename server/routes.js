const path = require('path')

const { getCityList, searchCity, findCityByLocation } = require('./modules/cities')

module.exports = (app) => {
  const index_path = path.join(__dirname, '../public/index.html')
  app.get('/api/cities', (req, res) => res.json(getCityList()))
  app.get('/api/search', (req, res) => res.json(searchCity(req.query.city)))
  app.get('/api/find', (req, res) =>
    res.json(findCityByLocation(req.query.lat, req.query.lon, req.query.accuracy)))
  app.get('*', (req, res) => res.sendFile(index_path))
}
