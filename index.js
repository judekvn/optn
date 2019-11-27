const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const config = require('config')
const multer = require('multer')

const books = require('./routes/books')
const buyers = require('./routes/buyers')
const users = require('./routes/users')
const auths = require('./routes/auth')

if (!config.get('jwtPrivateKey')) {
    console.error('Fatal Error: jwtPrivateKey is not defined')
    process.exit(1)
}
// set OptN_jwtPrivateKey=privateKey

mongoose.connect('mongodb://localhost/OptN', {useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log('connected'))
    .catch((err) => console.log)


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/book', books)
app.use('/api/buyer', buyers)
app.use('/api/user', users)
app.use('/api/auth', auths)

const port = process.env.PORT || 3000
app.listen(port, () => console.log('listening'))