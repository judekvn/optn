const mongoose = require('mongoose')
const Joi = require('joi')

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const Book = mongoose.model('Book', bookSchema)

function validateBook(book) {
    const schema = {
        name: Joi.string().required(),
        author: Joi.string().required(),
        price: Joi.number().required()
    }
    
    return Joi.validate(book, schema)
}

module.exports.bookSchema = bookSchema;
module.exports.Book = Book;
module.exports.validateBook = validateBook;