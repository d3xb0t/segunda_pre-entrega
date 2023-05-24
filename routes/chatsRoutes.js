import express from 'express'

const chatRouter = express.Router()

chatRouter.get('/', (requests, response) => {
    const style = 'style.css'
    response.render('chat', {style})
})

export default chatRouter