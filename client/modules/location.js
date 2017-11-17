import { find } from '../states/cities'

function handlePosition(position) {
  this.dispatch(find.pending({
    lat: position.coords.latitude,
    lon: position.coords.longitude,
    accuracy: position.coords.accuracy,
  }))
}

export default (store, state) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handlePosition.bind(store))
  } else {
    state.cities.err.push('Геолокация не поддерживается вашим браузером')
  }
}
