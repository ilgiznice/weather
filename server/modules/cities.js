const cities = require('../static/city.list.min')

const cities_formatted = []

/**
 * Поиск страны в группированном массиве городов
 * @param {Array} countries
 * @param {String} country_name
 * @returns {Number} i
 */
const findGroup = (countries, country_name) => {
  for (let i = 0; i < countries.length; i += 1) {
    const country = countries[i]
    if (country.text === country_name) return i
  }
  return null
}

/**
 * Формирование группированного массива городов для select2
 * @returns {Array} cities_formatted - массив городов
 * @see /api/cities
 * @deprecated
 */
const getCityList = () => {
  if (cities_formatted.length) return cities_formatted
  cities.forEach((item) => {
    const index = findGroup(cities_formatted, item.country)
    if (index) {
      cities_formatted[index].children.push({ text: item.name, id: item.id })
    } else {
      cities_formatted.push({
        text: item.country,
        children: [
          { text: item.name, id: item.id },
        ],
      })
    }
  })
  return cities_formatted
}

/**
 * Поиск города по названию
 * @param {String} name
 * @returns {Array} cities
 * @see /api/search?city=NAME
 */
const searchCity = (name) => {
  if (name.length < 3) return []
  return cities
    .filter(city => city.name.indexOf(name) !== -1)
    .sort((a, b) => {
      const city_a = a.name.toUpperCase()
      const city_b = b.name.toUpperCase()
      if (city_a === name.toUpperCase()) return -1
      if (city_b === name.toUpperCase()) return 1
      return a.length - b.length || city_a < city_b
    })
    .slice(0, 5)
    .sort((a, b) => {
      const country_a = a.country.toUpperCase()
      const country_b = b.country.toUpperCase()
      if (country_a === country_b) return 0
      if (country_a === 'RU') return -1
      if (country_b === 'RU') return 1
    })
    .map(item => (
      {
        id: item.id,
        name: item.name,
        country: item.country,
      }
    ))
}

/**
 * Поиск города по заданным координатам
 * @param {Number} lat
 * @param {Number} lon
 * @param {Number} accuracy
 * @see /api/find?lat=LAT&lon=LON&accuracy=ACCURACY
 * @return {Array} cities
 */
const findCityByLocation = (lat, lon, accuracy) => {
  return cities
    .filter((city) => {
      const threshhold = parseFloat(`0.${accuracy}`)
      return Math.abs(city.coord.lat - lat) < threshhold
        && Math.abs(city.coord.lon - lon) < threshhold
    })
}

exports.getCityList = getCityList
exports.searchCity = searchCity
exports.findCityByLocation = findCityByLocation
