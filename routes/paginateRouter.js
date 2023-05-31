import callback from "../callbacks.js"
import express from 'express'
import productModel from '../dao/models/product.js'

class Query{

    limit = 10;
    page = 1;
    sort = {};
    query = {};

    constructor(limit, page, sort, query){
        this.limit = limit?limit : this.limit;
        this.page = page?page : this.page;
        this.sort = sort?{price: sort} : this.sort;
        this.query = query?{category: query} : this.query;
    }
}


const paginateRouter = express.Router()


paginateRouter.get('/', async (requests, response) => {
    try {
        let { limit, page, sort, query } = requests.query
        let dataToMakeTheQuery = new Query(limit, page, sort, query)
        console.log(dataToMakeTheQuery)
        let respuesta = await productModel.paginate(dataToMakeTheQuery.query,
                                                    {limit: dataToMakeTheQuery.limit,
                                                     page: dataToMakeTheQuery.page,
                                                     sort: dataToMakeTheQuery.sort })
        response.send(respuesta)
    } catch (error) {
        console.log(error)
    }
} )


export default paginateRouter