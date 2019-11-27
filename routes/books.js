const express = require('express')
const router = express.Router()
const { Book, validateBook } = require('../models/book')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.get('/', async (req, res) => {
    const book = await Book.find().sort('name')
    res.send(book)
})

router.post('/', auth, async (req, res) => {
    const {error} = validateBook(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let book = new Book({
        ...req.body
    })

    book = await book.save()
    res.send(book)
})

router.get('/:id', async (req, res) => {
    const book = await Book.findById(req.params.id)
    if (!book) return res.status(404).send('Book not found')
    res.send(book)
})

router.put('/:id', async (req, res) => {
    const {error} = validateBook(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    const book = await Book.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            author: req.body.author,
            price: req.body.price
        }
    }, {new: true})

    if(!book) return res.status(404).send('Book not found')

    res.send(book)
})

router.delete('/:id', [auth, admin], async (req, res) => {
    const book = await Book.findByIdAndRemove(req.params.id)

    if (!book) return res.status(404).send('Book not found')

    res.send(book)
})

module.exports = router;