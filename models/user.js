const Joi = require('joi')
const mongoose = require('mongoose')
const config = require('config')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'))
    return token;
}

const User = mongoose.model('User', userSchema)

function validateUser(users) {
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    }
    return Joi.validate(users, schema)
}

module.exports.User = User;
module.exports.validateUser = validateUser;