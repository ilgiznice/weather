import React from 'react'
import { connect } from 'react-redux'

import { search, add } from '../states/cities'

const Select = ({ cities, loaded, search, add }) => (
  <div className="row">
    <div className="form-group">
      <input
        type="text"
        className="form-control"
        placeholder="Введите город"
        onChange={(e) => {
          const name = e.target.value
          if (name.length >= 3) search(name)
        }}
      />
    </div>
    <div>
      {
        loaded
          ?
          cities.map(city => (
            <div
              className="col-xs-12"
              onClick={() => add(city.id)}
            >
              {city.name}
              &nbsp;
              ({city.country})
            </div>
          ))
          :
          <span>LOADER</span>
      }
    </div>
  </div>
)

const mapStateToProps = state => (
  {
    cities: state.cities.live_search_cities,
    loaded: state.cities.live_search_cities_loaded,
  }
)

const mapDispatchToProps = dispatch => (
  {
    search: name => dispatch(search.pending({ name })),
    add: id => dispatch(add.pending({ id, local: false })),
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Select)
