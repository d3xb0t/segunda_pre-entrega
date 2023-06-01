import callback from "../callbacks.js"
import express from 'express'
import productModel from '../dao/models/product.js'

class Query{

    limit = 10;
    page = 1;
    sort = {};
    category = {};

    constructor(limit, page, sort, category){
        this.limit = limit?limit : this.limit;
        this.page = page?page : this.page;
        this.sort = sort?{price: sort} : this.sort;
        this.category = category?{'category': category} : this.category;
    }
}


const paginateRouter = express.Router()


paginateRouter.get('/', async (requests, response) => {
    try {
        let { limit, page, sort, category } = requests.query
        let dataToMakeTheQuery = new Query(limit, page, sort, category)
        console.log(dataToMakeTheQuery)
        let respuesta = await productModel.paginate(dataToMakeTheQuery.category,
                                                    {limit: dataToMakeTheQuery.limit,
                                                     page: dataToMakeTheQuery.page,
                                                     sort: dataToMakeTheQuery.sort })
        response.send(respuesta)
    } catch (error) {
        console.log(error)
    }
} )


export default paginateRouter