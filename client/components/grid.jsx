import React from 'react'
import { connect } from 'react-redux'

import { shortCityInfo } from '../modules/reselect'
import City from './city.jsx'

const Grid = ({ cities }) => (
  <div className="row">
    {cities.map(city => (
      <div
        key={city.id}
        className="col-xs-12 col-md-6"
      >
        <City city={city} />
      </div>
    ))}
  </div>
)

const mapStateToProps = state => (
  {
    cities: shortCityInfo(state),
  }
)

const mapDispatchToProps = dispatch => (
  {
    //
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Grid)
