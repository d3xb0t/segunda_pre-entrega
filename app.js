const productRouter = require('./routes/productsRoutes')
const cartRouter = require('./routes/cartsRoutes')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use('/products', productRouter)
app.use('/carts', cartRouter)

app.listen(8080, () => {
    console.log("Listen in port 8080")
})