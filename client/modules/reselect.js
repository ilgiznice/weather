import { createSelector } from 'reselect'

const getCities = state => state.cities.selected_cities

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
      }
    )),
)

export const detailedCityInfo = createSelector(
  getCities,
  cities => cities.map(city => (
    {
      id: city.id,
      name: city.name,
      temp: city.main.temp,
      wind: city.wind.speed,
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
      }
    )),
)
