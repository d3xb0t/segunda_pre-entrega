const express = require('express')
const router = express.Router()


router.get('/', (requests, response) => {
    const style = 'realtime.css'
    response.render('realTimeProducts', { style })
    
})


module.exports = router