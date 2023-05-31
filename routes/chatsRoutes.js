import express from 'express'

const chatRouter = express.Router()

chatRouter.get('/', (requests, response) => {
    const style = 'chat.css'
    response.render('chat', {style})
})

export default chatRouter