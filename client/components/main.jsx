import React from 'react'
import { connect } from 'react-redux'

import { getLocalCity } from '../modules/reselect'
import { add } from '../states/cities'
import City from './city.jsx'
import Loader from './loader.jsx'

import '../../styles/main.scss'

const Main = ({ cities, loaded, local_city, add }) => (
  <div className="row main">
    {
      local_city.length
        ?
          <div className="col-xs-12 col-sm-12">
            <City city={local_city[0]} my_city />
          </div>
        :
          <div>
            {
              !loaded
                ?
                  <Loader />
                :
                  <div className="row">
                    <div className="col-xs-12 col-sm-12">
                      <div className="notification">
                        <p>
                          По вашим координатам найдены следующие города
                          <br />
                          Пожалуйста, выберите свой
                        </p>
                      </div>
                    </div>
                    {cities.map(city => (
                      <div
                        key={city.id}
                        className="col-xs-12 col-md-4 result"
                        role="button"
                        tabIndex="0"
                        onClick={() => add(city.id)}
                      >
                        {city.name}
                      </div>
                    ))}
                  </div>
            }
          </div>
    }
  </div>
)

const mapStateToProps = state => (
  {
    cities: state.cities.local_cities,
    loaded: state.cities.local_cities_loaded,
    local_city: getLocalCity(state),
  }
)

const mapDispatchToProps = dispatch => (
  {
    add: id => dispatch(add.pending({ id, local: true })),
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main)
