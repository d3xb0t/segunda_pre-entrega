const express = require('express')
const router = express.Router()
const products = require('../products.json')

router.get('/', (requests, response) => {
    const style = 'style.css'
    response.render('home', {style})
    
})


module.exports = router