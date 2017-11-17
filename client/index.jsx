import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { getStorage, setStorage } from './modules/storage'
import getLocation from './modules/location'

//  PAGES
import Index from './pages/index.jsx'
import Detailed from './pages/detailed.jsx'

//  Redux
import reducers from './states/index'
import sagas from './side-effects'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware),
)
sagaMiddleware.run(sagas)

const initial_state = getStorage()
const state = store.getState()
state.cities.selected_cities = initial_state

store.subscribe(() => {
  setStorage(store.getState())
  console.log(store.getState())
})

getLocation(store, state)

render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" exact component={Index} />
        <Route path="/city/:id" component={Detailed} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('app'),
)
