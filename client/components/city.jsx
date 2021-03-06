import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { remove, refresh } from '../states/cities'

import '../../styles/city.scss'
import Loader from './loader.jsx'

const City = ({ city: { id, name, temp, wind, icon, loaded }, my_city, remove, refresh }) => {
  if (!loaded) return <Loader />
  return (
    <div className="row city">
      {my_city && (
        <div className="col-xs-12 col-sm-12">
          <h2 className="my-city">Мой город</h2>
        </div>
      )}
      <div className="col-md-8">
        <div className="name">
          <Link href={`/city/${id}`} to={`/city/${id}`}>
            {name}
          </Link>
        </div>
        <div className="row">
          <div className="col-sm-2">
            <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="Погода" />
          </div>
          <div className="col-sm-10">
            <div className="temp">{temp} °C</div>
            <div className="wind">{wind} м/с</div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div
          className="action"
        >
          <i
            className="fa fa-refresh fa-3x"
            aria-hidden="true"
            onClick={() => refresh(id)}
          />
        </div>
        <div
          className="action"
        >
          <i
            className="fa fa-remove fa-3x"
            aria-hidden="true"
            onClick={() => remove(id)}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => (
  {
    //
  }
)

const mapDispatchToProps = dispatch => (
  {
    remove: id => dispatch(remove({ id })),
    refresh: id => dispatch(refresh.pending({ id })),
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(City)

// export default City
