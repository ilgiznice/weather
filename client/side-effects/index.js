import { fork } from 'redux-saga/effects'
import cities from './cities'

const sagas = [...cities]

export default function* async() {
  yield sagas.map(saga => fork(saga))
}
