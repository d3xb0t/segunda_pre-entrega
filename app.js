//const productos = require('./products.json')
const express = require('express')
//const { Server } = require('socket.io')
const app = express()
//const handlebars = require('express-handlebars')
const path = require('path')

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

const productRouter = require('./routes/productsRoutes')
const cartRouter = require('./routes/cartsRoutes')
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