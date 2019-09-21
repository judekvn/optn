const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const books = require('./routes/books')
const users = require('./routes/users')

mongoose.connect('mongodb://localhost/OptN', {useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log('connected'))
    .catch((err) => console.log)

// const userDB = mongoose.createConnection('mongodb://interntest:easyas123@interncluster-shard-00-00-zmzoh.mongodb.net:27017,interncluster-shard-00-01-zmzoh.mongodb.net:27017,interncluster-shard-00-02-zmzoh.mongodb.net:27017/test?ssl=true&replicaSet=InternCluster-shard-0&authSource=admin&retryWrites=true', 
// {useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true})
// userDB.once('open', function(){console.log('Connected to MongoDB Atlas.');});
// userDB.on('error', function(err){console.log('Database ERROR: ' + err);});


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/book', books)
app.use('/api/user', users)


const port = process.env.PORT || 3000
app.listen(port, () => console.log('listening'))