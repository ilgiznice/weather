import React, { Component } from 'react'

import Detailed from '../components/detailed.jsx'

export default class extends Component {
  constructor() {
    super()
    this.state = {
      id: null,
    }
  }
  componentDidMount() {
    // Получение ID города из URL
  }
  render() {
    return (
      <Detailed id={this.state.id} />
    )
  }
}
