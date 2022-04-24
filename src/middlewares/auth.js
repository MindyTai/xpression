const auth = (req, res, next) => {
    if(req.session.user){
        console.log('Authenticated')
        next()
    } else {
        console.log('Not Authenticated')
        res.redirect('/login')  
    } 
}

module.exports = auth
