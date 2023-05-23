//const productos = require('./products.json')
//const express = require('express')
import express from "express"
import mongoose from "mongoose"
//const { Server } = require('socket.io')
const app = express()
//const handlebars = require('express-handlebars')
//const path = require('path')
import path from "path"
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*
app.engine('handlebars', handlebars.engine({ 
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
*/

//const productRouter = require('./routes/productsRoutes')
import productRouter from "./routes/productsRoutes.js"
//const cartRouter = require('./routes/cartsRoutes')
import cartRouter from "./routes/cartsRoutes.js"


/*
const homeRouter = require('./routes/homeRoutes')
const realTimeProducts = require('./routes/realTimeProductsRoutes')
const cors = require('cors')
app.use(cors())
*/
app.use((requests, response, next) => {
    if(requests.body && requests.body._method){
        requests.method = requests.body._method
        delete requests.body._method
    }
    next()
})

//app.use('/realtimeproducts', realTimeProducts)
//app.use('/', homeRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.listen(8080, () => {console.log("Listening in port 8080")})
try{
    mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
} catch(error) {
        handleError((error) => console.log("Imposible conectar la aplicacion"))
}
/*
const server = app.listen(8080, () => {console.log("Listen in port 8080")})
const io = new Server(server)

io.on('connection', socket => {
    console.log('Connected')
    socket.on('message', data => {
        io.emit('log', data)
    })
})
*/