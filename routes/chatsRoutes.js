import express from 'express'

const chatRouter = express.Router()

chatRouter.get('/', (requests, response) => {
    response.render('chat', {})
})

export default chatRouter