import { createAction, createReducer } from 'redux-act'

/**
 * Actions
 */

//  Получение списка городов для живого поиска (асинхронное)
export const search = {
  pending: createAction('Получение массива соответствий'),
  success: createAction('Список городов был получен'),
  failure: createAction('Произошла ошибка при получения списка городов'),
}

//  Добавление города и получение данных (асинхронное)
export const add = {
  pending: createAction('Запрос на добавление города'),
  success: createAction('Информация о городе была получена'),
  failure: createAction('Произошла ошибка при получении данных'),
}

//  Удаление города (синхронное)
export const remove = createAction('Удаление города')

//  Поиск города по координатам (асинхронное)
export const find = {
  pending: createAction('Получение массива городов по координатам'),
  success: createAction('Список близлежащих город был получен'),
  failure: createAction('Произошла ошибка при получении данных'),
}

//  Обновление информации о городе
export const refresh = {
  pending: createAction('Запрос на получение актуальных данных'),
  success: createAction('Актуальная информация была получена'),
  failure: createAction('Произошла ошибка при получении данных'),
}

/**
 * Default state
 */
const default_state = {
  live_search_cities: [],
  live_search_cities_loaded: true,
  selected_cities: [],
  local_cities: [],
  local_cities_loaded: true,
}

/**
 * Handlers
 */

//  Fetch handlers

const search_pending_handler = state => (
  {
    ...state,
    live_search_cities_loaded: false,
  }
)

const search_success_handler = (state, payload) => {
  return {
    ...state,
    live_search_cities: payload,
    live_search_cities_loaded: true,
  }
}

const search_failure_handler = (state, payload) => {
  return {
    ...state,
    err: payload,
    live_search_cities_loaded: true,
  }
}

//  Add handlers

const add_success_handler = (state, payload) => {
  const city = state.selected_cities.filter(item => item.id === payload.id)
  if (city.length) return state
  return { ...state, selected_cities: [...state.selected_cities, payload] }
}

const add_failure_handler = (state, payload) => (
  { ...state, err: payload }
)

//  Remove handlers

const remove_handler = (state, payload) => (
  {
    ...state,
    selected_cities: state.selected_cities.filter(item => item.id !== payload.id),
  }
)

//  Find handlers

const find_pending_handler = state => (
  { ...state, local_cities_loaded: false }
)

const find_success_handler = (state, payload) => (
  { ...state, local_cities: payload, local_cities_loaded: true }
)

const find_failure_handler = (state, payload) => (
  { ...state, err: payload, local_cities_loaded: true }
)

//  Refresh handlers

const refresh_pending_handler = (state, payload) => (
  {
    ...state,
    selected_cities: state.selected_cities.map((city) => {
      if (city.id === payload.id) {
        return { ...city, loaded: false }
      }
      return city
    }),
  }
)

const refresh_success_handler = (state, payload) => (
  {
    ...state,
    selected_cities: state.selected_cities.map((city) => {
      if (city.id === payload.id) {
        return { ...city, ...payload, loaded: true }
      }
      return city
    }),
  }
)

const refresh_failure_handler = (state, payload) => (
  {
    ...state,
    err: [...state.err, payload],
    selected_cities: state.selected_cities.map((city) => {
      if (city.id === payload.id) {
        return { ...city, loaded: true }
      }
      return city
    }),
  }
)

const reducer = createReducer({
  [search.pending]: search_pending_handler,
  [search.success]: search_success_handler,
  [search.failure]: search_failure_handler,
  [add.success]: add_success_handler,
  [add.failure]: add_failure_handler,
  [remove]: remove_handler,
  [find.pending]: find_pending_handler,
  [find.success]: find_success_handler,
  [find.failure]: find_failure_handler,
  [refresh.pending]: refresh_pending_handler,
  [refresh.success]: refresh_success_handler,
  [refresh.failure]: refresh_failure_handler,
}, default_state)

export default reducer
