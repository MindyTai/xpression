const express = require('express')
const User = require('../models/user')
const generateHashedPassword = require('../utils/generateHashedPassword')
const isMatchedPassword = require('../utils/isMatchedPassword')
const hash = require('../middlewares/hash')

const router = express.Router()

router.post('/login', async (req, res) => {
    try {
       const result = await User.findOne({email: req.body?.email}).exec()
       const isMatch = await isMatchedPassword(req.body?.password, result)
       
       if(result && isMatch){
        req.session.user = req.body.email        
        res.redirect('/home')
       } else {
        res.render('login', {
            message: 'Cannot find the account!'
        })
       }
    } catch(error) {
        res.status(500).send(error)
    }
})

router.get('/login',  (req, res) => {
    res.render('login', {
        message: null
    })
})

router.post('/logout', async (req, res) => {
    req.session.destroy(() => {
        //session destroyed
        res.clearCookie('user', '/').redirect('/login')
    })
})

router.get('/signup', (req, res) => {
    try {
        res.render('signup', {
            message: null,
        })
    } catch (error) {
        res.status(404).send(error)
    }
})

router.post('/signup', hash, async (req, res) => {
    try {
        await User.create(req.body)
      
        res.render('login', {
            message: 'You have created the account!',
        })
    } catch (error) {
       if(error.name === 'ValidationError') {
        let errors = {};

        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });
  
        res.status(400)
        res.render('signup', {
            message: errors,
        })
       } else {
        res.status(500).send(error);
       }
    }
})

module.exports = router
