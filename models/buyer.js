const mongoose = require('mongoose')
const {bookSchema} = require('./book')
const Joi = require('joi')

const buyerSchema = new mongoose.Schema({
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
    avatar: {
        type: Buffer
    },
    books: [bookSchema]
})

const Buyer = mongoose.model('Buyer', buyerSchema)

function validateBuyer(buyer) {
    const schema = {
        name: Joi.string().required(),
        phonenumber: Joi.number().required(),
        email: Joi.string().required(),
        books: Joi.array().items(Joi.objectId())
    }

    return Joi.validate(buyer, schema)
}

module.exports.Buyer = Buyer;
module.exports.validateBuyer = validateBuyer;