const express = require('express')
const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/home', auth , (req, res) => {
    res.render('home');
})

router.get('*', (req, res) => {
    res.status(404)
    res.render('notFound')
})

module.exports = router
