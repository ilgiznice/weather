import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { detailedCityInfo } from '../modules/reselect'
import { refresh } from '../states/cities'

import Loader from './loader.jsx'

import '../../styles/detailed.scss'

const Detailed = ({
  city: {
    id, name, temp, wind, icon, loaded,
    country, description, date, cloudiness, pressure, humidity,
    sunrise, sunset, lat, lon,
  },
  refresh,
}) => {
  if (!loaded) return <Loader />
  return (
    <div className="row detailed">
      <div className="col-xs-12 col-sm-12">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-8">
            <h1>
              Погода в {name}, { country }
            </h1>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4">
            <Link href="/" to="/">Вернуться</Link>
            &nbsp;
            <button
              className="btn btn-success"
              onClick={() => refresh(id)}
            >
              Обновить
            </button>
          </div>
        </div>
        <h2>
          <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="Погода" />
          {temp}
          &nbsp;
          °C
        </h2>
        <h3>
          {description}
        </h3>
        <h4>
          {date}
        </h4>
        <div className="table-responsive">
          <table className="table">
            <tbody>
              <tr>
                <td>Ветер</td>
                <td>{wind} м/с</td>
              </tr>
              <tr>
                <td>Облачность</td>
                <td>{cloudiness}%</td>
              </tr>
              <tr>
                <td>Давление</td>
                <td>{pressure} ПА</td>
              </tr>
              <tr>
                <td>Влажность</td>
                <td>{humidity}%</td>
              </tr>
              <tr>
                <td>Заказ</td>
                <td>{sunrise}</td>
              </tr>
              <tr>
                <td>Восход</td>
                <td>{sunset}</td>
              </tr>
              <tr>
                <td>Координаты</td>
                <td>
                  Широта: {lat}
                  <br />
                  Долгота: {lon}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, props) => (
  {
    city: detailedCityInfo(state, props)[0],
  }
)

const mapDispatchToProps = dispatch => (
  {
    refresh: id => dispatch(refresh.pending({ id })),
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detailed)
