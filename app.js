import chatModel from "./dao/models/chat.js"
import express from "express"
import mongoose from "mongoose"
import __dirname from "./utils.js"
import { Server } from 'socket.io'
import handlebars from 'express-handlebars'
import productRouter from "./routes/productsRoutes.js"
import cartRouter from "./routes/cartsRoutes.js"
import chatRouter from "./routes/chatsRoutes.js"
import homeRouter from './routes/homeRoutes.js'
import paginateRouter from './routes/paginateRouter.js'
import realTimeProductsRouter from "./routes/realTimeProductsRoutes.js"
import catalogueRouter from "./routes/catalogueRouter.js"
import viewCartRouter from "./routes/viewCartRouter.js"
import cors from 'cors'
import path from "path"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', handlebars.engine({ 
                                        defaultLayout: 'main',
                                        layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(cors())
app.use((requests, response, next) => {
                                        if(requests.body && requests.body._method){
                                            requests.method = requests.body._method
                                            delete requests.body._method
                                        }
                                        next()
})
app.use('/realtimeproducts', realTimeProductsRouter)
app.use('/', homeRouter)
app.use('/products', paginateRouter)

app.use('/catalogue', catalogueRouter)

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/chat', chatRouter)

//DEV
app.use('/cart', viewCartRouter)
//

try{
    mongoose.connect('mongodb://127.0.0.1:27017/wokeflix')
} catch(error) {
        handleError((error) => console.log("Imposible conectar la aplicacion"))
}

const server = app.listen(8080, () => {console.log("Listen in port 8080")})
const io = new Server(server)

let messages = []

async function sendToMongo(data){
    let { user, message } = data
    console.log(user, message)
    let respuesta = await chatModel.create({
        user,
        message
    })
    return respuesta
}

io.on('connection', socket => {
    console.log('Connected')

    socket.on('message', data => {
        io.emit('log', data)
    })

    socket.on('messageChat', data => {
        messages.push(data)
        let response = sendToMongo(data)
        io.emit("messageLogs", messages)
        
    })
})

/*

Crear una vista en el router de views ‘/products’ para visualizar todos los productos con su respectiva paginación. Cada producto mostrado puede resolverse de dos formas:
Llevar a una nueva vista con el producto seleccionado con su descripción completa, detalles de precio, categoría, etc. Además de un botón para agregar al carrito.
Contar con el botón de “agregar al carrito” directamente, sin necesidad de abrir una página adicional con los detalles del producto.

Además, agregar una vista en ‘/carts/:cid (cartId) para visualizar un carrito específico, donde se deberán listar SOLO los productos que pertenezcan a dicho carrito.

*/