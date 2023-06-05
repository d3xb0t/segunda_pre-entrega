import express from "express"
import productModel from '../dao/models/product.js'

const catalogueRouter = express.Router()

catalogueRouter.get('/', async(requests, response) => {
    let { page } = requests.query
    if(!page){
        page = 1
    }
    let resultado = await productModel.paginate({},{page,limit:5,lean:true})
    resultado.prevLink = resultado.hasPrevPage?`http://localhost:8080/catalogue?page=${resultado.prevPage}`:""
    resultado.nextLink = resultado.hasNextPage?`http://localhost:8080/catalogue?page=${resultado.nextPage}`:""
    resultado.isValid= !(page<=0||page>resultado.totalPages)
    console.log(resultado)
    response.render('catalogue', resultado)    
})

export default catalogueRouter


