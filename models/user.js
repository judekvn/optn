const mongoose = require('mongoose')
const {bookSchema} = require('./book')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    books: [bookSchema]
})

const User = mongoose.model('User', userSchema)

function validateUser(user) {
    const schema = {
        name: Joi.string().required(),
        phonenumber: Joi.number().required(),
        email: Joi.string().required(),
        books: Joi.array().items(Joi.objectId())
    }

    return Joi.validate(user, schema)
}

module.exports.User = User;
module.exports.validateUser = validateUser;