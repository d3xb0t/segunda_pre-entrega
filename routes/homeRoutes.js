const express = require('express')
const router = express.Router()
const products = require('../products.json')

router.get('/', (requests, response) => {
    
    response.render('home')
    
})


module.exports = router