const express = require('express')
const router = express.Router()
const { User, validateUser } = require('../models/user')
const { Book } = require('../models/book')

router.get('/', async (req, res) => {
    const user = await User.find().sort('name')
    res.send(user)
})

router.post('/', async (req, res) => {
    const {error} = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = new User({
        name: req.body.name,
        phonenumber: req.body.phonenumber,
        email: req.body.email
    })

    user = await user.save()
    res.send(user)
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) res.status(404).send('User not found')
    res.send(user)
})

router.put('/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phonenumber: req.body.phonenumber,
        email: req.body.email
    }, {new: true})

    if (!user) return res.status(404).send('User not found')
    res.send(user)
})

router.delete('/:id', async (req, res) => {
    const user = User.findByIdAndRemove(req.params.id)
    if (!user) return res.status(404).send('User not found')
    res.send(user)
})

router.post('/:id/:book', async (req, res) => {
    let user = await User.findById(req.params.id)
    const book = await Book.findById(req.params.book)

    let bookAdd = new Book({
        _id: book.id,
        name: book.name,
        author: book.author,
        price: book.price
    })

    user.books.push(bookAdd)
    user = await user.save()

    res.send(user)
})

router.put('/:id/:book', async (req, res) => {
    let book = await Book.findById(req.params.book)

    let user = await User.findByIdAndUpdate(req.params.id, {
        $pull: { books: { name: book.name} }
    }, {new: true})

    res.send(user)
})

module.exports = router;