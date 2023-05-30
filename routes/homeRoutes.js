import express from "express"

const homeRouter = express.Router()

homeRouter.get('/', (requests, response) => {
    const style = 'style.css'
    response.render('home', {style})    
})

export default homeRouter