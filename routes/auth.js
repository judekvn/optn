const { User } = require('../models/user')
const express = require('express')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')

router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send('Invalid email or password')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password')

    const token = user.generateAuthToken()
    // const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'))
    res.header('x-auth-token', token).send(token)
})

function validate(users) {
    const schema = {
        email: Joi.string().required(),
        password: Joi.string().required()
    }
    return Joi.validate(users, schema)
}

module.exports = router;