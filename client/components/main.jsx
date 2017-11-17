import React from 'react'
import { connect } from 'react-redux'

import { getLocalCity } from '../modules/reselect'
import { add } from '../states/cities'
import City from './city.jsx'

const Main = ({ cities, loaded, local_city, add }) => (
  <div className="row">
    {
      local_city.length
        ?
          <div className="col-xs-12">
            <City city={local_city[0]} />
          </div>
        :
          <div>
            {
              !loaded
                ?
                  <span>LOADER</span>
                :
                  <div className="row">
                    <div className="col-xs-12 col-sm-12">
                      По вашим координатам найдены следующие города
                      <br />
                      Пожалуйста, выберите свой
                    </div>
                    {cities.map(city => (
                      <div
                        key={city.id}
                        className="col-xs-12 col-md-4"
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
