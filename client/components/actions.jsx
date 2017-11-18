import React from 'react'
import { connect } from 'react-redux'

import { clearStorage } from '../modules/storage'
import { getCityIds } from '../modules/reselect'
import { refreshAll } from '../states/cities'

import '../../styles/actions.scss'

const Actions = ({ ids, clearStorage, refreshAll }) => (
  <div className="row actions">
    <div className="col-xs-6 col-sm-6">
      <button
        className="btn btn-success"
        onClick={() => refreshAll(ids)}
      >
        Обновить всё
      </button>
    </div>
    <div className="col-xs-6 col-sm-6 text-right">
      <button
        className="btn btn-danger"
        onClick={() => {
          if (confirm('Будут удалены все выбранные города, Вы уверены?')) {
            clearStorage()
          }
        }}
      >
        Очистить хранилище
      </button>
    </div>
  </div>
)

const mapStateToProps = state => (
  {
    ids: getCityIds(state),
  }
)

const mapDispatchToProps = dispatch => (
  {
    clearStorage,
    refreshAll: ids => dispatch(refreshAll.pending({ ids })),
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Actions)
