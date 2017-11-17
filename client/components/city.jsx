import React from 'react'
import { connect } from 'react-redux'

import { remove, refresh } from '../states/cities'

// import '../../styles/a.scss'

const City = ({ city : { id, name, temp, wind }, remove, refresh }) => (
  <div>
    <div>{name}</div>
    <div>{temp} °C</div>
    <div>{wind} м/с</div>
    <div
      onClick={() => refresh(id)}
    >
      <i className="fa fa-refresh" aria-hidden="true" />
    </div>
    <div
      onClick={() => remove(id)}
    >
      <i className="fa fa-remove" aria-hidden="true" />
    </div>
  </div>
)

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
