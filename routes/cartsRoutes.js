const express = require('express')
const router = express.Router()

router.get('/', (requests, response) => {
    response.send("Done!... Router Carts")
})


module.exports = router