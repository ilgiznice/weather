const express = require('express')
const winston = require('winston')
const morgan = require('morgan')
const path = require('path')

const app = express()

app.use(morgan('tiny'))
app.use('/static', express.static(path.join(__dirname, '../public')))

require('./routes')(app)

app.listen(3000, () => {
  winston.info('Server starter at localhost:3000')
})
