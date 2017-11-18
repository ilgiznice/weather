import React from 'react'

import Detailed from '../components/detailed.jsx'

export default ({ match: { params: { id } } }) => (
  <Detailed id={id} />
)
