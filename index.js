const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const search = require('./server/search')
const comment = require('./server/comment')
const album = require('./server/album')
const app = express()

// Set default promise as provider and connect mongoose
mongoose.Promise = global.Promise
mongoose.connect(process.env.DB_URL || 'mongodb://localhost/spotifyzier')

app.use(cors())
app.use(helmet())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('dist'))
app.use('/docs', express.static('doc'))
app.use('/comments', comment)
app.use('/search', search)
app.use('/album', album)

// 404 will fallback to the login page
app.use(function(req, res) {
  return res.redirect('/')
})

app.listen(process.env.APP_PORT || 3000, () => {})
