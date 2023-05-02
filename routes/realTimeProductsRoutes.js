const products = require('../products.json')

const express = require('express')
const router = express.Router()


router.get('/', (requests, response) => {
    const style = 'realtime.css'
    response.render('realTimeProducts', { style })
    
})

router.post('/', () => {
    response.render('realTimeProducts', products)
})

module.exports = router