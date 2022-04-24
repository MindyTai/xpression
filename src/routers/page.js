const express = require('express')
const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/home', auth , (req, res) => {
    res.render('home');
})
module.exports = router
