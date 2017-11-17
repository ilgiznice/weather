import React from 'react'
import { connect } from 'react-redux'

import { search, add } from '../states/cities'
import Loader from './loader.jsx'

import '../../styles/live-search.scss'

const Select = ({ cities, loaded, search, add }) => (
  <div className="row live-search">
    <div className="col-xs-12 col-sm-12">
      <div className="form-group">
        <input
          type="text"
          id="live-search"
          className="form-control"
          placeholder="Введите город"
          onChange={(e) => {
            const name = e.target.value
            if (name.length >= 3) search(name)
          }}
        />
      </div>
    </div>
    <div>
      {
        loaded
          ?
          cities.map(city => (
            <div
              className="col-xs-12 col-sm-12 result"
              role="button"
              tabIndex="0"
              onClick={() => {
                document.getElementById('live-search').value = ''
                add(city.id)
              }}
            >
              {city.name}
              &nbsp;
              ({city.country})
            </div>
          ))
          :
          <Loader />
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
