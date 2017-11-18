import { createSelector } from 'reselect'
import moment from 'moment'

const getCities = state => state.cities.selected_cities
const getCity = (state, props) =>
  state.cities.selected_cities.filter(city => city.id === parseInt(props.id, 10))

export const shortCityInfo = createSelector(
  getCities,
  cities => cities
    .filter(city => city.local !== true)
    .map(city => (
      {
        id: city.id,
        name: city.name,
        temp: city.main.temp,
        wind: city.wind.speed,
        icon: city.weather[0].icon,
        loaded: city.loaded,
      }
    )),
)

export const detailedCityInfo = createSelector(
  getCity,
  cities => cities
    .map(city => (
      {
        id: city.id,
        name: city.name,
        temp: city.main.temp,
        wind: city.wind.speed,
        icon: city.weather[0].icon,
        loaded: city.loaded,
        country: city.sys.country,
        description: city.weather[0].description,
        date: moment.unix(city.dt).format('Do MMMM, YYYY; HH:mm'),
        cloudiness: city.clouds.all,
        pressure: city.main.pressure,
        humidity: city.main.humidity,
        sunrise: moment.unix(city.sys.sunrise).format('HH:mm:ss'),
        sunset: moment.unix(city.sys.sunset).format('HH:mm:ss'),
        lat: city.coord.lat,
        lon: city.coord.lon,
      }
    )),
)

export const getLocalCity = createSelector(
  getCities,
  cities => cities
    .filter(city => city.local === true)
    .map(city => (
      {
        id: city.id,
        name: city.name,
        temp: city.main.temp,
        wind: city.wind.speed,
        icon: city.weather[0].icon,
        loaded: city.loaded,
      }
    )),
)

export const getCityIds = createSelector(
  getCities,
  cities => cities.map(city => city.id),
)
