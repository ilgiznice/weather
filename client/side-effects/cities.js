import request from 'superagent'
import { takeLatest, takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { search, add, find, refresh } from '../states/cities'

const app_id = 'addd9b7c638d19282e10c7590c0147e9'

//  API requests

/**
 * Запрос на поиск города по названию
 * @param {String} name
 */
const searchCity = name => (
  new Promise((resolve, reject) => {
    const url = `/api/search?city=${name}`
    request.get(url).end((err, res) => {
      if (err) return reject(err)
      return resolve(res)
    })
  })
)

/**
 * Запрос на получение информации по ID города
 * @param {Number} id
 */
const getCity = id => (
  new Promise((resolve, reject) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${app_id}&units=metric`
    request.get(url).end((err, res) => {
      if (err) return reject(err)
      return resolve(res)
    })
  })
)

/**
 * Запрос на поиск города по координатам
 * @param {Number} lat
 * @param {Number} lon
 * @param {Number} accuracy
 */
const findCity = (lat, lon, accuracy) => (
  new Promise((resolve, reject) => {
    const url = `/api/find?lat=${lat}&lon=${lon}&accuracy=${accuracy}`
    request.get(url).end((err, res) => {
      if (err) return reject(err)
      return resolve(res)
    })
  })
)

// const getCities = ids => (
//   new Promise((resolve, reject) => {
//     const imploded_ids = ids.join(',')
//     const url = `http://api.openweathermap.org/data/2.5/group?id=${imploded_ids}&units=metric`
//     request.get(url).end((err, res) => {
//       if (err) return reject(err)
//       return resolve(res)
//     })
//   })
// )

//  Generators

function* actionSearchCity(action) {
  try {
    const cities = yield call(searchCity, action.payload.name)
    yield put(search.success(cities.body))
  } catch (err) {
    yield put(search.failure(err))
  }
}

/**
 * Получение информации по городу
 * @param {*} action
 */
function* actionGetCity(action) {
  try {
    const city = yield call(getCity, action.payload.id)
    yield put(add.success({ ...city.body, local: action.payload.local }))
  } catch (err) {
    yield put(add.failure(err))
  }
}

function* actionFindCity(action) {
  try {
    const cities = yield call(findCity, action.payload.lat, action.payload.lon, action.payload.accuracy)
    yield put(find.success(cities.body))
  } catch (err) {
    yield put(find.failure(err))
  }
}

function* actionRefreshCity(action) {
  try {
    const city = yield call(getCity, action.payload.id)
    yield put(refresh.success(city.body))
  } catch (err) {
    yield put(refresh.failure(err))
  }
}

// function* actionGetCities(action) {
//   try {
//     const user = yield call(API.register, { form: action.form })
//     yield put(register.registerSuccess({ user }))
//   } catch (err) {
//     yield put(register.registerFailure({ err }))
//   }
// }

//  Watchers

function* watchSearchCity() {
  yield* takeLatest(search.pending.getType(), actionSearchCity)
}

function* watchGetCity() {
  yield* takeEvery(add.pending.getType(), actionGetCity)
}

function* watchFindCity() {
  yield* takeLatest(find.pending.getType(), actionFindCity)
}

function* watchRefreshCity() {
  yield* takeEvery(refresh.pending.getType(), actionRefreshCity)
}

export default [
  watchSearchCity,
  watchGetCity,
  watchFindCity,
  watchRefreshCity,
]
